import { Link } from 'react-router-dom';
import { TwitterIcon, FacebookIcon, InstagramIcon, GithubIcon } from 'lucide-react';
export function Footer() {
  return <footer className="text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4"><span className='text-blue-600'>Mark</span>AI</h3>
            <p className="text-gray-300">
              Advanced AI image generation and detection tool.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 mr-32">
              <li>
                <Link to="/generator" className="text-gray-300 hover:text-white">
                  Generator
                </Link>
              </li>
              <li>
                <Link to="/detector" className="text-gray-300 hover:text-white">
                  Detector
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} MarkAI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-300 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}