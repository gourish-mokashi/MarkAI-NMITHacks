export function About() {
  return <div className="w-full py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            About MarkAI
          </h1>
          <div className="text-gray-300 prose max-w-none">
            <p>
              MarkAI is a cutting-edge tool that leverages the latest
              advancements in artificial intelligence to provide powerful image
              generation and detection tools. Our mission is to empower creators
              while promoting transparency in the age of AI-generated content.
            </p>
            <h2 className="text-white text-xl font-semibold mt-8 mb-3">Our Story</h2>
            <p>
              Founded in 2023, MarkAI was created by a team of AI researchers
              and digital content experts who recognized both the incredible
              potential and the challenges presented by generative AI
              technology. As AI-generated images became increasingly
              sophisticated and widespread, we saw the need for tools that could
              both harness this creative power and help maintain trust in visual
              media.
            </p>
            <h2 className="text-white text-xl font-semibold mt-8 mb-3">Our Technology</h2>
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
            <h2 className="text-white text-xl font-semibold mt-8 mb-3">Our Team</h2>
            <p>
              MarkAI is built by a diverse team of machine learning engineers,
              designers, and digital media experts committed to advancing AI
              technology while promoting ethical standards and transparency in
              the digital content ecosystem.
            </p>
            <h2 className="text-white text-xl font-semibold mt-8 mb-3">Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you. Visit our{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-800">
                Contact page
              </a>{' '}
              to get in touch with our team.
            </p>
          </div>
        </div>
      </div>
    </div>;
}