import { $ } from "@builder.io/qwik";
import type { Map } from 'maplibre-gl';
import { TerraDrawMapLibreGLAdapter, TerraDraw, TerraDrawSelectMode, TerraDrawPolygonMode, TerraDrawCircleMode } from 'terra-draw'

export const enableDraw = $((map: Map, areaOfInterest: any, onShape: any) => {
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
          circle: {
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
      }),
      circle: new TerraDrawCircleMode({

      })
    },
  });

  window.draw?.start()

  window.draw.on('finish', () => {
    const features = window.draw.getSnapshot()
    if (onShape) onShape(features)
  })
})