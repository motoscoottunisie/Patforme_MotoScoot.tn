import React from 'react';
import { Home, ChevronRight, Cookie, ShieldCheck, Settings, Info, MousePointer2 } from 'lucide-react';
import Header from './layout/Header';

interface CookiesProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Cookies: React.FC<CookiesProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[35vh] md:h-[30vh] lg:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
        <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
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
          onGoHome={onGoHome} 
          isLoggedIn={isLoggedIn}
          onTriggerLogin={onTriggerLogin}
          onLogout={onLogout}
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto h-full pt-20">
          <div className="text-center px-4 md:mt-32">
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up">
              Politique des Cookies
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up opacity-90" style={{ animationDelay: '100ms' }}>
              Transparence sur l'utilisation des technologies de suivi sur MotoScoot.tn.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        
        <nav className="flex items-center text-sm text-gray-500 mb-12">
            <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">Cookies</span>
        </nav>

        <article className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-12">
            
            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Cookie size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">1. Qu'est-ce qu'un cookie ?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone lors de la consultation d'un site web. Il permet au site de mémoriser vos actions et préférences (comme vos favoris, votre région, ou votre session de connexion) pendant un certain temps.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Info size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">2. Quels cookies utilisons-nous ?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-success-600" />
                            Essentiels
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Ces cookies sont nécessaires au fonctionnement du site. Ils permettent de gérer votre session, vos favoris et la sécurité de vos transactions. Ils ne peuvent pas être désactivés.
                        </p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <MousePointer2 size={18} className="text-primary-600" />
                            Performance
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Ils nous aident à comprendre comment les visiteurs utilisent le site (pages les plus vues, temps passé) afin d'améliorer l'expérience utilisateur globale.
                        </p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Settings size={18} className="text-blue-600" />
                            Fonctionnalités
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Ils mémorisent vos choix pour personnaliser votre navigation (par exemple, retenir votre dernière région de recherche).
                        </p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Cookie size={18} className="text-orange-600" />
                            Publicitaires
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Utilisés pour vous présenter des annonces et services partenaires pertinents par rapport à vos centres d'intérêt sur la moto.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Settings size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">3. Comment gérer vos choix ?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies ou être alerté de leur présence. Voici les guides pour les principaux navigateurs :
                </p>
                <ul className="grid grid-cols-2 gap-2 list-none p-0 text-sm font-bold">
                    <li><a href="#" className="text-primary-600 hover:underline">Google Chrome</a></li>
                    <li><a href="#" className="text-primary-600 hover:underline">Safari</a></li>
                    <li><a href="#" className="text-primary-600 hover:underline">Mozilla Firefox</a></li>
                    <li><a href="#" className="text-primary-600 hover:underline">Microsoft Edge</a></li>
                </ul>
                <p className="text-xs text-gray-400 italic">
                    Note : La désactivation de certains cookies peut altérer votre expérience sur MotoScoot.tn.
                </p>
            </section>

            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Dernière révision : Octobre 2025</span>
                </div>
                <button 
                    onClick={onGoHome}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2"
                >
                    <Home size={18} />
                    Retour à l'accueil
                </button>
            </div>

        </article>

      </div>

    </div>
  );
};

export default Cookies;