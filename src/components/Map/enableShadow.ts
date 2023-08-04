import { $ } from "@builder.io/qwik";
import type { CustomLayerInterface, Map } from 'maplibre-gl';
import { BuildingShadows } from './BuildingShadows';

export const enableShadow = $((map: Map, date: Date) => {
  const layersToShadow = {
    openmaptiles: ['building'],
    'td-polygon': ['_']
  }

  map.removeLayer('td-polygon-outline')

  for (const [base, layers] of Object.entries(layersToShadow)) {
    for (const layer of layers) {
      const newId = '3d-' + layer

      const layerObject: any = {
        'id': newId,
        "source": base,
        'type': 'fill-extrusion',
        'minzoom': 14,
        'paint': {
            'fill-extrusion-color': '#ddd',
            'fill-extrusion-height': ["number", ["get", "height"], 5],
            'fill-extrusion-base': ["number", ["get", "min_height"], 0],
            'fill-extrusion-opacity': 1
        }
      }

      if (layer !== '_') {
        layerObject['source-layer'] = layer
      }

      map.addLayer(layerObject, 'River labels');
      map.addLayer(new BuildingShadows(base, newId, date) as CustomLayerInterface, newId);  
    }
  }
})