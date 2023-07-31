import { component$, useSignal } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { Map } from 'maplibre-gl';
import { styleJsonUrl } from './constants';
import * as Iconify from 'iconify-icon';

import { enableContour } from './enableContour';
import { enableGeocoder } from './enableGeocoder';
import { enableDrawAreaOfInterest } from './enableDrawAreaOfInterest';
import { enable3d } from './enable3d';
import { showAreaOfInterest } from './showAreaOfInterest';

import "@maptiler/geocoding-control/style.css";
import './Map.scss'
import { enableShadow } from './enableShadow'

export type MapFeature = 'contour'
  | 'geocode' 
  | '3d' 
  | 'drawAreaOfInterest'
  | 'areaOfInterest'
  | 'shadow'

type MapProps = { 
  features: Array<MapFeature>, 
  areaOfInterest?: any, 
  onLoad$?: PropFunction<(map: Map) => void>
  onShape$?: PropFunction<(shapes: Array<any>) => void>
}

export default component$(({ features, areaOfInterest, onLoad$, onShape$ }: MapProps) => {
  useVisibleTask$(async () => {
    Iconify // Make sure the Qwik compiler knows we want iconify in the frontend.

    const style = await fetch(styleJsonUrl).then(response => response.json())

    console.log(styleJsonUrl)

    window.map = new Map({
      container: 'map',
      style
    })

    window.map.setPadding({
      top: 100,
      left: 100,
      right: 100,
      bottom: 100
    })

    window.map.on('load', () => {
      if (features.includes('drawAreaOfInterest')) enableDrawAreaOfInterest(window.map, areaOfInterest, onShape$)
      if (features.includes('contour')) enableContour(window.map)
      if (features.includes('3d')) enable3d(window.map)
      if (features.includes('geocode')) enableGeocoder(window.map)
      if (features.includes('shadow')) enableShadow(window.map)
      if (features.includes('areaOfInterest')) showAreaOfInterest(window.map, areaOfInterest)
      if (onLoad$) setTimeout(() => onLoad$(window.map), 200)
    })
  })

  return (
    <>
      <div id="map"></div>
    </>
  )
})