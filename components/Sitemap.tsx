import React from 'react';
import { Home, ChevronRight, Map, Bike, Wrench, FileText, User, ShieldCheck, ShoppingBag, Zap, HelpCircle } from 'lucide-react';
import Header from './layout/Header';

interface SitemapProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const SitemapSection = ({ title, icon: Icon, links, onNavigate }: { title: string, icon: any, links: { label: string, view: string, params?: any }[], onNavigate?: any }) => (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Icon size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <ul className="space-y-3">
            {links.map((link, idx) => (
                <li key={idx}>
                    <button 
                        onClick={() => onNavigate?.(link.view, link.params)}
                        className="text-gray-500 hover:text-primary-600 font-medium text-sm flex items-center gap-2 transition-colors group"
                    >
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-primary-400 transition-colors" />
                        {link.label}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

const Sitemap: React.FC<SitemapProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const sections = [
    {
      title: "Le Marché",
      icon: ShoppingBag,
      links: [
        { label: "Accueil", view: "home" },
        { label: "Toutes les annonces", view: "search" },
        { label: "Motos d'occasion", view: "search", params: { type: 'Moto' } },
        { label: "Scooters", view: "search", params: { type: 'Scooter' } },
        { label: "Accessoires & Équipements", view: "search", params: { type: 'Accessoires' } },
        { label: "Déposer une annonce", view: "deposit" },
      ]
    },
    {
      title: "Services & Pro",
      icon: Wrench,
      links: [
        { label: "Garages & Ateliers", view: "garages" },
        { label: "Trouver un mécanicien", view: "garages" },
        { label: "Espace Professionnel", view: "contact" },
        { label: "Devenir Partenaire", view: "contact", params: { subject: 'partnership' } },
      ]
    },
    {
      title: "Contenu & Info",
      icon: FileText,
      links: [
        { label: "Actualités & Essais", view: "news" },
        { label: "Guide & Conseils", view: "tips" },
        { label: "Fiches Techniques", view: "tech-specs-brands" },
        { label: "FAQ - Aide", view: "faq" },
        { label: "À propos de MotoScoot", view: "about" },
        { label: "Contactez-nous", view: "contact" },
      ]
    },
    {
      title: "Espace Personnel",
      icon: User,
      links: [
        { label: "Mon tableau de bord", view: "dashboard", params: { tab: 'overview' } },
        { label: "Mes annonces en ligne", view: "dashboard", params: { tab: 'listings' } },
        { label: "Mes favoris", view: "favorites" },
        { label: "Paramètres du compte", view: "dashboard", params: { tab: 'settings' } },
        { label: "Se connecter / S'inscrire", view: "home" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      
      {/* HERO SECTION - Identique à la page Garages */}
      <div className="relative w-full h-[35vh] md:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
        {/* Background Container */}
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
              Plan du site
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up opacity-90" style={{ animationDelay: '100ms' }}>
              Retrouvez toutes les pages de MotoScoot.tn en un clin d'œil.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-12">
            <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">Plan du site</span>
        </nav>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {sections.map((section, idx) => (
                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <SitemapSection 
                        title={section.title} 
                        icon={section.icon} 
                        links={section.links} 
                        onNavigate={onNavigate}
                    />
                </div>
            ))}
        </div>

        {/* Legal Section Footer Area */}
        <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-gray-400" size={20} />
                        <span className="text-sm font-bold text-gray-900">Légal & Sécurité</span>
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                        <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Mentions Légales</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Conditions Générales</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Confidentialité</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Politique Cookies</a>
                    </div>
                </div>
                <div className="w-full md:w-auto">
                    <button 
                        onClick={onGoHome}
                        className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>

      </div>

    </div>
  );
};

export default Sitemap;