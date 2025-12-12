'use client';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { StyleSpecification } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from './Marker';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import { getCountryData } from '@/lib/geo';
import { useChinguStats } from '@/hooks/useChinguStats';

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
  const { selectedCountry } = useSelectedCountry();
  const { countries } = useChinguStats();

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
      'country-labels-source': {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8',
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#171e3d',
          'background-pattern': 'dots-large',
        },
      },
      {
        id: 'water',
        type: 'fill',
        source: 'mapbox-streets',
        'source-layer': 'water',
        paint: {
          'fill-color': '#1b2f52',
        },
      },
      {
        id: 'country-boundaries',
        type: 'fill',
        source: 'mapbox-countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': '#171e3d',
          'fill-outline-color': '#40b8f5',
        },
      },
      {
        id: 'country-labels',
        type: 'symbol',
        source: 'country-labels-source',
        'source-layer': 'place_label',
        filter: ['==', ['get', 'type'], 'country'],
        layout: {
          'text-field': ['get', 'name_en'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#40b8f5',
          'text-halo-color': '#171e3d',
          'text-halo-width': 1,
        },
        minzoom: 1,
      },
    ],
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
    const m = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [-71.1252, 42.4756],
      zoom: 1,
      style: mapStyle,
      projection: 'globe',
    });

    setMap(m);

    return () => {
      m.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !selectedCountry) return;

    const countryData = getCountryData(selectedCountry);

    if (!countryData) return;

    const { area, latlng } = countryData;

    if (!latlng) return;

    const [lat, lng] = latlng;

    const zoom = countryData ? calculateZoom(area) : 3;

    map.flyTo({
      center: [lng, lat],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      zoom,
    });
  }, [map, selectedCountry]);

  return (
    <div className="relative h-full w-full">
      <div id="map-container" className="h-full w-full" ref={mapContainerRef} />
      {Object.entries(countries).map(([country, count]) => (
        <Marker key={country} map={map} country={country} count={count} />
      ))}
    </div>
  );
};
