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
  X
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
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    // Text Search
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      garage.name.toLowerCase().includes(query) ||
      garage.description?.toLowerCase().includes(query);

    // City Filter
    const matchesCity = selectedCity 
      ? (garage.address?.includes(selectedCity) || garage.location?.includes(selectedCity))
      : true;

    // Specialty Filter
    const matchesSpecialty = selectedSpecialty
      ? (garage.specialties?.includes(selectedSpecialty) || garage.specialty === selectedSpecialty)
      : true;

    // Verified Filter
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
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[35vh] md:h-[30vh] lg:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
        {/* Background Container */}
        <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
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
          showMobileFilter={false}
          onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
          isLoggedIn={isLoggedIn}
          onTriggerLogin={onTriggerLogin}
          onLogout={onLogout}
        />

        {/* Hero Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto h-full pt-20">
          <div className="text-center px-4 md:mt-32">
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Garages & Ateliers
            </h1>
            <p className="text-white text-lg md:text-xl font-normal max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              De Tunis à Tataouine, trouvez des garages près de chez vous <br/> en un clic.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        
        {/* Breadcrumbs & Mobile Filter Button */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <nav aria-label="Fil d'ariane" className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar">
            <button className="flex items-center hover:text-primary-600 cursor-pointer transition-colors flex-shrink-0 focus:outline-none focus:underline" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" aria-hidden="true" />
            <span className="font-semibold text-gray-900 flex-shrink-0" aria-current="page">Garages & Ateliers</span>
          </nav>

          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex-shrink-0 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Ouvrir les filtres"
          >
            <Filter className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: SIDEBAR FILTERS (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0" aria-label="Filtres de recherche">
             <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
                
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                     <Filter className="w-5 h-5 text-primary-600" aria-hidden="true" />
                     FILTRER
                   </h3>
                   {hasActiveFilters && (
                     <button onClick={resetFilters} className="text-xs font-bold text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1 uppercase">
                        Réinitialiser
                     </button>
                   )}
                </div>

                {/* Search Input */}
                <div className="mb-6">
                   <label htmlFor="desktop-search" className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">RECHERCHE</label>
                   <div className="relative">
                      <input 
                        id="desktop-search"
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Nom, service..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                      />
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
                   </div>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                   <label htmlFor="desktop-city" className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">VILLE / RÉGION</label>
                   <div className="relative">
                      <select 
                        id="desktop-city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 cursor-pointer"
                      >
                        <option value="">Toutes les villes</option>
                        {tunisianCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                   </div>
                </div>

                {/* Specialty Filter */}
                <div className="mb-6">
                   <label htmlFor="desktop-specialty" className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">SPÉCIALITÉ</label>
                   <div className="relative">
                      <select 
                        id="desktop-specialty"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 cursor-pointer"
                      >
                        <option value="">Toutes les spécialités</option>
                        {specialtiesList.map((spec) => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                   </div>
                </div>

                {/* Verified Toggle */}
                <div className="mb-8 pt-6 border-t border-gray-100">
                   <label className="flex items-center cursor-pointer group">
                      <div className="relative">
                         <input 
                           type="checkbox" 
                           checked={isVerifiedOnly}
                           onChange={(e) => setIsVerifiedOnly(e.target.checked)}
                           className="sr-only"
                         />
                         <div className={`block w-12 h-7 rounded-full transition-colors ${isVerifiedOnly ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                         <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isVerifiedOnly ? 'transform translate-x-5' : ''}`}></div>
                      </div>
                      <div className="ml-3 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                         Vérifiés uniquement
                      </div>
                   </label>
                </div>

                {/* Sidebar Ad Insertion */}
                <AdBanner zone="garage_sidebar" variant="native" className="mt-6" />

             </div>
          </aside>
          
          {/* RIGHT COLUMN: CARDS LIST */}
          <main className="flex-1">
             
             {/* Vertical List of Horizontal Cards */}
             <div className="flex flex-col gap-6">
              {filteredGarages.map((garage, index) => {
                // Get only city/zone for the list card
                const zone = garage.location || garage.address?.split(',').pop()?.trim() || "Tunisie";
                
                return (
                <article 
                  key={garage.id}
                  onClick={() => handleGarageClick(garage.id)}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row md:h-72 lg:h-64 animate-fade-in-up cursor-pointer relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image - Left on Desktop (Takes full card height, fixed width) */}
                  <div className="relative w-full md:w-72 lg:w-80 h-48 md:h-auto self-stretch flex-shrink-0 bg-gray-100 overflow-hidden">
                    <img 
                      src={garage.image} 
                      alt={`Photo de ${garage.name}`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Ratings Badge - Repositioned to TOP RIGHT with Flat style */}
                  <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white border border-gray-200 px-2 py-1 rounded-lg flex items-center gap-1 text-[11px] font-bold">
                         <Star size={12} className="text-warning-500 fill-warning-500" aria-hidden="true" />
                         <span className="text-gray-900" aria-label={`Note de ${garage.rating} sur 5`}>{garage.rating}</span>
                         <span className="text-gray-400 font-medium">({garage.reviewsCount})</span>
                      </div>
                  </div>

                  {/* Body - Right on Desktop */}
                  <div className="p-6 flex-1 flex flex-col min-w-0">
                    
                    {/* Header: Title & Verified */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-black text-gray-900 group-hover:text-primary-600 transition-colors pr-16 md:pr-0 truncate">
                                {garage.name}
                            </h2>
                            {garage.isVerified && (
                                <CheckCircle2 size={18} className="text-primary-600 fill-primary-50 shrink-0" aria-label="Vérifié" />
                            )}
                        </div>
                        {garage.isVerified && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100 inline-block">
                                Garage Certifié
                            </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {garage.description}
                    </p>

                    {/* Footer Row: Info & Buttons */}
                    <div className="mt-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4 border-t border-gray-50">
                        {/* Info List - Only City/Zone */}
                        <div className="space-y-1.5 overflow-hidden">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary-500 shrink-0" aria-hidden="true" />
                            <span className="font-bold text-gray-900 truncate">{zone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
                            <span className="truncate font-medium">{garage.hours}</span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 w-full md:w-auto shrink-0">
                            <button className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 hover:border-primary-600 text-gray-700 hover:text-primary-600 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <Phone size={14} aria-hidden="true" />
                                <span className="md:hidden lg:inline">Appeler</span>
                            </button>
                            <button className="flex-1 md:flex-none px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <span>Voir détails</span>
                                <ArrowRight size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                  </div>
                </article>
              );})}

              {/* Empty State */}
              {filteredGarages.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 px-8 shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Wrench className="w-10 h-10 text-gray-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun garage trouvé</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">Nous n'avons trouvé aucun garage correspondant à vos critères. Essayez de modifier vos filtres.</p>
                  <button 
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <RotateCcw size={18} aria-hidden="true" />
                    Réinitialiser la recherche
                  </button>
                </div>
              )}
             </div>
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 z-[60] lg:hidden bg-white flex flex-col animate-fade-in-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
           {/* Header */}
           <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Fermer les filtres"
                 >
                    <X className="w-6 h-6" aria-hidden="true" />
                 </button>
                 <h3 id="mobile-filter-title" className="font-bold text-xl text-gray-900">FILTRES</h3>
              </div>
              <button 
                onClick={resetFilters}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 px-2 py-1 focus:outline-none focus:underline uppercase"
              >
                 Réinitialiser
              </button>
           </div>

           {/* Scrollable Body */}
           <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">
              
              {/* Search */}
              <div>
                 <label htmlFor="mobile-search" className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">RECHERCHE</label>
                 <div className="relative">
                    <input 
                      id="mobile-search"
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Nom du garage, service..."
                      className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 text-base focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                 </div>
              </div>

              <hr className="border-gray-100" />

              {/* City */}
              <div>
                 <label htmlFor="mobile-city" className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">VILLE / RÉGION</label>
                 <div className="relative">
                    <select 
                      id="mobile-city"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 font-medium focus:bg-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    >
                      <option value="">Toutes les villes</option>
                      {tunisianCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" aria-hidden="true" />
                 </div>
              </div>

              {/* Specialty */}
              <div>
                 <label htmlFor="mobile-specialty" className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">SPÉCIALITÉ</label>
                 <div className="relative">
                    <select 
                      id="mobile-specialty"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 font-medium focus:bg-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    >
                      <option value="">Toutes les spécialités</option>
                      {specialtiesList.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" aria-hidden="true" />
                 </div>
              </div>

              <hr className="border-gray-100" />

              {/* Verified Toggle */}
              <div>
                 <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 active:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 size={18} className="text-primary-600" aria-hidden="true" />
                       Vérifiés uniquement
                    </span>
                    <div className="relative">
                       <input 
                         type="checkbox" 
                         checked={isVerifiedOnly}
                         onChange={(e) => setIsVerifiedOnly(e.target.checked)}
                         className="sr-only"
                       />
                       <div className={`block w-12 h-7 rounded-full transition-colors ${isVerifiedOnly ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                       <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${isVerifiedOnly ? 'transform translate-x-5' : ''}`}></div>
                    </div>
                 </label>
              </div>

           </div>

           {/* Sticky Footer Action */}
           <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-20 pb-8 md:pb-4 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg active:scale-[0.98] transition-transform focus:outline-none focus:ring-4 focus:ring-primary-500/30"
              >
                 Afficher {filteredGarages.length} garage{filteredGarages.length > 1 ? 's' : ''}
              </button>
           </div>

        </div>
      )}

    </div>
  );
};

export default Garages;