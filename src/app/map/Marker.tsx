'use client';

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ChinguCountryStats } from '@/features/chingu/chingu.type';
import { createMarkerElement } from './markerElement';
import { getCountryCoords } from '@/lib/geo';

interface MarkerType {
  map: mapboxgl.Map | null;
  country: ChinguCountryStats;
}

const Marker = ({ map, country }: MarkerType) => {
  useEffect(() => {
    if (!map) return;

    const coords = getCountryCoords(country.countryCode);

    if (coords) {
      const el = createMarkerElement(country);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([coords.lng, coords.lat])
        .addTo(map);

      return () => {
        marker?.remove();
      };
    }
  }, [map, country]);

  return null;
};

export default Marker;
