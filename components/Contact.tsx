import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Building2,
  Wrench,
  Users,
  MessageSquare
} from 'lucide-react';
import Header from './layout/Header';

interface ContactProps {
  onGoHome?: () => void;
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [formData, setFormData] = useState({
    garageName: '',
    contactName: '',
    email: '',
    phone: '',
    subject: 'General',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ garageName: '', contactName: '', email: '', phone: '', subject: 'General', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HERO SECTION - Updated for Tablet Portrait */}
      <div className="relative w-full h-[35vh] md:h-[30vh] lg:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
        {/* Background Container */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Mobile Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: "url('https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp')" }}
          />
          {/* Desktop Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }}
          />

          {/* Gradient Overlay */}
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

        {/* Hero Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto md:space-y-6 h-full pt-20">
          
          <div className="text-center px-4 md:mt-32">
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Espace Pro & Contact
            </h1>
            <p className="text-white text-lg md:text-xl font-normal max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Vous êtes garagiste ? Rejoignez le réseau MotoScoot et développez votre activité.
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap mb-12">
            <div className="flex items-center hover:text-primary-600 cursor-pointer transition-colors" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </div>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Contact Info & Value Prop */}
          <div className="space-y-8">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
               <h3 className="text-xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary-600" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900">Adresse</p>
                        <p className="text-gray-500 text-sm">Les Berges du Lac 1,<br />1053 Tunis, Tunisie</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary-600" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900">Téléphone</p>
                        <p className="text-gray-500 text-sm">+216 71 123 456</p>
                        <p className="text-gray-400 text-xs mt-1">Lun-Sam: 09h - 18h</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary-600" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900">Email</p>
                        <p className="text-gray-500 text-sm">pro@motoscoot.tn</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Why Join Card */}
            <div className="bg-neutral-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[60px] opacity-20 rounded-full"></div>
               
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-500" />
                  Pourquoi nous rejoindre ?
               </h3>
               
               <ul className="space-y-4">
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Visibilité accrue auprès de milliers de motards actifs chaque jour.</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Gestion simplifiée de vos prestations et de vos avis clients.</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Statistiques détaillées sur la fréquentation de votre fiche garage.</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Badge "Garage Vérifié" pour renforcer la confiance de vos clients.</span>
                  </li>
               </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative">
                {isSubmitted ? (
                  <div className="py-12 text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-500">Merci de nous avoir contacté. Notre équipe pro vous répondra dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                      <Send size={24} className="text-primary-600" />
                      Envoyez-nous un message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contactName" className="text-sm font-bold text-gray-700">Nom complet</label>
                          <input 
                            type="text" 
                            id="contactName" 
                            name="contactName" 
                            required 
                            value={formData.contactName}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="garageName" className="text-sm font-bold text-gray-700">Nom du garage (Optionnel)</label>
                          <input 
                            type="text" 
                            id="garageName" 
                            name="garageName" 
                            value={formData.garageName}
                            onChange={handleChange}
                            placeholder="Votre établissement"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-bold text-gray-700">Email professionnel</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="contact@exemple.com"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-bold text-gray-700">Téléphone</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            required 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="22 123 456"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-bold text-gray-700">Sujet</label>
                        <select 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                        >
                          <option value="General">Demande d'information</option>
                          <option value="Partnership">Devenir partenaire</option>
                          <option value="Support">Support technique</option>
                          <option value="Advertising">Publicité sur le site</option>
                          <option value="Other">Autre</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold text-gray-700">Votre message</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows={6} 
                          required 
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Comment pouvons-nous vous aider ?"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all resize-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        Envoyer le message
                        <Send size={18} />
                      </button>
                    </form>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fix for App.tsx line 12: Added missing default export
export default Contact;