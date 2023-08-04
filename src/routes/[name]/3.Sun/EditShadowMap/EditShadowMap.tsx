import { component$, useContext, $, useSignal } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import Map from '~/components/Map/Map'
import type { MapFeature } from '~/components/Map/Map';
import './EditShadowMap.scss'
import type { Map as MapLibre } from 'maplibre-gl'
import type { TerraDraw } from 'terra-draw'

export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  const defaultDate = new Date()
  defaultDate.setHours(12)
  const dateSignal = useSignal(defaultDate)

  const features: Array<MapFeature> = [
    'areaOfInterest',
    'draw',
    'shadow'
  ]

  const areaOfInterest = documentSignal.value.area_of_interest

  const $onLoad = $((map: MapLibre, draw: TerraDraw) => {
    const sunFeatures = documentSignal.value.sun
    if (sunFeatures) draw.addFeatures(sunFeatures)

    map.setPitch(90)
  })

  const dt = new Date(dateSignal.value)
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
  
  const $onShape = $((shapes: Array<any>) => {
    documentSignal.value = Object.assign({}, documentSignal.value, {
      sun: shapes
    })
  })

  return <>
    <Map 
      date={dateSignal.value}
      features={features} 
      areaOfInterest={areaOfInterest} 
      onLoad$={$onLoad}
      onShape$={$onShape}
    />

    <div class="area-of-interest-map map-buttons btn-group">
      <div class="date-picker">
        <input class="date-picker-input form-control" value={dt.toISOString().slice(0, 16)} onChange$={(event) => {
          const newDate = new Date(event.target.value)
          dateSignal.value.setFullYear(newDate.getFullYear())
          dateSignal.value.setMonth(newDate.getMonth())
          dateSignal.value.setDate(newDate.getDate())
          dateSignal.value.setHours(newDate.getHours())
          dateSignal.value.setMinutes(newDate.getMinutes())
        }} type="datetime-local"/>
      </div>
      <button onClick$={() => window.draw?.setMode('select')} class="btn btn-secondary">
        <iconify-icon icon="la:hand-pointer-solid"></iconify-icon>&nbsp;
        <span>Select</span>
      </button>
      <button onClick$={() => window.draw?.setMode('polygon')} class="btn btn-secondary">
        <iconify-icon icon="gis:polygon-pt"></iconify-icon>&nbsp;
        <span>Polygon</span>
      </button>
      <button onClick$={() => window.draw?.setMode('circle')} class="btn btn-secondary">
        <iconify-icon icon="gis:circle-o"></iconify-icon>&nbsp;
        <span>Circle</span>
      </button>
      <button onClick$={() => window.draw?.clear()} class="btn btn-secondary">
        <iconify-icon icon="bi:trash"></iconify-icon>&nbsp;
        <span>Clear</span>
      </button>
    </div>

  </>
})