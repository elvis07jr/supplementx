export const categories = [
  { id: 1, name: 'Protein', icon: 'dumbbell' },
  { id: 2, name: 'Pre-Workout', icon: 'zap' },
  { id: 3, name: 'Vitamins', icon: 'pill' },
  { id: 4, name: 'Amino Acids', icon: 'activity' },
  { id: 5, name: 'Weight Gainers', icon: 'trending-up' },
  { id: 6, name: 'Recovery', icon: 'refresh-cw' },
];

export const supplements = [
  {
    id: 1,
    name: 'Ultra Whey Protein',
    brand: 'FitFuel',
    price: 49.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 1,
    description: 'Premium whey protein isolate with 25g of protein per serving. Supports muscle recovery and growth.',
    size: '2 lbs',
    servings: 30,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Power Blast Pre-Workout',
    brand: 'Energize',
    price: 39.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 2,
    description: 'Advanced pre-workout formula with caffeine, beta-alanine, and creatine for maximum energy and focus.',
    size: '300g',
    servings: 30,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Essential Multivitamin',
    brand: 'VitaCore',
    price: 24.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 3,
    description: 'Complete multivitamin formula with essential nutrients for overall health and wellness.',
    size: '90 capsules',
    servings: 90,
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: 'BCAA Recovery Complex',
    brand: 'AminoFlex',
    price: 34.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c1b5d0b51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 4,
    description: 'Branched-chain amino acids formula to support muscle recovery and reduce soreness.',
    size: '400g',
    servings: 40,
    inStock: true,
    featured: false,
  },
  {
    id: 5,
    name: 'Mass Gainer 3000',
    brand: 'BulkUp',
    price: 54.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1505155485412-30b3a45080ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 5,
    description: 'High-calorie formula with protein, carbs, and essential nutrients for weight gain.',
    size: '5 lbs',
    servings: 20,
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    name: 'Joint Support Formula',
    brand: 'FlexFit',
    price: 29.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 6,
    description: 'Comprehensive joint support with glucosamine, chondroitin, and MSM.',
    size: '60 tablets',
    servings: 60,
    inStock: false,
    featured: false,
  },
  {
    id: 7,
    name: 'Creatine Monohydrate',
    brand: 'StrengthMax',
    price: 19.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579722820258-02b8611f58dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 6,
    description: 'Pure creatine monohydrate for increased strength, power, and muscle mass.',
    size: '500g',
    servings: 100,
    inStock: true,
    featured: true,
  },
  {
    id: 8,
    name: 'Omega-3 Fish Oil',
    brand: 'VitaCore',
    price: 22.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1577460551100-d3f84b6e4c7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 3,
    description: 'High-quality fish oil with EPA and DHA for heart, brain, and joint health.',
    size: '120 softgels',
    servings: 120,
    inStock: true,
    featured: false,
  },
];

export const orders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    items: [
      { id: 1, name: 'Ultra Whey Protein', quantity: 1, price: 49.99 },
      { id: 2, name: 'Power Blast Pre-Workout', quantity: 1, price: 39.99 }
    ],
    total: 89.98,
    status: 'Delivered',
    date: '2025-06-25',
    address: '123 Main St, New York, NY 10001',
    pharmacy: 'HealthFit Pharmacy'
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    items: [
      { id: 3, name: 'Essential Multivitamin', quantity: 1, price: 24.99 },
      { id: 4, name: 'BCAA Recovery Complex', quantity: 2, price: 69.98 }
    ],
    total: 94.97,
    status: 'Processing',
    date: '2025-06-29',
    address: '456 Park Ave, New York, NY 10022',
    pharmacy: 'HealthFit Pharmacy'
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    items: [
      { id: 5, name: 'Mass Gainer 3000', quantity: 1, price: 54.99 }
    ],
    total: 54.99,
    status: 'In Transit',
    date: '2025-06-28',
    address: '789 Broadway, New York, NY 10003',
    pharmacy: 'FitLife Supplements'
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    items: [
      { id: 7, name: 'Creatine Monohydrate', quantity: 1, price: 19.99 },
      { id: 8, name: 'Omega-3 Fish Oil', quantity: 1, price: 22.99 }
    ],
    total: 42.98,
    status: 'Pending',
    date: '2025-06-30',
    address: '321 5th Ave, New York, NY 10016',
    pharmacy: 'FitLife Supplements'
  }
];

export const pharmacies = [
  {
    id: 1,
    name: 'HealthFit Pharmacy',
    address: '123 Health St, New York, NY 10001',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    products: 120,
    orders: 45
  },
  {
    id: 2,
    name: 'FitLife Supplements',
    address: '456 Fitness Ave, New York, NY 10022',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    products: 85,
    orders: 32
  }
];