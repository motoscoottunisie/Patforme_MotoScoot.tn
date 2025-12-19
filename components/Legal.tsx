import React from 'react';
import { Home, ChevronRight, ShieldCheck, Mail, Building, Globe, MapPin } from 'lucide-react';
import Header from './layout/Header';

interface LegalProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Legal: React.FC<LegalProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
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
              Mentions Légales
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up opacity-90" style={{ animationDelay: '100ms' }}>
              Transparence et conformité pour votre sécurité sur MotoScoot.tn.
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
            <span className="font-semibold text-gray-900">Mentions Légales</span>
        </nav>

        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-12">
            
            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Building size={24} />
                    <h2 className="text-2xl font-black m-0">Éditeur du site</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Le site <strong>MotoScoot.tn</strong> est édité par la société <strong>Magma Studio S.U.A.R.L</strong>, au capital de 1 000 TND.<br />
                    Matricule Fiscal : 1234567/A/M/000<br />
                    Siège social : 3, Rue Mami, 2070, La Marsa.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Globe size={24} />
                    <h2 className="text-2xl font-black m-0">Hébergement</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Ce site est hébergé sur les serveurs de la société <strong>OVH Cloud</strong>.<br />
                    Adresse : 2 rue Kellermann - 59100 Roubaix - France.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <ShieldCheck size={24} />
                    <h2 className="text-2xl font-black m-0">Propriété Intellectuelle</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    L'ensemble des contenus (textes, graphismes, logos, sons, photos, animations) présents sur le site sont la propriété exclusive de MotoScoot.tn, sauf mention contraire. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary-600 mb-2">
                    <Mail size={24} />
                    <h2 className="text-2xl font-black m-0">Contact</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Pour toute question ou demande d'information concernant le site, vous pouvez nous contacter :
                </p>
                <ul className="list-none p-0 space-y-2">
                    <li className="flex items-center gap-3 text-gray-700">
                        <MapPin size={18} className="text-primary-500" />
                        3, Rue Mami, 2070, La Marsa
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Mail size={18} className="text-primary-500" />
                        contact@motoscoot.tn
                    </li>
                </ul>
            </section>

            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Dernière mise à jour : Octobre 2025</p>
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

export default Legal;