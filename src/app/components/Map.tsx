'use client';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { StyleSpecification } from 'mapbox-gl';
import { Marker } from './Marker';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import { getCountryData } from '@/lib/geo';
import { useChinguStats } from '@/hooks/useChinguStats';
import { useUIView } from '@/stores/useUIViewStore';

const calculateZoom = (area: number): number => {
  if (area > 5000000) return 2.5;
  if (area > 1000000) return 3.5;
  if (area > 500000) return 4;
  if (area > 100000) return 5;
  if (area > 50000) return 6;
  return 7;
};

export const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1.5);
  const { selectedCountry } = useSelectedCountry();
  const { currentView } = useUIView();

  const spinningRef = useRef(true);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

    const mapStyle: StyleSpecification = {
      version: 8,
      name: 'My Custom Style',
      glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      sprite: 'mapbox://sprites/mapbox/streets-v12',
      fog: {
        color: '#2e74a3',
        'high-color': '#b64fff',
        'space-color': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          '#010b19',
          4,
          '#010b19',
          7,
          '#367ab9',
        ],
        'horizon-blend': 0.1,
        'star-intensity': 0.6,
        range: [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          ['literal', [0.2, 1]],
          22,
          ['literal', [0.2, 1]],
        ],
      },
      sources: {
        'mapbox-streets': {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
        'mapbox-countries': {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        },
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: { 'background-color': '#171e3d' },
        },
        {
          id: 'water',
          type: 'fill',
          source: 'mapbox-streets',
          'source-layer': 'water',
          paint: { 'fill-color': '#1b2f52' },
        },
        {
          id: 'country-boundaries',
          type: 'fill',
          source: 'mapbox-countries',
          'source-layer': 'country_boundaries',
          paint: { 'fill-color': '#171e3d', 'fill-outline-color': '#40b8f5' },
        },
      ],
    };

    const m = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [0, 90],
      zoom: 1.5,
      pitch: 70,
      bearing: 0,
      projection: 'globe',
    });

    m.on('load', () => {
      m.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
        promoteId: 'mapbox_id',
      });
    });

    setMap(m);

    return () => {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
      m.remove();
    };
  }, []);

  // Enable / disable map interactions based on currentView
  useEffect(() => {
    if (!map) return;

    const disable = () => {
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.dragRotate.disable();
      map.dragPan.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();
    };

    const enable = () => {
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.dragRotate.enable();
      map.dragPan.enable();
      map.keyboard.enable();
      map.doubleClickZoom.enable();
      map.touchZoomRotate.enable();
    };

    currentView === 'home' ? disable() : enable();
  }, [map, currentView]);

  // Spin logic
  useEffect(() => {
    if (!map) return;

    const rotationSpeed = 0.05;

    const rotateGlobe = (timestamp: number) => {
      if (!spinningRef.current) {
        animationFrameIdRef.current = null;
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed > 16) {
        const c = map.getCenter();
        map.setCenter([c.lng + rotationSpeed, c.lat]);
        lastTimeRef.current = timestamp;
      }

      animationFrameIdRef.current = requestAnimationFrame(rotateGlobe);
    };

    if (currentView === 'home') {
      spinningRef.current = true;
      lastTimeRef.current = 0;

      map.flyTo({
        center: [0, 90],
        pitch: 70,
        bearing: 0,
        zoom: 1.5,
        duration: 2000,
      });

      setTimeout(() => {
        if (spinningRef.current) rotateGlobe(0);
      }, 2100);
    } else {
      spinningRef.current = false;
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);

      setTimeout(() => {
        map.flyTo({
          center: [0, 0],
          pitch: 0,
          bearing: 0,
          zoom: 1.5,
          duration: 2000,
        });
      }, 100);
    }
  }, [map, currentView]);

  // Fly to selected country
  useEffect(() => {
    if (!map || !selectedCountry) return;
    const countryData = getCountryData(selectedCountry);
    if (!countryData || !countryData.latlng) return;
    const [lat, lng] = countryData.latlng;
    const zoom = calculateZoom(countryData.area);
    map.flyTo({ center: [lng, lat], zoom, essential: true });
  }, [map, selectedCountry]);

  const { countries } = useChinguStats();
  const showMarkers = currentView !== 'home';

  return (
    <div className="h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full" />
      {showMarkers &&
        Object.entries(countries).map(([country, count]) => (
          <Marker
            key={country}
            map={map}
            country={country}
            count={count}
            zoom={currentZoom}
          />
        ))}
    </div>
  );
};
