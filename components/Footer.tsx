import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 border-t border-neutral-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <button 
              className="flex items-center gap-3 cursor-pointer group focus:outline-none text-left" 
              onClick={() => onNavigate?.('home')}
              aria-label="Retour à l'accueil"
            >
               <div className="bg-primary-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
                 <span className="font-black text-xl text-white font-sans translate-y-[1px]">M</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight group-hover:text-primary-500 transition-colors">MotoScoot.tn</span>
            </button>
            <p className="text-gray-300 text-sm leading-relaxed">
              La référence en Tunisie pour l'achat et la vente de motos d'occasion et neuves. Trouvez votre liberté sur deux roues.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Suivez-nous sur Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Suivez-nous sur Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Suivez-nous sur LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Suivez-nous sur Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><button onClick={() => onNavigate?.('home')} className="hover:text-primary-500 transition-colors flex items-center gap-2 focus:outline-none focus:underline"><span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>Accueil</button></li>
              <li><button onClick={() => onNavigate?.('search')} className="hover:text-primary-500 transition-colors flex items-center gap-2 focus:outline-none focus:underline"><span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>Annonces</button></li>
              <li><button onClick={() => onNavigate?.('news')} className="hover:text-primary-500 transition-colors flex items-center gap-2 focus:outline-none focus:underline"><span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>Actualités</button></li>
              <li><button onClick={() => onNavigate?.('garages')} className="hover:text-primary-500 transition-colors flex items-center gap-2 focus:outline-none focus:underline"><span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>Garages</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className="hover:text-primary-500 transition-colors flex items-center gap-2 focus:outline-none focus:underline"><span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>Contact</button></li>
              <li className="pt-2 border-t border-neutral-800">
                <button onClick={() => onNavigate?.('dashboard-pro')} className="text-primary-500 font-bold hover:text-primary-400 transition-colors flex items-center gap-2 focus:outline-none focus:underline">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Espace Pro
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Informations</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><button onClick={() => onNavigate?.('about')} className="hover:text-white transition-colors focus:outline-none focus:underline">À propos de nous</button></li>
              <li><button onClick={() => onNavigate?.('terms')} className="hover:text-white transition-colors focus:outline-none focus:underline">Conditions Générales</button></li>
              <li><button onClick={() => onNavigate?.('legal')} className="hover:text-white transition-colors focus:outline-none focus:underline text-left">Confidentialité</button></li>
              <li><button onClick={() => onNavigate?.('cookies')} className="hover:text-white transition-colors focus:outline-none focus:underline">Cookies</button></li>
              <li><button onClick={() => onNavigate?.('faq')} className="hover:text-white transition-colors focus:outline-none focus:underline text-left">FAQ</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
            <ul className="space-y-5 text-sm text-gray-300">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">Les Berges du Lac 1,<br />1053 Tunis, Tunisie</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
                <a href="tel:+21621719109" className="font-medium hover:text-white cursor-pointer focus:outline-none focus:underline">+216 21 719 109</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
                <a href="mailto:contact@motoscoot.tn" className="font-medium hover:text-white cursor-pointer focus:outline-none focus:underline">contact@motoscoot.tn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-gray-500 text-center md:text-left">
            <p>© {new Date().getFullYear()} MotoScoot. Tous droits réservés.</p>
            <p className="md:border-l md:border-neutral-800 md:pl-6">
              Cette plateforme a été réalisée par <a href="https://magma-studio.tn" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 font-bold transition-colors">magma-studio.tn</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-gray-500">
             <button onClick={() => onNavigate?.('sitemap')} className="hover:text-white transition-colors focus:outline-none focus:underline">Plan du site</button>
             <button onClick={() => onNavigate?.('legal')} className="hover:text-white transition-colors focus:outline-none focus:underline">Mentions légales</button>
             <button onClick={() => onNavigate?.('security')} className="hover:text-white transition-colors focus:outline-none focus:underline">Sécurité</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;