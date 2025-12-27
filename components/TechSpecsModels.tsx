import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Zap, 
  Gauge, 
  Info,
  Clock
} from 'lucide-react';
import Header from './layout/Header';
import { mockTechSpecs } from '../data/mockData';

interface TechSpecsModelsProps {
  brand: string;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const TechSpecsModels: React.FC<TechSpecsModelsProps> = ({ 
  brand, 
  onGoHome, 
  onNavigate, 
  onBack, 
  isLoggedIn, 
  onTriggerLogin, 
  onLogout 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("Tout");

  // Filter models by brand
  const brandModels = useMemo(() => mockTechSpecs.filter(spec => spec.brand === brand), [brand]);
  
  // Available years for filter
  const availableYears = useMemo(() => {
    // Fix: Added explicit types (a: string, b: string) to resolve "Property 'localeCompare' does not exist on type 'unknown'" error on line 44.
    const years = Array.from(new Set(brandModels.map(m => m.year.toString()))).sort((a: string, b: string) => b.localeCompare(a));
    return ["Tout", ...years];
  }, [brandModels]);

  // Apply search and filters
  const filteredModels = useMemo(() => {
    return brandModels.filter(model => {
      const matchesSearch = model.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilter === "Tout" || model.year.toString() === yearFilter;
      return matchesSearch && matchesYear;
    });
  }, [brandModels, searchQuery, yearFilter]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary-100 selection:text-primary-700">
      
      {/* FULL-WIDTH HERO SECTION */}
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
              <Layers size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Fiches Techniques • {brand}</span>
            </div>

            {/* XXL Typo */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white leading-[1.1] tracking-[-0.04em] mb-6">
              Découvrez la gamme <br />
              <span className="text-white">
                {brand} en détail.
              </span>
            </h1>

            <p className="text-white/80 text-sm md:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
              Spécifications techniques complètes, performances et dimensions de tous les modèles {brand} disponibles sur le marché.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 -mt-10 relative z-20 pb-24">
        
        {/* FLOATING FILTERS & SEARCH BAR */}
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 mb-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                    {availableYears.map(year => (
                        <button
                            key={year}
                            onClick={() => setYearFilter(year)}
                            className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${yearFilter === year ? 'bg-[#0F172A] text-white shadow-lg' : 'text-gray-400 hover:text-[#0F172A] hover:bg-gray-50'}`}
                        >
                            {year === 'Tout' ? 'Toutes années' : year}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-full lg:w-96 group">
                    <input 
                      type="text" 
                      placeholder={`Rechercher un modèle ${brand}...`} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#E65100] outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E65100] transition-colors" size={18} />
                </div>
            </div>
        </div>

        {/* MODELS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {filteredModels.map((spec, idx) => (
                <article 
                    key={spec.id}
                    onClick={() => onNavigate?.('tech-specs-details', { id: spec.id })}
                    className="group cursor-pointer flex flex-col animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    {/* Image Card */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 mb-8 border border-gray-100 shadow-sm transition-all group-hover:shadow-xl group-hover:shadow-primary-600/5 duration-500">
                        <img 
                            src={spec.image} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                            alt={`${spec.brand} ${spec.model}`} 
                        />
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-[9px] font-black text-gray-900 uppercase tracking-[0.2em] shadow-sm">
                                {spec.year}
                            </span>
                        </div>
                    </div>

                    {/* Meta Section */}
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">
                        <div className="flex items-center gap-1.5">
                            <Zap size={12} className="text-[#E65100]" />
                            <span>{spec.engine.cc}</span>
                        </div>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <div className="flex items-center gap-1.5">
                            <Gauge size={12} />
                            <span>{spec.category}</span>
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div className="px-2 flex-1 flex flex-col">
                        <h3 className="text-xl font-[900] text-[#0F172A] leading-[1.2] tracking-tight mb-4 group-hover:text-[#E65100] transition-colors line-clamp-2">
                            {spec.model}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed mb-8">
                            {spec.engine.type.split(',')[0]} - {spec.engine.power}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#0F172A] transition-all">
                                Fiche complète <ArrowRight size={14} className="text-[#E65100] group-hover:translate-x-2 transition-transform" />
                            </div>
                            <span className="text-sm font-black text-[#E65100] tracking-tighter">
                                {spec.priceNew}
                            </span>
                        </div>
                    </div>
                </article>
            ))}
        </div>

        {/* EMPTY STATE */}
        {filteredModels.length === 0 && (
            <div className="py-32 text-center bg-white rounded-[3.5rem] border border-gray-100 shadow-sm animate-fade-in-up">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Aucun modèle trouvé</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto">Nous n'avons pas de fiches techniques correspondant à votre recherche.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setYearFilter("Tout"); }}
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
                        Envie d'acheter <br /> <span className="text-[#E65100]">une {brand} ?</span>
                    </h2>
                    <p className="text-gray-400 font-medium text-lg md:text-xl">
                        Consultez toutes les annonces d'occasion disponibles pour cette marque sur notre plateforme.
                    </p>
                </div>
                <button 
                    onClick={() => onNavigate?.('search', { brand })}
                    className="px-12 py-6 bg-white text-[#0F172A] font-[900] rounded-2xl text-xs uppercase tracking-widest hover:bg-[#E65100] hover:text-white transition-all active:scale-95 shadow-2xl"
                >
                    Voir les annonces {brand}
                </button>
            </div>
        </section>

      </main>
    </div>
  );
};

export default TechSpecsModels;