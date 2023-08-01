import { $ } from "@builder.io/qwik";
import type { Map } from 'maplibre-gl';
import { zoomToAreaOfInterest } from './zoomToAreaOfInterest';

export const showAreaOfInterest = $((map: Map, areaOfInterest: any) => {
  zoomToAreaOfInterest(map, areaOfInterest)

  setTimeout(() => {
    const bounds = map.getBounds()

    const worldCover = [
      [-180, 90],
      [180, 90],
      [180, -90],
      [-180, -90],
      [-180, 90],
    ]

    map.setMinZoom(map.getZoom())
    map.setMaxBounds(bounds)

    const outcut = Object.assign({}, areaOfInterest, {
      geometry: {
        type: 'Polygon',
        coordinates: [
          worldCover,
          areaOfInterest.geometry.coordinates[0]
        ]
      }
    })

    map.addSource('AOI', {
      'type': 'geojson',
      'data': outcut
    })
    map.addLayer({
      'id': 'AOI_layer',
      'type': 'fill',
      'source': 'AOI',
      'layout': {},
      'paint': {
          'fill-color': '#198754',
          'fill-opacity': .7,
      }
    })
    
  }, 300)
})