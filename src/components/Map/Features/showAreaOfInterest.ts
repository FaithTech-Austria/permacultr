import { $ } from "@builder.io/qwik";
import type { Map } from 'maplibre-gl';
import { zoomToAreaOfInterest } from '../helpers/zoomToAreaOfInterest';

export const showAreaOfInterest = $((map: Map, areaOfInterest: any) => {
  zoomToAreaOfInterest(map, areaOfInterest)

  setTimeout(() => {
    const worldCover = [
      [-180, 90],
      [180, 90],
      [180, -90],
      [-180, -90],
      [-180, 90],
    ]

    const outcut = {
      type: 'Polygon',
      coordinates: [
        worldCover,
        ...areaOfInterest.flatMap((feature: any) => feature.geometry.coordinates)
      ]
    }

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
          'fill-opacity': .5,
      }
    })
    
  }, 300)
})