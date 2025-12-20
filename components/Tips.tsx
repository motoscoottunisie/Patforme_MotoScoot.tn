import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  User,
  CircleDashed,
  Home,
  Search,
  Mail,
  Lightbulb
} from 'lucide-react';
import { mockTips } from '../data/mockData';
import Header from './layout/Header';
import AdBanner from './common/AdBanner';

interface TipsProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Tips: React.FC<TipsProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Treat the first tip as the "Featured" one since mockTips structure matches closely
  const featuredTip = mockTips[0];
  const regularTips = mockTips.filter(t => t.id !== featuredTip.id);

  const handleTipClick = (id: number) => {
    onNavigate?.('tip-details', { id });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* HERO SECTION - Updated for Tablet Portrait */}
      <div className="relative w-full h-[35vh] md:h-[30vh] lg:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
        {/* Background Container */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Mobile Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: "url('https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp')" }}
          />
          {/* Desktop Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }}
          />

          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(-180deg, #AF2E13 0%, #E65100 100%)',
              opacity: 0.95,
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        <Header 
          variant="transparent" 
          onNavigate={onNavigate} 
          onGoHome={onGoHome} 
          isLoggedIn={isLoggedIn}
          onTriggerLogin={onTriggerLogin}
          onLogout={onLogout}
        />

        {/* Hero Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto md:space-y-6 h-full pt-20">
          
          <div className="text-center px-4 md:mt-32">
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Guide & Conseils
            </h1>
            <p className="text-white text-lg md:text-xl font-normal max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Astuces d'entretien, conseils sécurité et guides pratiques pour motards.
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Breadcrumbs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center hover:text-primary-600 cursor-pointer transition-colors" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </div>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">Guide & Conseils</span>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80">
             <input
               type="text"
               placeholder="Rechercher un conseil..."
               className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all shadow-sm"
             />
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        
        {/* Featured Tip (First Item) - Fixed Size */}
        <div className="mb-12 animate-fade-in-up">
          <div 
            onClick={() => handleTipClick(featuredTip.id)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer lg:h-[340px]"
          >
             <div className="relative h-60 lg:h-full overflow-hidden w-full">
               <img 
                 src={featuredTip.image} 
                 alt={featuredTip.title} 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm flex items-center gap-2">
                    <Lightbulb size={14} />
                    Astuce de la semaine
                  </span>
               </div>
             </div>
             <div className="p-6 lg:p-8 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="font-bold text-primary-600">{featuredTip.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {featuredTip.date}</span>
                </div>
                <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight line-clamp-2">
                  {featuredTip.title}
                </h2>
                <p className="text-gray-600 text-base mb-6 line-clamp-2">
                  {featuredTip.summary}
                </p>
                <div className="flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                         <User size={16} className="text-gray-500" />
                      </div>
                      <div className="text-xs">
                         <p className="font-bold text-gray-900">{featuredTip.author}</p>
                         <p className="text-gray-500">{featuredTip.readTime} de lecture</p>
                      </div>
                   </div>
                   <span className="p-2 bg-primary-50 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                   </span>
                </div>
             </div>
          </div>
        </div>

        {/* Ad Banner - Dynamic (Using news_top zone as fallback for simplicity or could be 'tips_top') */}
        <AdBanner zone="news_top" className="mb-12 h-32 md:h-48 rounded-2xl" />

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
           {regularTips.slice(0, visibleCount).map((tip, index) => (
             <article 
               key={tip.id} 
               onClick={() => handleTipClick(tip.id)}
               className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer animate-fade-in-up"
               style={{ animationDelay: `${index * 100}ms` }}
             >
                <div className="relative h-56 overflow-hidden">
                   <img 
                     src={tip.image} 
                     alt={tip.title} 
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                   />
                   <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm border border-white/50">
                        {tip.category}
                      </span>
                   </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
                      <Calendar size={12} />
                      <span>{tip.date}</span>
                      <span>•</span>
                      <Clock size={12} />
                      <span>{tip.readTime}</span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {tip.title}
                   </h3>
                   
                   <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                      {tip.summary}
                   </p>

                   <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Par {tip.author}</span>
                      <span className="text-sm font-bold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                         Lire le conseil <ChevronRight size={16} />
                      </span>
                   </div>
                </div>
             </article>
           ))}
        </div>

        {/* Load More Button */}
        {visibleCount < regularTips.length && (
          <div className="text-center mb-16">
             <button 
               onClick={() => setVisibleCount(prev => prev + 3)}
               className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm"
             >
                <CircleDashed className="w-5 h-5 animate-spin-slow" />
                Charger plus de conseils
             </button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="bg-neutral-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/10">
                   <Mail className="w-3 h-3" />
                   Newsletter
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Devenez un expert moto</h2>
                <p className="text-gray-400 mb-10 text-lg">Recevez nos meilleurs conseils d'entretien, guides de sécurité et astuces de pilotage directement dans votre boîte mail.</p>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary-500 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary-500 transition-all"
                    />
                    <button className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 whitespace-nowrap">
                        S'inscrire
                    </button>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  En vous inscrivant, vous acceptez notre politique de confidentialité. Désinscription possible à tout moment.
                </p>
            </div>
        </div>

      </div>

    </div>
  );
};

export default Tips;