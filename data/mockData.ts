export type Currency = "PKR" | "USD";

export type ServiceCategory = "visa" | "flights" | "hotels" | "car-rental";

export type ServiceIcon = "passport" | "plane" | "hotel" | "car";

export type AccentColor = "emerald" | "sky" | "amber" | "violet";

export type DestinationRegion =
  | "Middle East"
  | "Europe"
  | "Asia"
  | "Indian Ocean"
  | "Pakistan";

export interface ServiceOption {
  name: string;
  detail: string;
  price: number;
}

export interface ServiceHighlight {
  title: string;
  description: string;
}

export interface Service {
  id: ServiceCategory;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: ServiceIcon;
  accent: AccentColor;
  badge?: string;
  startingPrice: number;
  currency: Currency;
  priceUnit: string;
  turnaround: string;
  rating: number;
  reviewCount: number;
  highlights: ServiceHighlight[];
  includes: string[];
  options: ServiceOption[];
  ctaLabel: string;
  href: string;
}

export interface Destination {
  id: string;
  slug: string;
  city: string;
  country: string;
  region: DestinationRegion;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  startingPrice: number;
  currency: Currency;
  duration: string;
  rating: number;
  reviewCount: number;
  bestTimeToVisit: string;
  visaRequired: boolean;
  tags: string[];
  attractions: string[];
  inclusions: string[];
  featured: boolean;
  badge?: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  service: ServiceCategory;
  destination: string;
  title: string;
  quote: string;
  date: string;
  verified: boolean;
}

export const services: Service[] = [
  {
    id: "visa",
    slug: "visa",
    title: "Visa Services",
    tagline: "Get expert guidance, clear document checklists and application support for a smoother visa process.",
    description:
      "Get expert guidance, clear document checklists and application support for a smoother visa process.",
    icon: "passport",
    accent: "emerald",
    badge: "Most Requested",
    startingPrice: 12000,
    currency: "PKR",
    priceUnit: "per application",
    turnaround: "3–10 working days",
    rating: 4.9,
    reviewCount: 1280,
    highlights: [
      {
        title: "High approval rate",
        description:
          "Applications are reviewed against current embassy requirements before submission.",
      },
      {
        title: "Appointment booking",
        description:
          "Biometric and interview slots secured at the nearest available centre.",
      },
      {
        title: "Document verification",
        description:
          "Bank statements, invitations and itineraries checked for consistency.",
      },
      {
        title: "Live status updates",
        description:
          "Application progress shared on WhatsApp until the passport is back in your hands.",
      },
    ],
    includes: [
      "Visa eligibility guidance",
      "Personalized document checklist",
      "Application review and assistance",
    ],
    options: [
      {
        name: "UAE Tourist Visa",
        detail: "14–30 days · single entry",
        price: 18500,
      },
      {
        name: "Turkey e-Visa",
        detail: "180 days · multiple entry",
        price: 12000,
      },
      {
        name: "Saudi Umrah Visa",
        detail: "90 days · single entry",
        price: 29500,
      },
      {
        name: "Schengen Tourist Visa",
        detail: "Up to 90 days · single entry",
        price: 38500,
      },
    ],
    ctaLabel: "Explore Visa Services",
    href: "/services/visa",
  },
  {
    id: "flights",
    slug: "flights",
    title: "Flight Booking",
    tagline: "Compare flight options and find convenient routes that match your schedule and budget.",
    description:
      "Compare flight options and find convenient routes that match your schedule and budget.",
    icon: "plane",
    accent: "sky",
    badge: "Best Fare Options",
    startingPrice: 89500,
    currency: "PKR",
    priceUnit: "per person · return",
    turnaround: "Instant confirmation",
    rating: 4.8,
    reviewCount: 2140,
    highlights: [
      {
        title: "20+ airline partners",
        description:
          "Economy, premium economy and business cabins compared across major carriers.",
      },
      {
        title: "Flexible date search",
        description:
          "We check nearby dates and alternate airports to bring the fare down.",
      },
      {
        title: "Group bookings",
        description:
          "Dedicated seat blocks and negotiated fares for families and corporate teams.",
      },
      {
        title: "24/7 assistance",
        description:
          "A real person on WhatsApp for delays, cancellations and last-minute changes.",
      },
    ],
    includes: [
      "Domestic and international flights",
      "Airline and fare comparison",
      "Baggage and seat assistance",
    ],
    options: [
      {
        name: "Lahore → Dubai",
        detail: "Emirates · economy return",
        price: 89500,
      },
      {
        name: "Karachi → Istanbul",
        detail: "Turkish Airlines · economy return",
        price: 148000,
      },
      {
        name: "Islamabad → Jeddah",
        detail: "Saudia · economy return",
        price: 112000,
      },
      {
        name: "Lahore → Kuala Lumpur",
        detail: "Malaysia Airlines · economy return",
        price: 165000,
      },
    ],
    ctaLabel: "Search Flights",
    href: "/services/flights",
  },
  {
    id: "hotels",
    slug: "hotels",
    title: "Hotel Booking",
    tagline: "Discover the right stay for your journey, from family-friendly hotels to relaxing luxury escapes.",
    description:
      "Discover the right stay for your journey, from family-friendly hotels to relaxing luxury escapes.",
    icon: "hotel",
    accent: "amber",
    badge: "Comfortable Stays",
    startingPrice: 18500,
    currency: "PKR",
    priceUnit: "per night",
    turnaround: "Instant booking",
    rating: 4.9,
    reviewCount: 940,
    highlights: [
      {
        title: "Haram-view stays",
        description:
          "Walking-distance options in Makkah and Madinah with verified room photos.",
      },
      {
        title: "Free cancellation",
        description:
          "Flexible rates filtered for plans that may shift before departure.",
      },
      {
        title: "Family rooms",
        description:
          "Connecting rooms, quad occupancy and cribs arranged on request.",
      },
      {
        title: "Verified reviews",
        description:
          "Only properties personally checked or backed by recent guest feedback.",
      },
    ],
    includes: [
      "Hotel and room comparison",
      "Location and amenities guidance",
      "Flexible cancellation options where available",
    ],
    options: [
      {
        name: "Makkah · 3-star Haram view",
        detail: "5-minute walk to Masjid al-Haram",
        price: 18500,
      },
      {
        name: "Madinah · 4-star central",
        detail: "Breakfast included · 700m from Masjid an-Nabawi",
        price: 22500,
      },
      {
        name: "Dubai · 4-star Marina",
        detail: "Sea-view room · metro access",
        price: 26500,
      },
      {
        name: "Istanbul · boutique Sultanahmet",
        detail: "Walking distance to Hagia Sophia",
        price: 19500,
      },
    ],
    ctaLabel: "Find a Hotel",
    href: "/services/hotels",
  },
  {
    id: "car-rental",
    slug: "car-rental",
    title: "Car Rental",
    tagline: "Travel comfortably with suitable vehicles and reliable transportation arrangements.",
    description:
      "Travel comfortably with suitable vehicles and reliable transportation arrangements.",
    icon: "car",
    accent: "violet",
    badge: "Convenient Travel",
    startingPrice: 7500,
    currency: "PKR",
    priceUnit: "per day",
    turnaround: "Same-day pickup",
    rating: 4.8,
    reviewCount: 610,
    highlights: [
      {
        title: "With or without driver",
        description:
          "Self-drive and chauffeur options for city errands, business trips and tours.",
      },
      {
        title: "Airport pickup",
        description:
          "Vehicles delivered to Lahore, Karachi and Islamabad airports on arrival.",
      },
      {
        title: "Unlimited mileage",
        description:
          "No per-kilometre surprises on approved out-of-city routes.",
      },
      {
        title: "Maintained fleet",
        description:
          "Every vehicle serviced and inspected before it leaves the lot.",
      },
    ],
    includes: [
      "Sedan, SUV and family vehicles",
      "Self-drive and chauffeur options",
      "Clear rental terms",
    ],
    options: [
      {
        name: "Toyota Corolla",
        detail: "Sedan · with driver · 4 passengers",
        price: 7500,
      },
      {
        name: "Toyota Hiace",
        detail: "Van · with driver · 12 passengers",
        price: 14500,
      },
      {
        name: "Toyota Fortuner",
        detail: "SUV · self-drive · 7 passengers",
        price: 18500,
      },
      {
        name: "Mercedes E-Class",
        detail: "Luxury sedan · chauffeur · 3 passengers",
        price: 35000,
      },
    ],
    ctaLabel: "Book a Vehicle",
    href: "/services/car-rental",
  },
];

export const destinations: Destination[] = [
  {
    id: "istanbul",
    slug: "istanbul",
    city: "Istanbul",
    country: "Turkey",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Istanbul skyline and the Bosphorus at sunset",
    tagline: "Discover historic streets, beautiful waterfronts and a city where two continents meet.",
    description:
      "Discover historic streets, beautiful waterfronts and a city where two continents meet.",
    startingPrice: 189000,
    currency: "PKR",
    duration: "6 days / 5 nights",
    rating: 4.9,
    reviewCount: 1240,
    bestTimeToVisit: "April – June, September – October",
    visaRequired: true,
    tags: ["City break", "Culture", "Food"],
    attractions: [
      "Hagia Sophia",
      "Blue Mosque",
      "Grand Bazaar",
      "Bosphorus cruise",
    ],
    inclusions: [
      "Return economy flights",
      "5 nights in a 4-star central hotel",
      "Airport transfers",
      "Guided old-city tour",
      "Bosphorus sunset cruise",
    ],
    featured: true,
    badge: "Best seller",
    href: "/destinations/istanbul",
  },
  {
    id: "dubai",
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Dubai skyline with Burj Khalifa at dusk",
    tagline: "Experience iconic skylines, desert adventures and unforgettable family attractions.",
    description:
      "Experience iconic skylines, desert adventures and unforgettable family attractions.",
    startingPrice: 139000,
    currency: "PKR",
    duration: "4 days / 3 nights",
    rating: 4.8,
    reviewCount: 1860,
    bestTimeToVisit: "November – March",
    visaRequired: true,
    tags: ["Family", "Shopping", "Luxury"],
    attractions: [
      "Burj Khalifa",
      "Dubai Mall",
      "Desert safari",
      "Palm Jumeirah",
    ],
    inclusions: [
      "Return economy flights",
      "3 nights in a 4-star hotel",
      "UAE tourist visa",
      "Desert safari with BBQ dinner",
      "Airport transfers",
    ],
    featured: true,
    badge: "Family favourite",
    href: "/destinations/dubai",
  },
  {
    id: "baku",
    slug: "baku",
    city: "Baku",
    country: "Azerbaijan",
    region: "Asia",
    image:
      "https://images.pexels.com/photos/29232860/pexels-photo-29232860.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Flame Towers rising above a park in Baku",
    tagline: "Explore modern architecture, charming old streets and Caspian Sea views.",
    description:
      "Explore modern architecture, charming old streets and Caspian Sea views.",
    startingPrice: 159000,
    currency: "PKR",
    duration: "5 days / 4 nights",
    rating: 4.8,
    reviewCount: 720,
    bestTimeToVisit: "April – June, September – October",
    visaRequired: true,
    tags: ["Budget friendly", "Old city", "Caspian"],
    attractions: [
      "Icherisheher Old City",
      "Flame Towers",
      "Gobustan",
      "Baku Boulevard",
    ],
    inclusions: [
      "Return economy flights",
      "4 nights in a boutique hotel",
      "Azerbaijan e-visa",
      "Old City walking tour",
      "Gobustan day trip",
    ],
    featured: false,
    badge: "Trending",
    href: "/destinations/baku",
  },
  {
    id: "maldives",
    slug: "maldives",
    city: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Overwater villas and turquoise lagoon in the Maldives",
    tagline: "Escape to turquoise waters, tropical islands and beautiful overwater villas.",
    description:
      "Escape to turquoise waters, tropical islands and beautiful overwater villas.",
    startingPrice: 289000,
    currency: "PKR",
    duration: "5 days / 4 nights",
    rating: 4.9,
    reviewCount: 980,
    bestTimeToVisit: "November – April",
    visaRequired: false,
    tags: ["Honeymoon", "Luxury", "Beach"],
    attractions: [
      "Water villas",
      "House-reef snorkelling",
      "Sunset dolphin cruise",
      "Private sandbank dinner",
    ],
    inclusions: [
      "Return economy flights",
      "4 nights in a water villa",
      "All-inclusive meal plan",
      "Speedboat transfers",
      "Honeymoon room setup",
    ],
    featured: true,
    badge: "Honeymoon pick",
    href: "/destinations/maldives",
  },
  {
    id: "makkah-madinah",
    slug: "makkah-madinah",
    city: "Makkah & Madinah",
    country: "Saudi Arabia",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Masjid an-Nabawi in Madinah at sunset",
    tagline: "Plan your spiritual journey with thoughtful Umrah travel assistance.",
    description:
      "Plan your spiritual journey with thoughtful Umrah travel assistance.",
    startingPrice: 219000,
    currency: "PKR",
    duration: "10 days / 9 nights",
    rating: 5,
    reviewCount: 2400,
    bestTimeToVisit: "Year-round · Ramadan fills early",
    visaRequired: true,
    tags: ["Umrah", "Spiritual", "Family"],
    attractions: [
      "Masjid al-Haram",
      "Masjid an-Nabawi",
      "Jabal-e-Noor",
      "Quba Mosque",
    ],
    inclusions: [
      "Return economy flights",
      "5 nights in Makkah · 4 nights in Madinah",
      "Umrah visa processing",
      "Intercity transport",
      "Ziyarat tour",
      "On-ground coordinator",
    ],
    featured: true,
    badge: "Umrah special",
    href: "/destinations/makkah-madinah",
  },
  {
    id: "hunza",
    slug: "hunza",
    city: "Hunza Valley",
    country: "Pakistan",
    region: "Pakistan",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Snow-capped mountains above Hunza Valley",
    tagline: "Discover breathtaking mountains, peaceful valleys and the natural beauty of northern Pakistan.",
    description:
      "Discover breathtaking mountains, peaceful valleys and the natural beauty of northern Pakistan.",
    startingPrice: 64900,
    currency: "PKR",
    duration: "6 days / 5 nights",
    rating: 4.9,
    reviewCount: 540,
    bestTimeToVisit: "April – October",
    visaRequired: false,
    tags: ["Mountains", "Road trip", "Budget"],
    attractions: [
      "Attabad Lake",
      "Passu Cones",
      "Baltit Fort",
      "Eagle's Nest viewpoint",
    ],
    inclusions: [
      "Private transport from Islamabad",
      "5 nights in guesthouses and hotels",
      "Experienced driver",
      "Breakfast and dinner",
      "Local guide in Hunza",
    ],
    featured: false,
    badge: "Local favourite",
    href: "/destinations/hunza",
  },
  {
    id: "kuala-lumpur",
    slug: "kuala-lumpur",
    city: "Kuala Lumpur",
    country: "Malaysia",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Petronas Towers lit up at night in Kuala Lumpur",
    tagline: "Enjoy vibrant city life, cultural attractions and unforgettable food experiences.",
    description:
      "Enjoy vibrant city life, cultural attractions and unforgettable food experiences.",
    startingPrice: 179000,
    currency: "PKR",
    duration: "6 days / 5 nights",
    rating: 4.7,
    reviewCount: 830,
    bestTimeToVisit: "March – October",
    visaRequired: true,
    tags: ["Family", "Food", "Shopping"],
    attractions: [
      "Petronas Towers",
      "Batu Caves",
      "Bukit Bintang",
      "Genting Highlands",
    ],
    inclusions: [
      "Return economy flights",
      "5 nights in a 4-star hotel",
      "Malaysia visa",
      "Airport transfers",
      "Half-day city tour",
    ],
    featured: false,
    href: "/destinations/kuala-lumpur",
  },
  {
    id: "paris",
    slug: "paris",
    city: "Paris",
    country: "France",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Eiffel Tower in Paris at golden hour",
    tagline: "Experience iconic landmarks, charming streets and the timeless beauty of Paris.",
    description:
      "Experience iconic landmarks, charming streets and the timeless beauty of Paris.",
    startingPrice: 349000,
    currency: "PKR",
    duration: "7 days / 6 nights",
    rating: 4.8,
    reviewCount: 1100,
    bestTimeToVisit: "April – June, September – October",
    visaRequired: true,
    tags: ["Romantic", "Art", "Luxury"],
    attractions: [
      "Eiffel Tower",
      "Louvre Museum",
      "Montmartre",
      "Seine river cruise",
    ],
    inclusions: [
      "Return economy flights",
      "6 nights in a central 4-star hotel",
      "Schengen visa assistance",
      "Airport transfers",
      "Seine cruise tickets",
      "Half-day guided city tour",
    ],
    featured: true,
    badge: "Premium",
    href: "/destinations/paris",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "ayesha-khan",
    name: "Ayesha Khan",
    initials: "AK",
    location: "Lahore",
    rating: 5,
    service: "visa",
    destination: "Makkah & Madinah",
    title: "Our Umrah visa and hotels were sorted in three days",
    quote:
      "We applied for a family Umrah visa on Monday and had approvals by Thursday. The hotel was a two-minute walk from Masjid al-Haram, exactly as promised. Zero surprises from booking to landing.",
    date: "2026-09-18",
    verified: true,
  },
  {
    id: "hamza-sheikh",
    name: "Hamza Sheikh",
    initials: "HS",
    location: "Karachi",
    rating: 5,
    service: "flights",
    destination: "Dubai",
    title: "They found a fare cheaper than the airline website",
    quote:
      "I needed a last-minute Dubai ticket for a work meeting and expected to overpay. Hamza's team checked alternate dates and airports, got me a better fare and added extra baggage without any drama.",
    date: "2026-10-02",
    verified: true,
  },
  {
    id: "fatima-noor",
    name: "Fatima Noor",
    initials: "FN",
    location: "Islamabad",
    rating: 5,
    service: "visa",
    destination: "Istanbul",
    title: "Turkey visa approved without a single follow-up",
    quote:
      "The document checklist was clear, my bank statements were reviewed before submission, and I got WhatsApp updates at every stage. The visa arrived in four working days.",
    date: "2026-08-11",
    verified: true,
  },
  {
    id: "zainab-usman",
    name: "Zainab & Usman",
    initials: "ZU",
    location: "Rawalpindi",
    rating: 5,
    service: "hotels",
    destination: "Maldives",
    title: "A honeymoon that looked exactly like the photos",
    quote:
      "They matched us with an island that suited our budget instead of pushing the most expensive option. The water villa, speedboat transfer and room setup were all confirmed before we paid.",
    date: "2026-06-27",
    verified: true,
  },
  {
    id: "daniyal-qureshi",
    name: "Daniyal Qureshi",
    initials: "DQ",
    location: "Multan",
    rating: 4,
    service: "car-rental",
    destination: "Hunza Valley",
    title: "Clean Hiace, experienced driver, honest pricing",
    quote:
      "Eight days on the Karakoram Highway with a driver who knew every stop and kept the van spotless. The fuel policy was explained upfront and the final bill matched the quote.",
    date: "2026-07-09",
    verified: true,
  },
  {
    id: "maryam-siddiqui",
    name: "Maryam Siddiqui",
    initials: "MS",
    location: "Lahore",
    rating: 5,
    service: "hotels",
    destination: "Kuala Lumpur",
    title: "Family rooms and breakfast sorted before we landed",
    quote:
      "Travelling with two young children, connecting rooms and breakfast mattered more than anything. Everything was confirmed in advance, and the hotel was a short walk from the train station.",
    date: "2026-05-14",
    verified: true,
  },
];
