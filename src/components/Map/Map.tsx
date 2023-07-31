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

import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import './Map.scss'

import type { Signal } from '@builder.io/qwik';

type MapFeature = 'contour'
  | 'geocode' 
  | '3d' 
  | 'drawAreaOfInterest'

type MapProps = { 
  features: Array<MapFeature>, 
  areaOfInterest?: any, 
  callback$?: PropFunction<(map: Map) => void>;
}

export default component$(({ features, areaOfInterest, callback$ }: MapProps) => {
  const showContours: Signal<boolean> = useSignal(true)

  useVisibleTask$(async () => {
    Iconify // Make sure the Qwik compiler knows we want iconify in the frontend.

    const style = await fetch(styleJsonUrl).then(response => response.json())

    window.map = new Map({
      container: 'map',
      style
    })

    window.map.on('load', () => {
      if (features.includes('contour')) enableContour(window.map)
      if (features.includes('3d')) enable3d(window.map)
      if (features.includes('drawAreaOfInterest')) enableDrawAreaOfInterest(window.map, areaOfInterest)
      if (features.includes('geocode')) enableGeocoder(window.map)
      if (callback$) {
        callback$(window.map)
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
          {features.includes('contour') ? 
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
          : null}
        </ul>
      </div>

      <div id="map"></div>
    </>
  )
})