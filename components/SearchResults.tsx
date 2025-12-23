import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Heart, 
  Phone, 
  MapPin, 
  Calendar, 
  Gauge, 
  Info, 
  ChevronDown,
  X,
  Home,
  ChevronRight,
  Search,
  Filter,
  ShieldCheck,
  LayoutGrid,
  List as ListIcon,
  User,
  Zap,
  ArrowUpDown,
  Check,
  Shield,
  BadgeCheck,
  ArrowRight,
  Building2,
  Navigation,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { mockListings, mockModels, brandsMoto } from '../data/mockData';
import Header from './layout/Header';
import { useFavorites } from '../context/FavoritesContext';
import AdBanner from './common/AdBanner';

interface SearchResultsProps {
  initialFilters?: any;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

type SortOption = 'recent' | 'price_asc' | 'price_desc' | 'year_desc' | 'km_asc' | 'proximity';

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

const DualRangeSlider = ({ 
  label, 
  min, 
  max, 
  valueMin,
  valueMax,
  step = 1, 
  unit = '',
  onChange
}: { 
  label: string; 
  min: number; 
  max: number; 
  valueMin?: number;
  valueMax?: number; 
  step?: number; 
  unit?: string;
  onChange?: (min: number, max: number) => void;
}) => {
  const [minVal, setMinVal] = useState(valueMin ?? min);
  const [maxVal, setMaxVal] = useState(valueMax ?? max);
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valueMin !== undefined) setMinVal(valueMin);
  }, [valueMin]);

  useEffect(() => {
    if (valueMax !== undefined) setMaxVal(valueMax);
  }, [valueMax]);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange) onChange(minVal, maxVal);
    }, 300);
    return () => clearTimeout(handler);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <label className="text-base font-bold text-gray-900">{label}</label>
      </div>
      
      <div className="relative w-full h-10 flex items-center mb-4 touch-none">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - step);
            setMinVal(value);
          }}
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full bg-transparent 
            [&::-webkit-slider-thumb]:pointer-events-auto 
            [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-primary-600 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white 
            [&::-webkit-slider-thumb]:shadow-md 
            [&::-webkit-slider-thumb]:cursor-pointer"
          style={{ zIndex: minVal > min + (max - min) / 2 ? 50 : 20 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + step);
            setMaxVal(value);
          }}
          className="absolute pointer-events-none appearance-none z-30 h-2 w-full bg-transparent 
            [&::-webkit-slider-thumb]:pointer-events-auto 
            [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-primary-600 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white 
            [&::-webkit-slider-thumb]:shadow-md 
            [&::-webkit-slider-thumb]:cursor-pointer"
        />

        <div className="relative w-full h-2 bg-gray-200 rounded-full z-10 pointer-events-none">
          <div
            ref={range}
            className="absolute z-10 h-2 bg-primary-600 rounded-full"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="number"
              value={minVal}
              readOnly
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 text-center shadow-none outline-none"
            />
            {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">{unit}</span>}
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <input
              type="number"
              value={maxVal}
              readOnly
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 text-center shadow-none outline-none"
            />
            {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">{unit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({ initialFilters, onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  
  // Proximity State
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'denied' | 'error'>('idle');

  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    brand: '',
    model: '', 
    location: '',
    onlyPro: false,
    minYear: 2000,
    maxYear: 2026,
    minKm: 0,
    maxKm: 300000,
    minPrice: 0,
    maxPrice: 200000,
    minCC: 50,
    maxCC: 1650
  });

  useEffect(() => {
    if (initialFilters) {
      setFilters(prev => ({
        ...prev,
        ...initialFilters
      }));
      // Si la recherche initiale vient du hero avec "Ma position", on lance la détection
      if (initialFilters.aroundMe) {
        handleLocationDetect();
      }
    }
  }, [initialFilters]);

  // --- LOCATION DETECTION ---
  const handleLocationDetect = () => {
    if (!navigator.geolocation) return;
    
    setLocationStatus('loading');
    
    const geoOptions = {
      enableHighAccuracy: false,
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
        console.warn("Géolocalisation ignorée:", error.message || "Erreur inconnue");
        setLocationStatus(error.code === 1 ? 'denied' : 'error');
      },
      geoOptions
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // --- COMPUTED DATA WITH DISTANCE ---
  const listingsWithDistance = useMemo(() => {
    return mockListings.map(listing => {
        let distance = null;
        if (userLocation) {
            // Simulation : les coordonnées dépendent de l'ID pour avoir des distances variées
            const simLat = 36.8 + (listing.id % 15) * 0.05;
            const simLng = 10.1 + (listing.id % 15) * 0.05;
            distance = calculateDistance(userLocation.lat, userLocation.lng, simLat, simLng);
        }
        return { ...listing, distance };
    });
  }, [userLocation]);

  const filteredAndSortedListings = useMemo(() => {
    return listingsWithDistance.filter(listing => {
      if (filters.search && !listing.title.toLowerCase().includes(filters.search.toLowerCase()) && !listing.location.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.type && filters.type !== 'Tous les types' && listing.type !== filters.type) return false;
      if (filters.brand && filters.brand !== 'Toutes les marques' && !listing.title.toLowerCase().includes(filters.brand.toLowerCase())) return false;
      if (filters.model && filters.model !== 'Tous les modèles' && !listing.title.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.location && filters.location !== 'Toutes les régions' && filters.location !== 'Toute la Tunisie' && !listing.location.includes(filters.location)) return false;
      
      if (filters.onlyPro && listing.sellerType !== 'Pro') return false;

      const price = parseInt(listing.price.replace(/\D/g, ''));
      if (price < filters.minPrice || price > filters.maxPrice) return false;

      if (listing.type !== 'Accessoires') {
          const year = parseInt(listing.year);
          if (year < filters.minYear || year > filters.maxYear) return false;
          const km = parseInt(listing.mileage.replace(/\D/g, ''));
          if (km < filters.minKm || km > filters.maxKm) return false;
          const cc = parseInt(listing.cc.replace(/\D/g, ''));
          if (cc < filters.minCC || cc > filters.maxCC) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'proximity' && a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
      }

      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      
      switch (sortBy) {
        case 'price_asc': return priceA - priceB;
        case 'price_desc': return priceB - priceA;
        case 'year_desc': return parseInt(b.year) - parseInt(a.year);
        case 'km_asc': 
          const kmA = parseInt(a.mileage.replace(/\D/g, '')) || 0;
          const kmB = parseInt(b.mileage.replace(/\D/g, '')) || 0;
          return kmA - kmB;
        case 'recent':
        default:
          return b.id - a.id;
      }
    });
  }, [listingsWithDistance, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      brand: '',
      model: '',
      location: '',
      onlyPro: false,
      minYear: 2000,
      maxYear: 2026,
      minKm: 0,
      maxKm: 300000,
      minPrice: 0,
      maxPrice: 200000,
      minCC: 50,
      maxCC: 1650
    });
    setSortBy(userLocation ? 'proximity' : 'recent');
  };

  const handleCardClick = (listingId: number) => {
    onNavigate?.('listing-details', { id: listingId });
  };

  const handleFavoriteClick = (e: React.MouseEvent, listingId: number) => {
    e.stopPropagation();
    if (isLoggedIn) {
      toggleFavorite('listing', listingId);
    } else {
      if (onTriggerLogin) onTriggerLogin();
    }
  };

  const getDealInfo = (rating?: number) => {
      switch (rating) {
          case 3: return { label: 'Plus récentes', color: 'bg-success-500', textColor: 'text-success-600', bgColor: 'bg-success-50' };
          case 2: return { label: 'Bonne affaire', color: 'bg-primary-500', textColor: 'text-primary-600', bgColor: 'bg-primary-50' };
          case 1: 
          default: return { label: 'Prix du marché', color: 'bg-gray-400', textColor: 'text-gray-500', bgColor: 'bg-gray-50' };
      }
  };

  const sortLabels: Record<SortOption, string> = {
    recent: 'Plus récentes',
    proximity: 'Plus proches',
    price_asc: 'Prix : Croissant',
    price_desc: 'Prix : Décroissant',
    year_desc: 'Année : Récente',
    km_asc: 'Kilométrage : Bas'
  };

  const SHOW_IN_FEED_AD = true;
  const isAccessory = filters.type === 'Accessoires';

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
        
        <div className="mb-10 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              Résultats de recherche
            </h1>
            <p className="text-gray-500 font-medium text-lg">
               {filteredAndSortedListings.length} annonces disponibles correspondant à vos critères
            </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-8 gap-4">
          <nav aria-label="Fil d'ariane" className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar mr-auto">
            <button className="flex items-center hover:text-primary-600 transition-colors flex-shrink-0 focus:outline-none focus:underline" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" aria-hidden="true" />
            <span className="font-semibold text-gray-900 flex-shrink-0" aria-current="page">Annonces</span>
          </nav>

          <div className="flex items-center gap-3 ml-auto relative" ref={sortDropdownRef}>
             {/* Sort Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className={`flex items-center gap-3 px-4 h-11 rounded-xl border transition-all text-sm font-bold shadow-sm active:scale-95 ${isSortDropdownOpen ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                >
                   {sortBy === 'proximity' ? <Navigation size={16} className="text-primary-600" /> : <ArrowUpDown size={16} className={sortBy !== 'recent' ? 'text-primary-600' : 'text-gray-400'} />}
                   <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
                   <ChevronDown size={14} className={`transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-scale-in origin-top-right overflow-hidden">
                     {(['recent', 'proximity', 'price_asc', 'price_desc', 'year_desc', 'km_asc'] as SortOption[]).map((option) => {
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

             {/* View Toggle */}
             <div className="hidden md:flex bg-white rounded-xl border border-gray-100 p-1 shadow-sm h-11">
                <button onClick={() => setViewMode('list')} className={`px-3 h-full rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                   <ListIcon size={20} />
                </button>
                <button onClick={() => setViewMode('grid')} className={`px-3 h-full rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                   <LayoutGrid size={20} />
                </button>
             </div>
             
             {/* Mobile Filter Trigger */}
             <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center justify-center w-11 h-11 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex-shrink-0 shadow-sm">
                <Filter className="w-5 h-5" aria-hidden="true" />
              </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
            <div className="flex flex-col gap-6 sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-none overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Filter className="w-4 h-4 text-primary-600" />
                      Filtrer
                  </h3>
                  <button onClick={resetFilters} className="text-[10px] font-black text-primary-600 uppercase hover:underline">Réinitialiser</button>
                </div>

                {/* SMART PROXIMITY TRIGGER BUTTON - Identique à Garages.tsx */}
                <div className="mb-6">
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
                        <span className="text-[10px] font-black text-primary-700 uppercase tracking-tight">Détection...</span>
                     </div>
                   )}

                   {locationStatus === 'success' && (
                     <div className="p-4 bg-success-50 rounded-xl border border-success-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-success-500 flex items-center justify-center text-white shadow-sm">
                           <CheckCircle2 size={16} />
                        </div>
                        <div>
                           <span className="block text-[10px] font-black text-success-700 uppercase tracking-tight leading-none mb-1">Position active</span>
                           <span className="block text-[9px] font-bold text-success-600 uppercase">Trié par distance</span>
                        </div>
                     </div>
                   )}

                   {(locationStatus === 'denied' || locationStatus === 'error') && (
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                        <Navigation className="w-4 h-4 text-gray-400" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">Position indisponible</span>
                     </div>
                   )}
                </div>

                {/* FEATURE TOGGLE - Vendeur Pro */}
                <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-primary-200">
                   <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${filters.onlyPro ? 'bg-primary-600 text-white' : 'bg-white text-gray-400 border border-gray-100 shadow-xs'}`}>
                            <Building2 size={16} />
                         </div>
                         <span className={`text-xs font-black uppercase tracking-tight transition-colors ${filters.onlyPro ? 'text-primary-700' : 'text-gray-500'}`}>
                            Vendeur Pro
                         </span>
                      </div>
                      <div className="relative">
                         <input 
                           type="checkbox" 
                           checked={filters.onlyPro} 
                           onChange={(e) => handleFilterChange('onlyPro', e.target.checked)}
                           className="sr-only" 
                         />
                         <div className={`w-10 h-6 rounded-full transition-colors ${filters.onlyPro ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                         <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${filters.onlyPro ? 'translate-x-4' : ''}`}></div>
                      </div>
                   </label>
                </div>

                <div className="mb-6">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Recherche</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        placeholder="Modèle, mot-clé..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold focus:bg-white focus:border-primary-600 outline-none transition-all shadow-none"
                      />
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                   </div>
                </div>

                <div className="mb-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Type</label>
                  <div className="relative">
                    <select 
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:bg-white focus:border-primary-600 outline-none cursor-pointer shadow-none"
                    >
                      <option>Tous les types</option>
                      <option>Moto</option>
                      <option>Scooter</option>
                      <option>Accessoires</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Marque</label>
                  <div className="relative">
                    <select 
                      value={filters.brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:bg-white focus:border-primary-600 outline-none cursor-pointer shadow-none"
                    >
                      <option>Toutes les marques</option>
                      {brandsMoto.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Modèle</label>
                  <div className="relative">
                    <select 
                      value={filters.model}
                      onChange={(e) => handleFilterChange('model', e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:bg-white focus:border-primary-600 outline-none cursor-pointer shadow-none"
                    >
                      <option>Tous les modèles</option>
                      {mockModels.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Localisation</label>
                  <div className="relative">
                    <select 
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:bg-white focus:border-primary-600 outline-none cursor-pointer shadow-none"
                    >
                      <option>Toutes les régions</option>
                      <option>Tunis</option>
                      <option>Sousse</option>
                      <option>Sfax</option>
                      <option>Nabeul</option>
                      <option>Bizerte</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                {!isAccessory && (
                  <>
                    <DualRangeSlider 
                      label="Année" 
                      min={2000} 
                      max={2026} 
                      valueMin={filters.minYear}
                      valueMax={filters.maxYear}
                      onChange={(min, max) => { handleFilterChange('minYear', min); handleFilterChange('maxYear', max); }}
                    />
                    <DualRangeSlider 
                      label="Kilométrage" 
                      min={0} 
                      max={300000} 
                      step={1000} 
                      unit="km" 
                      valueMin={filters.minKm}
                      valueMax={filters.maxKm}
                      onChange={(min, max) => { handleFilterChange('minKm', min); handleFilterChange('maxKm', max); }}
                    />
                    <DualRangeSlider 
                      label="Cylindrée" 
                      min={50} 
                      max={1650} 
                      step={50} 
                      unit="cc" 
                      valueMin={filters.minCC}
                      valueMax={filters.maxCC}
                      onChange={(min, max) => { handleFilterChange('minCC', min); handleFilterChange('maxCC', max); }}
                    />
                  </>
                )}
                
                <DualRangeSlider 
                  label="Prix" 
                  min={0} 
                  max={200000} 
                  step={100} 
                  unit="DT" 
                  valueMin={filters.minPrice}
                  valueMax={filters.maxPrice}
                  onChange={(min, max) => { handleFilterChange('minPrice', min); handleFilterChange('maxPrice', max); }}
                />

              </div>

              <AdBanner 
                zone="search_sidebar" 
                variant="banner" 
                className="w-full aspect-square shadow-none border border-gray-100 rounded-2xl" 
              />
            </div>
          </aside>

          <main className="flex-1 w-full">
            
            {filteredAndSortedListings.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 text-center shadow-none animate-fade-in-up">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                     <Search className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat</h3>
                  <p className="text-gray-500 mb-6">Essayez de modifier vos filtres de recherche.</p>
                  <button onClick={resetFilters} className="px-6 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-primary-600 transition-colors">
                     Réinitialiser les filtres
                  </button>
               </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-col gap-6'}>
                {filteredAndSortedListings.map((listing, index) => {
                   const isGrid = viewMode === 'grid';
                   const favorited = isFavorite('listing', listing.id);
                   const isItemAccessory = listing.type === 'Accessoires';
                   const dealInfo = getDealInfo(listing.dealRating);
                   const isPro = listing.sellerType === 'Pro';
                   const isNear = listing.distance !== null && listing.distance <= 10;
                   
                   return (
                  <React.Fragment key={listing.id}>
                      <article 
                        onClick={() => handleCardClick(listing.id)}
                        className={`group rounded-2xl overflow-hidden transition-all duration-300 border cursor-pointer flex animate-fade-in-up relative 
                          ${isGrid ? 'flex-col h-full' : 'flex-col md:flex-col lg:flex-row lg:rounded-xl md:min-h-0 lg:min-h-[220px] lg:max-h-[260px]'}
                          ${isPro 
                            ? 'bg-primary-50/30 border-primary-200 shadow-md hover:shadow-lg hover:shadow-primary-100/20' 
                            : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                          }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                      
                      <div className={`relative flex-shrink-0 bg-gray-100 overflow-hidden ${isGrid ? 'w-full aspect-[4/3]' : 'w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[4/3] lg:w-72'}`}>
                          <img 
                            src={listing.image} 
                            alt={listing.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                          />
                          
                          {/* PROXIMITY BADGE */}
                          {listing.distance !== null && (
                            <div className={`absolute left-0 top-0 z-20 px-3 py-1.5 rounded-br-2xl border-b border-r flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tight shadow-sm ${isNear ? 'bg-primary-600 text-white border-primary-500' : 'bg-white text-gray-600 border-gray-100'}`}>
                                <Navigation size={12} className={isNear ? 'text-white' : 'text-primary-500'} fill={isNear ? 'currentColor' : 'none'} />
                                <span>À {listing.distance} km</span>
                            </div>
                          )}

                          <button 
                            onClick={(e) => handleFavoriteClick(e, listing.id)}
                            className={`absolute top-3 right-3 p-2 backdrop-blur-md bg-white/70 rounded-full transition-colors ${!isGrid ? 'lg:hidden' : ''} ${favorited ? 'bg-red-50 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          >
                              <Heart size={18} fill={favorited ? "currentColor" : "none"} />
                          </button>
                      </div>

                      <div className={`flex flex-1 flex-col ${isGrid ? 'p-6' : 'p-6 md:p-6 lg:p-0 lg:flex-row min-w-0'}`}>
                          
                          <div className={`flex flex-col flex-grow min-w-0 ${isGrid ? 'gap-4' : 'lg:p-5 gap-3 justify-center'}`}>
                            <div className="mb-1">
                              <div className="flex justify-between items-start gap-3">
                                <h3 className={`font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight line-clamp-2 flex-1 tracking-tight ${isGrid ? 'text-lg' : 'text-xl'}`}>
                                    {listing.title}
                                </h3>
                                <span className={`text-lg md:text-xl font-black text-primary-600 whitespace-nowrap pt-0.5 tracking-tighter ${!isGrid ? 'lg:hidden' : ''}`}>
                                    {listing.price}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 font-bold uppercase mt-2 tracking-wide">
                                  <MapPin size={12} className="mr-1 text-gray-300" />
                                  <span className="truncate max-w-[120px] md:max-w-[180px]">{listing.location}</span>
                                  <span className="mx-2 text-neutral-200">•</span>
                                  <span className="whitespace-nowrap">Aujourd'hui</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-black text-gray-400 uppercase tracking-widest my-2">
                               {isItemAccessory ? (
                                  <div className="flex items-center gap-1.5"><Info size={14} className="text-gray-300" /> <span>{listing.condition}</span></div>
                               ) : (
                                  <>
                                    <div className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-300" /> <span>{listing.year}</span></div>
                                    <div className="flex items-center gap-1.5"><Gauge size={14} className="text-gray-300" /> <span>{listing.mileage}</span></div>
                                    <div className="flex items-center gap-1.5"><Zap size={14} className="text-gray-300" /> <span>{listing.cc}</span></div>
                                  </>
                               )}
                            </div>

                            <div className={`mt-auto pt-4 ${isGrid ? 'border-t border-gray-50' : 'md:pt-4 lg:pt-3 lg:border-t-0'} flex items-center gap-2.5`}>
                                {isPro ? (
                                  <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-bold flex-shrink-0"><ShieldCheck size={16} /></div>
                                ) : (
                                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold flex-shrink-0"><User size={16} /></div>
                                )}
                                <div className="overflow-hidden flex items-center gap-2">
                                    <span className={`text-xs font-black truncate ${isPro ? 'text-primary-700' : 'text-gray-700'}`}>{listing.seller}</span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">• {isPro ? 'PRO' : 'Particulier'}</span>
                                </div>
                            </div>
                          </div>

                          {!isGrid && (
                            <div className={`hidden lg:flex flex-col justify-between items-end p-6 border-l w-40 lg:w-64 flex-shrink-0 ${isPro ? 'bg-primary-50/50 border-primary-100' : 'bg-gray-50/50 border-gray-100'}`}>
                               <div className="text-right w-full">
                                  <span className="block text-[10px] font-black uppercase text-gray-300 mb-1 tracking-widest">Prix demandé</span>
                                  <span className="block text-xl lg:text-3xl font-black text-primary-600 leading-none mb-4 truncate tracking-tighter">{listing.price}</span>
                                  {listing.dealRating && (
                                    <div className="flex flex-col items-end gap-1.5">
                                        <div className="flex gap-1 w-12 lg:w-20">
                                            {[1, 2, 3].map(level => (
                                                <div key={level} className={`h-1.5 flex-1 rounded-full ${listing.dealRating! >= level ? dealInfo.color : 'bg-gray-200'}`}></div>
                                            ))}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-tight ${dealInfo.textColor}`}>{dealInfo.label}</span>
                                    </div>
                                  )}
                               </div>
                               <div className="w-full flex flex-col gap-2 mt-4">
                                  <button className="w-full h-10 lg:h-11 rounded-xl bg-[#E6580B] text-white font-black text-xs lg:text-sm shadow-none hover:opacity-90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                                     <Phone size={16} /> Appeler
                                  </button>
                                  {isPro && (
                                     <button className="w-full h-10 lg:h-11 rounded-xl bg-white border-2 border-primary-600 text-primary-600 font-black text-xs lg:text-sm hover:bg-primary-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                                        Boutique <ArrowRight size={14} />
                                     </button>
                                  )}
                                  <button 
                                    onClick={(e) => handleFavoriteClick(e, listing.id)}
                                    className={`w-full h-8 rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase transition-colors ${favorited ? 'bg-red-50 text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                                  >
                                     <Heart size={14} fill={favorited ? "currentColor" : "none"} />
                                     <span className="hidden lg:inline">{favorited ? "Sauvegardé" : "Sauvegarder"}</span>
                                  </button>
                               </div>
                            </div>
                          )}
                      </div>

                      <div className="block md:hidden px-6 pb-6">
                         <button 
                           onClick={(e) => { e.stopPropagation(); }}
                           className="w-full h-12 bg-[#E6580B] hover:opacity-90 text-white font-black rounded-xl shadow-none flex items-center justify-center gap-2 transition-all active:scale-[0.98] uppercase text-xs tracking-widest"
                         >
                            <Phone size={18} />
                            Appeler
                         </button>
                      </div>
                      </article>

                      {index === 5 && SHOW_IN_FEED_AD && (
                        <div className="mt-6 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-full animate-fade-in-up">
                            <AdBanner zone="search_feed" variant="native" className="shadow-none border border-gray-100" />
                        </div>
                      )}
                  </React.Fragment>
                );})}
              </div>
            )}

          </main>
        </div>
      </div>

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
              
              {/* MOBILE SMART PROXIMITY TRIGGER */}
              <div className="p-4 bg-primary-50 rounded-2xl border border-primary-200">
                <button 
                    onClick={() => { handleLocationDetect(); setIsMobileFilterOpen(false); }}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <Navigation size={20} className="text-primary-600" />
                        <span className="text-base font-bold text-primary-900">Motos autour de moi</span>
                    </div>
                    <ChevronRight size={20} className="text-primary-400" />
                </button>
              </div>

              {/* FEATURE TOGGLE - MOBILE */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                       <Building2 size={20} className={filters.onlyPro ? 'text-primary-600' : 'text-gray-400'} />
                       <span className={`text-base font-bold transition-colors ${filters.onlyPro ? 'text-primary-700' : 'text-gray-700'}`}>
                          Vendeur Pro
                       </span>
                    </div>
                    <div className="relative">
                       <input 
                         type="checkbox" 
                         checked={filters.onlyPro} 
                         onChange={(e) => handleFilterChange('onlyPro', e.target.checked)}
                         className="sr-only" 
                       />
                       <div className={`w-12 h-7 rounded-full transition-colors ${filters.onlyPro ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                       <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${filters.onlyPro ? 'translate-x-5' : ''}`}></div>
                    </div>
                 </label>
              </div>

              <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Recherche</label>
                 <div className="relative">
                    <input type="text" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 text-base font-bold focus:bg-white focus:border-primary-600 outline-none" placeholder="Mot-clé..." />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Type</label>
                    <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold shadow-none">
                       <option>Tous les types</option>
                       <option>Moto</option>
                       <option>Scooter</option>
                       <option>Accessoires</option>
                    </select>
                 </div>
                 
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Marque</label>
                    <select value={filters.brand} onChange={(e) => handleFilterChange('brand', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold shadow-none">
                       <option>Toutes les marques</option>
                       {brandsMoto.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Modèle</label>
                    <select value={filters.model} onChange={(e) => handleFilterChange('model', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold shadow-none">
                       <option>Tous les modèles</option>
                       {mockModels.map((model) => (
                         <option key={model} value={model}>{model}</option>
                       ))}
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Localisation</label>
                    <select value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold shadow-none">
                       <option>Toutes les régions</option>
                       <option>Tunis</option>
                       <option>Sousse</option>
                       <option>Sfax</option>
                       <option>Nabeul</option>
                       <option>Bizerte</option>
                    </select>
                 </div>
              </div>

              <hr className="border-gray-100" />

              {!isAccessory && (
                <>
                  <div className="space-y-4">
                     <DualRangeSlider 
                        label="Année" 
                        min={2000} 
                        max={2026} 
                        valueMin={filters.minYear}
                        valueMax={filters.maxYear}
                        onChange={(min, max) => { handleFilterChange('minYear', min); handleFilterChange('maxYear', max); }}
                     />
                  </div>
                  <div className="space-y-4">
                     <DualRangeSlider 
                        label="Kilométrage" 
                        min={0} 
                        max={300000} 
                        step={1000} 
                        unit="km" 
                        valueMin={filters.minKm}
                        valueMax={filters.maxKm}
                        onChange={(min, max) => { handleFilterChange('minKm', min); handleFilterChange('maxKm', max); }}
                     />
                  </div>
                  <div className="space-y-4">
                     <DualRangeSlider 
                        label="Cylindrée" 
                        min={50} 
                        max={1650} 
                        step={50} 
                        unit="cc" 
                        valueMin={filters.minCC}
                        valueMax={filters.maxCC}
                        onChange={(min, max) => { handleFilterChange('minCC', min); handleFilterChange('maxCC', max); }}
                     />
                  </div>
                </>
              )}

              <div className="space-y-4">
                 <DualRangeSlider 
                    label="Prix" 
                    min={0} 
                    max={200000} 
                    step={100} 
                    unit="DT" 
                    valueMin={filters.minPrice}
                    valueMax={filters.maxPrice}
                    onChange={(min, max) => { handleFilterChange('minPrice', min); handleFilterChange('maxPrice', max); }}
                 />
              </div>
           </div>

           <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-20 pb-8 md:pb-4 safe-area-bottom shadow-none">
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-gray-900 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-[0.98] uppercase tracking-widest shadow-none">
                 Afficher {filteredAndSortedListings.length} résultats
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default SearchResults;