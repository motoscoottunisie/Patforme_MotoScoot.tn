
import React, { createContext, useContext, useState, useEffect } from 'react';

type FavoriteType = 'listing' | 'garage';

interface FavoritesContextType {
  favorites: {
    listings: number[];
    garages: number[];
  };
  toggleFavorite: (type: FavoriteType, id: number) => void;
  isFavorite: (type: FavoriteType, id: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<{ listings: number[]; garages: number[] }>(() => {
    // Initial state from localStorage
    try {
      const saved = localStorage.getItem('motoscoot_favorites');
      return saved ? JSON.parse(saved) : { listings: [], garages: [] };
    } catch (e) {
      return { listings: [], garages: [] };
    }
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('motoscoot_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (type: FavoriteType, id: number) => {
    setFavorites(prev => {
      const list = type === 'listing' ? prev.listings : prev.garages;
      const exists = list.includes(id);
      
      let newList;
      if (exists) {
        newList = list.filter(itemId => itemId !== id);
      } else {
        newList = [...list, id];
      }

      return {
        ...prev,
        [type === 'listing' ? 'listings' : 'garages']: newList
      };
    });
  };

  const isFavorite = (type: FavoriteType, id: number) => {
    if (type === 'listing') {
      return favorites.listings.includes(id);
    }
    return favorites.garages.includes(id);
  };

  const favoritesCount = favorites.listings.length + favorites.garages.length;

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesCount }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
