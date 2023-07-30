import { component$, useContext } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import { DocumentContext } from '~/routes/layout';
import './AreaOfInterest.scss'
import maplibregl, { Map, LngLatBounds } from 'maplibre-gl';
import { TerraDrawMapLibreGLAdapter, TerraDraw, TerraDrawSelectMode, TerraDrawPolygonMode } from 'terra-draw'
import Contour from 'maplibre-contour';
const { DemSource } = Contour

const addModeChangeHandler = (
	draw: TerraDraw,
	currentSelected: { button: undefined | HTMLButtonElement; mode: string }
) => {
	[
		"select",
		"polygon",
	].forEach((mode) => {
		(document.getElementById(mode) as HTMLButtonElement).addEventListener(
			"click",
			() => {
				currentSelected.mode = mode;
				draw.setMode(currentSelected.mode);

				if (currentSelected.button) {
					currentSelected.button.style.color = "565656";
				}
				currentSelected.button = document.getElementById(
					mode
				) as HTMLButtonElement;
				currentSelected.button.style.color = "#27ccff";
			}
		);
	});

	(document.getElementById("clear") as HTMLButtonElement).addEventListener(
		"click",
		() => {
			draw.clear();
		}
	);
};


let currentSelected: { button: undefined | HTMLButtonElement; mode: string } = {
	button: undefined,
	mode: "static",
};

export default component$(() => {

  const document = useContext(DocumentContext)

  useVisibleTask$(({ track }) => {
    track(() => document.value)


    const demSource = new DemSource({
      url: 'https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=i9gslr0G5loMzaOVjD8f',
      encoding: 'mapbox',
      maxzoom: 13,
      worker: true
    });


    /** @ts-ignore */
    demSource.setupMaplibre(maplibregl)

    const map = new Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=i9gslr0G5loMzaOVjD8f',
    })

    map.on('load', () => {
      if (document.value.area_of_interest) {

        map.addSource('hillshadeSource', {
          type: 'raster-dem',
          // share cached raster-dem tiles with the contour source
          tiles: [demSource.sharedDemProtocolUrl],
          tileSize: 512,
          maxzoom: 13
        })

        map.addSource('contourSourceFeet', {
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

        map.addSource('uploaded-source', {
          'type': 'geojson',
          'data': document.value.area_of_interest
        });
    
        map.addLayer({
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

        map.addLayer({
          id: 'hills',
          type: 'hillshade',
          source: 'hillshadeSource',
          layout: { visibility: 'visible' },
          paint: {'hillshade-exaggeration': 0.25}
        })

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

        const coordinates = document.value.area_of_interest.features[0].geometry.coordinates[0][0];

        const bounds = new LngLatBounds(coordinates[0],coordinates[0])
        for (const coord of coordinates) {
          bounds.extend(coord)
        }
           
        map.fitBounds(bounds, { padding: 100, animate: false })


        const draw = new TerraDraw({
          adapter: new TerraDrawMapLibreGLAdapter({
            map,
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
  
        draw.start();
  
        addModeChangeHandler(draw, currentSelected);

      }  
    })
  })

  return (
    <>
      {<div id="map"></div>}    

			<button id="select">Select</button>
			<button id="polygon">Polygon</button>

			<button id="clear">Clear</button>

    </>
  )
})