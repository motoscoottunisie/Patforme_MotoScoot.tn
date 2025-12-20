import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Search, 
  Phone, 
  Star, 
  ArrowRight,
  Wrench,
  CheckCircle2,
  Home,
  ChevronRight,
  Filter,
  RotateCcw,
  ChevronDown,
  X,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { mockGarages, tunisianCities, specialtiesList } from '../data/mockData';
import Header from './layout/Header';
import AdBanner from './common/AdBanner';

interface GaragesProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Garages: React.FC<GaragesProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  // UI States
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFilterOpen]);

  const handleGarageClick = (id: number) => {
    onNavigate?.('garage-details', { id });
  };

  // Filter Logic
  const filteredGarages = mockGarages.filter(garage => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      garage.name.toLowerCase().includes(query) ||
      garage.description?.toLowerCase().includes(query);

    const matchesCity = selectedCity 
      ? (garage.address?.includes(selectedCity) || garage.location?.includes(selectedCity))
      : true;

    const matchesSpecialty = selectedSpecialty
      ? (garage.specialties?.includes(selectedSpecialty) || garage.specialty === selectedSpecialty)
      : true;

    const matchesVerified = isVerifiedOnly ? garage.isVerified : true;

    return matchesSearch && matchesCity && matchesSpecialty && matchesVerified;
  });

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedSpecialty("");
    setIsVerifiedOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCity || selectedSpecialty || isVerifiedOnly;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        showMobileFilter={false}
        onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-8 md:py-12">
        
        {/* Section de titre "Claire" */}
        <div className="mb-10 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              Garages & Ateliers
            </h1>
            <p className="text-gray-500 font-medium text-lg">
               {filteredGarages.length} experts disponibles pour l'entretien de votre moto
            </p>
        </div>

        {/* Toolbar: Breadcrumbs & View Toggle */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-8 gap-4">
          <nav aria-label="Fil d'ariane" className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar mr-auto">
            <button className="flex items-center hover:text-primary-600 transition-colors flex-shrink-0" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900" aria-current="page">Garages</span>
          </nav>

          <div className="flex items-center gap-3 ml-auto">
             {/* Desktop View Switcher */}
             <div className="hidden md:flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  aria-label="Vue liste"
                >
                   <ListIcon size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  aria-label="Vue grille"
                >
                   <LayoutGrid size={20} />
                </button>
             </div>
             
             {/* Mobile Filter Trigger */}
             <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex-shrink-0 shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
             <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-none">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <Filter className="w-4 h-4 text-primary-600" />
                     FILTRER
                   </h3>
                   {hasActiveFilters && (
                     <button onClick={resetFilters} className="text-[10px] font-black text-primary-600 uppercase hover:underline">
                        Réinitialiser
                     </button>
                   )}
                </div>

                <div className="mb-6">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">RECHERCHE</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Nom, service..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold focus:bg-white focus:border-primary-600 outline-none transition-all shadow-none"
                      />
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                   </div>
                </div>

                <div className="mb-6">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">VILLE</label>
                   <div className="relative">
                      <select 
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:bg-white outline-none cursor-pointer"
                      >
                        <option value="">Toutes les villes</option>
                        {tunisianCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                   </div>
                </div>

                <div className="mb-6">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">SPÉCIALITÉ</label>
                   <div className="relative">
                      <select 
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:bg-white outline-none cursor-pointer"
                      >
                        <option value="">Toutes les spécialités</option>
                        {specialtiesList.map((spec) => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                   </div>
                </div>

                <div className="mb-8 pt-6 border-t border-gray-50">
                   <label className="flex items-center cursor-pointer group">
                      <div className="relative">
                         <input type="checkbox" checked={isVerifiedOnly} onChange={(e) => setIsVerifiedOnly(e.target.checked)} className="sr-only" />
                         <div className={`block w-12 h-7 rounded-full transition-colors ${isVerifiedOnly ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                         <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isVerifiedOnly ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <div className="ml-3 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                         Vérifiés uniquement
                      </div>
                   </label>
                </div>

                <AdBanner zone="garage_sidebar" variant="native" className="mt-6 shadow-none border border-gray-100" />
             </div>
          </aside>
          
          {/* MAIN LIST */}
          <main className="flex-1 w-full">
             
             {filteredGarages.length === 0 ? (
               <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 px-8 shadow-none animate-fade-in-up">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Wrench className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun garage trouvé</h3>
                  <p className="text-gray-500 mb-8">Nous n'avons trouvé aucun garage correspondant à vos critères.</p>
                  <button onClick={resetFilters} className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-primary-600 transition-colors">
                    <RotateCcw size={18} /> Réinitialiser
                  </button>
               </div>
             ) : (
               <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
                {filteredGarages.map((garage, index) => {
                  const isGrid = viewMode === 'grid';
                  const zone = garage.location || garage.address?.split(',').pop()?.trim() || "Tunisie";
                  
                  return (
                    <article 
                      key={garage.id}
                      onClick={() => handleGarageClick(garage.id)}
                      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer flex animate-fade-in-up relative ${isGrid ? 'flex-col h-full' : 'flex-col md:flex-row md:min-h-[220px] lg:h-64'}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image Section */}
                      <div className={`relative flex-shrink-0 bg-gray-100 overflow-hidden ${isGrid ? 'w-full aspect-[16/9]' : 'w-full md:w-72 lg:w-80 h-48 md:h-auto'}`}>
                        <img 
                          src={garage.image} 
                          alt={garage.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-3 right-3 z-10">
                            <div className="bg-white/90 backdrop-blur-md border border-gray-100 px-2 py-1 rounded-lg flex items-center gap-1 text-[11px] font-bold shadow-sm">
                               <Star size={12} className="text-warning-500 fill-warning-500" />
                               <span className="text-gray-900">{garage.rating}</span>
                            </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`p-6 flex-1 flex flex-col min-w-0 ${isGrid ? 'justify-between' : ''}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                              <h2 className={`font-black text-gray-900 group-hover:text-primary-600 transition-colors truncate tracking-tight ${isGrid ? 'text-lg' : 'text-xl'}`}>
                                  {garage.name}
                              </h2>
                              {garage.isVerified && (
                                  <CheckCircle2 size={16} className="text-primary-600 shrink-0" />
                              )}
                          </div>
                          
                          {garage.isVerified && (
                              <span className="text-[9px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-2 py-0.5 rounded border border-primary-100 inline-block mb-3">
                                  Certifié
                              </span>
                          )}

                          <p className={`text-gray-600 mb-4 line-clamp-2 leading-relaxed font-medium ${isGrid ? 'text-xs' : 'text-sm'}`}>
                            {garage.description}
                          </p>
                        </div>

                        {/* Metadata & Footer */}
                        <div className={`mt-auto flex flex-col gap-4 pt-4 border-t border-gray-50 ${!isGrid ? 'md:flex-row md:items-end md:justify-between' : ''}`}>
                            <div className="space-y-1.5 overflow-hidden">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
                                <span className="font-extrabold text-gray-900 truncate">{zone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-gray-300 shrink-0" />
                                <span className="truncate">{garage.hours}</span>
                              </div>
                            </div>

                            <div className={`flex gap-2 shrink-0 ${isGrid ? 'w-full' : 'w-full md:w-auto'}`}>
                                <button className={`flex-1 px-4 py-2.5 bg-gray-900 hover:bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-none flex items-center justify-center gap-2 active:scale-95 ${isGrid ? 'w-full' : 'md:px-6'}`}>
                                    <span>Voir détails</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
               </div>
             )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-white flex flex-col animate-fade-in-up" role="dialog">
           <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3">
                 <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full transition-colors"><X size={24} /></button>
                 <h3 className="font-black text-xl text-gray-900 tracking-tight">Filtres</h3>
              </div>
              <button onClick={resetFilters} className="text-[10px] font-black text-primary-600 uppercase">Réinitialiser</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">
              <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">RECHERCHE</label>
                 <div className="relative">
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Nom, service..." className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 text-base font-bold focus:bg-white focus:border-primary-600 outline-none" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                 </div>
              </div>

              <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">VILLE</label>
                 <div className="relative">
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-base text-gray-900 font-bold focus:bg-white">
                      <option value="">Toutes les villes</option>
                      {tunisianCities.map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                 </div>
              </div>

              <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">SPÉCIALITÉ</label>
                 <div className="relative">
                    <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-base text-gray-900 font-bold focus:bg-white">
                      <option value="">Toutes les spécialités</option>
                      {specialtiesList.map((spec) => <option key={spec} value={spec}>{spec}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                 </div>
              </div>

              <div className="pt-4">
                 <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 size={18} className="text-primary-600" />
                       Vérifiés uniquement
                    </span>
                    <div className="relative">
                       <input type="checkbox" checked={isVerifiedOnly} onChange={(e) => setIsVerifiedOnly(e.target.checked)} className="sr-only" />
                       <div className={`block w-12 h-7 rounded-full transition-colors ${isVerifiedOnly ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                       <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isVerifiedOnly ? 'transform translate-x-5' : ''}`}></div>
                    </div>
                 </label>
              </div>
           </div>

           <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-20 pb-8 md:pb-4 safe-area-bottom shadow-none">
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-gray-900 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-[0.98] uppercase tracking-widest">
                 Afficher {filteredGarages.length} résultats
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default Garages;