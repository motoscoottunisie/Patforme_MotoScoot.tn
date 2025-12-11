
import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Star, Wrench } from 'lucide-react';
import { popularGarages } from '../data/mockData';

interface PopularGaragesProps {
  onNavigate?: (view: string) => void;
}

const PopularGarages: React.FC<PopularGaragesProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
      const newMaxIndex = Math.ceil(popularGarages.length - newItemsToShow);
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
        const maxIndex = Math.ceil(popularGarages.length - itemsToShow);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // Slightly slower than models slider

    return () => clearInterval(interval);
  }, [itemsToShow, isPaused]);

  const maxIndex = Math.ceil(popularGarages.length - itemsToShow);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }

    setTouchEnd(null);
    setTouchStart(null);
    setIsPaused(false);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Les garages les plus consultés
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Confiez votre moto aux meilleurs experts de votre région.
            </p>
          </div>
          <button 
            onClick={() => onNavigate?.('garages')}
            className="hidden md:flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors group"
          >
            Voir tous les garages
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
          <div className="overflow-hidden -mx-4 py-4">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {popularGarages.map((garage) => (
                <div 
                  key={garage.id} 
                  className="flex-shrink-0 px-4 transition-all duration-300"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div 
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer h-full flex flex-col"
                    onClick={() => onNavigate?.('garages')}
                  >
                    {/* Image Container */}
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10" />
                      <img 
                        src={garage.image} 
                        alt={garage.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900 z-20 shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning-400 fill-warning-400" />
                        {garage.rating}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary-50 text-primary-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-primary-200">
                          {garage.specialty}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {garage.name}
                      </h3>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{garage.location}</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-gray-400" />
                          Prendre RDV
                        </span>
                        <span className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
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
            onClick={() => onNavigate?.('garages')}
            className="flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors group"
          >
            Voir tous les garages
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularGarages;
