
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

// Brand Logo Mapping (using Wikipedia/Commons stable URLs)
const brandLogos: Record<string, string> = {
  "Yamaha": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Yamaha_Motor_Logo_%28full%29.svg",
  "Honda": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
  "Kawasaki": "https://upload.wikimedia.org/wikipedia/commons/9/99/Kawasaki.svg",
  "BMW": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  "KTM": "https://upload.wikimedia.org/wikipedia/commons/a/a2/KTM_logo.svg",
  "Suzuki": "https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg",
  "Ducati": "https://upload.wikimedia.org/wikipedia/commons/3/30/Ducati_red_logo.svg",
  "Triumph": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Triumph_Motorcycles_Logo.svg",
  "Sym": "https://upload.wikimedia.org/wikipedia/commons/8/81/Sym_Motors_logo.svg",
  "Piaggio": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Piaggio_Logo.svg",
  "Peugeot": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Peugeot_Logo.svg",
  "Aprilia": "https://upload.wikimedia.org/wikipedia/commons/9/99/Aprilia_logo.svg",
  "Benelli": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Benelli_logo.svg",
  // Zontes and others will fallback to text if URL is invalid or missing
};

const BrandCard = ({ brand, onClick }: { brand: string, onClick: () => void }) => {
  const [imageError, setImageError] = useState(false);
  const logoUrl = brandLogos[brand];

  return (
    <button 
      onClick={onClick}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300 group flex flex-col items-center justify-center gap-6 aspect-[4/3] relative overflow-hidden"
    >
        <div className="flex-1 flex items-center justify-center w-full px-4">
            {logoUrl && !imageError ? (
                <img 
                    src={logoUrl} 
                    alt={`${brand} logo`} 
                    className="max-h-16 w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110" 
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    <span className="text-3xl font-black">{brand.charAt(0)}</span>
                </div>
            )}
        </div>
        <span className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{brand}</span>
        
        {/* Decorative background blob on hover */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap mb-8 no-scrollbar">
            <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors flex-shrink-0">
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 flex-shrink-0" />
            <span className="font-semibold text-gray-900 flex-shrink-0">Fiches Techniques</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Toutes les marques
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Retrouvez toutes les fiches techniques, caractéristiques et performances des motos et scooters du marché.
            </p>
            
            <div className="relative max-w-lg mx-auto group">
               <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-primary-100 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Rechercher une marque..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-14 pr-6 py-5 rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-lg font-medium placeholder:text-gray-400"
                   />
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-500 transition-colors" size={24} />
               </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBrands.map((brand) => (
                <BrandCard 
                    key={brand} 
                    brand={brand} 
                    onClick={() => onNavigate?.('tech-specs-models', { brand })} 
                />
            ))}
        </div>

        {filteredBrands.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 mt-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Bike size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune marque trouvée</h3>
                <p className="text-gray-500">Essayez une autre recherche pour "{searchQuery}".</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default TechSpecsBrands;
