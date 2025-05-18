from flask import Flask, request, send_file
from flask_cors import CORS
from diffusers import StableDiffusionPipeline
import torch
import io
import os
import gc
import json
import hashlib
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin
from stegano import lsb
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Path configurations
TEMP_DIR = "temp_files"
GENERATED_DIR = "generated_images"
LEDGER_PATH = "image_ledger.json"

# Ensure directories exist
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(GENERATED_DIR, exist_ok=True)

# Memory optimization function
def optimize_memory():
    """Clean up memory resources for better performance"""
    gc.collect()
    torch.cuda.empty_cache()
    if torch.cuda.is_available():
        torch.cuda.ipc_collect()

# Configure for low VRAM usage
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "max_split_size_mb:128"

# Load Stable Diffusion model with optimizations for limited VRAM
print("Loading Stable Diffusion model - this may take a few minutes...")

# Use Stable Diffusion 2.1 model
model_id = "stabilityai/stable-diffusion-2-1"

# Configure pipeline with GPU optimizations
model = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    use_safetensors=True,
    variant="fp16"
).to("cuda")

# Enable memory efficient attention
model.enable_attention_slicing()

# Enable VAE slicing for memory efficiency
model.enable_vae_slicing()

# Set default image size for 6GB VRAM
DEFAULT_WIDTH = 512
DEFAULT_HEIGHT = 512

# ---------- 1. Image Enhancement Functions ----------

def enhance_prompt(prompt):
    """Automatically enhance the prompt for ultrarealistic image generation."""
    # Ultrarealistic quality enhancements
    ultrarealistic_terms = [
        "ultrarealistic",
        "photorealistic",
        "hyperdetailed",
        "8k UHD",
        "high resolution",
        "professional photography",
        "detailed facial features",
        "intricate details",
        "sharp focus",
        "high quality",
        "masterpiece",
        "realistic lighting",
        "natural skin texture",
        "volumetric lighting",
        "ray tracing",
        "subsurface scattering",
        "cinematic lighting",
        "color grading"
    ]
    
    # Join the original prompt with enhancement terms
    enhanced = f"{prompt}, {', '.join(ultrarealistic_terms)}"
    return enhanced

# ---------- 2. STEGANOGRAPHIC WATERMARKING ----------

def embed_steganographic_watermark(image, watermark_text):
    """
    Hides a given text message (watermark_text) in the image
    using least significant bit (LSB) steganography.
    """
    # Save image temporarily to use with stegano
    temp_path = os.path.join(TEMP_DIR, f"temp_{uuid.uuid4()}.png")
    image.save(temp_path)
    
    try:
        # Apply steganographic watermark
        secret_image = lsb.hide(temp_path, watermark_text)
        return secret_image
    finally:
        # Always remove temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)

def extract_watermark(image_path):
    """Extracts the hidden watermark from the image."""
    try:
        return lsb.reveal(image_path)
    except Exception as e:
        # Handle extraction errors gracefully
        print(f"Watermark extraction error: {str(e)}")
        return None

# ---------- 3. METADATA HASHING ----------

def compute_metadata_hash(metadata_dict):
    """
    Converts metadata dict to sorted JSON, hashes it with SHA-256.
    This ensures even tiny changes to metadata will result in a different hash.
    """
    metadata_json = json.dumps(metadata_dict, sort_keys=True)
    return hashlib.sha256(metadata_json.encode()).hexdigest()

# ---------- 4. SIMULATED BLOCKCHAIN LEDGER ----------

def save_hash_to_ledger(image_hash, ledger_path=LEDGER_PATH):
    """
    Appends the image hash to a local JSON ledger. Simulates immutability
    by logging only the hash for future comparison.
    """
    # Create a lock mechanism to prevent race conditions
    lock_file = f"{ledger_path}.lock"
    
    # Simple file-based locking
    retry_count = 0
    while os.path.exists(lock_file) and retry_count < 5:
        # Wait and retry
        import time
        time.sleep(0.5)
        retry_count += 1
    
    try:
        # Create lock file
        with open(lock_file, 'w') as f:
            f.write('locked')
        
        if os.path.exists(ledger_path):
            with open(ledger_path, "r") as f:
                try:
                    ledger = json.load(f)
                except json.JSONDecodeError:
                    # Handle corrupted ledger
                    ledger = {}
        else:
            ledger = {}

        ledger[image_hash] = {
            "timestamp": datetime.now().isoformat(),
            "status": "Verified"
        }

        with open(ledger_path, "w") as f:
            json.dump(ledger, f, indent=4)
        
        return True
    except Exception as e:
        print(f"Error saving to ledger: {str(e)}")
        return False
    finally:
        # Always remove lock file
        if os.path.exists(lock_file):
            os.remove(lock_file)

# ---------- 5. METADATA EMBEDDING ----------

def embed_metadata(image, metadata):
    """Embeds metadata into the image and returns the image with its hash."""
    # Compute hash before embedding
    metadata_hash = compute_metadata_hash(metadata)
    
    # Add hash to metadata
    metadata["TamperCheckHash"] = metadata_hash
    
    # Ensure image is in RGB mode for PNG conversion
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Create PngInfo object to store metadata
    png_info = PngImagePlugin.PngInfo()
    
    # Add metadata to PngInfo, ensuring all values are strings
    for key, value in metadata.items():
        png_info.add_text(key, str(value))
    
    # Save image with metadata to a bytes buffer
    buffer = io.BytesIO()
    image.save(buffer, format='PNG', pnginfo=png_info, optimize=False)
    buffer.seek(0)
    
    # Create a new image from the buffer to ensure metadata is loaded
    final_image = Image.open(buffer)
    
    # Store the PngInfo object with the image for later use
    final_image.custom_pnginfo = png_info
    
    # Return the final image with metadata
    return final_image, metadata_hash

# ---------- 6. FULL SECURITY PIPELINE ----------

def secure_image_pipeline(image, prompt):
    """
    Applies the full security process to an image:
    1. Embeds steganographic watermark
    2. Adds metadata with a hash
    3. Logs the hash in a blockchain-like ledger
    
    Returns the fully secured image.
    """
    # Step 1: Create a unique ID for this image
    image_id = str(uuid.uuid4())
    
    # Step 2: Prepare metadata
    metadata = {
        "ImageID": image_id,  # Use the actual variable, not the string "image_id"
        "GenerationPrompt": prompt[:500],  # Use the actual prompt, truncated
        "GenerationDate": datetime.now().isoformat(),  # Use the actual datetime
        "GeneratedBy": model_id  # Use the actual model_id variable
    }
    
    # Step 3: Create steganographic watermark (hidden)
    watermark_text = f"{model_id} {image_id} - {metadata['GenerationDate']}"
    steg_image = embed_steganographic_watermark(image, watermark_text)
    
    # Step 4: Embed metadata and get hash
    secured_image, image_hash = embed_metadata(steg_image, metadata)
    
    # Step 5: Save hash to blockchain ledger
    save_hash_to_ledger(image_hash)
    
    # Step 6: Return final image
    return secured_image

@app.route('/generate', methods=['POST'])
def generate_image():
    # Get parameters from request
    try:
        data = request.json
        if not data:
            return {"error": "Invalid JSON data"}, 400
            
        prompt = data.get('prompt')
        width = int(data.get('width', DEFAULT_WIDTH))
        height = int(data.get('height', DEFAULT_HEIGHT))
        num_inference_steps = int(data.get('steps', 50))
        guidance_scale = float(data.get('guidance_scale', 12.0))
        
        # Validate prompt
        if not prompt:
            return {"error": "No prompt provided"}, 400
        
        # Enhance prompt automatically
        enhanced_prompt = enhance_prompt(prompt)
        
        # Validate dimensions for VRAM constraints
        if width * height > 512 * 512:
            return {"error": "Image dimensions too large for available VRAM. Max recommended is 512x512"}, 400
        
        # Run memory optimization before generation
        optimize_memory()
        
        # Generate image with optimized parameters
        image = model(
            prompt=enhanced_prompt,
            negative_prompt="cartoon, anime, illustration, painting, drawing, art, sketch, low quality, worst quality, blurry, grainy, noisy, watermark, signature, text, deformed, distorted, disfigured, bad anatomy, unrealistic",
            width=width,
            height=height,
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale
        ).images[0]
        
        # Apply the full security pipeline to the generated image
        secured_image = secure_image_pipeline(image, prompt)
        
        # Generate unique filename
        filename = f"generated_{uuid.uuid4()}.png"
        save_path = os.path.join(GENERATED_DIR, filename)
        
        # Save the secured image to disk with a unique filename
        secured_image.save(save_path, format="PNG")
        
        # Free up memory
        optimize_memory()
        
        # Return image
        buffer = io.BytesIO()
        # Use the stored PngInfo when saving for return
        if hasattr(secured_image, 'custom_pnginfo'):
            secured_image.save(buffer, format="PNG", pnginfo=secured_image.custom_pnginfo)
        else:
            secured_image.save(buffer, format="PNG")
        buffer.seek(0)
        
        return send_file(buffer, mimetype="image/png")
    except ValueError as ve:
        return {"error": f"Invalid parameter: {str(ve)}"}, 400
    except Exception as e:
        # Handle errors gracefully
        optimize_memory()  # Clean up memory in case of error
        return {"error": str(e)}, 500

@app.route('/verify', methods=['POST'])
def verify_image():
    """
    API endpoint to verify an uploaded image against the security measures.
    """
    if 'image' not in request.files:
        return {"error": "No image file uploaded"}, 400
    
    temp_path = None
    try:
        file = request.files['image']
        
        # Make sure the temp directory exists
        os.makedirs(TEMP_DIR, exist_ok=True)
        
        # Get file extension and create a proper temp file with that extension
        filename = file.filename
        file_ext = os.path.splitext(filename)[1].lower() if filename else '.png'
        
        # Save the uploaded file with a unique name and proper extension
        temp_path = os.path.join(TEMP_DIR, f"temp_verify_{uuid.uuid4()}{file_ext}")
        file.save(temp_path)
        
        # Try to open the image to verify it's a valid image file
        try:
            image = Image.open(temp_path)
            # Convert to PNG if it's not already for consistent processing
            if file_ext != '.png':
                png_temp_path = temp_path.replace(file_ext, '.png')
                image.save(png_temp_path, format="PNG")
                # Remove the original temp file
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                temp_path = png_temp_path
        except Exception as e:
            return {"error": f"Invalid image file: {str(e)}"}, 400
        
        # Extract watermark
        try:
            watermark = extract_watermark(temp_path)
            watermark_found = watermark is not None
        except Exception as e:
            watermark = None
            watermark_found = False
            print(f"Watermark extraction error: {str(e)}")
        
        # Extract and check metadata
        image = Image.open(temp_path)
        
        # Get metadata from image info or png text chunks
        metadata = {}
        if hasattr(image, 'text'):
            metadata.update(image.text)
        if hasattr(image, 'info'):
            metadata.update(image.info)
        
        # Remove hash for computing new hash
        stored_hash = metadata.get("TamperCheckHash")
        hash_found = stored_hash is not None
        
        if hash_found:
            # Verify hash
            temp_metadata = {k: v for k, v in metadata.items() if k != "TamperCheckHash"}
            recomputed_hash = compute_metadata_hash(temp_metadata)
            hash_valid = stored_hash == recomputed_hash
            
            # Check in ledger
            if os.path.exists(LEDGER_PATH):
                with open(LEDGER_PATH, "r") as f:
                    try:
                        ledger = json.load(f)
                        on_blockchain = stored_hash in ledger
                    except json.JSONDecodeError:
                        on_blockchain = False
            else:
                on_blockchain = False
        else:
            hash_valid = False
            on_blockchain = False
        
        # Determine if this is an AI-generated image
        # Only consider it AI-generated if it has EITHER a watermark OR valid metadata
        is_ai_generated = watermark_found or hash_found
        
        # Create a clear message for the user
        if is_ai_generated:
            image_type = "AI-generated image"
            confidence = 100 if (watermark_found and hash_valid and on_blockchain) else 85
            if watermark_found and hash_valid and on_blockchain:
                authenticity = "Verified authentic AI-generated image"
            else:
                authenticity = "AI-generated image with potential tampering"
        else:
            image_type = "Not an AI-generated image"
            authenticity = "This appears to be a regular image, not generated by this system"
            confidence = 0  # 0% confidence it's AI-generated
        
        return {
            "verification": {
                "image_type": image_type,
                "authenticity": authenticity,
                "confidence": confidence,
                "watermark_found": watermark_found,
                "watermark_content": watermark if watermark_found else None,
                "metadata_hash_found": hash_found,
                "metadata_valid": hash_valid,
                "on_blockchain": on_blockchain,
                "is_authentic": watermark_found and hash_valid and on_blockchain,
                "is_ai_generated": is_ai_generated,
                "metadata": {k: v for k, v in metadata.items() if k != "TamperCheckHash"}
            }
        }
    except Exception as e:
        # Provide a more detailed error message
        import traceback
        error_details = traceback.format_exc()
        print(f"Verification error: {error_details}")
        return {"error": f"Error verifying image: {str(e)}"}, 500
    finally:
        # Clean up temp file
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except:
                pass

# Helper function to clean old temporary files
def cleanup_temp_files(max_age_hours=24):
    """Remove temporary files older than max_age_hours"""
    current_time = datetime.now()
    
    for directory in [TEMP_DIR, GENERATED_DIR]:
        if not os.path.exists(directory):
            continue
            
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            try:
                # Get file creation time
                file_age = datetime.fromtimestamp(os.path.getctime(file_path))
                hours_diff = (current_time - file_age).total_seconds() / 3600
                
                # Remove old files
                if hours_diff > max_age_hours:
                    os.remove(file_path)
            except Exception as e:
                print(f"Error cleaning up {file_path}: {str(e)}")

# Set up periodic cleanup
def setup_cleanup_scheduler():
    """Set up a scheduled task to clean temporary files"""
    from apscheduler.schedulers.background import BackgroundScheduler
    
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=cleanup_temp_files, trigger="interval", hours=6)
    scheduler.start()
    
    # Shut down the scheduler when exiting the app
    import atexit
    atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    # Create ledger file if it doesn't exist
    if not os.path.exists(LEDGER_PATH):
        with open(LEDGER_PATH, "w") as f:
            json.dump({}, f)
    
    # Set up cleanup scheduler
    try:
        setup_cleanup_scheduler()
    except ImportError:
        print("APScheduler not available. Skipping automated cleanup.")
    
    app.run(port=5000)