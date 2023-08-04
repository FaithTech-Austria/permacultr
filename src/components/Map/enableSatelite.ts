import { $ } from "@builder.io/qwik";
import type { Map } from 'maplibre-gl';
import { mapTilerKey } from './constants';

export const enableSatelite = $((map: Map) => {

  map.addSource('satelite', {
    'type': 'raster',
    'tiles': [
        // `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=${mapTilerKey}`
        'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
    ],
    maxzoom: 21,
    'tileSize': 256
  });
  map.addLayer(
      {
          'id': 'satelite-layer',
          'type': 'raster',
          'source': 'satelite',
          'layout': {
            'visibility': 'none'
          }
      }
  );

})