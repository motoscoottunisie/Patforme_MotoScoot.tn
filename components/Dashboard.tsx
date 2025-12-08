
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  List, 
  Settings, 
  LogOut, 
  Bell, 
  User, 
  Search,
  ChevronRight,
  TrendingUp,
  Eye,
  MousePointer,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import Header from './layout/Header';
import { mockListings } from '../data/mockData';

interface DashboardProps {
  initialTab?: 'overview' | 'listings' | 'settings';
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ initialTab = 'overview', onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'settings'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Mock Data for Dashboard
  const stats = [
    { label: 'Vues totales', value: '1,234', change: '+12%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Annonces actives', value: '3', change: '0%', icon: List, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Clics', value: '456', change: '+5%', icon: MousePointer, color: 'text-warning-600', bg: 'bg-warning-50' },
  ];

  const myListings = mockListings.slice(0, 3); // Simulate user's listings

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-gray-900">{stat.value}</h4>
              <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance des annonces</h3>
            <select className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg px-3 py-2 outline-none">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          {/* Mock Chart Area */}
          <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-gray-50">
             {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
               <div key={i} className="w-full bg-primary-50 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-500 group-hover:bg-primary-500"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 12} vues
                  </div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
             <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
          </div>
        </div>

        <div className="space-y-6">
           {/* Action Card */}
           <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Vendre plus vite ?</h3>
              <p className="text-primary-100 text-sm mb-6 leading-relaxed">Booster vos annonces pour obtenir jusqu'à 3x plus de vues.</p>
              <button className="w-full py-3 bg-white text-primary-600 font-bold rounded-xl text-sm hover:bg-primary-50 transition-colors shadow-sm">
                 Booster maintenant
              </button>
           </div>

           {/* Tips */}
           <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <TrendingUp size={16} className="text-success-500" />
                 Conseil du jour
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                 Ajouter au moins 5 photos augmente vos chances de vente de 40%.
              </p>
              <button className="text-primary-600 text-xs font-bold hover:underline">
                 Voir tous les conseils
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Mes Annonces ({myListings.length})</h2>
          <button 
            onClick={() => onNavigate?.('deposit')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-colors shadow-md active:scale-95"
          >
             <Plus size={16} />
             Nouvelle annonce
          </button>
       </div>

       <div className="space-y-4">
          {myListings.map(listing => (
             <div key={listing.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center group">
                <div className="relative w-full md:w-32 h-32 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                   <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                   <span className="absolute top-2 left-2 bg-success-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      En ligne
                   </span>
                </div>
                
                <div className="flex-1">
                   <h3 className="font-bold text-gray-900 mb-1">{listing.title}</h3>
                   <p className="text-primary-600 font-bold text-sm mb-2">{listing.price}</p>
                   <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Eye size={12} /> 124 vues</span>
                      <span className="flex items-center gap-1"><CalendarIcon size={12} /> 2j</span>
                   </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
                   <button className="flex-1 md:flex-none p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-colors" title="Modifier">
                      <Edit size={16} />
                   </button>
                   <button className="flex-1 md:flex-none p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors" title="Supprimer">
                      <Trash2 size={16} />
                   </button>
                   <button className="flex-1 md:flex-none px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors">
                      Booster
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0">
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sticky top-24">
                  <div className="flex items-center gap-3 p-3 mb-6 border-b border-gray-50 pb-6">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        JD
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 text-sm">John Doe</h3>
                        <p className="text-xs text-gray-500">Particulier</p>
                     </div>
                  </div>

                  <nav className="space-y-1">
                     <button 
                       onClick={() => setActiveTab('overview')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <LayoutDashboard size={18} />
                        Vue d'ensemble
                     </button>
                     <button 
                       onClick={() => setActiveTab('listings')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'listings' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <List size={18} />
                        Mes annonces
                     </button>
                     <button 
                       onClick={() => setActiveTab('settings')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <Settings size={18} />
                        Paramètres
                     </button>
                  </nav>

                  <div className="mt-6 pt-4 border-t border-gray-50">
                     <button 
                       onClick={onLogout}
                       className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                     >
                        <LogOut size={18} />
                        Déconnexion
                     </button>
                  </div>
               </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
               <h1 className="text-2xl font-extrabold text-gray-900 mb-6 hidden lg:block">
                  {activeTab === 'overview' && "Tableau de bord"}
                  {activeTab === 'listings' && "Gérer mes annonces"}
                  {activeTab === 'settings' && "Mon profil"}
               </h1>

               {activeTab === 'overview' && renderOverview()}
               {activeTab === 'listings' && renderListings()}
               {activeTab === 'settings' && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center py-20 animate-fade-in-up">
                     <Settings size={48} className="mx-auto text-gray-300 mb-4" />
                     <h3 className="text-lg font-bold text-gray-900">Paramètres du compte</h3>
                     <p className="text-gray-500 text-sm">Fonctionnalité bientôt disponible.</p>
                  </div>
               )}
            </div>

         </div>
      </main>
    </div>
  );
};

export default Dashboard;
