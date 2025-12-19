import React from 'react';
import { 
  Home, 
  ChevronRight, 
  Bike, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe, 
  Award,
  ArrowRight,
  Heart
} from 'lucide-react';
import Header from './layout/Header';

interface AboutProps {
  onGoHome?: () => void;
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const About: React.FC<AboutProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* HERO SECTION - EXACT STYLE FROM SPECIFICATION */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 font-sans overflow-hidden bg-primary-50">
        
        {/* Le conteneur de fond absolu (background-wrapper) */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* L'image de fond (Style commun / bg-image) */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }}
          />
          {/* L'Overlay (Le filtre rouge/orange / overlay-gradient) */}
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

        {/* Hero Content - Minimalist approach */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto h-full pt-8">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up">
              MotoScoot
            </h1>
            <p className="text-white text-lg md:text-2xl font-medium max-w-3xl mx-auto animate-fade-in-up opacity-90" style={{ animationDelay: '100ms' }}>
              La première plateforme tunisienne pensée par des motards, pour des motards.
            </p>
          </div>
        </div>
      </div>

      {/* MANIFESTO SECTION - APPLE STYLE */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-xs font-black text-primary-600 uppercase tracking-[0.3em] mb-12 animate-fade-in-up">Notre Manifeste</h2>
            <p className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight md:leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                Nous croyons que chaque trajet est une aventure. Que vous soyez en quête de votre première machine ou prêt à passer à la cylindrée supérieure, nous sommes là pour rendre cette transition fluide, sûre et passionnante.
            </p>
            <div className="mt-16 w-12 h-1 bg-primary-600 mx-auto rounded-full animate-fade-in-up" style={{ animationDelay: '200ms' }}></div>
        </div>
      </section>

      {/* BENTO GRID SECTION */}
      <section className="py-12 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                
                {/* Confidence Card (Large) */}
                <div className="md:col-span-2 lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-12 shadow-lg shadow-primary-600/20">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">La confiance avant tout.</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            Chaque annonce est vérifiée manuellement par nos modérateurs. Nous collaborons avec des garages certifiés pour vous garantir des véhicules sains.
                        </p>
                    </div>
                </div>

                {/* Tech Card */}
                <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between group hover:scale-[1.02] transition-all duration-500 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <Zap className="text-primary-500 mb-12" size={32} />
                    <div>
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">L'innovation utile.</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">
                            Une recherche intelligente, des fiches techniques exhaustives et un dépôt d'annonce en 2 minutes.
                        </p>
                    </div>
                </div>

                {/* Passion Card */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col justify-between group hover:bg-primary-600 hover:text-white transition-all duration-500">
                    <Heart className="text-primary-600 group-hover:text-white mb-12 transition-colors" size={32} />
                    <div>
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">Passion commune.</h3>
                        <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed font-medium transition-colors">
                            Une équipe de motards qui comprend vos besoins, vos craintes et vos rêves.
                        </p>
                    </div>
                </div>

                {/* Community Card (Wide) */}
                <div className="md:col-span-3 lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-all duration-500">
                    <div className="flex-1">
                        <Users className="text-gray-900 mb-8" size={32} />
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Le cœur de la moto en Tunisie.</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            Plus qu'un site de vente, MotoScoot rassemble une communauté de plus de 50 000 passionnés chaque mois.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden bg-gray-100">
                        <img src="https://images.unsplash.com/photo-1558981224-2c8d5f308e17?auto=format&fit=crop&w=600&q=80" alt="Community" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                </div>

                {/* Network Card */}
                <div className="lg:col-span-2 bg-primary-600 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between group hover:bg-primary-700 transition-all duration-500 shadow-xl relative">
                    <div className="absolute top-4 right-8 text-white/20 font-black text-8xl pointer-events-none">24</div>
                    <Globe className="mb-12" size={32} />
                    <div>
                        <h3 className="text-3xl font-black mb-4 tracking-tight">Partout en Tunisie.</h3>
                        <p className="text-white/80 text-lg leading-relaxed font-medium">
                            De Tunis à Tataouine, trouvez des garages et des annonces près de chez vous en un clic.
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                <div className="animate-fade-in-up">
                    <span className="block text-4xl md:text-6xl font-black text-gray-900 mb-2">+500</span>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Annonces / mois</span>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <span className="block text-4xl md:text-6xl font-black text-gray-900 mb-2">12k</span>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Utilisateurs actifs</span>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <span className="block text-4xl md:text-6xl font-black text-gray-900 mb-2">45</span>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Garages partenaires</span>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <span className="block text-4xl md:text-6xl font-black text-gray-900 mb-2">4.9/5</span>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Satisfaction</span>
                </div>
            </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION - APPLE STYLE */}
      <section className="py-32 md:py-48 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
            <h2 className="text-5xl md:text-8xl font-bold text-black leading-[1.05] tracking-tighter mb-8">
                Prêt à rejoindre <br /><span className="text-primary-600">l'aventure ?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
                Nous ne sommes qu'au début de notre voyage. MotoScoot évolue chaque jour pour devenir l'écosystème complet dont chaque motard tunisien a besoin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button 
                    onClick={() => onNavigate?.('search')}
                    className="px-10 py-5 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transition-all active:scale-95 text-lg"
                >
                    Explorer les annonces
                </button>
                <button 
                    onClick={() => onNavigate?.('contact')}
                    className="group text-blue-600 font-bold text-lg hover:underline flex items-center gap-1"
                >
                    Devenir partenaire <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </section>

      {/* BREADCRUMBS FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center text-sm text-gray-400">
            <button onClick={onGoHome} className="hover:text-primary-600 transition-colors">Accueil</button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-gray-900">À propos de nous</span>
        </nav>
      </div>

    </div>
  );
};

export default About;