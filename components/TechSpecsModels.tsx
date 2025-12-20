import React, { useState } from 'react';
import { Home, ChevronRight, Search, Filter, Calendar } from 'lucide-react';
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

const TechSpecsModels: React.FC<TechSpecsModelsProps> = ({ brand, onGoHome, onNavigate, onBack, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("Tous");

  // Filter models by brand
  const brandModels = mockTechSpecs.filter(spec => spec.brand === brand);
  
  // Apply search and filters
  const filteredModels = brandModels.filter(model => {
      const matchesSearch = model.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilter === "Tous" || model.year.toString() === yearFilter;
      return matchesSearch && matchesYear;
  });

  const availableYears = Array.from(new Set(brandModels.map(m => m.year))).sort((a, b) => b - a);

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

      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap mb-8">
            <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <button onClick={() => onNavigate?.('tech-specs-brands')} className="hover:text-primary-600 transition-colors">
              Fiches Techniques
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">{brand}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Modèles {brand}</h1>
                <p className="text-gray-500">{filteredModels.length} modèles trouvés</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                    <select 
                        value={yearFilter} 
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="w-full sm:w-40 appearance-none pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-600 cursor-pointer"
                    >
                        <option value="Tous">Toutes années</option>
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <div className="relative flex-1 sm:w-64">
                    <input 
                        type="text" 
                        placeholder="Rechercher un modèle..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
            </div>
        </div>

        {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredModels.map((spec) => (
                    <div 
                        key={spec.id}
                        onClick={() => onNavigate?.('tech-specs-details', { id: spec.id })}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
                    >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                            <img 
                                src={spec.image} 
                                alt={`${spec.brand} ${spec.model}`} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm">
                                    {spec.year}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                                    {spec.model}
                                </h3>
                            </div>
                            <span className="inline-block px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold w-fit mb-4 border border-gray-100">
                                {spec.category}
                            </span>
                            
                            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                                <span className="text-gray-500">{spec.engine.cc}</span>
                                <span className="font-bold text-primary-600">{spec.priceNew}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Aucun modèle trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default TechSpecsModels;