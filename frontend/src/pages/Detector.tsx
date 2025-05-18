import { DetectorForm } from '../components/DetectorForm';
export function Detector() {
  return <div className="w-full bg-[#101010] py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="  mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-6">
            <span className="text-white">AI </span><span className="text-blue-600">Image Detector</span>
          </h1>
          <p className="text-lg text-gray-300">
            Upload an image to analyze whether it was created by AI or is an
            authentic photograph. Our detector provides a confidence score for
            reliable results.
          </p>
        </div>
        <DetectorForm />
        <div className="mt-16 bg-[#101010] rounded-lg shadow-md">
          <h3 className="text-5xl font-bold text-white mb-4 border-b-2 border-gray-500 pb-6">
            About Our <span className='text-blue-600'>Detection Technology</span>
          </h3>
          <p className="text-gray-300 mb-4">
            Our AI image detector uses advanced machine learning algorithms to
            analyze subtle patterns and artifacts that are typically present in
            AI-generated images. The technology looks at:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Uses steganography decoder to detect pixel level embedded watermarks
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              Checks Metadata for more information
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">•</span>
              256-bit Hash Key verification
            </li>
          </ul>
        </div>
      </div>
    </div>;
}
