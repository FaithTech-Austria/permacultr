import { $ } from "@builder.io/qwik";
import maplibregl from 'maplibre-gl';
import type { Map } from 'maplibre-gl';
import Contour from 'maplibre-contour';
const { DemSource } = Contour
import { DEMUrl } from './constants';

export const enableContour = $((map: Map) => {
  const demSource = new DemSource({
    url: DEMUrl,
    encoding: 'mapbox',
    maxzoom: 13,
    worker: true
  })

  /** @ts-ignore */
  demSource.setupMaplibre(maplibregl)

  /**
   * Sources
   */
  map.addSource('contourSourceFeet', {
    type: 'vector',
    tiles: [
      demSource.contourProtocolUrl({
        multiplier: 3.28084,
        overzoom: 1,
        thresholds: {
          11: [200, 1000],
          12: [100, 500],
          13: [100, 500],
          14: [50, 200],
          15: [20, 100],
          16: [10, 20],
          17: [1, 10]
        },
        elevationKey: 'ele',
        levelKey: 'level',
        contourLayer: 'contours'
      })
    ],
    maxzoom: 30
  })

  /**
   * Layers
   */
  map.addLayer({
    id: 'contours',
    type: 'line',
    source: 'contourSourceFeet',
    'source-layer': 'contours',
    paint: {
        'line-opacity': 0.2,
        // "major" contours have level=1, "minor" have level=0
        'line-width': ['match', ['get', 'level'], 1, 1, 0.5]
    }
  })

  map.addLayer({
    id: 'contour-text',
    type: 'symbol',
    source: 'contourSourceFeet',
    'source-layer': 'contours',
    filter: ['>', ['get', 'level'], 0],
    paint: {
        'text-halo-color': 'white',
        'text-halo-width': 1
    },
    layout: {
        'symbol-placement': 'line',
        'text-size': 10,
        'text-field': [
            'concat',
            ['number-format', ['get', 'ele'], {}],
            '\''
        ],
        'text-font': ['Noto Sans Bold']
    }
  })
})