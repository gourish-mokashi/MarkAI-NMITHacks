import React from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon, ShieldIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
export function Home() {
  return <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Watermark and Detect AI Images with MarkAI
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                MarkAI is a powerful tool that allows any Image generation model
                to apply an invisible watermark to AI generated images, and provides a new definition
                to privacy and security in the world of AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/generator" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-xl shadow-md hover:bg-gray-50 transition-colors">
                  Try Generator
                </Link>
                <Link to="/detector" className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl border border-blue-400 hover:bg-blue-600 transition-colors">
                  Try Detector
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="AI Image Generation Concept" className="rounded-3xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful AI Image Filter Tool
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers state-of-the-art capabilities for both
              generating watermarked images and detecting AI generated images
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={SparklesIcon} title="AI Image Filter" description="Embed Accurate Watermark to AI generated images using our advanced AI filter." />
            <FeatureCard icon={ShieldIcon} title="AI Image Detector" description="Identify AI-generated images with high accuracy to verify content authenticity." />
            <FeatureCard icon={ZapIcon} title="Lightning Fast" description="Get results in seconds with our optimized processing pipeline and powerful infrastructure." />
            <FeatureCard icon={ImageIcon} title="Watermarking" description="All generated images include invisible watermarks to help with future detection and attribution." />
          </div>
        </div>
      </section>
    </div>;
}