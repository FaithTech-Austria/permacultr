import { $ } from "@builder.io/qwik";
import type { Map } from 'maplibre-gl';
import { TerraDrawMapLibreGLAdapter, TerraDraw, TerraDrawSelectMode, TerraDrawPolygonMode } from 'terra-draw'
import { zoomToAreaOfInterest } from './zoomToAreaOfInterest';

export const enableDrawAreaOfInterest = $((map: Map, areaOfInterest: any, onShape: any) => {
  if (areaOfInterest) {
    zoomToAreaOfInterest(map, areaOfInterest)
  }

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
        snapping: false,
        allowSelfIntersections: true,
      })
    },
  });

  window.draw?.start()
  
  if (areaOfInterest) {
    window.draw.addFeatures([areaOfInterest])
  }

  window.draw.on('finish', () => {
    const features = window.draw.getSnapshot()
    if (onShape) onShape(features)
    window.draw.setMode('select')
  })
})