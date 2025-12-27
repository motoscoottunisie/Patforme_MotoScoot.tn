import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Search,
  ArrowRight,
  ChevronRight,
  Calendar,
  Lightbulb,
  Home as HomeIcon,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { mockTips } from '../data/mockData';
import Header from './layout/Header';

interface TipsProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Tips: React.FC<TipsProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tout', 'Entretien', 'Sécurité', 'Équipement', 'Conduite', 'Législation'];

  const filteredTips = useMemo(() => {
    return mockTips.filter(t => {
      const matchesCat = activeCategory === 'Tout' || t.category === activeCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary-100 selection:text-primary-700">
      
      {/* FULL-WIDTH HERO SECTION WITH ALIGNED CONTENT */}
      <section className="relative w-full h-[55vh] md:h-[50vh] lg:h-[52vh] flex flex-col items-start justify-center overflow-hidden">
        
        {/* Background Container */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: "url('https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp')" }}
          />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }}
          />
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

        {/* Content Wrapper aligned with Header Logo */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mt-10 md:mt-16 animate-fade-in-up">
            {/* Glassmorphism Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 mb-6">
              <Lightbulb size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Guide & Conseils</span>
            </div>

            {/* XXL Typo - Frameless and White */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white leading-[1.1] tracking-[-0.04em] mb-6">
              Roulez mieux, <br />
              <span className="text-white">
                entretenez plus intelligemment.
              </span>
            </h1>

            <p className="text-white/80 text-sm md:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
              Astuces d'entretien, guides de sécurité et conseils de pilotage pour prolonger la vie de votre deux-roues.
            </p>
        </div>
      </section>

      {/* Main Content Area aligned with Hero Content and Header Logo */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 -mt-10 relative z-20 pb-24">
        
        {/* FLOATING FILTERS & SEARCH BAR */}
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 mb-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#0F172A] text-white shadow-lg' : 'text-gray-400 hover:text-[#0F172A] hover:bg-gray-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-full lg:w-96 group">
                    <input 
                      type="text" 
                      placeholder="Rechercher un conseil..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#E65100] outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E65100] transition-colors" size={18} />
                </div>
            </div>
        </div>

        {/* TIPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {filteredTips.map((tip, idx) => (
                <article 
                    key={tip.id}
                    onClick={() => onNavigate?.('tip-details', { id: tip.id })}
                    className="group cursor-pointer flex flex-col animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    {/* Image Card */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 mb-8 border border-gray-100 shadow-sm transition-all group-hover:shadow-xl group-hover:shadow-primary-600/5 duration-500">
                        <img 
                            src={tip.image} 
                            className="w-full h-full object-cover" 
                            alt={tip.title} 
                        />
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-[9px] font-black text-gray-900 uppercase tracking-[0.2em] shadow-sm">
                                {tip.category}
                            </span>
                        </div>
                    </div>

                    {/* Meta Section */}
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-[#E65100]" />
                            <span>{tip.date}</span>
                        </div>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{tip.readTime}</span>
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div className="px-2 flex-1 flex flex-col">
                        <h3 className="text-xl font-[900] text-[#0F172A] leading-[1.2] tracking-tight mb-4 group-hover:text-[#E65100] transition-colors line-clamp-2">
                            {tip.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium line-clamp-3 leading-relaxed mb-8">
                            {tip.summary}
                        </p>
                        <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#0F172A] transition-all">
                            Voir le guide <ArrowRight size={14} className="text-[#E65100] group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </article>
            ))}
        </div>

        {/* EMPTY STATE */}
        {filteredTips.length === 0 && (
            <div className="py-32 text-center bg-white rounded-[3.5rem] border border-gray-100 shadow-sm animate-fade-in-up">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Aucun conseil trouvé</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto">Nous n'avons pas d'articles correspondant à votre recherche actuelle.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("Tout"); }}
                  className="mt-10 px-8 py-4 bg-[#0F172A] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                >
                   Réinitialiser
                </button>
            </div>
        )}

        {/* PREMIUM PRO CONTACT */}
        <section className="mt-32 p-12 md:p-24 bg-[#0F172A] rounded-[4rem] relative overflow-hidden group shadow-2xl animate-fade-in-up">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#E65100]/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-[900] text-white tracking-tighter leading-[1.1] mb-6">
                        Une astuce <br /> <span className="text-[#E65100]">de génie ?</span>
                    </h2>
                    <p className="text-gray-400 font-medium text-lg md:text-xl">
                        Partagez votre expertise mécanique ou vos conseils de sécurité avec toute la communauté MotoScoot.
                    </p>
                </div>
                <button 
                    onClick={() => onNavigate?.('contact')}
                    className="px-12 py-6 bg-white text-[#0F172A] font-[900] rounded-2xl text-xs uppercase tracking-widest hover:bg-[#E65100] hover:text-white transition-all active:scale-95 shadow-2xl"
                >
                    Proposer un sujet
                </button>
            </div>
        </section>

      </main>
    </div>
  );
};

export default Tips;