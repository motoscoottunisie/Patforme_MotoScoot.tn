import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Tag,
  Layers,
  ChevronDown,
  Bike,
  ShoppingBag,
  Search,
  X
} from 'lucide-react';
import { tunisianCities, brandsMoto, mockModels, accessoryTypes } from '../data/mockData';
import Header from './layout/Header';

// --- CUSTOM ICON COMPONENTS ---

const IconMoto = (props: any) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/moto.svg" 
    alt="Moto" 
    className={props.className} 
  />
);

const IconScooter = (props: any) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/scooter.svg" 
    alt="Scooter" 
    className={props.className} 
  />
);

const IconAccessoires = (props: any) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/accesoires.svg" 
    alt="Accessoires"
    className={props.className} 
  />
);

const IconCasques = (props: any) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/casques.svg" 
    alt="Casques"
    className={props.className} 
  />
);

const IconVestes = (props: any) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/vestes.svg" 
    alt="Vestes" 
    className={props.className} 
  />
);

const IconGants = (props: any) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/gants.svg" 
    alt="Gants" 
    className={props.className} 
  />
);

interface CategoryItem {
  icon: React.ElementType;
  label: string;
}

interface HeroProps {
  onSearch?: (filters: any) => void;
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const categories: CategoryItem[] = [
  { icon: IconMoto, label: "Moto" },
  { icon: IconScooter, label: "Scooter" },
  { icon: IconAccessoires, label: "Accessoires" },
  { icon: IconCasques, label: "Casques" },
  { icon: IconVestes, label: "Vestes" },
  { icon: IconGants, label: "Gants" },
];

const Hero: React.FC<HeroProps> = ({ onSearch, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [accessoryCategory, setAccessoryCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // States pour les Comboboxes
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  // Reset dependent fields when Type changes
  useEffect(() => {
    setBrand("");
    setBrandSearch("");
    setModel("");
    setModelSearch("");
    setAccessoryCategory("");
  }, [type]);

  // Fermeture des menus au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
        setIsModelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationRequest = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    const geoOptions = {
      enableHighAccuracy: false,
      timeout: 10000, 
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setLocation("Ma position");
      },
      (error) => {
        setIsLocating(false);
        setLocation("");
        console.warn("Géolocalisation Hero ignorée:", error.message || "Erreur inconnue");
      },
      geoOptions
    );
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "around_me") {
      handleLocationRequest();
    } else {
      setLocation(val);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      const isAccessory = type === 'Accessoires';
      onSearch({
        type,
        search: isAccessory ? accessoryCategory : "", 
        brand: isAccessory ? "" : brand,
        model: isAccessory ? "" : model,
        location: location === "Ma position" ? "" : location,
        aroundMe: location === "Ma position"
      });
    }
  };

  const handleCategoryClick = (categoryLabel: string) => {
    if (onSearch) {
      const isAccessorySub = ["Casques", "Vestes", "Gants"].includes(categoryLabel);
      onSearch({
        type: isAccessorySub || categoryLabel === "Accessoires" ? "Accessoires" : categoryLabel,
        search: isAccessorySub ? categoryLabel.slice(0, -1) : "", 
        brand: "",
        model: "",
        location: ""
      });
    }
  };

  const isAccessoryMode = type === 'Accessoires';

  // Filtrage des listes pour les comboboxes
  const filteredBrands = brandsMoto.filter(b => 
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = mockModels.filter(m => 
    m.toLowerCase().includes(modelSearch.toLowerCase())
  );

  return (
    <div className="relative w-full h-[100dvh] md:h-[50vh] lg:h-[80vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
      
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
        onGoHome={() => onNavigate?.('home')} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <div className="relative z-10 flex flex-col md:block h-full md:h-auto w-full max-w-7xl mx-auto md:space-y-16 justify-between md:justify-center pt-20 md:pt-0">
        
        <div className="flex-1 flex flex-col justify-center items-center w-full md:px-0 space-y-10 md:space-y-6 mt-12 md:mt-48">
          <div className="w-full max-w-5xl text-left text-white flex flex-col items-start md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-bold uppercase tracking-wide mb-6 animate-fade-in-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500"></span>
              </span>
              + 500 annonces en ligne
            </div>

            <h1 className="font-extrabold text-[2.55rem] md:text-5xl tracking-tight leading-[1.1] mb-2 md:mb-4 drop-shadow-sm">
              Achetez ou vendez <br className="md:hidden" /> votre moto d'occasion
            </h1>
            <p className="text-base md:text-xl font-medium opacity-95 text-white/90">
              Solution simple et rapide pour acheter ou vendre votre moto d’occasion en quelques clics.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-5xl bg-white rounded-xl p-2 flex flex-col md:flex-row items-stretch md:items-center shadow-2xl relative">
            
            {/* Input 1: Type */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              <Bike className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <select 
                  id="search-type" 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-bold appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none"
                >
                  <option value="" disabled>Que cherchez-vous ?</option>
                  <option value="Moto">Moto</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Accessoires">Accessoires</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Input 2: Dynamic (Marque OR Type d'accessoire) - COMBOBOX MARQUE */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group" ref={brandRef}>
              {isAccessoryMode ? (
                 <ShoppingBag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              ) : (
                 <Tag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              )}
              
              <div className="flex-1 relative">
                {isAccessoryMode ? (
                    <select 
                      value={accessoryCategory}
                      onChange={(e) => setAccessoryCategory(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-700 font-bold appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none"
                    >
                      <option value="" disabled>Articles</option>
                      {accessoryTypes.map((acc) => <option key={acc} value={acc}>{acc}</option>)}
                    </select>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Marque"
                      value={brandSearch || brand}
                      autoComplete="off"
                      onFocus={() => { setIsBrandOpen(true); setBrandSearch(""); }}
                      onChange={(e) => { setBrandSearch(e.target.value); setIsBrandOpen(true); }}
                      className="w-full bg-transparent outline-none text-gray-700 font-bold placeholder:text-gray-400 border-none p-0 focus:ring-0"
                    />
                    {isBrandOpen && (
                      <div className="absolute top-[calc(100%+1.5rem)] left-0 w-[calc(100%+2rem)] -ml-4 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-60 overflow-y-auto z-[60] animate-scale-in origin-top">
                        {filteredBrands.length > 0 ? filteredBrands.map((b) => (
                          <button
                            key={b}
                            onClick={() => { setBrand(b); setBrandSearch(b); setIsBrandOpen(false); setModel(""); setModelSearch(""); }}
                            className={`w-full text-left px-5 py-2.5 text-sm font-bold transition-colors ${brand === b ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                            {b}
                          </button>
                        )) : (
                          <div className="px-5 py-3 text-xs text-gray-400 italic">Aucune marque trouvée</div>
                        )}
                      </div>
                    )}
                  </>
                )}
                <ChevronDown className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 ${isBrandOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Input 3: Model - COMBOBOX MODELE */}
            <div className={`flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group ${isAccessoryMode ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`} ref={modelRef}>
              <Layers className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={isAccessoryMode ? "-" : "Modèle"}
                  value={modelSearch || model}
                  disabled={isAccessoryMode}
                  autoComplete="off"
                  onFocus={() => { setIsModelOpen(true); setModelSearch(""); }}
                  onChange={(e) => { setModelSearch(e.target.value); setIsModelOpen(true); }}
                  className="w-full bg-transparent outline-none text-gray-700 font-bold placeholder:text-gray-400 border-none p-0 focus:ring-0 disabled:cursor-not-allowed"
                />
                {!isAccessoryMode && isModelOpen && (
                  <div className="absolute top-[calc(100%+1.5rem)] left-0 w-[calc(100%+2rem)] -ml-4 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-60 overflow-y-auto z-[60] animate-scale-in origin-top">
                    {filteredModels.length > 0 ? filteredModels.map((m) => (
                      <button
                        key={m}
                        onClick={() => { setModel(m); setModelSearch(m); setIsModelOpen(false); }}
                        className={`w-full text-left px-5 py-2.5 text-sm font-bold transition-colors ${model === m ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {m}
                      </button>
                    )) : (
                      <div className="px-5 py-3 text-xs text-gray-400 italic">Aucun modèle trouvé</div>
                    )}
                  </div>
                )}
                <ChevronDown className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 ${isModelOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Input 4: Location */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              <MapPin className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${location === "Ma position" ? "text-primary-600" : "text-gray-400"}`} />
              <div className="flex-1 relative">
                <select 
                  id="search-city"
                  value={location === "Ma position" ? "around_me" : location}
                  onChange={handleLocationChange}
                  className={`w-full bg-transparent outline-none font-bold appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none ${location === "Ma position" ? "text-primary-600" : "text-gray-700"}`}
                >
                  <option value="" disabled>Où ça ?</option>
                  <option value="around_me" className="font-bold text-primary-600">Autour de moi</option>
                  <option disabled>──────────</option>
                  {tunisianCities.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
                {isLocating ? (
                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2"><div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                  <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearchClick}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-lg shadow-none transition-transform transform active:scale-95 md:ml-2 mt-2 md:mt-0 flex-shrink-0"
              aria-label="Lancer la recherche"
            >
              Rechercher
            </button>
          </div>
        </div>

        <div className="hidden md:block w-full overflow-x-auto no-scrollbar pb-6 md:pb-0 flex-shrink-0 px-6 md:px-0">
          <div className="flex flex-nowrap md:justify-center gap-4 md:gap-10 w-full">
            {categories.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleCategoryClick(item.label)}
                className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in-up flex-shrink-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                  <item.icon className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-300" />
                </div>
                <span className="text-white font-semibold text-xs md:text-base tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;