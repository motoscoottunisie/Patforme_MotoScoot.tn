
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Heart, 
  Phone, 
  MapPin, 
  Calendar, 
  Gauge, 
  Info, 
  User,
  ChevronDown,
  X,
  Home,
  ChevronRight,
  Search,
  Filter,
  ShieldCheck,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { mockListings, mockModels } from '../data/mockData';
import Header from './layout/Header';
import { useFavorites } from '../context/FavoritesContext';

interface SearchResultsProps {
  initialFilters?: any;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

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
  
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Sync with props if they change (e.g. Reset Filters)
  useEffect(() => {
    if (valueMin !== undefined) setMinVal(valueMin);
  }, [valueMin]);

  useEffect(() => {
    if (valueMax !== undefined) setMaxVal(valueMax);
  }, [valueMax]);

  // Notify parent of changes with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange) onChange(minVal, maxVal);
    }, 300);
    return () => clearTimeout(handler);
  }, [minVal, maxVal]);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <label className="text-base font-bold text-gray-900">{label}</label>
      </div>
      
      {/* Slider Container */}
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
            minValRef.current = value;
          }}
          className={`absolute pointer-events-none appearance-none z-20 h-2 w-full bg-transparent 
            [&::-webkit-slider-thumb]:pointer-events-auto 
            [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-primary-600 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white 
            [&::-webkit-slider-thumb]:shadow-md 
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto 
            [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-primary-600 
            [&::-moz-range-thumb]:border-2 
            [&::-moz-range-thumb]:border-white 
            [&::-moz-range-thumb]:shadow-md 
            [&::-moz-range-thumb]:cursor-pointer`}
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
            maxValRef.current = value;
          }}
          className={`absolute pointer-events-none appearance-none z-30 h-2 w-full bg-transparent 
            [&::-webkit-slider-thumb]:pointer-events-auto 
            [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-primary-600 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white 
            [&::-webkit-slider-thumb]:shadow-md 
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto 
            [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-primary-600 
            [&::-moz-range-thumb]:border-2 
            [&::-moz-range-thumb]:border-white 
            [&::-moz-range-thumb]:shadow-md 
            [&::-moz-range-thumb]:cursor-pointer`}
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
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 text-center"
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
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 text-center"
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { isFavorite, toggleFavorite } = useFavorites();

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

  // Filter State
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    brand: '',
    model: '', 
    location: '',
    minYear: 2000,
    maxYear: 2026,
    minKm: 0,
    maxKm: 300000,
    minPrice: 0,
    maxPrice: 200000,
    minCC: 50,
    maxCC: 1650
  });

  // Initialize filters from props
  useEffect(() => {
    if (initialFilters) {
      setFilters(prev => ({
        ...prev,
        ...initialFilters
      }));
    }
  }, [initialFilters]);

  // Filtering Logic
  const filteredListings = mockListings.filter(listing => {
    // Text search (Title or Location)
    if (filters.search && !listing.title.toLowerCase().includes(filters.search.toLowerCase()) && !listing.location.toLowerCase().includes(filters.search.toLowerCase())) return false;
    
    // Dropdowns
    if (filters.type && filters.type !== 'Tous les types' && listing.type !== filters.type) return false;
    if (filters.brand && filters.brand !== 'Toutes les marques' && !listing.title.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    
    // Model Filter logic
    if (filters.model && filters.model !== 'Tous les modèles' && !listing.title.toLowerCase().includes(filters.model.toLowerCase())) return false;
    
    if (filters.location && filters.location !== 'Toutes les régions' && filters.location !== 'Toute la Tunisie' && !listing.location.includes(filters.location)) return false;

    // Ranges
    const price = parseInt(listing.price.replace(/\D/g, ''));
    if (price < filters.minPrice || price > filters.maxPrice) return false;

    // Vehicle Specific Filters (Skip if Accessoires)
    if (listing.type !== 'Accessoires') {
        const year = parseInt(listing.year);
        if (year < filters.minYear || year > filters.maxYear) return false;

        const km = parseInt(listing.mileage.replace(/\D/g, ''));
        if (km < filters.minKm || km > filters.maxKm) return false;

        const cc = parseInt(listing.cc.replace(/\D/g, ''));
        if (cc < filters.minCC || cc > filters.maxCC) return false;
    }

    return true;
  });

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
      minYear: 2000,
      maxYear: 2026,
      minKm: 0,
      maxKm: 300000,
      minPrice: 0,
      maxPrice: 200000,
      minCC: 50,
      maxCC: 1650
    });
  };

  const handleCardClick = (listingId: number) => {
    onNavigate?.('listing-details', { id: listingId });
  };

  // HANDLER FOR FAVORITE CLICK WITH LOGIN CHECK
  const handleFavoriteClick = (e: React.MouseEvent, listingId: number) => {
    e.stopPropagation();
    if (isLoggedIn) {
      toggleFavorite('listing', listingId);
    } else {
      if (onTriggerLogin) onTriggerLogin();
    }
  };

  const getBadgeStyle = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-success-50 text-success-700 border-success-200'; 
      case 'Très bon': return 'bg-primary-50 text-primary-700 border-primary-200'; 
      case 'Bon': return 'bg-warning-50 text-warning-700 border-warning-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDealInfo = (rating?: number) => {
      switch (rating) {
          case 3: return { label: 'Super affaire', color: 'bg-success-500', textColor: 'text-success-600', bgColor: 'bg-success-50' };
          case 2: return { label: 'Bonne affaire', color: 'bg-primary-500', textColor: 'text-primary-600', bgColor: 'bg-primary-50' };
          case 1: 
          default: return { label: 'Prix du marché', color: 'bg-gray-400', textColor: 'text-gray-500', bgColor: 'bg-gray-50' };
      }
  };

  const SHOW_IN_FEED_AD = true;
  const isAccessory = filters.type === 'Accessoires';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[35vh] md:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: "url('https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp')" }} />
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(-180deg, #AF2E13 0%, #E65100 100%)', opacity: 0.95, mixBlendMode: 'multiply' }} />
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

        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto md:space-y-6 h-full pt-20">
          <div className="text-center px-4 md:mt-32">
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm tracking-tight leading-tight">
              Résultats
            </h1>
            <p className="text-white text-lg md:text-xl font-normal max-w-2xl mx-auto">
              {filteredListings.length} annonces trouvées
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        
        {/* Breadcrumbs & Actions Row */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-8 gap-4">
          <nav aria-label="Fil d'ariane" className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar mr-auto">
            <button className="flex items-center hover:text-primary-600 cursor-pointer transition-colors flex-shrink-0 focus:outline-none focus:underline" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 flex-shrink-0" aria-hidden="true" />
            <span className="font-semibold text-gray-900 flex-shrink-0" aria-current="page">Résultats</span>
          </nav>

          <div className="flex items-center gap-3 ml-auto">
             <div className="hidden md:flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                   <ListIcon size={20} />
                </button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                   <LayoutGrid size={20} />
                </button>
             </div>
             
             <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all active:scale-95 flex-shrink-0 shadow-sm">
                <Filter className="w-5 h-5" aria-hidden="true" />
              </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR FILTERS */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary-600" />
                    Filtrer
                </h3>
                <button onClick={resetFilters} className="text-xs font-bold text-primary-600 hover:underline">Réinitialiser</button>
              </div>

              {/* Text Search */}
              <div className="mb-6">
                 <label className="text-sm font-bold text-gray-700 mb-2 block">Recherche</label>
                 <div className="relative">
                    <input 
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Modèle, mot-clé..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-primary-600 outline-none transition-all"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                 </div>
              </div>

              {/* Dropdowns */}
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-700 mb-2 block">Type</label>
                <div className="relative">
                  <select 
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:border-primary-600 outline-none"
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
                <label className="text-sm font-bold text-gray-700 mb-2 block">Marque</label>
                <div className="relative">
                  <select 
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:border-primary-600 outline-none"
                  >
                    <option>Toutes les marques</option>
                    <option>Yamaha</option>
                    <option>Honda</option>
                    <option>BMW</option>
                    <option>Kawasaki</option>
                    <option>KTM</option>
                    <option>Suzuki</option>
                    <option>Ducati</option>
                    <option>Triumph</option>
                    <option>Piaggio</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* MODEL FILTER */}
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-700 mb-2 block">Modèle</label>
                <div className="relative">
                  <select 
                    value={filters.model}
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:border-primary-600 outline-none"
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
                <label className="text-sm font-bold text-gray-700 mb-2 block">Localisation</label>
                <div className="relative">
                  <select 
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:bg-white focus:border-primary-600 outline-none"
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
          </aside>

          {/* LISTINGS */}
          <main className="flex-1">
            
            {filteredListings.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                     <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat</h3>
                  <p className="text-gray-500 mb-6">Essayez de modifier vos filtres de recherche.</p>
                  <button onClick={resetFilters} className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors">
                     Réinitialiser les filtres
                  </button>
               </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
                {filteredListings.map((listing, index) => {
                   const isGrid = viewMode === 'grid';
                   const dealInfo = getDealInfo(listing.dealRating);
                   const favorited = isFavorite('listing', listing.id);
                   const isItemAccessory = listing.type === 'Accessoires';
                   
                   return (
                  <React.Fragment key={listing.id}>
                      {/* NATIVE AD INSERTION */}
                      {index === 2 && SHOW_IN_FEED_AD && (
                        <div className={`bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-md flex flex-col md:flex-row items-center justify-between gap-6 ${isGrid ? 'col-span-full' : ''} animate-fade-in-up`}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 blur-[80px] opacity-20 rounded-full pointer-events-none"></div>
                            <div className="flex-1 relative z-10">
                                <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider mb-3 inline-block border border-white/10">Sponsorisé</span>
                                <h3 className="text-xl font-bold mb-2">Assurez votre moto en 2 minutes</h3>
                                <p className="text-gray-300 text-sm">Profitez d'une couverture tous risques à partir de 45 DT/mois. Devis gratuit et immédiat.</p>
                            </div>
                            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap relative z-10">
                                Voir l'offre
                            </button>
                        </div>
                      )}

                      <article 
                        onClick={() => handleCardClick(listing.id)}
                        className={`group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex animate-fade-in-up cursor-pointer ${isGrid ? 'flex-col rounded-2xl' : 'flex-col md:flex-row rounded-2xl md:rounded-xl'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                      
                      {/* Image */}
                      <div className={`relative flex-shrink-0 bg-gray-100 overflow-hidden ${isGrid ? 'w-full h-56' : 'w-full h-56 md:w-72 md:h-56'}`}>
                          <img 
                            src={listing.image} 
                            alt={listing.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-sm border ${getBadgeStyle(listing.condition)} backdrop-blur-sm bg-opacity-90`}>
                                {listing.condition}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => handleFavoriteClick(e, listing.id)}
                            className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-colors ${!isGrid ? 'md:hidden' : ''} ${favorited ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
                          >
                              <Heart size={18} fill={favorited ? "currentColor" : "none"} />
                          </button>
                      </div>

                      {/* Content */}
                      <div className={`flex flex-1 ${isGrid ? 'flex-col p-5' : 'flex-col md:flex-row'}`}>
                          
                          <div className={`flex flex-col ${isGrid ? 'gap-3' : 'flex-1 p-5 gap-1 justify-center'}`}>
                            <div className="mb-1">
                              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight line-clamp-2">
                                  {listing.title}
                              </h3>
                              <span className={`text-xl font-bold text-primary-600 whitespace-nowrap ${!isGrid ? 'md:hidden' : ''}`}>
                                  {listing.price}
                              </span>
                              <div className="flex items-center text-sm text-gray-500 font-medium mt-1">
                                  <MapPin size={14} className="mr-1 text-gray-400" />
                                  <span className="truncate max-w-[150px]">{listing.location}</span>
                                  <span className="mx-2 text-gray-300">•</span>
                                  <span>{listing.date}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-semibold text-gray-700 my-2">
                               {isItemAccessory ? (
                                  <div className="flex items-center gap-1.5"><Info size={16} className="text-gray-400" /> <span>{listing.condition}</span></div>
                               ) : (
                                  <>
                                    <div className="flex items-center gap-1.5"><Calendar size={16} className="text-gray-400" /> <span>{listing.year}</span></div>
                                    <span className="text-gray-300 hidden md:inline">•</span>
                                    <div className="flex items-center gap-1.5"><Gauge size={16} className="text-gray-400" /> <span>{listing.mileage}</span></div>
                                    <span className="text-gray-300 hidden md:inline">•</span>
                                    <div className="flex items-center gap-1.5"><Info size={16} className="text-gray-400" /> <span>{listing.cc}</span></div>
                                  </>
                               )}
                            </div>

                            {listing.dealRating && (
                              <div className="flex items-center gap-3 mt-2">
                                 <div className="flex items-center gap-1 w-24">
                                     {[1, 2, 3].map(level => (
                                       <div key={level} className={`h-1.5 flex-1 rounded-full ${listing.dealRating! >= level ? dealInfo.color : 'bg-gray-200'}`}></div>
                                     ))}
                                 </div>
                                 <span className={`text-xs font-bold ${dealInfo.textColor}`}>{dealInfo.label}</span>
                              </div>
                            )}

                            <div className={`mt-auto pt-4 ${isGrid ? 'border-t border-gray-50' : 'md:border-0 md:pt-3'} flex items-center gap-2`}>
                                {listing.sellerType === 'Pro' ? (
                                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold flex-shrink-0"><ShieldCheck size={14} /></div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold flex-shrink-0"><User size={14} /></div>
                                )}
                                <div className="overflow-hidden flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-700 truncate">{listing.seller}</span>
                                    <span className="text-xs text-gray-400">• {listing.sellerType}</span>
                                </div>
                            </div>

                            {/* Mobile Buttons */}
                            <div className={`flex gap-2 w-full mt-4 ${!isGrid ? 'md:hidden' : ''}`}>
                                  <button className="flex-1 h-10 px-3 rounded-lg bg-success-50 text-success-700 font-bold flex items-center justify-center gap-2 text-sm border border-success-200 w-full">
                                      <Phone size={16} /> Appeler
                                  </button>
                             </div>
                          </div>

                          {/* Desktop Side Action */}
                          {!isGrid && (
                            <div className="hidden md:flex flex-col justify-between items-end p-5 border-l border-gray-100 w-64 flex-shrink-0 bg-gray-50/50">
                               <div className="text-right w-full">
                                  <span className="block text-3xl font-black text-primary-600 leading-none mb-1">{listing.price}</span>
                               </div>
                               <div className="w-full flex flex-col gap-2.5 mt-4">
                                  <button className="w-full h-10 rounded-lg bg-primary-600 text-white font-bold text-sm shadow-md hover:bg-primary-700 transition-all flex items-center justify-center gap-2">
                                     <Phone size={16} /> Appeler
                                  </button>
                                  <button 
                                    onClick={(e) => handleFavoriteClick(e, listing.id)}
                                    className={`w-full h-8 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${favorited ? 'bg-red-50 text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                                  >
                                     <Heart size={14} fill={favorited ? "currentColor" : "none"} />
                                     {favorited ? "Sauvegardé" : "Sauvegarder"}
                                  </button>
                               </div>
                            </div>
                          )}
                      </div>
                      </article>
                  </React.Fragment>
                );})}
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
                 <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full"><X size={24} /></button>
                 <h3 className="font-bold text-xl text-gray-900">Filtres</h3>
              </div>
              <button onClick={resetFilters} className="text-sm font-semibold text-primary-600">Réinitialiser</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">
              <div>
                 <label className="text-base font-bold text-gray-900 mb-3 block">Recherche</label>
                 <div className="relative">
                    <input type="text" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 text-base focus:border-primary-600 outline-none" placeholder="Mot-clé..." />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <label className="block font-bold mb-2">Type</label>
                    <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl">
                       <option>Tous les types</option>
                       <option>Moto</option>
                       <option>Scooter</option>
                       <option>Accessoires</option>
                    </select>
                 </div>
                 
                 <div>
                    <label className="block font-bold mb-2">Marque</label>
                    <select value={filters.brand} onChange={(e) => handleFilterChange('brand', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl">
                       <option>Toutes les marques</option>
                       <option>Yamaha</option>
                       <option>Honda</option>
                       <option>BMW</option>
                       <option>Kawasaki</option>
                       <option>KTM</option>
                       <option>Suzuki</option>
                       <option>Ducati</option>
                       <option>Triumph</option>
                       <option>Piaggio</option>
                    </select>
                 </div>

                 {/* Mobile Model Filter */}
                 <div>
                    <label className="block font-bold mb-2">Modèle</label>
                    <select value={filters.model} onChange={(e) => handleFilterChange('model', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl">
                       <option>Tous les modèles</option>
                       {mockModels.map((model) => (
                         <option key={model} value={model}>{model}</option>
                       ))}
                    </select>
                 </div>

                 <div>
                    <label className="block font-bold mb-2">Localisation</label>
                    <select value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl">
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

              {/* Mobile Range Sliders */}
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

           <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-20 pb-8 md:pb-4 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg active:scale-[0.98] transition-transform">
                 Afficher {filteredListings.length} résultats
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default SearchResults;
