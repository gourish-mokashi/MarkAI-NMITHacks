export function About() {
  return <div className="w-full bg-[#101010] py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101010] rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <span className="text-white">About</span> <span className="text-blue-600">Mark</span><span className="text-white">AI</span>
          </h1>
          <div className="text-gray-300 prose max-w-none">
            <p>
              MarkAI is a lightweight filter that integrates with AI image generators 
              to invisibly embed digital watermarks into generated images. These marks,
              undetectable to the human eye, can be reliably identified by our detection 
              tool helping fight deepfakes and ensuring AI-generated content stays traceable 
              and accountable.

            </p>
            <h2 className="text-white text-xl font-semibold mt-8 mb-3">Tech-Stack</h2>
            <p className="text-gray-300">
              Frontend: React+Vite, TypeScript, Tailwind CSS<br />
              Backend: 
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-3">Our Technology</h2>
            <p>
              Our platform uses state-of-the-art deep learning models for both
              image generation and detection. The generator module can create
              stunning, realistic images from text descriptions, while our
              detector can identify AI-generated content with high accuracy by
              analyzing subtle patterns and artifacts invisible to the human
              eye.
            </p>
            <p>
              All images created through our platform include invisible
              watermarks that help with future detection and attribution,
              promoting responsible use of AI-generated content.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-3">Our Team</h2>
            
            
            
          </div>
        </div>
      </div>
    </div>;
}