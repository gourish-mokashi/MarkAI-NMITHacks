import { Link } from "react-router-dom";
import { ImageIcon, ShieldIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import Example from "../components/Example";

const ExampleData = [
  {
    title: "AI Generated Cat",
    imageSrc: "/assets/images/CAT.jpg",
    alt: "AI Generated Cat",
    headerText: "WITHOUT-WATERMARK",
    link: "",
    cardImageBgColor: "#F3F4F6",
  },
  {
    title: "AI Generated Cat with watermark",
    imageSrc: "/assets/images/CAT.jpg",
    alt: "AI Generated Cat  with watermark",
    headerText: "WITH-WATERMARK",
    link: "#",
    cardImageBgColor: "#F3F4F6",
  },
];

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4">
                Watermark & Detect AI Images with{" "}
                <span className="text-blue-600">Mark</span>
                <span className="text-white">AI</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 opacity-90">
                MarkAI is a powerful tool that allows any Image generation model
                to apply an invisible watermark to AI generated images, and
                provides a new definition to privacy and security in the world
                of AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/generator"
                  className="px-6 py-3 text-xl bg-white text-blue-700 font-medium rounded-xl shadow-md hover:bg-gray-300 transition-colors"
                >
                  Try Generator
                </Link>
                <Link
                  to="/detector"
                  className="px-6 py-3 text-xl bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-500 transition-colors"
                >
                  Try Detector
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/assets/images/CAT.jpg"
                alt="AI Image Generation Concept"
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col w-full">
          <div className="mb-12">
            <h2 className="text-white text-3xl md:text-5xl font-bold text-gray-900 mb-4 border-b-2 border-gray-500 md:pb-6 sm:pb-4 pb-3 ">
              Powerful <span className="text-blue-600">AI Image</span> Filter
              Tool
            </h2>
            <p className="w-full text-xl text-gray-400 max-w-3xl">
              Our platform offers state-of-the-art capabilities for both
              generating watermarked images and detecting AI generated images
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={SparklesIcon}
              title="AI Image Filter"
              description="Embed Accurate Watermark to AI generated images using our advanced AI filter."
            />
            <FeatureCard
              icon={ShieldIcon}
              title="AI Image Detector"
              description="Identify AI-generated images with high accuracy to verify content authenticity."
            />
            <FeatureCard
              icon={ZapIcon}
              title="Lightning Fast"
              description="Get results in seconds with our optimized processing pipeline and powerful infrastructure."
            />
            <FeatureCard
              icon={ImageIcon}
              title="Watermarking"
              description="All generated images include invisible watermarks to help with future detection and attribution."
            />
          </div>
        </div>
      </section>
      <Example header="Examples" projects={ExampleData} />
    </div>
  );
}
