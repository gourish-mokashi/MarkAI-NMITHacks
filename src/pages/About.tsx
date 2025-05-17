import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function About() {
  const team = [
    {
      name: "Jayasheel Vinay J",
      role: "Front-end Developer",
      img: "/assets/images/jay.webp",
      github: "https://github.com/JayZ6969",
      linkedin: "https://www.linkedin.com/in/jayasheelvinayj",
      x: "https://x.com/jayasheelvinay",
    },
    {
      name: "Binit Gupta",
      role: "Front-end Developer",
      img: "assets/images/binit.jpg",
      github: "https://github.com/binit2-1",
      linkedin: "https://www.linkedin.com/in/binitgupta",
      x: "https://x.com/BinitGupta21",
    },
    {
      name: "Sanjana Patil",
      role: "Back-end Developer",
      img: "assets/images/sanjana.jpg",
      github: "https://github.com/Sanjana0019",
      linkedin: "https://www.linkedin.com/in/sanjana-patil-436b7b332/",
      x: "https://x.com/sanjana_p0019",
    },
    {
      name: "Gourish Mokashi",
      role: "Back-end Developer",
      img: "assets/images/gourish.jpeg",
      github: "https://github.com/gourish-mokashi",
      linkedin: "https://www.linkedin.com/in/gourish-mokashi",
      x: "https://x.com/GourishMokashi",
    },
  ];

  return (
    <div className="w-full p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-lg shadow-md">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="text-white">About</span>{" "}
            <span className="text-blue-600">Mark</span>
            <span className="text-white">AI</span>
          </h1>

          <div className="border-t-2 border-gray-500 mb-6" />

          <div className="text-gray-300 prose max-w-none">
            <p>
              MarkAI is a lightweight filter that integrates with AI image
              generators to invisibly embed digital watermarks into generated
              images. These marks, undetectable to the human eye, can be
              reliably identified by our detection tool helping fight deepfakes
              and ensuring AI-generated content stays traceable and accountable.
            </p>

            <h2 className="text-white text-2xl md:text-4xl font-bold mt-8 mb-3">
              Tech-Stack
            </h2>
            <p>
              Frontend: React+Vite, TypeScript, Tailwind CSS
              <br />
              Backend: Python, Flask, OpenCV, PyTorch, Diffusers-Stable Diffusion Pipeline, Flask-CORS
            </p>

            <h2 className="text-white text-2xl md:text-4xl font-bold mt-8 mb-3">
              Our Technology
            </h2>
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

            <h2 className="text-white text-2xl md:text-4xl font-bold mt-8 mb-3">
              Our Team
            </h2>
          </div>

          <div className="border-t-2 border-gray-500 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {team.map((person, i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl border border-gray-700 p-4 bg-[#1a1a1a] text-center shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="h-full overflow-hidden rounded-xl">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-white text-lg font-semibold">
                    {person.name}
                  </h3>
                  <p className="text-sm text-gray-400">{person.role}</p>
                  <div className="flex justify-center gap-4 mt-2 text-xl text-white">
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <FaGithub className="hover:text-pink-500" />
                    </a>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="hover:text-blue-600" />
                    </a>
                    <a
                      href={person.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X"
                    >
                      <FaXTwitter className="hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}