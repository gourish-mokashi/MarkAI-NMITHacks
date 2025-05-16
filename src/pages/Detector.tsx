import React from 'react';
import { DetectorForm } from '../components/DetectorForm';
export function Detector() {
  return <div className="w-full bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Image Detector
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image to analyze whether it was created by AI or is an
            authentic photograph. Our detector provides a confidence score for
            reliable results.
          </p>
        </div>
        <DetectorForm />
        <div className="mt-16 bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h3 className="font-medium text-lg mb-4">
            About Our Detection Technology
          </h3>
          <p className="text-gray-700 mb-4">
            Our AI image detector uses advanced machine learning algorithms to
            analyze subtle patterns and artifacts that are typically present in
            AI-generated images. The technology looks at:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Pixel-level inconsistencies and artifacts
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Unnatural textures and patterns
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Unusual lighting and shadow characteristics
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Embedded watermarks and signatures
            </li>
          </ul>
        </div>
      </div>
    </div>;
}