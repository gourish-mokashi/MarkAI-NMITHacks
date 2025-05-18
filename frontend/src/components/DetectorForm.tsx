import React, { useState, useCallback } from "react";
import { UploadIcon, SearchIcon } from "lucide-react";

export function DetectorForm() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    isAuthentic: boolean;
    confidence: number;
    watermark_found?: boolean;
    metadata_valid?: boolean;
    on_blockchain?: boolean;
    watermark_content?: string | null;
    metadata?: Record<string, any>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    processFile(uploadedFile);
  };

  const processFile = (uploadedFile: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setImage(event.target.result);
        setFile(uploadedFile);
        setResult(null);
        setError(null);
      }
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        processFile(file);
      } else {
        setError("Please upload an image file");
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      const v = data.verification;
      
      // Count how many security checks passed
      const securityChecksCount = [
        v.watermark_found,
        v.metadata_valid,
        v.on_blockchain
      ].filter(Boolean).length;

      // Determine confidence based on number of checks passed
      let confidence = 0;
      if (securityChecksCount === 1) confidence = 75;
      else if (securityChecksCount === 2) confidence = 85;
      else if (securityChecksCount === 3) confidence = 95;

      // Image is AI-generated if any security check passes
      const isAIGenerated = securityChecksCount > 0;

      setResult({
        isAuthentic: !isAIGenerated,
        confidence: isAIGenerated ? confidence : 95, // 95% confidence for authentic images
        watermark_found: v.watermark_found,
        metadata_valid: v.metadata_valid,
        on_blockchain: v.on_blockchain,
        watermark_content: v.watermark_content,
        metadata: v.metadata,
      });
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8">
        <label className="block text-gray-300 font-medium mb-2">
          Upload an image to analyze
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-blue-500 bg-blue-50 bg-opacity-10" : ""
          } ${image ? "border-green-400" : "border-gray-300"}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <div className="mb-4">
              <img
                src={image}
                alt="Uploaded"
                className="max-h-64 mx-auto rounded"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <UploadIcon className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-300 mb-2">
                Drag and drop an image here, or click to select
              </p>
              <p className="text-gray-300 text-sm">Supports: JPG, PNG, WebP</p>
            </div>
          )}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            {image ? "Change Image" : "Select Image"}
          </label>
          {image && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`ml-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                isAnalyzing ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isAnalyzing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Analyze Image
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          Error: {error}
        </div>
      )}

      {result && (
        <div
          className={`p-6 rounded-lg shadow-md ${result.isAuthentic ? "bg-green-50" : "bg-red-50"}`}>
          <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700">
                This image is{" "}
                <span className={`font-bold ${result.isAuthentic ? "text-green-600" : "text-red-600"}`}>
                  {result.isAuthentic
                    ? "authentic"
                    : `AI-generated (${result.confidence}% confidence)`}
                </span>
              </p>
              {result.isAuthentic && (
                <p className="text-sm text-gray-500 mt-1">
                  No AI generation markers detected
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Watermark:{" "}
                {result.watermark_found ? "✔️ Found" : "❌ Not found"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Metadata Valid: {result.metadata_valid ? "✔️ Yes" : "❌ No"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                On Ledger: {result.on_blockchain ? "✔️ Yes" : "❌ No"}
              </p>
              {result.watermark_content && (
                <p className="text-sm text-gray-400 mt-2">
                  Watermark Content: <code>{result.watermark_content}</code>
                </p>
              )}
            </div>
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                result.isAuthentic
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <span className="text-xl font-bold">{result.confidence}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
