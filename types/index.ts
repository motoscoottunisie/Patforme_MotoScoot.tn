
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
  condition: 'Excellent' | 'Très bon' | 'Bon' | 'Neuf' | 'État neuf' | 'Correct' | 'À réparer' | 'Pour pièces';
  dealRating?: 1 | 2 | 3; // 1: Prix du marché, 2: Bonne affaire, 3: Super affaire
  equipment?: string[];
  type: 'Moto' | 'Scooter' | 'Accessoires'; // Added for accurate filtering
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

export interface TechSpec {
  id: number;
  brand: string;
  model: string;
  year: number;
  category: 'Roadster' | 'Sportive' | 'Trail' | 'Scooter' | 'Custom' | 'Off-road';
  priceNew: string;
  image: string;
  gallery?: string[];
  engine: {
    type: string;
    cc: string;
    power: string;
    torque: string;
    fuelSystem: string;
    cooling: string;
    transmission: string;
  };
  chassis: {
    frame: string;
    suspensionFront: string;
    suspensionRear: string;
    brakesFront: string;
    brakesRear: string;
    tireFront: string;
    tireRear: string;
  };
  dimensions: {
    weight: string;
    seatHeight: string;
    tank: string;
    length: string;
    wheelbase: string;
  };
  consumption?: string;
  topSpeed?: string;
}

export interface AdCampaign {
  id: number;
  title: string;
  client: string;
  zone: 'news_top' | 'search_feed' | 'garage_sidebar' | 'listing_sidebar';
  location: string;
  startDate: string;
  endDate: string;
  mediaType: 'Image' | 'Script';
  mediaUrl: string; // URL of the image or content
  linkUrl: string; // Where the ad links to
  ctaText?: string; // Button text
  description?: string; // For text-based ads
  isActive: boolean;
  views: number;
  clicks: number;
}
