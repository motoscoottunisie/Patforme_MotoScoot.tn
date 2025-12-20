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
      
      {/* Header en mode blanc immédiat (Style Apple) */}
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-8 md:py-12">
        
        {/* Section de titre "Claire" sans Hero */}
        <div className="mb-10 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              Espace Pro & Contact
            </h1>
            <p className="text-gray-500 font-medium text-lg">
               Rejoignez le réseau MotoScoot ou contactez notre support
            </p>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap mb-12">
            <button className="flex items-center hover:text-primary-600 transition-colors" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="font-semibold text-gray-900">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Info (Sidebar Style) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-none animate-fade-in-up" style={{ animationDelay: '100ms' }}>
               <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest mb-6">Nos Coordonnées</h3>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        <MapPin className="w-5 h-5 text-primary-600" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900 text-sm">Adresse</p>
                        <p className="text-gray-500 text-xs font-medium leading-relaxed">Les Berges du Lac 1,<br />1053 Tunis, Tunisie</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        <Phone className="w-5 h-5 text-primary-600" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900 text-sm">Téléphone</p>
                        <p className="text-gray-500 text-xs font-medium">+216 71 123 456</p>
                        <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">Lun-Sam: 09h - 18h</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        <Mail className="w-5 h-5 text-primary-600" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900 text-sm">Email</p>
                        <p className="text-gray-500 text-xs font-medium">pro@motoscoot.tn</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Why Join Card - Premium Look */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-none animate-fade-in-up" style={{ animationDelay: '200ms' }}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[80px] opacity-20 rounded-full"></div>
               
               <h3 className="text-lg font-black mb-6 flex items-center gap-2 tracking-tight">
                  <Building2 className="w-5 h-5 text-primary-500" />
                  Espace Professionnel
               </h3>
               
               <ul className="space-y-4">
                  {[
                    "Visibilité auprès de milliers de motards actifs.",
                    "Gestion simplifiée de vos prestations.",
                    "Statistiques détaillées de fréquentation.",
                    "Badge 'Garage Vérifié' exclusif."
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1" />
                      <span className="text-xs font-medium text-gray-300 leading-relaxed">{text}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-none relative">
                {isSubmitted ? (
                  <div className="py-12 text-center animate-scale-in">
                    <div className="w-20 h-20 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Message envoyé !</h3>
                    <p className="text-gray-500 font-medium">Merci de nous avoir contacté. Notre équipe pro vous répondra dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3 tracking-tight">
                      <MessageSquare size={24} className="text-primary-600" />
                      Envoyez-nous un message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contactName" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom complet</label>
                          <input 
                            type="text" 
                            id="contactName" 
                            name="contactName" 
                            required 
                            value={formData.contactName}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="garageName" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Boutique (Optionnel)</label>
                          <input 
                            type="text" 
                            id="garageName" 
                            name="garageName" 
                            value={formData.garageName}
                            onChange={handleChange}
                            placeholder="Votre établissement"
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email professionnel</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="contact@exemple.com"
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Téléphone</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            required 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="22 123 456"
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sujet de la demande</label>
                        <select 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 cursor-pointer shadow-none appearance-none"
                        >
                          <option value="General">Demande d'information</option>
                          <option value="Partnership">Devenir partenaire</option>
                          <option value="Support">Support technique</option>
                          <option value="Advertising">Publicité sur le site</option>
                          <option value="Other">Autre</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Votre message</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows={6} 
                          required 
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Comment pouvons-nous vous aider ?"
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all font-medium text-gray-700 resize-none shadow-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-4 bg-gray-900 hover:bg-primary-600 text-white font-black rounded-xl shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
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

export default Contact;