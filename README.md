# Safar Travels

Safar Travels is a modern and responsive travel agency website built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and GSAP. It provides a clean platform to showcase travel services like visa assistance, flight bookings, hotel reservations, car rentals, and curated destinations.

## Features

- **Hero Section** - Clean landing section with a tagline, call-to-actions, and a featured destination card.
- **Travel Search** - Interactive tab-based search for Flights, Hotels, Visa Assistance, and Car Rental.
- **Services** - Dedicated sections for Visa Services, Flight Booking, Hotel Booking, and Car Rental with key features and CTAs.
- **Popular Destinations** - Curated list of destinations including Istanbul, Dubai, Baku, Maldives, Makkah & Madinah, Hunza Valley, Kuala Lumpur, and Paris.
- **Stats Section** - Animated counters displaying Happy Travellers, Destinations Covered, Years of Experience, and Customer Satisfaction.
- **Testimonials** - Customer reviews with ratings, locations, and verified badges.
- **Contact Section** - Validated inquiry form along with direct contact options via email, phone, and office address.
- **Footer** - Quick navigation, services list, contact details, and brand information.
- **Smooth Animations** - Scroll-reveal and count-up animations powered by GSAP with support for reduced motion.
- **Fully Responsive** - Optimized for seamless viewing across mobile, tablet, and desktop devices.

## Tech Stack

- [Next.js 16.4.4](https://nextjs.org/) - App Router framework
- [React 19.3.0](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [GSAP 3.15.0](https://gsap.com/) - Animations and scroll effects
- [Lucide React](https://lucide.dev/) - Icon library

## Project Structure

```bash
travel-agency/
├── app/                # Next.js App Router (layout, page, global styles)
├── components/         # Reusable UI sections and components
├── data/               # Static data for services, destinations, and testimonials
├── lib/                # Custom hooks and GSAP configuration
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/safar-travels.git
   ```

2. Navigate to the project directory:

   ```bash
   cd safar-travels
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server on `http://localhost:3020`:

```bash
npm run dev
```

### Production Build

To build and start the production version:

```bash
npm run build
npm run start
```

### Linting

To run ESLint:

```bash
npm run lint
```

## License

© 2026 Safar Travels. All rights reserved.
