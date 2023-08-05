import { component$ } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { Map } from 'maplibre-gl';
import { styleJsonUrl } from './constants';
import * as Iconify from 'iconify-icon';
import type { TerraDraw } from 'terra-draw'

import { enableContour } from './Features/enableContour';
import { enableGeocoder } from './Features/enableGeocoder';
import { enableDraw } from './Features/enableDraw';
import { enable3d } from './Features/enable3d';
import { showAreaOfInterest } from './Features/showAreaOfInterest';
import { enableSatelite } from './Features/enableSatelite';
import { enableShadow } from './Features/enableShadow'

import 'maplibre-gl/src/css/maplibre-gl.css'
import "@maptiler/geocoding-control/style.css";
import './Map.scss'


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
      if (features.includes('shadow')) enableShadow(window.map, date!)
      if (onLoad$) onLoad$(window.map, window.draw)
    })
  })

  return (
    <>
      <div id="map" class={props.class ?? ''}></div>
    </>
  )
})