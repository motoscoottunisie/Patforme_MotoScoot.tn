
import React from 'react';
import { Home, ChevronRight, ShieldCheck, AlertTriangle, UserCheck, Smartphone, Eye, Mail } from 'lucide-react';
import Header from './layout/Header';

interface SecurityProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Security: React.FC<SecurityProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
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
              Sécurité & Confiance
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up opacity-90" style={{ animationDelay: '100ms' }}>
              Nos conseils pour acheter et vendre votre moto en toute sérénité.
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
            <span className="font-semibold text-gray-900">Sécurité</span>
        </nav>

        <div className="space-y-8">
            
            {/* Section 1: Acheteurs */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 text-primary-600 mb-6">
                    <UserCheck size={28} />
                    <h2 className="text-2xl font-black m-0">Conseils pour les acheteurs</h2>
                </div>
                <ul className="space-y-6 text-gray-600 leading-relaxed list-none p-0">
                    <li className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                        <p><strong>Ne versez jamais d'acompte :</strong> N'envoyez jamais d'argent (mandat minute, virement, etc.) avant d'avoir vu la moto et vérifié les papiers originaux.</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                        <p><strong>Privilégiez les lieux publics :</strong> Donnez rendez-vous au vendeur dans un lieu fréquenté et de jour pour inspecter le véhicule.</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                        <p><strong>Vérifiez le numéro de châssis :</strong> Assurez-vous que le numéro gravé sur le cadre correspond exactement à celui de la carte grise.</p>
                    </li>
                </ul>
            </div>

            {/* Section 2: Vendeurs */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 text-primary-600 mb-6">
                    <Smartphone size={28} />
                    <h2 className="text-2xl font-black m-0">Conseils pour les vendeurs</h2>
                </div>
                <ul className="space-y-6 text-gray-600 leading-relaxed list-none p-0">
                    <li className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                        <p><strong>Méfiez-vous des offres trop rapides :</strong> Un acheteur qui ne pose aucune question technique et veut conclure l'affaire immédiatement peut être suspect.</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                        <p><strong>Essai routier :</strong> Si l'acheteur souhaite essayer la moto, demandez une pièce d'identité originale en caution et restez à proximité.</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                        <p><strong>Paiement sécurisé :</strong> Privilégiez le chèque de banque (vérifié auprès de la banque émettrice) ou le virement instantané vérifié sur votre application bancaire.</p>
                    </li>
                </ul>
            </div>

            {/* Section 3: Signalement */}
            <div className="bg-neutral-900 p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/20 blur-[80px] rounded-full"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <AlertTriangle className="text-primary-500" size={32} />
                        <h2 className="text-2xl md:text-3xl font-black m-0">Signaler un comportement suspect</h2>
                    </div>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Si vous remarquez une annonce frauduleuse ou un utilisateur au comportement douteux, aidez-nous à protéger la communauté en nous contactant immédiatement.
                    </p>
                    <button 
                        onClick={() => onNavigate?.('contact')}
                        className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Mail size={20} />
                        Contacter la modération
                    </button>
                </div>
            </div>

            <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-medium">MotoScoot.tn s'engage pour votre sécurité</span>
                </div>
                <button 
                    onClick={onGoHome}
                    className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                    <Home size={18} />
                    Retour à l'accueil
                </button>
            </div>

        </div>

      </div>

    </div>
  );
};

export default Security;
