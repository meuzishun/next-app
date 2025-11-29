'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChinguCountryStats } from '@/features/chingu/chingu.type';
import Marker from './Marker';

interface MapViewType {
  countryStats?: ChinguCountryStats[];
}

export default function MapView({ countryStats }: MapViewType) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
    const m = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [-71.1252, 42.4756],
      zoom: 5,
    });
    setMap(m);

    return () => {
      m.remove();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div id="map-container" className="h-full w-full" ref={mapContainerRef} />
      {countryStats?.map((country) => (
        <Marker key={country.countryCode} map={map} country={country} />
      ))}
    </div>
  );
}
