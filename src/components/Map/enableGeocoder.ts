import { $ } from "@builder.io/qwik";
import maplibregl from 'maplibre-gl';
import type { Map } from 'maplibre-gl';
import { mapTilerKey } from './constants';
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";

export const enableGeocoder = $((map: Map) => {
  const geocoder = new GeocodingControl({ 
    apiKey: mapTilerKey, 
    /** @ts-ignore */
    maplibregl, 
    flyTo: { duration: 100 } 
  })

  map.addControl(geocoder)
})