import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Bike, 
  Layers, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import Header from './layout/Header';
import { brandsMoto } from '../data/mockData';

interface TechSpecsBrandsProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const BrandCard: React.FC<{ brand: string, onClick: () => void }> = ({ brand, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-500 transition-all duration-300 flex flex-col items-center justify-center h-32 w-full relative overflow-hidden active:scale-95"
    >
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-primary-500" />
        </div>
        <div className="w-10 h-10 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
            <Layers size={20} />
        </div>
        <span className="text-sm md:text-base font-[900] text-[#0F172A] group-hover:text-primary-600 transition-colors text-center truncate w-full px-2 uppercase tracking-tight">
          {brand}
        </span>
    </button>
  );
};

const TechSpecsBrands: React.FC<TechSpecsBrandsProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brandsMoto.filter(brand => 
    brand.toLowerCase().includes(searchQuery.toLowerCase()) && brand !== "Autre"
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary-100 selection:text-primary-700">
      
      {/* FULL-WIDTH HERO SECTION (Same as News.tsx) */}
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
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Fiches Techniques</span>
            </div>

            {/* XXL Typo */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white leading-[1.1] tracking-[-0.04em] mb-6">
              Toutes les données, <br />
              <span className="text-white">
                en un seul endroit.
              </span>
            </h1>

            <p className="text-white/80 text-sm md:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
              Consultez les caractéristiques détaillées, performances et dimensions de plus de 200 modèles disponibles sur le marché.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 -mt-10 relative z-20 pb-24">
        
        {/* FLOATING FILTERS & SEARCH BAR (Same as News.tsx) */}
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 mb-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                    <button
                        className="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-[#0F172A] text-white shadow-lg"
                    >
                        Toutes les marques
                    </button>
                    {/* Potential for alphabetical filters here */}
                </div>
                
                <div className="relative w-full lg:w-96 group">
                    <input 
                      type="text" 
                      placeholder="Rechercher une marque..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#E65100] outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E65100] transition-colors" size={18} />
                </div>
            </div>
        </div>

        {/* BRANDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredBrands.map((brand, idx) => (
                <div 
                  key={brand} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <BrandCard 
                      brand={brand} 
                      onClick={() => onNavigate?.('tech-specs-models', { brand })} 
                  />
                </div>
            ))}
        </div>

        {/* EMPTY STATE */}
        {filteredBrands.length === 0 && (
            <div className="py-32 text-center bg-white rounded-[3.5rem] border border-gray-100 shadow-sm animate-fade-in-up">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Aucune marque trouvée</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto">Nous n'avons pas de fiches techniques pour "{searchQuery}".</p>
                <button 
                  onClick={() => setSearchQuery("")}
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
                        Une fiche <br /> <span className="text-[#E65100]">manquante ?</span>
                    </h2>
                    <p className="text-gray-400 font-medium text-lg md:text-xl">
                        Vous ne trouvez pas votre machine ? Suggérez-nous un modèle ou une marque à ajouter à notre catalogue technique.
                    </p>
                </div>
                <button 
                    onClick={() => onNavigate?.('contact')}
                    className="px-12 py-6 bg-white text-[#0F172A] font-[900] rounded-2xl text-xs uppercase tracking-widest hover:bg-[#E65100] hover:text-white transition-all active:scale-95 shadow-2xl"
                >
                    Suggérer un ajout
                </button>
            </div>
        </section>

      </main>
    </div>
  );
};

export default TechSpecsBrands;