import { component$, useContext, useSignal, Signal, noSerialize } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import { DocumentContext } from '~/routes/layout';
import './AreaOfInterest.scss'
import maplibregl, { Map, LngLatBounds } from 'maplibre-gl';
import { TerraDrawMapLibreGLAdapter, TerraDraw, TerraDrawSelectMode, TerraDrawPolygonMode } from 'terra-draw'
import Contour from 'maplibre-contour';
const { DemSource } = Contour
import 'iconify-icon';
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * This is a proof of cocept of using MapLibre.
 * It think it would be great to have a component map that gives a way of extending the map, but also some things that we could toggle.
 */
export default component$(() => {
  const draw: Signal<TerraDraw | undefined> = useSignal()
  const map: Signal<Map | undefined> = useSignal()
  const showContours: Signal<boolean> = useSignal(true)

  const document = useContext(DocumentContext)

  useVisibleTask$(async ({ track }) => {
    track(() => document.value)

    const mapTilerKey = import.meta.env.PUBLIC_MAPTILER_KEY

    const style = await fetch(`https://api.maptiler.com/maps/openstreetmap/style.json?key=${mapTilerKey}`).then(response => response.json())

    const demSource = new DemSource({
      url: `https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=${mapTilerKey}`,
      encoding: 'mapbox',
      maxzoom: 13,
      worker: true
    });

    /** @ts-ignore */
    demSource.setupMaplibre(maplibregl)

    map.value = noSerialize(new Map({
      container: 'map',
      style
    }))

    map.value?.on('load', () => {
      if (document.value.area_of_interest) {

        map.value?.addSource('hillshadeSource', {
          type: 'raster-dem',
          // share cached raster-dem tiles with the contour source
          tiles: [demSource.sharedDemProtocolUrl],
          tileSize: 512,
          maxzoom: 13
        })
  
        // Enables 3D in the map, seems bad for performance.
        // map.value!.setTerrain({
        //   source: 'hillshadeSource',
        //   exaggeration: 1
        // })
    
        map.value?.addSource('contourSourceFeet', {
          type: 'vector',
          tiles: [
            demSource.contourProtocolUrl({
              // meters to feet
                  multiplier: 3.28084,
                  overzoom: 1,
                  thresholds: {
                  // zoom: [minor, major]
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

        map.value?.addSource('uploaded-source', {
          'type': 'geojson',
          'data': document.value.area_of_interest
        });
    
        map.value?.addLayer({
            'id': 'uploaded-polygons',
            'type': 'fill',
            'source': 'uploaded-source',
            'paint': {
                'fill-color': '#888888',
                'fill-outline-color': 'red',
                'fill-opacity': 0.4
            },
            // filter for (multi)polygons; for also displaying linestrings
            // or points add more layers with different filters
            'filter': ['==', '$type', 'Polygon']
        })  

        map.value?.addLayer({
          id: 'hills',
          type: 'hillshade',
          source: 'hillshadeSource',
          layout: { visibility: 'visible' },
          paint: {'hillshade-exaggeration': 0.25}
        })

        map.value?.addLayer({
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

        map.value?.addLayer({
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

        /** @ts-ignore */
        const gc = new GeocodingControl({ apiKey: mapTilerKey, maplibregl, flyTo: {
          duration: 100
        } });

        map.value!.addControl(gc);

        const coordinates = document.value.area_of_interest.features[0].geometry.coordinates[0][0];

        const bounds = new LngLatBounds(coordinates[0],coordinates[0])
        for (const coord of coordinates) {
          bounds.extend(coord)
        }
           
        map.value?.fitBounds(bounds, { padding: 100, animate: false })


        draw.value = noSerialize(new TerraDraw({
          adapter: new TerraDrawMapLibreGLAdapter({
            map: map.value!,
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
        }));
  
        draw.value?.start()
      }
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
              <button onClick$={() => draw.value?.setMode('select')} class="dropdown-item">
                <iconify-icon icon="la:hand-pointer-solid"></iconify-icon>&nbsp;
                <span>Select</span>
              </button>
            </li>
            <li>
              <button onClick$={() => draw.value?.setMode('polygon')} class="dropdown-item">
                <iconify-icon icon="gis:polygon-pt"></iconify-icon>&nbsp;
                <span>Polygon</span>
              </button>
            </li>
            <li>
              <button onClick$={() => draw.value?.clear()} class="dropdown-item">
                <iconify-icon icon="bi:trash"></iconify-icon>&nbsp;
                <span>Clear</span>
              </button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button onClick$={() => {
                const newValue = !showContours.value
                showContours.value = newValue
                map.value!.setLayoutProperty('contours', 'visibility', newValue ? 'visible' : 'none' )
                map.value!.setLayoutProperty('contour-text', 'visibility', newValue ? 'visible' : 'none' )
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