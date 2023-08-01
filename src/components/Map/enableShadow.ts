import { $ } from "@builder.io/qwik";
import type { CustomLayerInterface, Map } from 'maplibre-gl';
import { BuildingShadows } from './BuildingShadows';

export const enableShadow = $((map: Map, date: Date) => {
  map.removeLayer('Building')
  map.addLayer({
      'id': '3d-buildings',
      "source": "openmaptiles",
      "source-layer": "building",
      'type': 'fill-extrusion',
      'minzoom': 14,
      'paint': {
          'fill-extrusion-color': '#ddd',
          'fill-extrusion-height': ["number", ["get", "height"], 5],
          'fill-extrusion-base': ["number", ["get", "min_height"], 0],
          'fill-extrusion-opacity': 1
      }
  }, 'River labels');
  map.addLayer(new BuildingShadows(date) as CustomLayerInterface, '3d-buildings');
})