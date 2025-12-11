
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Plus, Heart, User, Filter, LogOut, Settings, LayoutDashboard, List, ChevronDown } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface HeaderProps {
  variant?: 'transparent' | 'white';
  onNavigate?: (view: string, params?: any) => void;
  onGoHome?: () => void;
  onMobileFilterOpen?: () => void; // Optional for SearchResults
  showMobileFilter?: boolean;
  hideSellButton?: boolean;
  
  // Auth Props
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  variant = 'transparent', 
  onNavigate, 
  onGoHome,
  onMobileFilterOpen,
  showMobileFilter = false,
  hideSellButton = false,
  isLoggedIn = false,
  onTriggerLogin,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNewsMenuOpen, setIsNewsMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const newsMenuRef = useRef<HTMLDivElement>(null);
  
  // Get favorites count
  const { favoritesCount } = useFavorites();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (newsMenuRef.current && !newsMenuRef.current.contains(event.target as Node)) {
        setIsNewsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (view: string, params?: any) => {
    setIsMobileMenuOpen(false);
    setIsNewsMenuOpen(false);
    if (onNavigate) onNavigate(view, params);
  };

  const handleDepositClick = () => {
    if (isLoggedIn) {
      onNavigate?.('deposit');
    } else {
      onTriggerLogin?.();
    }
  };

  const isTransparent = variant === 'transparent';
  const textColor = isTransparent ? 'text-white' : 'text-primary-600';
  const navTextColor = isTransparent ? 'text-white' : 'text-gray-600';
  const navHoverColor = isTransparent ? 'hover:text-white/80' : 'hover:text-primary-600';

  return (
    <>
      <header 
        className={`w-full z-50 ${isTransparent ? 'absolute top-0 left-0' : 'bg-white border-b border-gray-200 sticky top-0 shadow-sm'}`} 
        role="banner"
      >
        <div className="px-6 md:px-20 lg:px-32">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 md:py-8">
            {/* Logo */}
            <button 
              className="flex items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl p-1" 
              onClick={onGoHome}
              aria-label="MotoScoot.tn - Retour à l'accueil"
            >
              <span className={`${textColor} font-extrabold text-2xl tracking-tight`}>
                MotoScoot.tn
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
              <div className="flex items-center gap-6">
                <button onClick={() => onNavigate?.('search')} className={`${navTextColor} font-medium text-sm ${navHoverColor} transition-colors focus:outline-none focus:underline`}>Annonces</button>
                
                {/* News Dropdown */}
                <div className="relative" ref={newsMenuRef}>
                    <button 
                        onClick={() => setIsNewsMenuOpen(!isNewsMenuOpen)}
                        className={`flex items-center gap-1 ${navTextColor} font-medium text-sm ${navHoverColor} transition-colors focus:outline-none focus:underline`}
                    >
                        Actualités <ChevronDown size={14} className={`transition-transform duration-200 ${isNewsMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isNewsMenuOpen && (
                        <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-left overflow-hidden">
                            <button 
                                onClick={() => handleNavClick('news')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors block"
                            >
                                Actualités & Essais
                            </button>
                            <button 
                                onClick={() => handleNavClick('tech-specs-brands')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors block"
                            >
                                Fiches Techniques
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={() => onNavigate?.('garages')} className={`${navTextColor} font-medium text-sm ${navHoverColor} transition-colors focus:outline-none focus:underline`}>Garages</button>
                <button onClick={() => onNavigate?.('tips')} className={`${navTextColor} font-medium text-sm ${navHoverColor} transition-colors focus:outline-none focus:underline`}>Conseils</button>
                <button onClick={() => onNavigate?.('contact')} className={`${navTextColor} font-medium text-sm ${navHoverColor} transition-colors focus:outline-none focus:underline`}>Contact</button>
              </div>

              {isTransparent ? <div className="h-6 w-px bg-white/30" aria-hidden="true"></div> : <div className="h-6 w-px bg-gray-200" aria-hidden="true"></div>}

              {/* Action Buttons */}
              <div className="flex items-center gap-6">
                
                {isLoggedIn ? (
                  // LOGGED IN STATE
                  <div className="relative" ref={userMenuRef}>
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center gap-3 p-1 rounded-full transition-all focus:outline-none focus:ring-2 ${isTransparent ? 'hover:bg-white/10 focus:ring-white' : 'hover:bg-gray-50 focus:ring-primary-500'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md">
                        JD
                      </div>
                      <span className={`hidden md:block font-bold text-sm ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
                        John Doe
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                          <p className="text-sm font-bold text-gray-900">John Doe</p>
                          <p className="text-xs text-gray-500">john.doe@example.com</p>
                        </div>
                        
                        <button 
                          onClick={() => { setIsUserMenuOpen(false); onNavigate?.('dashboard', { tab: 'overview' }); }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Tableau de bord
                        </button>
                        <button 
                          onClick={() => { setIsUserMenuOpen(false); onNavigate?.('dashboard', { tab: 'listings' }); }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                        >
                          <List size={16} />
                          Mes annonces
                        </button>
                        <button 
                          onClick={() => { setIsUserMenuOpen(false); onNavigate?.('favorites'); }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                        >
                          <Heart size={16} />
                          Mes favoris
                          {favoritesCount > 0 && (
                            <span className="ml-auto bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{favoritesCount}</span>
                          )}
                        </button>
                        <button 
                          onClick={() => { setIsUserMenuOpen(false); onNavigate?.('dashboard', { tab: 'settings' }); }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                        >
                          <Settings size={16} />
                          Paramètres
                        </button>
                        
                        <div className="border-t border-gray-50 mt-2 pt-2">
                          <button 
                            onClick={() => { setIsUserMenuOpen(false); onLogout?.(); }}
                            className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          >
                            <LogOut size={16} />
                            Déconnexion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // VISITOR STATE
                  <div className="flex items-center gap-4">
                     <button 
                       onClick={() => onNavigate?.('favorites')}
                       className={`flex items-center gap-2 text-sm font-bold ${isTransparent ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-primary-600'} transition-colors focus:outline-none group`}
                     >
                       <div className="relative">
                         <Heart size={20} className={favoritesCount > 0 ? "fill-white/30" : ""} />
                         {favoritesCount > 0 && (
                           <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-[10px] rounded-full flex items-center justify-center">
                             {favoritesCount}
                           </span>
                         )}
                       </div>
                       <span className="hidden xl:inline">Favoris</span>
                     </button>

                     <button 
                       onClick={onTriggerLogin}
                       className={`text-sm font-bold ${isTransparent ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-primary-600'} transition-colors focus:outline-none focus:underline`}
                     >
                       Se connecter
                     </button>
                  </div>
                )}

                <button 
                  onClick={handleDepositClick}
                  className={`flex items-center gap-2 text-sm font-bold py-2.5 px-5 rounded-full transition-all backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-primary-500/30 ${isTransparent ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg active:scale-95'}`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Déposer une annonce</span>
                </button>
              </div>
            </nav>

            {/* Mobile/Tablet Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
                {showMobileFilter && (
                    <button 
                      onClick={onMobileFilterOpen}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Ouvrir les filtres"
                    >
                      <Filter className="w-6 h-6" />
                    </button>
                )}
                
                {/* Mobile Quick Sell Button (Text Version) */}
                {!hideSellButton && (
                  <button 
                    onClick={handleDepositClick}
                    className="bg-white text-primary-600 px-3 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white mr-1 whitespace-nowrap"
                  >
                    Vendre
                  </button>
                )}

                <button 
                  className={`${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900'} p-2 rounded-full transition-colors focus:outline-none focus:ring-2 ${isTransparent ? 'focus:ring-white' : 'focus:ring-primary-500'}`} 
                  aria-label="Ouvrir le menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-8 h-8 md:w-9 md:h-9" />
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-white flex flex-col animate-fade-in-up overflow-hidden" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Menu principal"
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white shadow-sm z-10">
            <button 
              className="flex items-center cursor-pointer focus:outline-none" 
              onClick={() => { setIsMobileMenuOpen(false); onGoHome?.(); }}
            >
              <span className="text-gray-900 font-extrabold text-xl tracking-tight">
                MotoScoot.tn
              </span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Fermer le menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Scrollable Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6 justify-center items-center">
             <button onClick={() => { handleNavClick('home'); onGoHome?.(); }} className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.1s`, opacity: 0 }}>Accueil</button>
             <button onClick={() => handleNavClick('search')} className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.2s`, opacity: 0 }}>Annonces</button>
             
             {/* Mobile News Split */}
             <div className="flex flex-col gap-4 w-full items-center">
                 <button onClick={() => handleNavClick('news')} className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.3s`, opacity: 0 }}>Actualités</button>
                 <button onClick={() => handleNavClick('tech-specs-brands')} className="text-lg font-bold text-gray-500 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.35s`, opacity: 0 }}>Fiches Techniques</button>
             </div>

             <button onClick={() => handleNavClick('garages')} className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.4s`, opacity: 0 }}>Garages</button>
             <button onClick={() => handleNavClick('tips')} className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.45s`, opacity: 0 }}>Conseils</button>
             <button onClick={() => handleNavClick('contact')} className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors block text-center focus:outline-none focus:text-primary-600" style={{ animation: `fadeInUp 0.5s ease-out forwards 0.5s`, opacity: 0 }}>Contact</button>
          </nav>

          {/* Sticky Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4 safe-area-bottom">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); handleDepositClick(); }}
              className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/30"
            >
              <Plus className="w-5 h-5" />
              <span>Déposer une annonce</span>
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('favorites'); }}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm active:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                 <Heart className={`w-5 h-5 ${favoritesCount > 0 ? "fill-primary-600 text-primary-600" : ""}`} />
                 <span>Favoris {favoritesCount > 0 && `(${favoritesCount})`}</span>
              </button>
              
              {isLoggedIn ? (
                <button 
                   onClick={() => { setIsMobileMenuOpen(false); handleNavClick('dashboard', { tab: 'overview' }); }}
                   className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm active:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                   <LayoutDashboard className="w-5 h-5" />
                   <span>Dashboard</span>
                </button>
              ) : (
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onTriggerLogin?.(); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm active:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                   <User className="w-5 h-5" />
                   <span>Connexion</span>
                </button>
              )}
            </div>
            
            {isLoggedIn && (
               <button 
                  onClick={() => { setIsMobileMenuOpen(false); onLogout?.(); }}
                  className="w-full text-center text-sm font-bold text-red-500 py-2 hover:bg-red-50 rounded-lg transition-colors"
               >
                 Se déconnecter
               </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
