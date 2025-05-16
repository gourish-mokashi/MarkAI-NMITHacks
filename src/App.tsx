import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { Detector } from './pages/Detector';
import { About } from './pages/About';

export function App() {
  return (
      <BrowserRouter>
        <div className="flex flex-col items-center min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/detector" element={<Detector />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
  );
}