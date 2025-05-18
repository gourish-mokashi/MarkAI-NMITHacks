import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  imageSrc: string;
  alt: string;
  headerText: string;
  cardImageBgColor: string;
}

interface FeaturedProps {
  header: string;
  projects: Project[];
}

const Example: FC<FeaturedProps> = ({ header, projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  };

  const isMdUp = useMediaQuery('(min-width: 768px)');

  const handleMouseEnter = (index: number) => {
    if (isMdUp) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (isMdUp) {
      setHoveredIndex(null);
    }
  };

  return (
    <section className="flex items-center justify-center w-full z-10" id="projects">
      <div className="flex flex-col max-w-7xl w-screen px-4 sm:px-6 lg:px-8 md:gap-8 gap-6">
        <h1 className="border-b-2 border-gray-500 md:py-6 sm:py-4 pb-3 w-full font-bold tracking-tight text-white text-5xl leading-none">
          {header}
        </h1>
        <div className="flex flex-wrap gap-6 w-full">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col gap-6 md:w-[calc(50%-1.5rem)] w-full">
              <div className="flex items-center xl:gap-4 lg:gap-3 gap-2 w-full">
                <div className="xl:w-4 xl:h-4 lg:h-3 lg:w-3 h-2 w-2 bg-white rounded-full"></div>
                <h1 className=" font-semibold text-white text-xl leading-none">
                  {project.title}
                </h1>
              </div>
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="relative w-full pb-[100%] rounded-xl cursor-pointer"
              >
                <h1
                  className={`absolute flex overflow-hidden w-[100vw] justify-center min-[1921px]:h-[4.997vw] xl:h-[6rem] md:h-[3.75rem] sm:h-[2.25rem] h-[1.875rem] text-blue-500 font-inter text-center font-bold leading-none tracking-tight min-[1921px]:text-[4.997vw] xl:text-8xl md:text-6xl sm:text-4xl text-3xl z-20 top-1/2 -translate-y-1/2 rounded-md ${
                    index % 2 === 0
                      ? '-translate-x-1/2 md:left-full left-1/2'
                      : 'translate-x-1/2 md:right-full right-1/2'
                  }`}
                >
                  {project.headerText.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      initial={{ y: '100%' }}
                      animate={hoveredIndex === index ? { y: '0' } : { y: '100%' }}
                      transition={{ ease: [0.22, 1, 0.36, 1], delay: letterIndex * 0.025 }}
                      className=" flex items-center justify-center h-full"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </h1>
                <div
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-xl overflow-hidden"
                  style={{ backgroundColor: project.cardImageBgColor }}
                >
                  <img
                    className="w-[80%] rounded-lg h-auto shadow-lg"
                    src={project.imageSrc}
                    alt={project.alt}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Example;