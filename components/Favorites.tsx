
import React from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Gauge, 
  Info, 
  ShieldCheck, 
  User,
  ArrowRight,
  Home,
  ChevronRight,
  Trash2
} from 'lucide-react';
import Header from './layout/Header';
import { useFavorites } from '../context/FavoritesContext';
import { mockListings } from '../data/mockData';

interface FavoritesProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const { favorites, toggleFavorite } = useFavorites();

  // Filter listings based on favorite IDs
  const savedListings = mockListings.filter(listing => favorites.listings.includes(listing.id));

  // Helper to get deal label and color
  const getDealInfo = (rating?: number) => {
    switch (rating) {
        case 3: return { label: 'Super affaire', color: 'bg-success-500', textColor: 'text-success-600', bgColor: 'bg-success-50' };
        case 2: return { label: 'Bonne affaire', color: 'bg-primary-500', textColor: 'text-primary-600', bgColor: 'bg-primary-50' };
        case 1: 
        default: return { label: 'Prix du marché', color: 'bg-gray-400', textColor: 'text-gray-500', bgColor: 'bg-gray-50' };
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

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
          <span className="font-semibold text-gray-900">Mes Favoris</span>
        </div>

        <div className="flex items-end justify-between mb-8">
           <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Ma sélection</h1>
              <p className="text-gray-500">Retrouvez ici toutes vos annonces sauvegardées.</p>
           </div>
           <div className="hidden md:block">
              <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-xl font-bold border border-primary-100">
                 {savedListings.length} annonce{savedListings.length > 1 ? 's' : ''}
              </span>
           </div>
        </div>

        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedListings.map((listing, index) => {
               const dealInfo = getDealInfo(listing.dealRating);
               
               return (
                <article 
                  key={listing.id}
                  onClick={() => onNavigate?.('listing-details', { id: listing.id })}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                      
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm border ${getBadgeStyle(listing.condition)} backdrop-blur-sm bg-opacity-90`}>
                            {listing.condition}
                        </span>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite('listing', listing.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-all shadow-sm z-10"
                        title="Retirer des favoris"
                      >
                          <Heart size={18} fill="currentColor" />
                      </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                              {listing.title}
                          </h3>
                          <span className="text-lg font-extrabold text-primary-600 whitespace-nowrap">
                              {listing.price}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-medium mt-1">
                            <MapPin size={12} className="mr-1 text-gray-400" />
                            <span className="truncate">{listing.location}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>{listing.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-semibold text-gray-600 my-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{listing.year}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gauge size={14} className="text-gray-400" />
                            <span>{listing.mileage}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Info size={14} className="text-gray-400" />
                            <span>{listing.cc}</span>
                          </div>
                      </div>

                      {/* Deal Rating */}
                      {listing.dealRating && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3].map(level => (
                                  <div 
                                    key={level} 
                                    className={`w-4 h-1 rounded-full ${listing.dealRating! >= level ? dealInfo.color : 'bg-gray-200'}`}
                                  ></div>
                                ))}
                            </div>
                            <span className={`text-[10px] font-bold uppercase ${dealInfo.textColor}`}>
                              {dealInfo.label}
                            </span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              {listing.sellerType === 'Pro' ? (
                                <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                   <ShieldCheck size={12} />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                   <User size={12} />
                                </div>
                              )}
                              <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{listing.seller}</span>
                          </div>
                          
                          <button 
                            className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate?.('listing-details', { id: listing.id });
                            }}
                          >
                            Voir l'annonce <ArrowRight size={12} />
                          </button>
                      </div>
                  </div>
                </article>
               );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-gray-300" />
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun favori pour le moment</h2>
             <p className="text-gray-500 max-w-md mx-auto mb-8">
               Parcourez les annonces et cliquez sur le cœur pour sauvegarder vos motos préférées et les retrouver ici.
             </p>
             <button 
               onClick={() => onNavigate?.('search')}
               className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform active:scale-95"
             >
               Explorer les annonces
             </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default Favorites;
