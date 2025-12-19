
import React from 'react';
import { Home, ChevronRight, Gavel, Scale, FileCheck, AlertCircle, UserCheck, ShieldCheck } from 'lucide-react';
import Header from './layout/Header';

interface TermsProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Terms: React.FC<TermsProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
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
              Conditions Générales
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up opacity-90" style={{ animationDelay: '100ms' }}>
              Règles d'utilisation et engagements mutuels sur MotoScoot.tn.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-12">
            <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">Conditions Générales</span>
        </nav>

        <article className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-12">
            
            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Scale size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">1. Objet du service</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    MotoScoot.tn est une plateforme numérique de mise en relation entre vendeurs (particuliers ou professionnels) et acheteurs de véhicules à deux roues (motos, scooters) et accessoires. MotoScoot.tn n'est en aucun cas partie prenante des transactions réalisées entre les utilisateurs.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <UserCheck size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">2. Obligations de l'annonceur</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    L'utilisateur s'engage à déposer des annonces véridiques et conformes à l'état réel du bien. Toute annonce contenant des informations mensongères, des photos ne correspondant pas au bien, ou des éléments illicites sera supprimée sans préavis. L'annonceur est seul responsable du contenu de ses publications.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <AlertCircle size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">3. Responsabilité</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    MotoScoot.tn décline toute responsabilité concernant :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>La qualité, la sécurité ou la licéité des véhicules mis en vente.</li>
                    <li>La véracité des informations fournies par les utilisateurs.</li>
                    <li>Tout litige survenant lors ou après une transaction.</li>
                    <li>Les interruptions techniques du site indépendantes de notre volonté.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <FileCheck size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">4. Propriété intellectuelle</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    L'utilisateur concède à MotoScoot.tn une licence non-exclusive et gratuite d'utiliser les photos et textes intégrés dans ses annonces pour les besoins de promotion du site. L'extraction massive de données ("scraping") est strictement interdite.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Gavel size={24} />
                    <h2 className="text-2xl font-black m-0 text-gray-900">5. Droit applicable et litiges</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Les présentes conditions sont soumises au droit tunisien. En cas de litige relatif à l'utilisation du site, et à défaut d'accord amiable, les tribunaux de Tunis seront seuls compétents.
                </p>
            </section>

            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Version 2.0 - Octobre 2025</span>
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

export default Terms;
