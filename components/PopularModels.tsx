
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { popularModels } from '../data/mockData';

interface PopularModelsProps {
  onNavigate?: (view: string) => void;
}

const PopularModels: React.FC<PopularModelsProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle Resize for Responsive Items
  useEffect(() => {
    const handleResize = () => {
      let newItemsToShow = 3;
      if (window.innerWidth < 640) {
        newItemsToShow = 1; // Mobile
      } else if (window.innerWidth < 1024) {
        newItemsToShow = 2; // Tablet
      } else {
        newItemsToShow = 3; // Desktop
      }
      setItemsToShow(newItemsToShow);
      
      // Clamp index so we don't show empty space when sizing up
      const newMaxIndex = Math.ceil(popularModels.length - newItemsToShow);
      setCurrentIndex(prev => Math.min(prev, newMaxIndex));
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic Slider
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(popularModels.length - itemsToShow);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [itemsToShow, isPaused]);

  const maxIndex = Math.ceil(popularModels.length - itemsToShow);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }

    setTouchEnd(0);
    setTouchStart(0);
    setIsPaused(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Les modèles les plus recherchés
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Découvrez les motos qui font vibrer la communauté.
            </p>
          </div>
          <button 
            onClick={() => onNavigate?.('search')}
            className="hidden md:flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors group"
          >
            Voir tous les modèles
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden -mx-4 py-4"> {/* Negative margin to allow padding in cards */}
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {popularModels.map((model) => (
                <div 
                  key={model.id} 
                  className="flex-shrink-0 px-4 transition-all duration-300"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div 
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer h-full"
                    onClick={() => onNavigate?.('search')}
                  >
                    {/* Image Container */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/5 z-10" />
                      <img 
                        src={model.image} 
                        alt={model.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 z-20 shadow-sm">
                        Populaire
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
                        {model.brand}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {model.name}
                      </h3>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                        <span className="text-sm text-gray-500 font-medium">
                          {model.price}
                        </span>
                        <span className="p-2 bg-primary-50 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-primary-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 md:hidden flex justify-center">
          <button 
            onClick={() => onNavigate?.('search')}
            className="flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors group"
          >
            Voir tous les modèles
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularModels;
