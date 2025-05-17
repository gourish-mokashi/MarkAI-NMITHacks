import { GeneratorForm } from '../components/GeneratorForm';

export function Generator() {
  return <div className="w-full pt-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-6">
            <span className="text-blue-600">AI </span><span className="text-white">Image Generator</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Create stunning AI-generated images by describing what you want to
            see. Our advanced AI will bring your ideas to life.
          </p>
        </div>
        <div className="flex flex-col w-full rounded-lg overflow-hidden shadow-sm">
          <GeneratorForm />
        </div>
        <div className="w-full mt-16 rounded-lg shadow-md">
          <h3 className="w-full text-white text-5xl font-bold mb-4 border-b-2 border-gray-500 pb-6">Tips for Great Results</h3>
          <ul className="w-full space-y-2 text-gray-300">
            <li className="w-full flex items-start">
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