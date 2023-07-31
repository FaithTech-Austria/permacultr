import { $ } from "@builder.io/qwik";
import { LngLatBounds } from 'maplibre-gl';
import type { Map } from 'maplibre-gl';
import { TerraDrawMapLibreGLAdapter, TerraDraw, TerraDrawSelectMode, TerraDrawPolygonMode } from 'terra-draw'

export const enableDrawAreaOfInterest = $((map: Map, areaOfInterest: any) => {
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