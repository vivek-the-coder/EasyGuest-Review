'use client';

import { useEffect } from 'react';

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hotel Sai Darshan",
  "description": "Best hotel in Rajpipla near Harshiddhi Mata Temple offering comfortable accommodation and excellent service.",
  "url": "https://hotelsaidarshanreviews.vercel.app",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Opp. Harshiddhimataji Temple",
    "addressLocality": "Rajpipla",
    "addressRegion": "Gujarat",
    "addressCountry": "IN",
    "postalCode": "393145"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.4855",
    "longitude": "73.5115"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "priceRange": "$$",
  "servesCuisine": ["Indian", "Gujarati", "Chinese"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hotel Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Room Accommodation",
          "description": "Comfortable rooms with modern amenities"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Restaurant Service",
          "description": "Multi-cuisine restaurant serving delicious food"
        }
      }
    ]
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "sameAs": [
    "https://www.google.com/maps/search/?api=1&query=Hotel+Sai+Darshan+Rajpipla"
  ]
};

export default function SchemaData() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
