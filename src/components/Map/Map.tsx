import { component$ } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { Map } from 'maplibre-gl';
import { styleJsonUrl } from './constants';
import * as Iconify from 'iconify-icon';

import { enableContour } from './enableContour';
import { enableGeocoder } from './enableGeocoder';
import { enableDraw } from './enableDraw';
import { enable3d } from './enable3d';
import { showAreaOfInterest } from './showAreaOfInterest';
import { enableSatelite } from './enableSatelite';

import 'maplibre-gl/src/css/maplibre-gl.css'
import "@maptiler/geocoding-control/style.css";
import './Map.scss'
import { enableShadow } from './enableShadow'
import type { TerraDraw } from 'terra-draw'

export type MapFeature = 'contour'
  | 'geocode' 
  | '3d' 
  | 'draw'
  | 'areaOfInterest'
  | 'shadow'
  | 'satelite'

type MapProps = { 
  features: Array<MapFeature>, 
  areaOfInterest?: any, 
  onLoad$?: PropFunction<(map: Map, draw: TerraDraw) => void>
  onShape$?: PropFunction<(shapes: Array<any>) => void>,
  class?: string
  date?: Date
}

export default component$((props: MapProps) => {
  const { features, areaOfInterest, onLoad$, onShape$, date } = props

  useVisibleTask$(async () => {
    Iconify // Make sure the Qwik compiler knows we want iconify in the frontend.

    const style = await fetch(styleJsonUrl).then(response => response.json())

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
      if (features.includes('draw')) enableDraw(window.map, areaOfInterest, onShape$)
      if (features.includes('contour')) enableContour(window.map)
      if (features.includes('3d')) enable3d(window.map)
      if (features.includes('satelite')) enableSatelite(window.map)
      if (features.includes('geocode')) enableGeocoder(window.map)
      if (features.includes('areaOfInterest')) showAreaOfInterest(window.map, areaOfInterest)
      if (features.includes('shadow')) setTimeout(() => enableShadow(window.map, date!), 200)
      if (onLoad$) setTimeout(() => onLoad$(window.map, window.draw), 200)
    })
  })

  return (
    <>
      <div id="map" class={props.class ?? ''}></div>
    </>
  )
})