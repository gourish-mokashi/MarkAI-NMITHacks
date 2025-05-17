import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, Fingerprint } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: 'Home ↗', to: '/' },
    { name: 'Generator ↗', to: '/generator' },
    { name: 'Detector ↗', to: '/detector' },
    { name: 'About ↗', to: '/about' },
  ];

  const bottomLinks = [
    { name: 'Made with ❣️ by Infectors ↗', to: 'https://github.com/gourish-mokashi/MarkAI-NMITHacks.git' },
  ];

  return (
    <footer className="text-white w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col md:flex-row md:gap-0 gap-10 border-t-2 border-gray-500 py-8 flex justify-between">
          <div>
            <Link to="/" className="flex-shrink-0 flex gap-2 pb-3 items-center">
              <Fingerprint className="h-10 w-10 text-blue-500" />
                <div>
                  <span className="text-blue-500 font-bold md:text-3xl text-2xl">Mark</span>
                  <span className="text-white font-bold md:text-3xl text-2xl">AI</span>
              </div>
            </Link>
            <p className="text-gray-300">
              Advanced AI image generation and detection tool. <br />
              Built at NMIT HACKS - 2025.
            </p>
          </div>
          <div className='flex flex-col items-start space-y-2 mr-32'>
            <h4 className="text-3xl font-semibold text-bold mb-4 border-b-2 border-gray-500 pb-2">Quick Links</h4>
            <div className="flex flex-col gap-1 w-full">
              {quickLinks.map((link) => (
                <Link to={link.to} className="flex items-center text-gray-300 hover:text-white">
                  <p className='text-xl hover:text-white relative group '>
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-lg border-t-2 border-gray-500 pt-3 pb-4 w-full">
          <div className="mt-4">
            {bottomLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-300 hover:text-white text-md"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}