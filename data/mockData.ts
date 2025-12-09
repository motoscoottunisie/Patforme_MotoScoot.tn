import { Listing, Garage, Article, BikeModel, Review, Tip } from '../types';

// --- SHARED DATA CONSTANTS ---

export const brandsMoto = [
  "Yamaha", "Honda", "Kawasaki", "BMW", "KTM", "Suzuki", "Ducati", "Triumph", 
  "Sym", "Piaggio", "Peugeot", "Aprilia", "Benelli", "Autre"
];

export const mockModels = [
  "MT-07", "MT-09", "TMAX 530", "TMAX 560", "XMAX 125", "XMAX 300", "R1", "R6", "Tenere 700", "Tracer 900",
  "X-ADV", "Forza 300", "Forza 350", "Forza 750", "Africa Twin", "CB650R", "CBR1000RR", "PCX 125", "SH 125", "SH 300",
  "Z900", "Z650", "Z1000", "Versys 650", "Ninja 400", "Ninja 650", "Ninja ZX-10R",
  "R 1200 GS", "R 1250 GS", "R 1300 GS", "F 850 GS", "S 1000 RR", "R 18", "C 400 X", "C 400 GT",
  "Duke 125", "Duke 390", "Duke 790", "Adventure 390", "Super Duke 1290",
  "Street Triple 675", "Street Triple 765", "Bonneville T100", "Bonneville T120", "Tiger 800", "Tiger 900",
  "Scrambler 800", "Monster 821", "Monster 937", "Panigale V4", "Multistrada V4",
  "Vespa GTS 300", "Beverly 300", "Beverly 400", "Liberty 125",
  "Fiddle II", "Fiddle III", "Symphony ST", "Jet 14", "Orbit II", "Kisbee"
];

export const equipmentOptions = [
  "ABS", "Contrôle traction", "Éclairage LED", "Tableau de bord TFT", "Bluetooth", 
  "Quickshifter", "Modes de conduite", "Régulateur de vitesse", "Poignées chauffantes", 
  "Selle chauffante", "Anti-wheelie", "Suspension électronique", "Freinage d'urgence auto",
  "Système de navigation", "Prise USB", "Alarme", "Top case", "Sacoches latérales", 
  "Bulle haute", "Protège-mains", "Sabot moteur", "Échappement sport", 
  "Non dédouanée", "RS", "Pièces manquantes", "Sans papiers"
];

export const accessoryTypes = [
  "Casque", "Blouson / Veste", "Gants", "Bottes / Chaussures", 
  "Pantalon / Combinaison", "Pièce Moteur", "Échappement", 
  "Carénage", "Éclairage / Électronique", "Antivol / Alarme", "Autre"
];

export const conditions = [
  "Neuf", "État neuf", "Excellent", "Très bon", "Bon", "Correct", "À réparer", "Pour pièces"
];

// --- MOCK DATA ---

export const mockListings: Listing[] = [
  {
    id: 1,
    title: "Yamaha MT-07",
    price: "29 500 TND",
    image: "https://blog.3as-racing.com/wp-content/uploads/2024/12/mt-07-2025-1024x683.jpg",
    year: "2022",
    mileage: "13 200 km",
    cc: "699 cm³",
    location: "Tunis",
    date: "15/01/2024",
    seller: "Mehdi Jeliti",
    sellerType: "Particulier",
    condition: "Excellent",
    dealRating: 3,
    type: "Moto",
    equipment: ["ABS", "Éclairage LED", "Prise USB", "Carnet d'entretien"]
  },
  {
    id: 2,
    title: "BMW R1250 GS",
    price: "88 000 TND",
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/ff/b1/00/ffb100a266d0fff7adeb77d1f40b617795271941.jpg?rule=ad-image",
    year: "2022",
    mileage: "12 000 km",
    cc: "1254 cm³",
    location: "Sousse",
    date: "10/01/2024",
    seller: "Sarah Dubois",
    sellerType: "Pro",
    condition: "Excellent",
    dealRating: 1,
    type: "Moto",
    equipment: ["ABS", "Contrôle traction", "Poignées chauffantes", "Modes de conduite", "Suspension électronique", "Top case", "Valises"]
  },
  {
    id: 3,
    title: "Yamaha TMAX 560",
    price: "77 200 TND",
    image: "https://urbaanews.com/wp-content/uploads/2019/11/yamaha-tmax-560-2020-urbaanews-01-1.jpg",
    year: "2021",
    mileage: "18 000 km",
    cc: "550 cm³",
    location: "Sfax",
    date: "12/01/2024",
    seller: "Mohamed Tounssi",
    sellerType: "Particulier",
    condition: "Très bon",
    dealRating: 1,
    type: "Moto",
    equipment: ["ABS", "Échappement sport", "Protège-mains", "Saute vent"]
  },
  {
    id: 4,
    title: "Kawasaki Ninja 650",
    price: "50 800 TND",
    image: "https://www.objectif-moto.com/wp-content/uploads/2023/09/IMG_20230708_151644.jpg",
    year: "2020",
    mileage: "22 000 km",
    cc: "649 cm³",
    location: "Nabeul",
    date: "08/01/2024",
    seller: "Julie Moreau",
    sellerType: "Particulier",
    condition: "Très bon",
    dealRating: 2,
    type: "Moto",
    equipment: ["ABS", "Bluetooth", "Tableau de bord TFT"]
  },
  {
    id: 5,
    title: "Ducati Scrambler Icon",
    price: "8 500 TND",
    image: "https://images.unsplash.com/photo-1563204730-a9cb71578343?auto=format&fit=crop&w=800&q=80",
    year: "2019",
    mileage: "15 000 km",
    cc: "803 cm³",
    location: "Bizerte",
    date: "14/01/2024",
    seller: "Pierre Martin",
    sellerType: "Pro",
    condition: "Excellent",
    dealRating: 1,
    type: "Moto",
    equipment: ["ABS", "Prise USB"]
  },
  {
    id: 6,
    title: "Triumph Bonneville T120",
    price: "9 800 TND",
    image: "https://images.unsplash.com/photo-1558980394-0a06c46e60e7?auto=format&fit=crop&w=800&q=80",
    year: "2018",
    mileage: "28 000 km",
    cc: "1200 cm³",
    location: "Ariana",
    date: "13/01/2024",
    seller: "Sarah Dubois",
    sellerType: "Particulier",
    condition: "Très bon",
    dealRating: 2,
    type: "Moto",
    equipment: ["ABS", "Poignées chauffantes", "Modes de conduite", "Béquille centrale"]
  },
  {
    id: 7,
    title: "Honda Africa Twin",
    price: "12 500 TND",
    image: "https://images.unsplash.com/photo-1623136856518-e24f466b0a23?auto=format&fit=crop&w=800&q=80",
    year: "2020",
    mileage: "35 000 km",
    cc: "1084 cm³",
    location: "Monastir",
    date: "11/01/2024",
    seller: "Marc Leroy",
    sellerType: "Pro",
    condition: "Bon",
    dealRating: 1,
    type: "Moto",
    equipment: ["ABS", "Contrôle traction", "Régulateur de vitesse", "Sabot moteur", "Pare-carters"]
  },
  {
    id: 8,
    title: "Suzuki GSX-R750",
    price: "9 200 TND",
    image: "https://images.unsplash.com/photo-1563223552-30d01878d91a?auto=format&fit=crop&w=800&q=80",
    year: "2019",
    mileage: "19 000 km",
    cc: "750 cm³",
    location: "Tunis",
    date: "09/01/2024",
    seller: "Julie Moreau",
    sellerType: "Particulier",
    condition: "Excellent",
    dealRating: 3,
    type: "Moto",
    equipment: ["Modes de conduite", "Amortisseur de direction", "Capot de selle"]
  },
  {
    id: 9,
    title: "BMW K1600 GT",
    price: "22 000 TND",
    image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=800&q=80",
    year: "2021",
    mileage: "25 000 km",
    cc: "1649 cm³",
    location: "Sousse",
    date: "07/01/2024",
    seller: "Pierre Martin",
    sellerType: "Pro",
    condition: "Excellent",
    dealRating: 1,
    type: "Moto",
    equipment: ["ABS", "Audio system", "Marche arrière", "Xénon", "Selles chauffantes", "Verrouillage centralisé"]
  },
  {
    id: 10,
    title: "Yamaha YZF-R1",
    price: "16 500 TND",
    image: "https://images.unsplash.com/photo-1596706977803-b5417430c45d?auto=format&fit=crop&w=800&q=80",
    year: "2022",
    mileage: "8 000 km",
    cc: "998 cm³",
    location: "Nabeul",
    date: "06/01/2024",
    seller: "Sarah Dubois",
    sellerType: "Particulier",
    condition: "Excellent",
    dealRating: 2,
    type: "Moto",
    equipment: ["Quickshifter", "ABS Cornering", "Contrôle traction", "Launch control"]
  },
  {
    id: 11,
    title: "Harley-Davidson Street 750",
    price: "7 500 TND",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    year: "2020",
    mileage: "14 000 km",
    cc: "749 cm³",
    location: "Sfax",
    date: "05/01/2024",
    seller: "Marc Leroy",
    sellerType: "Particulier",
    condition: "Très bon",
    dealRating: 1,
    type: "Moto",
    equipment: ["Alarme", "Sissy bar", "Stage 1"]
  },
  {
    id: 12,
    title: "KTM 790 Adventure",
    price: "11 200 TND",
    image: "https://images.unsplash.com/photo-1563223552-30d01878d91a?auto=format&fit=crop&w=800&q=80",
    year: "2023",
    mileage: "5 500 km",
    cc: "799 cm³",
    location: "Bizerte",
    date: "04/01/2024",
    seller: "Julie Moreau",
    sellerType: "Pro",
    condition: "Excellent",
    dealRating: 3,
    type: "Moto",
    equipment: ["ABS Offroad", "Quickshifter", "Sabot moteur", "Porte-paquets"]
  },
  {
    id: 13,
    title: "Yamaha TMAX 560 Tech MAX",
    price: "48 000 TND",
    image: "https://www.magma-studio.tn/portfolio2/moto/tmax.jpg",
    year: "2024",
    mileage: "1 500 km",
    cc: "562 cm³",
    location: "Tunis",
    date: "02/02/2024",
    seller: "Karim Tounsi",
    sellerType: "Pro",
    condition: "État neuf",
    dealRating: 3,
    type: "Scooter",
    equipment: ["Bulle électrique", "Selle chauffante", "Poignées chauffantes", "Régulateur de vitesse", "Smart Key"]
  }
];

export const mockGarages: Garage[] = [
  {
    id: 1,
    name: "Garage Blayah",
    image: "https://www.magma-studio.tn/portfolio2/moto/Blayah.jpg",
    description: "Réparation et Maintenance de Scooter, Maxiscooter et Moto. Spécialiste certifié Yamaha et Honda. Nous utilisons uniquement des pièces d'origine pour garantir la longévité de votre deux-roues.",
    address: "Station métro Ennour kabaria, Tunis",
    hours: "Lundi–Samedi : 08h–18h",
    rating: 4.8,
    reviewsCount: 124,
    specialties: ["Grosse Cylindrée", "Diagnostic", "Entretien"],
    isVerified: true,
    phone: "+216 71 123 456",
    email: "contact@blayah-moto.tn",
    images: [
      "https://www.magma-studio.tn/portfolio2/moto/Blayah.jpg",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { name: "Vidange simple + Contrôle", price: "À partir de 45 DT" },
      { name: "Changement Kit Chaîne", price: "Sur devis" },
      { name: "Diagnostic Valise", price: "60 DT" },
      { name: "Montage Pneumatiques", price: "15 DT / roue" }
    ],
    reviewsList: [
      {
        id: 101,
        author: "Mohamed Ali",
        rating: 5,
        date: "Il y a 3 jours",
        content: "Service impeccable ! Ils ont trouvé la panne sur mon TMAX que deux autres garages n'avaient pas réussi à diagnostiquer. Prix correct pour la qualité.",
        helpfulCount: 12,
        isVerifiedOwner: true
      },
      {
        id: 102,
        author: "Sami Ben Amor",
        rating: 4,
        date: "Il y a 2 semaines",
        content: "Très professionnels et accueillants. Juste un peu d'attente pour avoir un rendez-vous, victime de leur succès je suppose.",
        helpfulCount: 5,
        isVerifiedOwner: true
      },
      {
        id: 103,
        author: "Chaker N.",
        rating: 5,
        date: "Il y a 1 mois",
        content: "Le patron est un vrai passionné. Travail soigné sur ma BMW R1250GS. Je recommande les yeux fermés.",
        helpfulCount: 8,
        isVerifiedOwner: false
      }
    ]
  },
  {
    id: 2,
    name: "Speed Bike Service",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=80",
    description: "Atelier dédié à la performance et au tuning. Installation d'accessoires et préparation moteur.",
    address: "Route de Tunis, Sousse",
    hours: "Lundi–Samedi : 09h–19h",
    rating: 4.9,
    reviewsCount: 89,
    specialties: ["Tuning", "Accessoires", "Moto"],
    isVerified: true,
    phone: "+216 73 111 222",
    images: [
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { name: "Installation Ligne Échappement", price: "80 DT" },
      { name: "Cartographie Moteur", price: "350 DT" }
    ],
    reviewsList: [
       {
        id: 201,
        author: "Walid K.",
        rating: 5,
        date: "Il y a 1 semaine",
        content: "Transformation incroyable de ma Z900. L'équipe a su me conseiller parfaitement pour les accessoires. Top !",
        helpfulCount: 20,
        isVerifiedOwner: true
      }
    ]
  },
  {
    id: 3,
    name: "Scooter Doctor",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    description: "Service rapide pour tous types de scooters. Changement de courroie, vidange et pneumatiques.",
    address: "Ennasr 2, Ariana",
    hours: "Lundi–Vendredi : 08h–20h",
    rating: 4.6,
    reviewsCount: 210,
    specialties: ["Scooter", "Rapide", "Pièces détachées"],
    isVerified: false,
    phone: "+216 22 333 444",
    services: [
        { name: "Forfait Révision Scooter 50cc", price: "50 DT" },
        { name: "Remplacement Courroie", price: "Sur devis" }
    ],
    reviewsList: []
  },
  {
    id: 4,
    name: "Vintage Motors Sfax",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e140f07?auto=format&fit=crop&w=800&q=80",
    description: "Restauration de motos anciennes et entretien de modèles classiques. Un savoir-faire unique.",
    address: "Route de Gabès, Sfax",
    hours: "Mardi–Dimanche : 09h–17h",
    rating: 5.0,
    reviewsCount: 45,
    specialties: ["Restauration", "Classique", "Peinture"],
    isVerified: true,
    phone: "+216 74 555 666",
    services: [
        { name: "Restauration Complète", price: "Sur devis" },
        { name: "Réglage Carburateur", price: "À partir de 90 DT" }
    ]
  },
  {
    id: 5,
    name: "Biker's Point",
    image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=800&q=80",
    description: "Vente et montage de pneumatiques, équilibrage et petite mécanique pour toutes marques.",
    address: "Hammamet Nord, Nabeul",
    hours: "Lundi–Samedi : 08h–19h",
    rating: 4.4,
    reviewsCount: 76,
    specialties: ["Pneumatiques", "Moto", "Scooter"],
    isVerified: false,
    phone: "+216 20 888 999",
    services: [
        { name: "Montage Pneu", price: "10 DT" },
        { name: "Équilibrage", price: "10 DT" }
    ]
  },
  {
    id: 6,
    name: "Electro Moto Lab",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=800&q=80",
    description: "Le premier garage spécialisé dans les deux-roues électriques et hybrides.",
    address: "La Marsa, Tunis",
    hours: "Lundi–Samedi : 10h–19h",
    rating: 4.7,
    reviewsCount: 34,
    specialties: ["Électrique", "Diagnostic", "Eco"],
    isVerified: true,
    phone: "+216 25 444 777",
    services: [
        { name: "Diagnostic Batterie", price: "80 DT" },
        { name: "Mise à jour Logiciel", price: "50 DT" }
    ]
  }
];

const articleContent = `
  <p class="mb-6 text-xl text-gray-600 font-medium leading-relaxed">
    Le monde de la moto est en constante évolution. Que vous soyez un pilote chevronné ou un débutant enthousiaste, il y a toujours quelque chose de nouveau à découvrir. Dans cet article, nous plongeons au cœur du sujet pour vous donner toutes les clés.
  </p>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">Performance et Innovation</h3>
  <p class="mb-6 text-gray-700 leading-relaxed">
    Les constructeurs ne cessent de repousser les limites. Avec l'arrivée des nouvelles normes Euro 5+, on aurait pu craindre une baisse de performance, mais c'est tout le contraire qui se produit. L'ingénierie moderne permet d'optimiser la combustion et l'électronique pour offrir des sensations de conduite toujours plus pures.
  </p>
  
  <p class="mb-6 text-gray-700 leading-relaxed">
    Par exemple, l'adoption massive des centrales inertielles (IMU) sur les modèles de moyenne cylindrée démocratise la sécurité active. L'ABS en virage et le contrôle de traction sensible à l'angle ne sont plus réservés à l'élite des superbikes.
  </p>

  <div class="my-8 p-6 bg-gray-50 border-l-4 border-primary-600 rounded-r-xl">
    <h4 class="font-bold text-lg text-gray-900 mb-2">Le saviez-vous ?</h4>
    <p class="text-gray-600 italic">
      Le marché tunisien connaît une croissance de 15% sur le segment des moyennes cylindrées (500-900cc) depuis 2023, preuve que la passion pour la moto loisir s'intensifie.
    </p>
  </div>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">Design et Ergonomie</h3>
  <p class="mb-6 text-gray-700 leading-relaxed">
    Au-delà du moteur, c'est l'expérience utilisateur qui est au centre des attentions. Les écrans TFT connectés deviennent la norme, permettant d'avoir la navigation GPS directement sous les yeux sans avoir à fixer son smartphone au guidon.
  </p>

  <p class="mb-6 text-gray-700 leading-relaxed">
    L'ergonomie est aussi revue pour s'adapter à une plus grande variété de gabarits. Selles réglables, guidons ajustables, bulles électriques... le confort n'est plus une option, c'est une exigence pour ceux qui roulent au quotidien.
  </p>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">Notre verdict</h3>
  <p class="mb-6 text-gray-700 leading-relaxed">
    Cette évolution est positive. Elle rend la moto plus accessible, plus sûre et plus agréable, sans pour autant aseptiser les sensations qui nous sont chères. Reste à voir comment le marché de l'occasion va intégrer ces technologies vieillissantes dans les années à venir.
  </p>
`;

const tipContent = `
  <p class="mb-6 text-lg text-gray-700 leading-relaxed">
    La chaîne de transmission est l'un des éléments les plus sollicités de votre moto. Elle transmet la puissance du moteur à la roue arrière, subissant des tensions énormes, la poussière, l'eau et la boue. Un entretien négligé peut mener à une rupture brutale, mettant votre sécurité en péril.
  </p>

  <div class="my-8 p-5 bg-orange-50 border border-orange-200 rounded-xl">
    <h4 class="font-bold text-orange-800 mb-2 flex items-center gap-2">⚠️ Attention</h4>
    <p class="text-orange-800 text-sm">
      Ne faites jamais tourner le moteur avec une vitesse enclenchée lorsque vous nettoyez la chaîne sur béquille centrale. Vous risquez de vous coincer les doigts dans la couronne. Tournez la roue à la main.
    </p>
  </div>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">Étape 1 : Le Nettoyage</h3>
  <p class="mb-4 text-gray-700 leading-relaxed">
    Avant de graisser, il faut impérativement retirer l'ancienne graisse chargée de sable et de poussière. Si vous remettez de la graisse par-dessus, vous créez une pâte abrasive qui va user les joints toriques (O-rings) prématurément.
  </p>
  <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
    <li>Installez la moto sur la béquille centrale ou d'atelier.</li>
    <li>Placez un carton sous la chaîne pour protéger le sol et le pneu.</li>
    <li>Pulvérisez le nettoyant chaîne généreusement sur toute la longueur.</li>
    <li>Frottez avec la brosse spécifique (brosse "grunge") sur les 4 faces de la chaîne.</li>
    <li>Essuyez soigneusement avec un chiffon propre. La chaîne doit être sèche et brillante.</li>
  </ul>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">Étape 2 : Le Graissage</h3>
  <p class="mb-4 text-gray-700 leading-relaxed">
    Une fois la chaîne propre et sèche, appliquez le lubrifiant. L'idéal est de le faire après avoir roulé, quand la chaîne est encore chaude : la graisse pénètre mieux dans les maillons.
  </p>
  <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
    <li>Visez l'intérieur de la chaîne (côté rouleaux et joints), pas l'extérieur. La force centrifuge poussera la graisse vers l'extérieur en roulant.</li>
    <li>Tournez la roue lentement à la main.</li>
    <li>Appliquez une couche fine et régulière. Inutile d'en mettre des tonnes, le surplus sera projeté sur votre jante.</li>
  </ul>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">Étape 3 : Le Temps de Pose</h3>
  <p class="mb-6 text-gray-700 leading-relaxed">
    C'est l'erreur la plus fréquente : partir rouler tout de suite. La graisse contient des solvants pour être fluide à l'application. Il faut leur laisser le temps de s'évaporer pour que la graisse fige.
    <br/><br/>
    <strong>Laissez reposer au moins 15 à 30 minutes</strong> (l'idéal est de le faire le soir pour le lendemain).
  </p>

  <h3 class="text-2xl font-bold text-gray-900 mb-4">La fréquence idéale</h3>
  <p class="mb-6 text-gray-700 leading-relaxed">
    Graissez votre chaîne tous les <strong>500 à 800 km</strong>, et systématiquement après avoir roulé sous la pluie. Un kit chaîne bien entretenu peut durer jusqu'à 30 000 km, contre à peine 10 000 km s'il est négligé.
  </p>
`;

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "La nouvelle BMW R 1300 GS Adventure dévoilée : Le roi est de retour",
    category: "Nouveautés",
    image: "https://www.leblogmoto.com/wp-content/uploads/2025/12/bmw-devoile-sa-nouvelle-r-1300-gs-adventure-avec-boite-auto-asa-et-voyages-sans-effort-7-1024x683.jpg",
    date: "15 Oct 2025",
    readTime: "5 min",
    author: "Karim Ben Amor",
    summary: "BMW Motorrad repousse encore les limites avec sa nouvelle GS Adventure. Plus légère, plus puissante et bardée de technologies, elle promet de redéfinir le segment trail.",
    content: articleContent,
    tags: ["BMW", "Trail", "Adventure", "Nouveauté 2025"],
    isFeatured: true
  },
  {
    id: 2,
    title: "Essai Yamaha TMAX 560 Tech MAX : Toujours le patron ?",
    category: "Scooters",
    image: "https://patrickpons.com/nas/commun/annonces/9100a992fd09cf9526fdeefa28676ac0a8d3763e/photo-annonce-yamaha-tmax-560-tech-max_679a57c16d4f5322824409.jpg",
    date: "12 Oct 2025",
    readTime: "8 min",
    author: "Sarah Mansouri",
    summary: "Après 20 ans de règne, le TMAX revient avec une mise à jour esthétique et technologique. Suffisant pour garder sa couronne face au Forza 750 ?",
    content: articleContent,
    tags: ["Yamaha", "Scooter", "TMAX", "Essai"],
    isFeatured: false
  },
  {
    id: 3,
    title: "Kawasaki Hybride : La révolution verte commence maintenant",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80",
    date: "10 Oct 2025",
    readTime: "6 min",
    author: "Mehdi J.",
    summary: "Kawasaki lance ses premiers modèles hybrides en Tunisie. Une combinaison thermique/électrique qui promet des économies sans sacrifier les sensations.",
    content: articleContent,
    tags: ["Kawasaki", "Hybride", "Ecologie", "Tech"],
    isFeatured: false
  },
  {
    id: 4,
    title: "Ducati Streetfighter V4 SP2 : L'adrénaline à l'état pur",
    category: "Essais",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    date: "08 Oct 2025",
    readTime: "7 min",
    author: "Pierre Martin",
    summary: "Nous avons testé la version la plus extrême du roadster italien sur le circuit de Mateur. Attention, sensations fortes garanties.",
    content: articleContent,
    tags: ["Ducati", "Sportive", "Circuit", "V4"],
    isFeatured: false
  },
  {
    id: 5,
    title: "Honda EM1 e: : Le premier scooter électrique Honda arrive",
    category: "Électrique",
    image: "https://images.unsplash.com/photo-1675258836561-1e967a5b3a37?auto=format&fit=crop&w=800&q=80",
    date: "05 Oct 2025",
    readTime: "4 min",
    author: "Sarah Mansouri",
    summary: "Honda entre enfin dans la danse de la mobilité urbaine électrique avec le EM1 e:. Idéal pour les trajets courts en centre-ville.",
    content: articleContent,
    tags: ["Honda", "Electrique", "Urbain"],
    isFeatured: false
  },
  {
    id: 6,
    title: "KTM 990 Duke : Le Sniper change de cible",
    category: "Nouveautés",
    image: "https://images.unsplash.com/photo-1563223552-30d01878d91a?auto=format&fit=crop&w=800&q=80",
    date: "01 Oct 2025",
    readTime: "5 min",
    author: "Karim Ben Amor",
    summary: "Plus agressive, plus précise, la nouvelle 990 Duke arrive pour bousculer la hiérarchie des roadsters mid-size.",
    content: articleContent,
    tags: ["KTM", "Roadster", "Duke", "Nouveauté"],
    isFeatured: false
  },
  {
    id: 7,
    title: "Comment entretenir sa chaîne moto comme un pro",
    category: "Tech",
    image: "https://www.motoblouz.com/enjoytheride/wp-content/uploads/2021/05/kit_chaine_moto_sportive_racing.jpg",
    date: "28 Sept 2025",
    readTime: "6 min",
    author: "Atelier Expert",
    summary: "Le kit chaîne est un élément vital. Découvrez nos conseils pour le nettoyer et le graisser afin de prolonger sa durée de vie.",
    content: articleContent,
    tags: ["Entretien", "Mécanique", "Tuto"],
    isFeatured: false
  },
  {
    id: 8,
    title: "Les meilleurs équipements pluie pour l'hiver",
    category: "Essais",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=800&q=80",
    date: "25 Sept 2025",
    readTime: "5 min",
    author: "Sarah Mansouri",
    summary: "Rouler sous la pluie ne doit pas être un calvaire. Nous avons sélectionné les meilleures combinaisons et gants étanches.",
    content: articleContent,
    tags: ["Equipement", "Hiver", "Sécurité"],
    isFeatured: false
  },
  {
    id: 9,
    title: "Zero Motorcycles SR/F : Le futur est déjà là",
    category: "Électrique",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    date: "22 Sept 2025",
    readTime: "7 min",
    author: "Mehdi J.",
    summary: "Silence, couple instantané et autonomie record. La Zero SR/F nous a bluffés lors de notre essai sur les routes du Cap Bon.",
    content: articleContent,
    tags: ["Electrique", "Zero", "Essai"],
    isFeatured: false
  },
  {
    id: 10,
    title: "Triumph Speed 400 : La petite anglaise qui a tout d'une grande",
    category: "Nouveautés",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=80",
    date: "18 Sept 2025",
    readTime: "4 min",
    author: "Pierre Martin",
    summary: "Triumph s'attaque au marché des petites cylindrées avec brio. Finition premium et moteur joueur au programme.",
    content: articleContent,
    tags: ["Triumph", "A2", "Néo-Rétro"],
    isFeatured: false
  }
];

export const mockTips: Tip[] = [
  {
    id: 1,
    title: "Comment bien graisser son kit chaîne ?",
    category: "Entretien",
    image: "https://images.prismic.io/ipone/7bc93054-160f-480e-8d9c-584dd667d9da_27b5ab16-649b-4df6-b513-ae1766a0acdc_IPO_2021_Articles_Web_Photos_2375x1450_02.jpeg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&h=&w=1200",
    date: "05 Sept 2025",
    author: "Atelier Expert",
    readTime: "15 min",
    difficulty: "Débutant",
    summary: "La chaîne est un élément vital de votre moto. Découvrez la méthode simple et efficace pour prolonger sa durée de vie et rouler en sécurité.",
    content: tipContent,
    tools: ["Béquille d'atelier", "Spray nettoyant chaîne", "Graisse chaîne", "Brosse spécifique", "Chiffon propre", "Carton de protection"]
  },
  {
    id: 2,
    title: "Rodage moto : Les 5 règles d'or",
    category: "Conduite",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    date: "12 Sept 2025",
    author: "Karim Ben Amor",
    readTime: "5 min",
    difficulty: "Débutant",
    summary: "Vous venez d'acheter une moto neuve ? Le rodage est crucial pour la fiabilité future du moteur. Voici comment le réussir parfaitement.",
    content: tipContent,
    tools: []
  },
  {
    id: 3,
    title: "Bien choisir son premier casque",
    category: "Équipement",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=800&q=80",
    date: "18 Sept 2025",
    author: "Sarah Mansouri",
    readTime: "6 min",
    difficulty: "Débutant",
    summary: "Intégral, Jet ou Modulable ? Homologation ECE 22.06 ? On vous explique tout pour choisir le casque qui sauvera votre tête.",
    content: tipContent,
    tools: ["Mètre ruban"]
  },
  {
    id: 4,
    title: "Pression des pneus : Pourquoi c'est vital",
    category: "Sécurité",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=80",
    date: "25 Sept 2025",
    author: "Mehdi J.",
    readTime: "4 min",
    difficulty: "Débutant",
    summary: "Une mauvaise pression peut transformer votre moto en danger public. Apprenez à vérifier et ajuster vos pneus comme un pro.",
    content: tipContent,
    tools: ["Manomètre"]
  },
  {
    id: 5,
    title: "Hivernage : Stocker sa moto pendant l'hiver",
    category: "Entretien",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    date: "30 Sept 2025",
    author: "Pierre Martin",
    readTime: "7 min",
    difficulty: "Intermédiaire",
    summary: "Batterie, réservoir, pneus... Voici la checklist complète pour retrouver votre belle prête à démarrer au printemps.",
    content: tipContent,
    tools: ["Chargeur batterie", "Bâche", "Stabilisateur essence"]
  },
  {
    id: 6,
    title: "Législation : Permis A, A1, A2 en Tunisie",
    category: "Législation",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80",
    date: "02 Oct 2025",
    author: "Rédaction MotoScoot",
    readTime: "5 min",
    difficulty: "Débutant",
    summary: "Quel permis pour quelle cylindrée ? Le point complet sur la réglementation tunisienne pour rouler en toute légalité.",
    content: tipContent,
    tools: []
  },
  {
    id: 7,
    title: "Voyager à moto : L'art de faire son sac",
    category: "Équipement",
    image: "https://images.unsplash.com/photo-1625043484555-47841a752d40?auto=format&fit=crop&w=800&q=80",
    date: "05 Oct 2025",
    author: "Karim Ben Amor",
    readTime: "6 min",
    difficulty: "Intermédiaire",
    summary: "Partir en roadtrip demande de l'organisation. Répartition des masses, indispensables à emporter... nos conseils pour voyager léger.",
    content: tipContent,
    tools: ["Sac étanche", "Sangles", "Kit crevaison"]
  },
  {
    id: 8,
    title: "Freinage d'urgence : La technique à maîtriser",
    category: "Sécurité",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    date: "08 Oct 2025",
    author: "Mehdi J.",
    readTime: "5 min",
    difficulty: "Expert",
    summary: "En cas de danger, savoir freiner court peut vous sauver. Découvrez la répartition avant/arrière et l'importance de l'ABS.",
    content: tipContent,
    tools: []
  },
  {
    id: 9,
    title: "Changer ses plaquettes de frein soi-même",
    category: "Entretien",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e4233cd43?auto=format&fit=crop&w=800&q=80",
    date: "10 Oct 2025",
    author: "Atelier Expert",
    readTime: "15 min",
    difficulty: "Intermédiaire",
    summary: "Une opération d'entretien accessible avec un peu d'outillage. Tuto pas à pas pour remplacer vos plaquettes usées.",
    content: tipContent,
    tools: ["Clés Allen", "Pince multiprise", "Nettoyant frein", "Plaquettes neuves"]
  },
  {
    id: 10,
    title: "Rouler la nuit : Voir et être vu",
    category: "Sécurité",
    image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=800&q=80",
    date: "12 Oct 2025",
    author: "Sarah Mansouri",
    readTime: "4 min",
    difficulty: "Débutant",
    summary: "La conduite nocturne multiplie les risques. Éclairage, gilet rétro-réfléchissant, vigilance... nos recommandations.",
    content: tipContent,
    tools: ["Gilet jaune"]
  }
];

export const popularModels: BikeModel[] = [
  {
    id: 4,
    name: "TMAX 560",
    brand: "Yamaha",
    image: "https://www.magma-studio.tn/portfolio2/moto/tmax.jpg",
    price: "À partir de 48 000 DT"
  },
  {
    id: 1,
    name: "MT-07",
    brand: "Yamaha",
    image: "https://www.magma-studio.tn/portfolio2/moto/yamaha.jpg",
    price: "À partir de 26 000 DT"
  },
  {
    id: 2,
    name: "Z900",
    brand: "Kawasaki",
    image: "https://www.magma-studio.tn/portfolio2/moto/kawasaki.jpg",
    price: "À partir de 38 000 DT"
  },
  {
    id: 3,
    name: "R 1250 GS",
    brand: "BMW",
    image: "https://www.magma-studio.tn/portfolio2/moto/BMW%20R%201250%20GS.jpg",
    price: "À partir de 85 000 DT"
  },
  {
    id: 6,
    name: "Africa Twin 1100",
    brand: "Honda",
    image: "https://www.magma-studio.tn/portfolio2/moto/africa-twiin.jpg",
    price: "À partir de 52 000 DT"
  },
  {
    id: 5,
    name: "Street Triple 765",
    brand: "Triumph",
    image: "https://www.magma-studio.tn/portfolio2/moto/triumph.jpg",
    price: "À partir de 34 000 DT"
  }
];

export const popularGarages: Garage[] = [
  {
    id: 1,
    name: "Garage Blayah",
    location: "Station métro Ennour kabaria.",
    image: "https://www.magma-studio.tn/portfolio2/moto/Blayah.jpg",
    specialty: "Mécanique Générale",
    rating: 4.8
  },
  {
    id: 2,
    name: "Speed Bike Service",
    location: "Sousse, Centre Ville",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=80",
    specialty: "Diagnostic & Électronique",
    rating: 4.9
  },
  {
    id: 3,
    name: "Custom Garage",
    location: "La Marsa",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e4233cd43?auto=format&fit=crop&w=800&q=80",
    specialty: "Préparation & Tuning",
    rating: 4.7
  },
  {
    id: 4,
    name: "Scooter Doctor",
    location: "Ariana, Ennasr",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    specialty: "Spécialiste Scooter",
    rating: 4.6
  },
  {
    id: 5,
    name: "Vintage Motors",
    location: "Sfax, Route de Tunis",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e140f07?auto=format&fit=crop&w=800&q=80",
    specialty: "Restauration",
    rating: 5.0
  },
  {
    id: 6,
    name: "Rapid'Moto",
    location: "Bizerte",
    image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=800&q=80",
    specialty: "Entretien Rapide",
    rating: 4.5
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    role: "Acheteur - Tunis",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "J'ai trouvé ma MT-07 en moins de 24h. La recherche par ville est super pratique pour trouver une moto près de chez soi.",
    rating: 5,
    date: "Il y a 2 jours"
  },
  {
    id: 2,
    name: "Sarah Mansouri",
    role: "Vendeuse - Sousse",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Une plateforme intuitive et rapide. J'ai vendu mon scooter en quelques jours sans les tracas habituels des réseaux sociaux.",
    rating: 5,
    date: "Il y a 1 semaine"
  },
  {
    id: 3,
    name: "Karim Tounsi",
    role: "Passionné - Sfax",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Enfin un site dédié aux motards en Tunisie ! Les annonces sont claires et les garages référencés sont de confiance.",
    rating: 4,
    date: "Il y a 3 semaines"
  }
];

export const specialtiesList = [
  "Réparation", "Entretien", "Accessoires", "Pièces détachées", "Customisation",
  "Performance", "Diagnostic électronique", "Vente neuf", "Vente occasion",
  "Scooter", "Grosse Cylindrée", "Tuning", "Classique", "Pneumatiques", "Électrique"
];

export const governoratesList = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan",
  "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana", "Kairouan",
  "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", "Sfax",
  "Gafsa", "Tozeur", "Kebili", "Gabès", "Médenine", "Tataouine"
];

export const tunisianCities = governoratesList;