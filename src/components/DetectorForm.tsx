import React, { useState } from 'react';
import { UploadIcon, SearchIcon } from 'lucide-react';
export function DetectorForm() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{
    isAI: boolean;
    confidence: number;
  } | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      if (typeof event.target?.result === 'string') {
        setImage(event.target.result);
        setResult(null);
      }
    };
    reader.readAsDataURL(file);
  };
  const handleAnalyze = () => {
    if (!image) return;
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      // Random result for demo purposes
      const isAI = Math.random() > 0.5;
      const confidence = Math.round(Math.random() * 30 + 70);
      setResult({
        isAI,
        confidence
      });
      setIsAnalyzing(false);
    }, 2000);
  };
  return <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          Upload an image to analyze
        </label>
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${image ? 'border-green-400' : 'border-gray-300'}`}>
          {image ? <div className="mb-4">
              <img src={image} alt="Uploaded" className="max-h-64 mx-auto rounded" />
            </div> : <div className="flex flex-col items-center justify-center py-6">
              <UploadIcon className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-500 mb-2">
                Drag and drop an image here, or click to select
              </p>
              <p className="text-gray-400 text-sm">Supports: JPG, PNG, WebP</p>
            </div>}
          <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <label htmlFor="image-upload" className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            {image ? 'Change Image' : 'Select Image'}
          </label>
          {image && <button onClick={handleAnalyze} disabled={isAnalyzing} className={`ml-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isAnalyzing ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </> : <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Analyze Image
                </>}
            </button>}
        </div>
      </div>
      {result && <div className={`p-6 rounded-lg shadow-md ${result.isAI ? 'bg-red-50' : 'bg-green-50'}`}>
          <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700">
                This image is{' '}
                <span className={`font-bold ${result.isAI ? 'text-red-600' : 'text-green-600'}`}>
                  {result.isAI ? 'likely AI-generated' : 'likely authentic'}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Confidence: {result.confidence}%
              </p>
            </div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${result.isAI ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              <span className="text-xl font-bold">{result.confidence}%</span>
            </div>
          </div>
        </div>}
    </div>;
}