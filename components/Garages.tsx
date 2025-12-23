import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  List as ListIcon,
  ShieldCheck,
  Check,
  ThumbsUp,
  ArrowUpDown,
  Navigation
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

type SortOption = 'default' | 'rating' | 'name' | 'proximity';

// --- UTILS ---
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10;
};

const Garages: React.FC<GaragesProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  // UI States
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Proximity State
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'denied' | 'error'>('idle');

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // --- LOCATION DETECTION (MANUAL TRIGGER) ---
  const handleLocationDetect = () => {
    if (!navigator.geolocation) return;
    
    setLocationStatus('loading');
    
    const geoOptions = {
      enableHighAccuracy: false, // Plus stable
      timeout: 10000, 
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationStatus('success');
        setSortBy('proximity'); 
      },
      (error) => {
        console.warn("Géolocalisation Garages ignorée:", error.message || "Erreur inconnue");
        setLocationStatus(error.code === 1 ? 'denied' : 'error');
      },
      geoOptions
    );
  };

  // Handle outside clicks for sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // --- COMPUTED DATA ---
  const garagesWithDistance = useMemo(() => {
    return mockGarages.map(garage => {
      let distance = null;
      if (userLocation && garage.coordinates) {
        distance = calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          garage.coordinates.lat, 
          garage.coordinates.lng
        );
      }
      return { ...garage, distance };
    });
  }, [userLocation]);

  const filteredAndSortedGarages = useMemo(() => {
    return garagesWithDistance.filter(garage => {
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
    }).sort((a, b) => {
      if (sortBy === 'proximity' && a.distance !== null && b.distance !== null) return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [garagesWithDistance, searchQuery, selectedCity, selectedSpecialty, isVerifiedOnly, sortBy]);

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedSpecialty("");
    setIsVerifiedOnly(false);
    setSortBy(userLocation ? 'proximity' : 'default');
  };

  const hasActiveFilters = searchQuery || selectedCity || selectedSpecialty || isVerifiedOnly || (sortBy !== 'default' && sortBy !== 'proximity');

  const sortLabels: Record<SortOption, string> = {
    default: 'Par défaut',
    rating: 'Mieux notés',
    name: 'Nom (A-Z)',
    proximity: 'Plus proches'
  };

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
        
        {/* Section de titre */}
        <div className="mb-10 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              Garages & Ateliers
            </h1>
            <p className="text-gray-500 font-medium text-lg">
               {filteredAndSortedGarages.length} experts disponibles pour l'entretien de votre moto
            </p>
        </div>

        {/* Toolbar: Breadcrumbs, Sort & View Toggle */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-8 gap-4">
          <nav aria-label="Fil d'ariane" className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar mr-auto">
            <button className="flex items-center hover:text-primary-600 transition-colors flex-shrink-0" onClick={onGoHome}>
              <div className="flex items-center">
                 <Home className="w-4 h-4 mr-1" />
                 <span>Accueil</span>
              </div>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900" aria-current="page">Garages</span>
          </nav>

          <div className="flex items-center gap-3 ml-auto relative" ref={sortDropdownRef}>
             {/* Sort Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className={`flex items-center gap-3 px-4 h-11 rounded-xl border transition-all text-sm font-bold shadow-sm active:scale-95 ${isSortDropdownOpen ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                >
                   {sortBy === 'proximity' ? <Navigation size={16} className="text-primary-600" /> : <ArrowUpDown size={16} className={sortBy !== 'default' ? 'text-primary-600' : 'text-gray-400'} />}
                   <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
                   <ChevronDown size={14} className={`transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-scale-in origin-top-right overflow-hidden">
                     {(['default', 'proximity', 'rating', 'name'] as SortOption[]).map((option) => {
                        // Cacher Proximité si la géo est refusée ou erreur
                        if (option === 'proximity' && !userLocation) return null;
                        
                        return (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between transition-colors ${sortBy === option ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                             <div className="flex items-center gap-2">
                                {option === 'proximity' && <Navigation size={14} />}
                                {sortLabels[option]}
                             </div>
                             {sortBy === option && <Check size={14} strokeWidth={3} />}
                          </button>
                        );
                     })}
                  </div>
                )}
             </div>

             {/* Desktop View Switcher */}
             <div className="hidden md:flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm h-11">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`h-full px-3 rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  aria-label="Vue liste"
                >
                   <ListIcon size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`h-full px-3 rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  aria-label="Vue grille"
                >
                   <LayoutGrid size={20} />
                </button>
             </div>
             
             {/* Mobile Filter Trigger */}
             <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center justify-center w-11 h-11 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex-shrink-0 shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
             <div className="bg-white rounded-2xl border border-gray-200 sticky top-24 shadow-sm overflow-hidden">
                <div className="bg-gray-50/80 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                   <h3 className="font-black text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
                     <Filter className="w-4 h-4 text-primary-600" />
                     FILTRER
                   </h3>
                   {hasActiveFilters && (
                     <button onClick={resetFilters} className="text-[10px] font-black text-primary-600 uppercase hover:underline">
                        Réinitialiser
                     </button>
                   )}
                </div>

                <div className="p-6 space-y-6">
                   {/* SMART PROXIMITY TRIGGER BUTTON (Option Intent) */}
                   {locationStatus === 'idle' && (
                     <button 
                        onClick={handleLocationDetect}
                        className="w-full p-4 bg-primary-50 rounded-xl border border-primary-200 flex items-center gap-3 group hover:bg-primary-100 transition-all shadow-glow-primary/5 active:scale-[0.98]"
                     >
                        <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                           <MapPin size={16} />
                        </div>
                        <div className="text-left">
                           <span className="block text-[10px] font-black text-primary-700 uppercase tracking-tight leading-none mb-1">À proximité ?</span>
                           <span className="block text-[9px] font-bold text-primary-600 uppercase">Activer la localisation</span>
                        </div>
                     </button>
                   )}

                   {locationStatus === 'loading' && (
                     <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-center gap-3 animate-pulse">
                        <Navigation className="w-4 h-4 text-primary-600" />
                        <span className="text-[10px] font-black text-primary-700 uppercase tracking-tight">Détection en cours...</span>
                     </div>
                   )}

                   {locationStatus === 'success' && (
                     <div className="p-4 bg-success-50 rounded-xl border border-success-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-success-500 flex items-center justify-center text-white shadow-sm">
                           <CheckCircle2 size={16} />
                        </div>
                        <div>
                           <span className="block text-[10px] font-black text-success-700 uppercase tracking-tight leading-none mb-1">Position activée</span>
                           <span className="block text-[9px] font-bold text-success-600 uppercase">Garages à proximité affichés</span>
                        </div>
                     </div>
                   )}

                   {locationStatus === 'denied' || locationStatus === 'error' && (
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                        <Navigation className="w-4 h-4 text-gray-400" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">Position indisponible</span>
                     </div>
                   )}

                   <div>
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

                   <div>
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

                   <div>
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

                   <div className="pt-6 border-t border-gray-50">
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

                   <AdBanner 
                     zone="garage_sidebar" 
                     variant="banner" 
                     className="mt-6 rounded-2xl border border-gray-100 shadow-none overflow-hidden aspect-square" 
                   />
                </div>
             </div>
          </aside>
          
          {/* MAIN LIST */}
          <main className="flex-1 w-full">
             
             {filteredAndSortedGarages.length === 0 ? (
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
                {filteredAndSortedGarages.map((garage, index) => {
                  const isGrid = viewMode === 'grid';
                  const isCertified = garage.isVerified;
                  const zone = garage.location || garage.address?.split(',').pop()?.trim() || "Tunisie";
                  const isNear = garage.distance !== null && garage.distance <= 10;
                  
                  return (
                    <article 
                      key={garage.id}
                      onClick={() => handleGarageClick(garage.id)}
                      className={`group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex animate-fade-in-up relative 
                        ${isGrid ? 'flex-col h-full' : 'flex-col md:flex-row md:min-h-[220px] lg:h-64'}
                        ${isCertified 
                          ? 'bg-primary-50/30 border-2 border-primary-500 shadow-sm hover:shadow-md hover:shadow-primary-500/5' 
                          : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
                        }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* PROXIMITY BADGE */}
                      {garage.distance !== null && (
                         <div className={`absolute left-0 top-0 z-20 px-3 py-1.5 rounded-br-2xl border-b border-r flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tight shadow-sm ${isNear ? 'bg-primary-600 text-white border-primary-500' : 'bg-white text-gray-600 border-gray-100'}`}>
                            <Navigation size={12} className={isNear ? 'text-white' : 'text-primary-500'} fill={isNear ? 'currentColor' : 'none'} />
                            <span>À {garage.distance} km</span>
                         </div>
                      )}

                      {/* FLAT RATING BADGE */}
                      <div className="absolute top-0 right-0 z-20">
                          <div className={`px-3 py-1.5 rounded-bl-2xl flex items-center gap-1.5 text-[11px] font-black text-gray-900 shadow-none border-b border-l ${isCertified ? 'bg-primary-500 text-white border-primary-400' : 'bg-white border-gray-50'}`}>
                             <Star size={13} className={`${isCertified ? 'text-white fill-white' : 'text-warning-500 fill-warning-500'}`} />
                             <span>{garage.rating}</span>
                          </div>
                      </div>

                      {/* Image Section */}
                      <div className={`relative flex-shrink-0 bg-gray-100 overflow-hidden ${isGrid ? 'w-full aspect-[16/9]' : 'w-full md:w-72 lg:w-80 h-48 md:h-auto'}`}>
                        <img 
                          src={garage.image} 
                          alt={garage.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>

                      {/* Content Section */}
                      <div className={`p-6 flex-1 flex flex-col min-w-0 ${isGrid ? 'justify-between' : ''}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                              <h2 className={`font-black text-gray-900 group-hover:text-primary-600 transition-colors truncate tracking-tight ${isGrid ? 'text-lg' : 'text-xl'}`}>
                                  {garage.name}
                              </h2>
                              {garage.isVerified && (
                                  <div className="flex items-center gap-2 shrink-0">
                                     <ShieldCheck size={18} className="text-success-600" />
                                     <span className="text-[9px] font-black uppercase tracking-widest text-success-700 bg-success-50 px-2 py-0.5 rounded border border-success-100 inline-flex items-center gap-1.5 shadow-xs">
                                         <div className="bg-success-600 text-white p-0.5 rounded-full flex items-center justify-center">
                                            <Check size={8} strokeWidth={4} />
                                         </div>
                                         RECOMMANDÉ
                                     </span>
                                  </div>
                              )}
                          </div>
                          
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
                                <button className={`flex-1 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-none flex items-center justify-center gap-2 active:scale-95 ${isGrid ? 'w-full' : 'md:px-8'}`}>
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
                 <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full transition-all"><X size={24} /></button>
                 <h3 className="font-black text-xl text-gray-900 tracking-tight">Filtres</h3>
              </div>
              <button onClick={resetFilters} className="text-[10px] font-black text-primary-600 uppercase">Réinitialiser</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">
              
              {/* MOBILE GEOLOCATION TRIGGER */}
              <div className="p-4 bg-primary-50 rounded-2xl border border-primary-200">
                <button 
                    onClick={() => { handleLocationDetect(); setIsMobileFilterOpen(false); }}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <Navigation size={20} className="text-primary-600" />
                        <span className="text-base font-bold text-primary-900">Garages autour de moi</span>
                    </div>
                    <ChevronRight size={20} className="text-primary-400" />
                </button>
              </div>

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
                       <ShieldCheck size={18} className="text-success-600" />
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
                 Afficher {filteredAndSortedGarages.length} résultats
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default Garages;