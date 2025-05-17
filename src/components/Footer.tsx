import { Link } from 'react-router-dom';

export function Footer() {
  const quickLinks = [
    { name: 'Home ↗', to: '/' },
    { name: 'Generator ↗', to: '/generator' },
    { name: 'Detector ↗', to: '/detector' },
    { name: 'About ↗', to: '/about' },
  ];

  const bottomLinks = [
    { name: 'Privacy Policy ↗', to: '#' },
    { name: 'Repository ↗', to: '#' },
  ];

  return (
    <footer className="text-white w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:gap-0 gap-10 border-t-2 border-gray-500 pt-8 flex justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-blue-600">Mark</span>AI
            </h3>
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
        <div className="flex md:flex-row flex-col items-center justify-between border-t-2 border-gray-500 mt-8 pt-8 w-full  ">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} MarkAI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {bottomLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-300 hover:text-white text-sm"
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