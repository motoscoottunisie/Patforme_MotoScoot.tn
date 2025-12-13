
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdCampaign } from '../types';

interface AdsContextType {
  ads: AdCampaign[];
  addAd: (ad: Omit<AdCampaign, 'id' | 'views' | 'clicks'>) => void;
  updateAd: (id: number, updatedAd: Partial<AdCampaign>) => void;
  deleteAd: (id: number) => void;
  getAdByZone: (zone: string) => AdCampaign | undefined;
  trackView: (id: number) => void;
  trackClick: (id: number) => void;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

// Initial Mock Data
const initialAds: AdCampaign[] = [
  { 
    id: 1, 
    title: 'Assurance Moto', 
    client: 'Assurances Comar', 
    zone: 'listing_sidebar', 
    location: 'National', 
    startDate: '2025-01-01', 
    endDate: '2025-12-31', 
    mediaType: 'Image', 
    mediaUrl: '', // Using CSS/Layout for this specific native ad in current implementation, but normally would be an image URL
    linkUrl: '#',
    ctaText: 'Faire un devis',
    description: 'Assurez cette moto en 2 min. Comparateur gratuit, jusqu\'à -40% sur votre assurance.',
    isActive: true, 
    views: 12500, 
    clicks: 450 
  },
  { 
    id: 2, 
    title: 'Pièces Détachées', 
    client: 'Moto Expert', 
    zone: 'garage_sidebar', 
    location: 'Tunis', 
    startDate: '2025-02-01', 
    endDate: '2025-06-01', 
    mediaType: 'Image', 
    mediaUrl: '',
    linkUrl: '#',
    ctaText: 'Découvrir',
    description: 'Large choix de pièces moto d\'origine au meilleur prix.',
    isActive: true, 
    views: 8200, 
    clicks: 120 
  },
  { 
    id: 3, 
    title: 'Promo Hiver Yamaha', 
    client: 'Yamaha Tunisie', 
    zone: 'news_top', 
    location: 'National', 
    startDate: '2025-01-15', 
    endDate: '2025-03-15', 
    mediaType: 'Image', 
    mediaUrl: 'https://placehold.co/1200x200/1e293b/ffffff?text=YAMAHA+REV+YOUR+HEART+-+PROMO+HIVER',
    linkUrl: '#',
    isActive: true, 
    views: 4500, 
    clicks: 80 
  },
  { 
    id: 4, 
    title: 'Crédit Moto', 
    client: 'Banque Zitouna', 
    zone: 'search_feed', 
    location: 'National', 
    startDate: '2025-01-01', 
    endDate: '2025-12-31', 
    mediaType: 'Image', 
    mediaUrl: '',
    linkUrl: '#',
    ctaText: 'Voir l\'offre',
    description: 'Financez l\'achat de votre moto avec un taux préférentiel. Réponse immédiate.',
    isActive: true, 
    views: 22000, 
    clicks: 850 
  }
];

export const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<AdCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('motoscoot_ads');
      return saved ? JSON.parse(saved) : initialAds;
    } catch (e) {
      return initialAds;
    }
  });

  useEffect(() => {
    localStorage.setItem('motoscoot_ads', JSON.stringify(ads));
  }, [ads]);

  const addAd = (newAd: Omit<AdCampaign, 'id' | 'views' | 'clicks'>) => {
    const ad: AdCampaign = {
      ...newAd,
      id: Date.now(),
      views: 0,
      clicks: 0
    };
    setAds(prev => [ad, ...prev]);
  };

  const updateAd = (id: number, updatedAd: Partial<AdCampaign>) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, ...updatedAd } : ad));
  };

  const deleteAd = (id: number) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
  };

  const getAdByZone = (zone: string) => {
    // Return a random active ad for the requested zone
    const validAds = ads.filter(ad => ad.zone === zone && ad.isActive);
    if (validAds.length === 0) return undefined;
    return validAds[Math.floor(Math.random() * validAds.length)];
  };

  const trackView = (id: number) => {
    // In a real app, this would debounce and send to API
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, views: ad.views + 1 } : ad));
  };

  const trackClick = (id: number) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad));
  };

  return (
    <AdsContext.Provider value={{ ads, addAd, updateAd, deleteAd, getAdByZone, trackView, trackClick }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};
