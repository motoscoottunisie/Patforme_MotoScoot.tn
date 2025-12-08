
import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { reviews } from '../data/mockData';

const Reviews: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 relative z-10">
        
        {/* Header Section with Trust Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-600 tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Ce qu'ils disent de nous
            </h2>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              La communauté MotoScoot grandit chaque jour. Des milliers de motards nous font confiance pour acheter et vendre.
            </p>
          </div>

          {/* Trust Score Summary */}
          <div className="hidden md:flex flex-col items-end animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-3xl font-bold text-gray-900">4.9</span>
              <span className="text-gray-400 text-lg">/5</span>
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-warning-400 fill-warning-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">Basé sur 1200+ avis vérifiés</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className="group flex flex-col h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-md hover:border-gray-200 transition-all duration-300 relative opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${400 + (index * 150)}ms`, animationFillMode: 'forwards' }}
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-8 right-8 text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                <Quote size={48} className="fill-current transform rotate-12" />
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-success-500 fill-success-50" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.role}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < review.rating ? 'text-warning-400 fill-warning-400' : 'text-gray-200 fill-gray-200'}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-2 font-medium">{review.date}</span>
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed font-medium relative z-10 flex-grow">
                "{review.content}"
              </p>

              {/* Verified Badge */}
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Achat vérifié</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
