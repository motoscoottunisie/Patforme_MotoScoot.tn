
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
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ garageName: '', contactName: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HERO SECTION - Matches Tips.tsx / News.tsx */}
      <div className="relative w-full h-[35vh] md:h-[45vh] flex flex-col md:items-center md:justify-center px-6 md:px-20 lg:px-32 md:pb-20 lg:pb-32 font-sans overflow-hidden bg-primary-50">
        
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
                     <span className="text-sm text-gray-300">Visibilité accrue auprès de milliers de motards tunisiens.</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Page garage dédiée avec vos horaires, services et photos.</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Gestion simplifiée des prises de rendez-vous (bientôt disponible).</span>
                  </li>
                  <li className="flex gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                     <span className="text-sm text-gray-300">Badge "Garage Vérifié" pour rassurer vos clients.</span>
                  </li>
               </ul>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Envoyez-nous un message</h2>
                  <p className="text-gray-500">Remplissez le formulaire ci-dessous pour référencer votre garage ou poser une question.</p>
               </div>

               {isSubmitted ? (
                 <div className="bg-success-50 border border-success-200 rounded-2xl p-8 text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé avec succès !</h3>
                    <p className="text-gray-600">Notre équipe commerciale vous recontactera sous 24h ouvrables.</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Row 1: Garage Name & Contact Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                             <Wrench size={16} className="text-gray-400" />
                             Nom du Garage
                          </label>
                          <input 
                            type="text"
                            name="garageName"
                            required
                            placeholder="Ex: Garage Moto Performance" 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                            value={formData.garageName}
                            onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                             <Users size={16} className="text-gray-400" />
                             Nom du Responsable
                          </label>
                          <input 
                            type="text"
                            name="contactName"
                            required
                            placeholder="Votre nom complet" 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                            value={formData.contactName}
                            onChange={handleChange}
                          />
                       </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                             <Mail size={16} className="text-gray-400" />
                             Email Professionnel
                          </label>
                          <input 
                            type="email"
                            name="email"
                            required
                            placeholder="contact@votre-garage.tn" 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                            value={formData.email}
                            onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                             <Phone size={16} className="text-gray-400" />
                             Téléphone
                          </label>
                          <input 
                            type="tel"
                            name="phone"
                            required
                            placeholder="+216" 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                       </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-900">Sujet de la demande</label>
                       <div className="relative">
                          <select 
                            name="subject"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={handleChange}
                          >
                             <option value="" disabled>Sélectionnez un sujet</option>
                             <option value="listing">Référencer mon garage (Gratuit)</option>
                             <option value="update">Mettre à jour mes informations</option>
                             <option value="partnership">Partenariat / Publicité</option>
                             <option value="support">Support technique</option>
                             <option value="other">Autre demande</option>
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                       </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <MessageSquare size={16} className="text-gray-400" />
                          Message
                       </label>
                       <textarea 
                         name="message"
                         required
                         rows={5}
                         placeholder="Décrivez votre demande ou les services proposés par votre garage..." 
                         className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all resize-none"
                         value={formData.message}
                         onChange={handleChange}
                       />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
                    >
                       <Send className="w-5 h-5" />
                       Envoyer ma demande
                    </button>
                    
                    <p className="text-xs text-center text-gray-400">
                       En envoyant ce formulaire, vous acceptez d'être recontacté par l'équipe MotoScoot.
                    </p>
                 </form>
               )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;
