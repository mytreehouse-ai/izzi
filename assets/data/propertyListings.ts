export const propertyListingData = [
  {
    id: 1,
    listingTitle: "Cozy Suburban Home",
    longitude: 121.0333,
    latitude: 14.5833,
    size: 2000, // in square feet
    price: 350000, // in USD
    formattedPrice: "₱" + (350000 * 50).toLocaleString(), // Assuming 1 USD = 50 PHP for example
    description:
      "A cozy 3 bedroom home in a quiet suburban neighborhood. Perfect for families.",
    address: "1234 Suburbia Lane, Quezon City, Metro Manila",
    features: ["3 bedrooms", "2 bathrooms", "2 car garage", "Fenced backyard"],
    imageUrl:
      "./assets/images/real-state/bailey-anselme-Bkp3gLygyeA-unsplash.jpg",
  },
  {
    id: 2,
    listingTitle: "Modern City Loft",
    longitude: 121.0444,
    latitude: 14.5547,
    size: 1500,
    price: 450000,
    formattedPrice: "₱" + (450000 * 50).toLocaleString(),
    description:
      "Modern loft in the heart of the city. Close to public transportation and nightlife.",
    address: "5678 Cityscape Blvd, Makati, Metro Manila",
    features: [
      "2 bedrooms",
      "2 bathrooms",
      "Open floor plan",
      "Rooftop access",
    ],
    imageUrl: "./assets/images/real-state/dan-gold-4HG3Ca3EzWw-unsplash.jpg",
  },
  {
    id: 3,
    listingTitle: "Beachfront Villa",
    longitude: 122.731,
    latitude: 11.8485,
    size: 3000,
    price: 600000,
    formattedPrice: "₱" + (600000 * 50).toLocaleString(),
    description: "Luxurious beachfront villa with stunning ocean views.",
    address: "123 Paradise Road, Boracay, Aklan",
    features: [
      "4 bedrooms",
      "4 bathrooms",
      "Private pool",
      "Direct beach access",
    ],
    imageUrl:
      "./assets/images/real-state/avi-werde-8N46xC5YmKM-unsplashhouse3.jpg",
  },
  {
    id: 4,
    listingTitle: "Mountain Retreat",
    longitude: 120.8988,
    latitude: 14.1153,
    size: 2500,
    price: 500000,
    formattedPrice: "₱" + (500000 * 50).toLocaleString(),
    description:
      "A serene retreat nestled in the mountains, perfect for a peaceful getaway.",
    address: "456 Highland Ave, Tagaytay, Cavite",
    features: [
      "3 bedrooms",
      "3 bathrooms",
      "Fireplace",
      "Panoramic mountain views",
    ],
    imageUrl:
      "./assets/images/real-state/daniel-barnes-RKdLlTyjm5g-unsplash.jpg",
  },
  {
    id: 5,
    listingTitle: "Downtown Condo",
    longitude: 121.036,
    latitude: 14.5692,
    size: 1000,
    price: 300000,
    formattedPrice: "₱" + (300000 * 50).toLocaleString(),
    description:
      "Conveniently located condo in the bustling downtown area, with all amenities nearby.",
    address: "789 Urban St, Ortigas, Pasig",
    features: ["2 bedrooms", "2 bathrooms", "Gym access", "24/7 security"],
    imageUrl: "assets/images/real-state/house5.jpg",
  },
  {
    id: 6,
    listingTitle: "Country Farmhouse",
    longitude: 121.7225,
    latitude: 17.6131,
    size: 4000,
    price: 700000,
    formattedPrice: "₱" + (700000 * 50).toLocaleString(),
    description:
      "Spacious farmhouse with vast lands, perfect for a peaceful country living.",
    address: "321 Countryside Road, Tuguegarao, Cagayan",
    features: [
      "5 bedrooms",
      "4 bathrooms",
      "Barn and stables",
      "Fruit orchards",
    ],
    imageUrl:
      "./assets/images/real-state/ronnie-george-09IdwcwrMH4-unsplash.jpg",
  },
];
