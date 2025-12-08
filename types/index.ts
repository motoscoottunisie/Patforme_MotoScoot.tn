
import React from 'react';

export interface Listing {
  id: number;
  title: string;
  price: string;
  image: string;
  year: string;
  mileage: string;
  cc: string;
  location: string;
  date: string;
  seller: string;
  sellerType: 'Particulier' | 'Pro';
  condition: 'Excellent' | 'Très bon' | 'Bon';
  dealRating?: 1 | 2 | 3; // 1: Prix du marché, 2: Bonne affaire, 3: Super affaire
}

export interface GarageService {
  name: string;
  price?: string;
  icon?: any;
}

export interface GarageReview {
  id: number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  isVerifiedOwner?: boolean;
}

export interface Garage {
  id: number;
  name: string;
  image: string;
  rating: number;
  // Properties combined from Garages.tsx and PopularGarages.tsx
  description?: string;
  address?: string;
  location?: string; // PopularGarages uses location
  hours?: string;
  reviewsCount?: number;
  specialties?: string[];
  specialty?: string; // PopularGarages uses singular
  isVerified?: boolean;
  
  // New fields for Detail View
  images?: string[];
  phone?: string;
  website?: string;
  email?: string;
  coordinates?: { lat: number; lng: number };
  services?: GarageService[];
  reviewsList?: GarageReview[]; // Specific reviews for the details page
}

export interface Article {
  id: number;
  title: string;
  category: 'Nouveautés' | 'Essais' | 'Tech' | 'Scooters' | 'Électrique';
  image: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content?: string; // Full article content
  tags?: string[];
  isFeatured?: boolean;
}

export interface Tip {
  id: number;
  title: string;
  category: 'Entretien' | 'Sécurité' | 'Équipement' | 'Conduite' | 'Législation';
  summary: string;
  content?: string; // Full HTML content for the guide
  tools?: string[]; // List of required tools/items
  image: string;
  date: string;
  author: string;
  readTime: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Expert';
}

export interface BikeModel {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: string;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  date: string;
}

export interface CategoryItem {
  icon: React.ElementType;
  label: string;
}
