import os
import json
import hashlib
from PIL import Image
from stegano import lsb
import argparse

# Path for the blockchain ledger
LEDGER_PATH = "image_ledger.json"

def compute_metadata_hash(metadata_dict):
    """
    Converts metadata dict to sorted JSON, hashes it with SHA-256.
    This ensures even tiny changes to metadata will result in a different hash.
    """
    metadata_json = json.dumps(metadata_dict, sort_keys=True)
    return hashlib.sha256(metadata_json.encode()).hexdigest()

def verify_image_security(image_path):
    """    
    Verifies security pipelines in the image:
    1. Steganographic watermark
    2. Metadata integrity
    3. Blockchain ledger verification
    
    Returns a dict with verification results.
    If any of these security measures is present, it's considered an AI-generated image.
    """
    results = {
        "file_exists": os.path.exists(image_path),
        "is_valid_image": False,
        "watermark": {
            "found": False,
            "content": None
        },
        "metadata": {
            "found": False,
            "content": {},
            "hash_found": False,
            "hash_valid": False
        },
        "blockchain": {
            "found": False,
            "timestamp": None
        },
        "overall_authenticity": False,
        "is_ai_generated": False
    }
    
    # Check if file exists
    if not results["file_exists"]:
        return results
    
    try:
        # Try to open the image
        image = Image.open(image_path)
        results["is_valid_image"] = True
        
        # 1. Try to extract steganographic watermark
        try:
            watermark = lsb.reveal(image_path)
            if watermark:
                results["watermark"]["found"] = True
                results["watermark"]["content"] = watermark
        except Exception as e:
            print(f"Watermark extraction error: {e}")
        
        # 2. Extract metadata and verify hash
        metadata = image.info
        
        if metadata:
            # Remove hash for metadata content
            temp_metadata = {k: v for k, v in metadata.items() if k != "TamperCheckHash"}
            
            if temp_metadata:
                results["metadata"]["found"] = True
                results["metadata"]["content"] = temp_metadata
            
            # Check for hash in metadata
            stored_hash = metadata.get("TamperCheckHash")
            if stored_hash:
                results["metadata"]["hash_found"] = True
                
                # Calculate hash from metadata to verify integrity
                calculated_hash = compute_metadata_hash(temp_metadata)
                
                # Check if hash matches
                if calculated_hash == stored_hash:
                    results["metadata"]["hash_valid"] = True
                    
                    # 3. Check if hash exists in the blockchain ledger
                    if os.path.exists(LEDGER_PATH):
                        with open(LEDGER_PATH, "r") as f:
                            ledger = json.load(f)
                            
                        if stored_hash in ledger:
                            results["blockchain"]["found"] = True
                            if isinstance(ledger[stored_hash], dict) and "timestamp" in ledger[stored_hash]:
                                results["blockchain"]["timestamp"] = ledger[stored_hash]["timestamp"]
                            else:
                                results["blockchain"]["timestamp"] = "Unknown (legacy format)"

        # Determine if it's an AI-generated image (if any security measure is present)
        results["is_ai_generated"] = (
            results["watermark"]["found"] or 
            (results["metadata"]["hash_found"] and results["metadata"]["hash_valid"]) or 
            results["blockchain"]["found"]
        )

        # Determine overall authenticity (all security measures present)
        results["overall_authenticity"] = (
            results["watermark"]["found"] and 
            results["metadata"]["hash_found"] and 
            results["metadata"]["hash_valid"] and 
            results["blockchain"]["found"]
        )
        
        return results
        
    except Exception as e:
        print(f"Error during verification: {e}")
        return results

def print_verification_results(results):
    """Prints the verification results in a readable format."""
    print("\n===== IMAGE VERIFICATION RESULTS =====")
    
    if not results["file_exists"]:
        print("❌ File not found!")
        return
        
    if not results["is_valid_image"]:
        print("❌ Not a valid image file!")
        return

    # Print AI generation status
    if results["is_ai_generated"]:
        print("✅ AI-GENERATED IMAGE DETECTED")
        if results["overall_authenticity"]:
            print("✅ All security measures are present and valid!")
        else:
            print("ℹ️ Some security measures were detected, but not all are present or valid.")
    else:
        print("ℹ️ LIKELY A REAL IMAGE: No AI generation markers detected")
    
    # Print overall result
    if results["overall_authenticity"]:
        print("✅ AUTHENTIC IMAGE: All security measures verified!")
    else:
        print("❌ VERIFICATION FAILED: This image may be tampered with or not secured.")
    
    print("\n----- Security Layers -----")
    
    # 1. Steganographic Watermark
    print("\n1. STEGANOGRAPHIC WATERMARK:")
    if results["watermark"]["found"]:
        print(f"   ✅ Found: {results['watermark']['content']}")
    else:
        print("   ❌ Not found")
    
    # 2. Metadata & Hash
    print("\n2. METADATA:")
    if results["metadata"]["found"]:
        print("   ✅ Metadata found")
        if results["metadata"]["hash_found"]:
            print("   ✅ Security hash found")
            if results["metadata"]["hash_valid"]:
                print("   ✅ Hash integrity verified")
            else:
                print("   ❌ Hash integrity check failed - possible tampering!")
        else:
            print("   ❌ Security hash not found")
            
        # Print metadata content
        print("\n   Metadata Content:")
        for key, value in results["metadata"]["content"].items():
            print(f"   - {key}: {value}")
    else:
        print("   ❌ No metadata found")
    
    # 3. Blockchain Ledger
    print("\n3. BLOCKCHAIN LEDGER:")
    if results["blockchain"]["found"]:
        print(f"   ✅ Verification record found (timestamp: {results['blockchain']['timestamp']})")
    else:
        print("   ❌ Not found in security ledger")

def main():
    parser = argparse.ArgumentParser(description="Verify Image Security Features")
    parser.add_argument("image_path", help="Path to the image to verify")
    
    args = parser.parse_args()
    results = verify_image_security(args.image_path)
    print_verification_results(results)

if __name__ == "__main__":
    main()