import { $ } from "@builder.io/qwik";
import maplibregl from 'maplibre-gl';
import type { Map } from 'maplibre-gl';
import Contour from 'maplibre-contour';
const { DemSource } = Contour
import { DEMUrl } from '../constants';

export const enable3d = $((map: Map) => {
  const demSource = new DemSource({
    url: DEMUrl,
    encoding: 'mapbox',
    maxzoom: 13,
    worker: true
  })

  /** @ts-ignore */
  demSource.setupMaplibre(maplibregl)

  map.addSource('hillshadeSource', {
    type: 'raster-dem',
    // share cached raster-dem tiles with the contour source
    tiles: [demSource.sharedDemProtocolUrl],
    tileSize: 512,
    maxzoom: 13
  })

  map.addLayer({
    id: 'hills',
    type: 'hillshade',
    source: 'hillshadeSource',
    layout: { visibility: 'visible' },
    paint: {'hillshade-exaggeration': 0.5}
  })

  map.setTerrain({
    source: 'hillshadeSource',
    exaggeration: 1
  })
})
