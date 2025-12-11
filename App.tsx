
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import PopularModels from './components/PopularModels';
import PopularGarages from './components/PopularGarages';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import News from './components/News';
import Garages from './components/Garages';
import Tips from './components/Tips';
import Contact from './components/Contact';
import LoginModal from './components/auth/LoginModal';
import ListingDetails from './components/ListingDetails';
import ArticleDetails from './components/ArticleDetails';
import TipDetails from './components/TipDetails';
import DepositAd from './components/DepositAd';
import GarageDetails from './components/GarageDetails';
import Favorites from './components/Favorites';
import Dashboard from './components/Dashboard';
import SuperAdminDashboard from './components/admin/SuperAdminDashboard';
import TechSpecsBrands from './components/TechSpecsBrands';
import TechSpecsModels from './components/TechSpecsModels';
import TechSpecsDetails from './components/TechSpecsDetails';
import { FavoritesProvider } from './context/FavoritesContext';

type ViewState = 'home' | 'search' | 'news' | 'garages' | 'tips' | 'contact' | 'listing-details' | 'article-details' | 'tip-details' | 'deposit' | 'garage-details' | 'favorites' | 'dashboard' | 'super-admin' | 'tech-specs-brands' | 'tech-specs-models' | 'tech-specs-details';

const App: React.FC = () => {
  // Initialize state from history to handle refreshes correctly
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    if (typeof window !== 'undefined' && window.history.state?.view) {
      return window.history.state.view;
    }
    return 'home';
  });

  const [selectedListingId, setSelectedListingId] = useState<number | null>(() => {
    return typeof window !== 'undefined' ? window.history.state?.id || null : null;
  });

  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(() => {
    return typeof window !== 'undefined' && window.history.state?.view === 'article-details' ? window.history.state.id : null;
  });

  const [selectedTipId, setSelectedTipId] = useState<number | null>(() => {
    return typeof window !== 'undefined' && window.history.state?.view === 'tip-details' ? window.history.state.id : null;
  });

  const [selectedGarageId, setSelectedGarageId] = useState<number | null>(() => {
    return typeof window !== 'undefined' && window.history.state?.view === 'garage-details' ? window.history.state.id : null;
  });

  // Tech Specs State
  const [selectedTechBrand, setSelectedTechBrand] = useState<string | null>(() => {
    return typeof window !== 'undefined' && window.history.state?.brand ? window.history.state.brand : null;
  });
  const [selectedTechSpecId, setSelectedTechSpecId] = useState<number | null>(() => {
    return typeof window !== 'undefined' && window.history.state?.view === 'tech-specs-details' ? window.history.state.id : null;
  });

  const [dashboardTab, setDashboardTab] = useState<'overview' | 'listings' | 'settings'>(() => {
    return typeof window !== 'undefined' && window.history.state?.tab ? window.history.state.tab : 'overview';
  });
  
  // Search State to pass from Hero to SearchResults
  const [searchFilters, setSearchFilters] = useState<any>(null);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New Admin State

  // History State Handling
  useEffect(() => {
    // Initial State Push if history is empty
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
        // Restore specific IDs if present in state
        if (event.state.id) {
           if (event.state.view === 'listing-details') setSelectedListingId(event.state.id);
           if (event.state.view === 'article-details') setSelectedArticleId(event.state.id);
           if (event.state.view === 'tip-details') setSelectedTipId(event.state.id);
           if (event.state.view === 'garage-details') setSelectedGarageId(event.state.id);
           if (event.state.view === 'tech-specs-details') setSelectedTechSpecId(event.state.id);
        }
        if (event.state.brand && event.state.view === 'tech-specs-models') {
            setSelectedTechBrand(event.state.brand);
        }
        // Restore Dashboard Tab
        if (event.state.view === 'dashboard' && event.state.tab) {
            setDashboardTab(event.state.tab);
        } else {
            setDashboardTab('overview');
        }
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll Restoration Logic
  useEffect(() => {
    // Basic scroll to top on view change, except for back navigation which is handled by browser partially
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [currentView]);

  const navigateTo = (view: ViewState, params?: any) => {
    // Update State
    if (view === 'listing-details' && params?.id) setSelectedListingId(params.id);
    if (view === 'article-details' && params?.id) setSelectedArticleId(params.id);
    if (view === 'tip-details' && params?.id) setSelectedTipId(params.id);
    if (view === 'garage-details' && params?.id) setSelectedGarageId(params.id);
    if (view === 'tech-specs-models' && params?.brand) setSelectedTechBrand(params.brand);
    if (view === 'tech-specs-details' && params?.id) setSelectedTechSpecId(params.id);
    
    if (view === 'dashboard' && params?.tab) setDashboardTab(params.tab);
    else if (view === 'dashboard') setDashboardTab('overview');
    
    setCurrentView(view);

    // Push History
    window.history.pushState({ view, ...params }, '', '');
  };

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    navigateTo('search');
  };

  // Handlers
  const handleLogin = (role: 'user' | 'admin' = 'user') => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    if (role === 'admin') {
      setIsAdmin(true);
      navigateTo('super-admin');
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigateTo('home');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <FavoritesProvider>
      {(currentView === 'super-admin' && isAdmin) ? (
        <SuperAdminDashboard 
          onGoHome={() => navigateTo('home')}
          onLogout={handleLogout}
        />
      ) : (
        <div className="w-full min-h-screen bg-white">
          {/* Auth Modal */}
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleLogin}
          />

          {/* Conditionally Render Views */}
          {currentView === 'home' ? (
            <>
              <Hero 
                onSearch={handleSearch} 
                onNavigate={(view) => navigateTo(view as ViewState)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <PopularModels onNavigate={(view) => navigateTo(view as ViewState)} />
              <PopularGarages onNavigate={(view) => navigateTo(view as ViewState)} />
              <Reviews />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'search' ? (
            <>
              <SearchResults 
                initialFilters={searchFilters}
                onGoHome={() => navigateTo('home')} 
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'news' ? (
            <>
              <News 
                onGoHome={() => navigateTo('home')} 
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'garages' ? (
            <>
              <Garages 
                onGoHome={() => navigateTo('home')} 
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'tips' ? (
            <>
              <Tips 
                onGoHome={() => navigateTo('home')} 
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'contact' ? (
            <>
              <Contact 
                onGoHome={() => navigateTo('home')} 
                onNavigate={(view) => navigateTo(view as ViewState)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'listing-details' ? (
            <>
              <ListingDetails 
                listingId={selectedListingId || 1}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                onBack={() => navigateTo('search')}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'article-details' ? (
            <>
              <ArticleDetails 
                articleId={selectedArticleId || 1}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                onBack={() => navigateTo('news')}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'tip-details' ? (
            <>
              <TipDetails 
                tipId={selectedTipId || 1}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                onBack={() => navigateTo('tips')}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'garage-details' ? (
            <>
              <GarageDetails 
                garageId={selectedGarageId || 1}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                onBack={() => navigateTo('garages')}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'deposit' ? (
            <>
              <DepositAd
                onGoHome={() => navigateTo('home')}
                onNavigate={(view) => navigateTo(view as ViewState)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'favorites' ? (
            <>
              <Favorites
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'dashboard' ? (
            <>
              <Dashboard
                initialTab={dashboardTab}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'tech-specs-brands' ? (
            <>
              <TechSpecsBrands
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'tech-specs-models' ? (
            <>
              <TechSpecsModels
                brand={selectedTechBrand || 'Yamaha'}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : currentView === 'tech-specs-details' ? (
            <>
              <TechSpecsDetails
                specId={selectedTechSpecId || 1}
                onGoHome={() => navigateTo('home')}
                onNavigate={(view, params) => navigateTo(view as ViewState, params)}
                onBack={() => navigateTo('tech-specs-brands')} // Basic back behavior, can be refined
                isLoggedIn={isLoggedIn}
                onTriggerLogin={openLoginModal}
                onLogout={handleLogout}
              />
              <Footer onNavigate={(view) => navigateTo(view as ViewState)} />
            </>
          ) : null}
        </div>
      )}
    </FavoritesProvider>
  );
};

export default App;
