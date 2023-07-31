import { component$, useSignal, Signal, noSerialize, $ } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import maplibregl, { Map, LngLatBounds } from 'maplibre-gl';
import { TerraDrawMapLibreGLAdapter, TerraDraw, TerraDrawSelectMode, TerraDrawPolygonMode } from 'terra-draw'
import Contour from 'maplibre-contour';
const { DemSource } = Contour
import './Map.scss'
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import 'iconify-icon';
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

type MapFeature = 'contour' | 'geocode' | '3d' | 'drawAreaOfInterest'

const mapTilerKey = import.meta.env.PUBLIC_MAPTILER_KEY
const styleJsonUrl = `https://api.maptiler.com/maps/openstreetmap/style.json?key=${mapTilerKey}`
const DEMUrl = `https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=${mapTilerKey}`

const enableContour = $((_signal: AbortController, map: Map) => {
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

const enable3d = $((_signal: AbortController, map: Map) => {
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

const enableDrawAreaOfInterest = $((_signal: AbortController, map: Map, areaOfInterest: any) => {
  window.draw = new TerraDraw({
    adapter: new TerraDrawMapLibreGLAdapter({
      map: window.map!,
      coordinatePrecision: 9,
    }),
    modes: {
      select: new TerraDrawSelectMode({
        flags: {
          polygon: {
            feature: {
              draggable: true,
              rotateable: true,
              scaleable: true,
              coordinates: {
                midpoints: true,
                draggable: true,
                deletable: true,
              },
            },
          },
        },
      }),
      polygon: new TerraDrawPolygonMode({
        snapping: true,
        allowSelfIntersections: false,
      })
    },
  });

  window.draw?.start()

  window.draw.addFeatures([areaOfInterest])

  const coordinates = areaOfInterest.geometry.coordinates;

  const bounds = new LngLatBounds()

  for (const coordinateSet of coordinates) {
    for (const coord of coordinateSet) {
      bounds.extend(coord)
    }  
  }
     
  map.fitBounds(bounds, { padding: 100, animate: false })

  window.draw.on('finish', () => {
    const features = window.draw.getSnapshot()
    console.log(JSON.stringify(features, null, 2))
  })
})

const enableGeocoder = $((_signal: AbortController, map: Map) => {
  const geocoder = new GeocodingControl({ 
    apiKey: mapTilerKey, 
    /** @ts-ignore */
    maplibregl, 
    flyTo: { duration: 100 } 
  })

  map.addControl(geocoder)
})

export default component$(({ features, areaOfInterest }: { features: Array<MapFeature>, areaOfInterest?: any }) => {
  const showContours: Signal<boolean> = useSignal(true)

  useVisibleTask$(async ({ track }) => {
    const style = await fetch(styleJsonUrl).then(response => response.json())

    window.map = new Map({
      container: 'map',
      style
    })

    window.map.on('load', () => {
      if (features.includes('contour')) enableContour(null, window.map)
      if (features.includes('3d')) enable3d(null, window.map)
      if (features.includes('drawAreaOfInterest')) enableDrawAreaOfInterest(null, window.map, areaOfInterest)
      if (features.includes('geocode')) enableGeocoder(null, window.map)
    })
  })

  const isExpanded = useSignal(false)

  return (
    <>
        <div class="dropstart map-menu" onClick$={() => { isExpanded.value = !isExpanded.value }}>
          <button class={`btn btn-secondary ${isExpanded.value ? 'show' : ''}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <iconify-icon icon="line-md:menu"></iconify-icon>
          </button>
          <ul class={`dropdown-menu ${isExpanded.value ? 'show' : ''}`}>
            <li>
              <button onClick$={() => window.draw?.setMode('select')} class="dropdown-item">
                <iconify-icon icon="la:hand-pointer-solid"></iconify-icon>&nbsp;
                <span>Select</span>
              </button>
            </li>
            <li>
              <button onClick$={() => window.draw?.setMode('polygon')} class="dropdown-item">
                <iconify-icon icon="gis:polygon-pt"></iconify-icon>&nbsp;
                <span>Polygon</span>
              </button>
            </li>
            <li>
              <button onClick$={() => window.draw?.clear()} class="dropdown-item">
                <iconify-icon icon="bi:trash"></iconify-icon>&nbsp;
                <span>Clear</span>
              </button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button onClick$={() => {
                const newValue = !showContours.value
                showContours.value = newValue
                window.map!.setLayoutProperty('contours', 'visibility', newValue ? 'visible' : 'none' )
                window.map!.setLayoutProperty('contour-text', 'visibility', newValue ? 'visible' : 'none' )
              }} class="dropdown-item" id="clear">
                {showContours.value ? <><iconify-icon icon="akar-icons:check"></iconify-icon>&nbsp;</> : null }
                <span>Show contours</span>
              </button>
            </li>
          </ul>
        </div>

      <div id="map">

      </div>
    </>
  )
})