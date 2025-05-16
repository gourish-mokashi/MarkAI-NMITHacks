import React from 'react';
import { GeneratorForm } from '../components/GeneratorForm';
export function Generator() {
  return <div className="w-full bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Image Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning AI-generated images by describing what you want to
            see. Our advanced AI will bring your ideas to life.
          </p>
        </div>
        <GeneratorForm />
        <div className="mt-16 bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h3 className="font-medium text-lg mb-4">Tips for Great Results</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Be specific with your descriptions (e.g., lighting, style, mood)
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Try different artistic styles like "watercolor", "oil painting",
              or "digital art"
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Include details about the environment, time of day, or weather
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Experiment with different prompts to get varied results
            </li>
          </ul>
        </div>
      </div>
    </div>;
}