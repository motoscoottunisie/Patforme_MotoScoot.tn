import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Tag,
  Layers,
  ChevronDown,
  Bike,
  ShoppingBag // Added for accessories icon
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
  const [accessoryCategory, setAccessoryCategory] = useState(""); // New state for accessory type
  const [location, setLocation] = useState("");

  // Reset dependent fields when Type changes
  useEffect(() => {
    setBrand("");
    setModel("");
    setAccessoryCategory("");
  }, [type]);

  const handleSearchClick = () => {
    if (onSearch) {
      const isAccessory = type === 'Accessoires';
      onSearch({
        type,
        // If it's an accessory, pass the category as a search keyword to find matches
        search: isAccessory ? accessoryCategory : "", 
        brand: isAccessory ? "" : brand,
        model: isAccessory ? "" : model,
        location
      });
    }
  };

  const handleCategoryClick = (categoryLabel: string) => {
    if (onSearch) {
      const isAccessorySub = ["Casques", "Vestes", "Gants"].includes(categoryLabel);
      onSearch({
        type: isAccessorySub || categoryLabel === "Accessoires" ? "Accessoires" : categoryLabel,
        // If clicking a specific accessory icon, pre-fill the search
        search: isAccessorySub ? categoryLabel.slice(0, -1) : "", 
        brand: "",
        model: "",
        location: ""
      });
    }
  };

  const isAccessoryMode = type === 'Accessoires';

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

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col md:block h-full md:h-auto w-full max-w-7xl mx-auto md:space-y-16 justify-between md:justify-center pt-20 md:pt-0">
        
        {/* Top Section: Headline and Search */}
        <div className="flex-1 flex flex-col justify-center items-center w-full md:px-0 space-y-10 md:space-y-6 mt-12 md:mt-48">
          {/* Headline */}
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
          <div className="w-full max-w-5xl bg-white rounded-xl p-2 flex flex-col md:flex-row items-stretch md:items-center shadow-2xl">
            
            {/* Input 1: Type */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              <Bike className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <label htmlFor="search-type" className="sr-only">Type de véhicule</label>
                <select 
                  id="search-type" 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none"
                >
                  <option value="" disabled>Type</option>
                  <option value="Moto">Moto</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Accessoires">Accessoires</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Input 2: Dynamic (Marque OR Type d'accessoire) */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              {isAccessoryMode ? (
                 <ShoppingBag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              ) : (
                 <Tag className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              )}
              
              <div className="flex-1 relative">
                {isAccessoryMode ? (
                  /* Accessory Category Select */
                  <>
                    <label htmlFor="search-accessory-type" className="sr-only">Type d'accessoire</label>
                    <select 
                      id="search-accessory-type"
                      value={accessoryCategory}
                      onChange={(e) => setAccessoryCategory(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none"
                    >
                      <option value="" disabled>Articles</option>
                      {accessoryTypes.map((acc) => (
                        <option key={acc} value={acc}>{acc}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  /* Brand Select */
                  <>
                    <label htmlFor="search-brand" className="sr-only">Marque</label>
                    <select 
                      id="search-brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none"
                    >
                      <option value="" disabled>Marque</option>
                      {brandsMoto.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </>
                )}
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Input 3: Model (Disabled for Accessoires) */}
            <div className={`flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group ${isAccessoryMode ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}>
              <Layers className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <label htmlFor="search-model" className="sr-only">Modèle</label>
                <select 
                  id="search-model" 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={isAccessoryMode}
                  className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none disabled:cursor-not-allowed"
                >
                  <option value="" disabled>{isAccessoryMode ? '-' : 'Modèle'}</option>
                  {!isAccessoryMode && mockModels.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Input 4: Location */}
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <div className="flex-1 relative">
                <label htmlFor="search-city" className="sr-only">Ville</label>
                <select 
                  id="search-city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer pr-8 truncate focus:ring-0 border-none"
                >
                  <option value="" disabled>Ville</option>
                  {tunisianCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
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

        {/* Category Icons Slider - Hidden on Mobile */}
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