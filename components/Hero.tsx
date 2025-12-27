import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Tag,
  Layers,
  ChevronDown,
  Bike,
  ShoppingBag,
  Search,
  X,
  Navigation
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

// Define missing Category type
type Category = 'Moto' | 'Scooter' | 'Accessoires';

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

  // States pour les Dropdowns / Popups
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isAccessoryOpen, setIsAccessoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Search filter pour les comboboxes
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  const typeRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

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
      const target = event.target as Node;
      if (typeRef.current && !typeRef.current.contains(target)) setIsTypeOpen(false);
      if (brandRef.current && !brandRef.current.contains(target)) setIsBrandOpen(false);
      if (modelRef.current && !modelRef.current.contains(target)) {
        setIsModelOpen(false);
        setIsAccessoryOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(target)) setIsLocationOpen(false);
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
        setIsLocationOpen(false);
      },
      (error) => {
        setIsLocating(false);
        setLocation("");
        setIsLocationOpen(false);
        console.warn("Géolocalisation Hero ignorée:", error.message || "Erreur inconnue");
      },
      geoOptions
    );
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

  // Classes partagées pour les Popups - Z-INDEX AUGMENTÉ À 100
  const POPUP_CLASSES = "absolute top-[calc(100%+1.5rem)] left-0 w-[calc(100%+2rem)] -ml-4 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-60 overflow-y-auto z-[100] animate-scale-in origin-top";
  const ITEM_CLASSES = "w-full text-left px-5 py-2.5 text-sm font-bold transition-colors";
  const ACTIVE_ITEM_CLASSES = "bg-primary-50 text-primary-600";
  const DEFAULT_ITEM_CLASSES = "text-gray-600 hover:bg-gray-50";

  // Filtrage des listes pour les comboboxes
  const filteredBrands = brandsMoto.filter(b => 
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = mockModels.filter(m => 
    m.toLowerCase().includes(modelSearch.toLowerCase())
  );

  return (
    <div className="relative w-full h-[100dvh] md:h-[50vh] lg:h-[80vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans bg-primary-50">
      
      {/* Background Container - L'overflow: hidden est déplacé ici pour ne pas couper les popups du parent principal */}
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

      <div className="relative z-10 flex flex-col md:block h-full md:h-auto w-full max-w-7xl mx-auto md:space-y-16 justify-between md:justify-center pt-20 md:pt-0 overflow-visible">
        
        <div className="flex-1 flex flex-col justify-center items-center w-full md:px-0 space-y-10 md:space-y-6 mt-12 md:mt-48 overflow-visible">
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

          {/* Search Bar Container - overflow-visible is key */}
          <div className="w-full max-w-5xl bg-white rounded-xl p-2 flex flex-col md:flex-row items-stretch md:items-center shadow-2xl relative overflow-visible z-20">
            
            {/* Input 1: Type - CUSTOM DROPDOWN */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group" ref={typeRef}>
              <Bike className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <button 
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  className="w-full text-left bg-transparent outline-none text-gray-700 font-bold cursor-pointer pr-8 truncate"
                >
                  {type || "Que cherchez-vous ?"}
                </button>
                <ChevronDown className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
                
                {isTypeOpen && (
                  <div className={POPUP_CLASSES}>
                    {["Moto", "Scooter", "Accessoires"].map((item) => (
                      <button
                        key={item}
                        onClick={() => { setType(item as Category); setIsTypeOpen(false); }}
                        className={`${ITEM_CLASSES} ${type === item ? ACTIVE_ITEM_CLASSES : DEFAULT_ITEM_CLASSES}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Input 2: Dynamic (Marque OR Articles) - COMBOBOX/DROPDOWN */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group" ref={brandRef}>
              {isAccessoryMode ? (
                 <ShoppingBag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              ) : (
                 <Tag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              )}
              
              <div className="flex-1 relative">
                {isAccessoryMode ? (
                  <>
                    <button 
                      onClick={() => setIsAccessoryOpen(!isAccessoryOpen)}
                      className="w-full text-left bg-transparent outline-none text-gray-700 font-bold cursor-pointer pr-8 truncate"
                    >
                      {accessoryCategory || "Articles"}
                    </button>
                    {isAccessoryOpen && (
                      <div className={POPUP_CLASSES}>
                        {accessoryTypes.map((acc) => (
                          <button
                            key={acc}
                            onClick={() => { setAccessoryCategory(acc); setIsAccessoryOpen(false); }}
                            className={`${ITEM_CLASSES} ${accessoryCategory === acc ? ACTIVE_ITEM_CLASSES : DEFAULT_ITEM_CLASSES}`}
                          >
                            {acc}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
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
                      <div className={POPUP_CLASSES}>
                        {filteredBrands.length > 0 ? filteredBrands.map((b) => (
                          <button
                            key={b}
                            onClick={() => { setBrand(b); setBrandSearch(b); setIsBrandOpen(false); setModel(""); setModelSearch(""); }}
                            className={`${ITEM_CLASSES} ${brand === b ? ACTIVE_ITEM_CLASSES : DEFAULT_ITEM_CLASSES}`}
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
                <ChevronDown className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 ${(isBrandOpen || isAccessoryOpen) ? 'rotate-180' : ''}`} />
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
                  <div className={POPUP_CLASSES}>
                    {filteredModels.length > 0 ? filteredModels.map((m) => (
                      <button
                        key={m}
                        onClick={() => { setModel(m); setModelSearch(m); setIsModelOpen(false); }}
                        className={`${ITEM_CLASSES} ${model === m ? ACTIVE_ITEM_CLASSES : DEFAULT_ITEM_CLASSES}`}
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

            {/* Input 4: Location - CUSTOM DROPDOWN */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group" ref={locationRef}>
              <MapPin className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${location === "Ma position" ? "text-primary-600" : "text-gray-400"}`} />
              <div className="flex-1 relative">
                <button 
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className={`w-full text-left bg-transparent outline-none font-bold pr-8 truncate ${location === "Ma position" ? "text-primary-600" : "text-gray-700"}`}
                >
                  {location || "Où ça ?"}
                </button>
                
                {isLocating ? (
                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2"><div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                  <ChevronDown className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
                )}

                {isLocationOpen && (
                  <div className={POPUP_CLASSES}>
                    <button
                      onClick={handleLocationRequest}
                      className={`${ITEM_CLASSES} text-primary-600 flex items-center gap-2 hover:bg-primary-50`}
                    >
                      <Navigation size={14} className="fill-current" />
                      Autour de moi
                    </button>
                    <div className="mx-5 my-2 border-t border-gray-100"></div>
                    {tunisianCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => { setLocation(city); setIsLocationOpen(false); }}
                        className={`${ITEM_CLASSES} ${location === city ? ACTIVE_ITEM_CLASSES : DEFAULT_ITEM_CLASSES}`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
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