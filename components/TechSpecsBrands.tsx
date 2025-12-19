import React, { useState } from 'react';
import { Home, ChevronRight, Search, Bike } from 'lucide-react';
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
      className="group bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-500 hover:ring-1 hover:ring-primary-500 transition-all duration-200 flex items-center justify-center h-20 w-full relative overflow-hidden"
    >
        {/* Effet discret au survol */}
        <div className="absolute inset-0 bg-primary-50/0 group-hover:bg-primary-50/30 transition-colors"></div>
        
        <span className="relative z-10 text-sm md:text-base font-bold text-gray-700 group-hover:text-primary-600 transition-colors text-center truncate px-2">
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
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb Compact */}
        <nav className="flex items-center text-xs text-gray-500 mb-8">
            <button onClick={onGoHome} className="hover:text-primary-600 transition-colors flex items-center">
              <Home className="w-3.5 h-3.5 mr-1" />
              Accueil
            </button>
            <ChevronRight className="w-3 h-3 mx-2 text-gray-300" />
            <span className="font-medium text-gray-700">Fiches Techniques</span>
        </nav>

        {/* Header de section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Fiches Techniques
                </h1>
                <p className="text-gray-500 mt-1">Sélectionnez une marque pour voir les caractéristiques détaillées.</p>
            </div>
            
            {/* Barre de recherche */}
            <div className="relative w-full md:w-80 group">
                <input 
                  type="text" 
                  placeholder="Rechercher une marque..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm placeholder:text-gray-400 shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
            </div>
        </div>

        {/* Grille de marques (Texte uniquement) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBrands.map((brand) => (
                <BrandCard 
                    key={brand} 
                    brand={brand} 
                    onClick={() => onNavigate?.('tech-specs-models', { brand })} 
                />
            ))}
        </div>

        {filteredBrands.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
                <Bike className="w-16 h-16 mb-4 opacity-10" />
                <p className="text-lg font-medium text-gray-500">Aucune marque trouvée pour "{searchQuery}"</p>
                <button 
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-primary-600 font-bold hover:underline"
                >
                    Réinitialiser la recherche
                </button>
            </div>
        )}
      </main>
    </div>
  );
};

export default TechSpecsBrands;