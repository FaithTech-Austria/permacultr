import { $ } from "@builder.io/qwik";
import { LngLatBoundsLike, Map } from 'maplibre-gl'
import { bbox } from '@turf/turf';

export const zoomToAreaOfInterest = $((map: Map, areaOfInterest: any) => {
  const bounds = bbox({
    "type": "FeatureCollection",
    "features": areaOfInterest
  }) as LngLatBoundsLike

  map.fitBounds(bounds, { animate: false })
})