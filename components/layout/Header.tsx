import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Plus, 
  Heart, 
  User, 
  Filter, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  List, 
  ChevronDown,
  LogIn,
  UserPlus,
  Home,
  Newspaper,
  Bike,
  Wrench,
  Lightbulb,
  Mail,
  ChevronRight,
  HelpCircle,
  Layers
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface HeaderProps {
  variant?: 'transparent' | 'white';
  onNavigate?: (view: string, params?: any) => void;
  onGoHome?: () => void;
  onMobileFilterOpen?: () => void;
  showMobileFilter?: boolean;
  hideSellButton?: boolean;
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
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const newsMenuRef = useRef<HTMLDivElement>(null);
  
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const isSolid = variant === 'white' || isScrolled;
  
  const linkBaseClasses = `font-bold text-sm transition-colors duration-300 focus:outline-none focus:underline ${
    !isSolid ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-primary-600'
  }`;

  const headerIconButtonClasses = `flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 ${
    !isSolid ? 'text-white hover:bg-white/10 focus:ring-white' : 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500'
  }`;

  const LOGO_COLOR = "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-color.svg";
  const LOGO_WHITE = "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-white.svg";

  // Navigation Mobile Helper
  const MobileNavItem = ({ icon: Icon, label, onClick, subLabel }: any) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 group active:bg-gray-50 transition-colors rounded-xl px-2"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-active:bg-primary-50 group-active:text-primary-600 transition-colors">
          <Icon size={20} />
        </div>
        <div className="text-left">
          <span className="block text-base font-bold text-gray-900 leading-tight">{label}</span>
          {subLabel && <span className="block text-xs text-gray-400 font-medium">{subLabel}</span>}
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-active:text-primary-600 transition-colors" />
    </button>
  );

  return (
    <>
      <header 
        className={`w-full z-50 fixed top-0 left-0 transition-all duration-300 ${
          isSolid 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-1' 
            : 'bg-transparent border-transparent py-2'
        }`} 
        role="banner"
      >
        <div className="px-6 md:px-20 lg:px-32">
          <div className={`w-full max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3 md:py-4'}`}>
            <button 
              className="flex items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl" 
              onClick={onGoHome}
              aria-label="Retour à l'accueil"
            >
              <img 
                src={isSolid ? LOGO_COLOR : LOGO_WHITE} 
                alt="MotoScoot.tn" 
                className={`h-6 md:h-7 w-auto object-contain transition-all duration-500 group-hover:opacity-90`}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                <button onClick={() => onNavigate?.('search')} className={linkBaseClasses}>Annonces</button>
                <div className="relative" ref={newsMenuRef}>
                    <button onClick={() => setIsNewsMenuOpen(!isNewsMenuOpen)} className={`flex items-center gap-1 ${linkBaseClasses}`}>
                        Actualités <ChevronDown size={14} className={`transition-transform duration-300 ${isNewsMenuOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                    </button>
                    {isNewsMenuOpen && (
                        <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-left overflow-hidden z-20">
                            <button onClick={() => handleNavClick('news')} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors block">Actualités & Essais</button>
                            <button onClick={() => handleNavClick('tech-specs-brands')} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors block">Fiches Techniques</button>
                        </div>
                    )}
                </div>
                <button onClick={() => onNavigate?.('garages')} className={linkBaseClasses}>Garages</button>
                <button onClick={() => onNavigate?.('tips')} className={linkBaseClasses}>Conseils</button>
                <button onClick={() => onNavigate?.('contact')} className={linkBaseClasses}>Contact</button>
              </div>
              <div className={`h-6 w-px transition-colors duration-300 ${!isSolid ? 'bg-white/30' : 'bg-gray-200'}`} aria-hidden="true"></div>
              <div className="flex items-center gap-6">
                {isLoggedIn ? (
                  <>
                    <button onClick={() => onNavigate?.('favorites')} className={headerIconButtonClasses}>
                        <div className="relative">
                            <Heart size={20} className={favoritesCount > 0 ? "fill-current text-red-500" : ""} />
                            {favoritesCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">{favoritesCount}</span>}
                        </div>
                    </button>
                    <div className="relative" ref={userMenuRef}>
                      <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className={`flex items-center gap-3 p-1 rounded-full transition-all focus:outline-none focus:ring-2 ${!isSolid ? 'hover:bg-white/10 focus:ring-white' : 'hover:bg-gray-100 focus:ring-primary-500'}`}>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md text-xs">JD</div>
                        <span className={`hidden md:block font-bold text-sm ${!isSolid ? 'text-white' : 'text-gray-900'}`}>John Doe</span>
                      </button>
                      {isUserMenuOpen && (
                        <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-right z-50">
                          <div className="px-4 py-3 border-b border-gray-50 mb-2">
                            <p className="text-sm font-bold text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500">john.doe@example.com</p>
                          </div>
                          <button onClick={() => { setIsUserMenuOpen(false); onNavigate?.('dashboard', { tab: 'overview' }); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"><LayoutDashboard size={16} /> Tableau de bord</button>
                          <button onClick={() => { setIsUserMenuOpen(false); onNavigate?.('dashboard', { tab: 'listings' }); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"><List size={16} /> Mes annonces</button>
                          <button onClick={() => { setIsUserMenuOpen(false); onNavigate?.('favorites'); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"><Heart size={16} /> Mes favoris</button>
                          <button onClick={() => { setIsUserMenuOpen(false); onNavigate?.('dashboard', { tab: 'settings' }); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"><Settings size={16} /> Paramètres</button>
                          <div className="border-t border-gray-50 mt-2 pt-2">
                            <button onClick={() => { setIsUserMenuOpen(false); onLogout?.(); }} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"><LogOut size={16} /> Déconnexion</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <button onClick={onTriggerLogin} className={headerIconButtonClasses}><LogIn size={20} /></button>
                    <button onClick={onTriggerLogin} className={headerIconButtonClasses}><UserPlus size={20} /></button>
                  </div>
                )}
                <button onClick={handleDepositClick} className={`flex items-center gap-2 text-sm font-bold py-2.5 px-5 rounded-xl transition-all backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-primary-500/30 ${!isSolid ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg active:scale-95'}`}><Plus className="w-4 h-4" /><span>Déposer une annonce</span></button>
              </div>
            </nav>

            {/* MOBILE HEADER BUTTONS */}
            <div className="flex items-center gap-2 lg:hidden">
                {showMobileFilter && (
                    <button onClick={onMobileFilterOpen} className={`p-2 rounded-lg transition-colors ${!isSolid ? 'text-white hover:bg-white/10' : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'}`}><Filter className="w-6 h-6" /></button>
                )}
                {!isLoggedIn && <button onClick={onTriggerLogin} className={headerIconButtonClasses}><User size={24} /></button>}
                <button className={`${!isSolid ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900'} p-2 rounded-full transition-colors`} onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-8 h-8 md:w-9 md:h-9" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU FULLSCREEN */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-fade-in-up" role="dialog" aria-modal="true">
          {/* Menu Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <button className="flex items-center" onClick={() => { setIsMobileMenuOpen(false); onGoHome?.(); }}>
              <img src={LOGO_COLOR} alt="MotoScoot.tn" className="h-5 w-auto" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full transition-all">
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Menu Content */}
          <nav className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
             {/* Section Marché */}
             <div className="mb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Le Marché</p>
                <div className="space-y-1">
                   <MobileNavItem icon={Home} label="Accueil" onClick={() => { handleNavClick('home'); onGoHome?.(); }} />
                   <MobileNavItem icon={Bike} label="Toutes les annonces" subLabel="Motos, Scooters, Accessoires" onClick={() => handleNavClick('search')} />
                   <MobileNavItem icon={Wrench} label="Garages & Ateliers" subLabel="Trouver un pro près de chez vous" onClick={() => handleNavClick('garages')} />
                </div>
             </div>

             {/* Section Découverte */}
             <div className="mb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Découverte</p>
                <div className="space-y-1">
                   <MobileNavItem icon={Newspaper} label="Actualités & Essais" subLabel="Les dernières nouveautés" onClick={() => handleNavClick('news')} />
                   <MobileNavItem icon={Layers} label="Fiches Techniques" subLabel="Spécifications détaillées" onClick={() => handleNavClick('tech-specs-brands')} />
                   <MobileNavItem icon={Lightbulb} label="Conseils & Guides" subLabel="Entretien et sécurité" onClick={() => handleNavClick('tips')} />
                </div>
             </div>

             {/* Section Assistance */}
             <div className="mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Assistance</p>
                <div className="space-y-1">
                   <MobileNavItem icon={HelpCircle} label="FAQ" onClick={() => handleNavClick('faq')} />
                   <MobileNavItem icon={Mail} label="Contact" onClick={() => handleNavClick('contact')} />
                </div>
             </div>
          </nav>

          {/* Menu Footer Sticky */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4 safe-area-bottom shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); handleDepositClick(); }}
              className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-primary-600/20 active:scale-[0.98] transition-all"
            >
              <Plus size={22} strokeWidth={3} />
              <span>DÉPOSER UNE ANNONCE</span>
            </button>
            
            {isLoggedIn ? (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('favorites'); }} className="flex flex-col items-center justify-center gap-1.5 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 active:bg-gray-50 transition-all shadow-sm">
                     <Heart className={`w-5 h-5 ${favoritesCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
                     <span className="text-xs uppercase tracking-tighter">Favoris ({favoritesCount})</span>
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); handleNavClick('dashboard', { tab: 'overview' }); }} className="flex flex-col items-center justify-center gap-1.5 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 active:bg-gray-50 transition-all shadow-sm">
                     <LayoutDashboard className="w-5 h-5 text-primary-600" />
                     <span className="text-xs uppercase tracking-tighter">Mon Compte</span>
                  </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { setIsMobileMenuOpen(false); onTriggerLogin?.(); }} className="flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 shadow-sm active:bg-gray-50 transition-all">
                    <LogIn size={18} className="text-primary-600" />
                    <span className="text-xs uppercase">Connexion</span>
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); onTriggerLogin?.(); }} className="flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 shadow-sm active:bg-gray-50 transition-all">
                    <UserPlus size={18} className="text-primary-600" />
                    <span className="text-xs uppercase">S'inscrire</span>
                  </button>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;