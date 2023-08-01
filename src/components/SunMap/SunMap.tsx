import { component$, useContext, $, useSignal } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import Map from '../Map/Map'
import type { MapFeature } from '../Map/Map';
import './SunMap.scss'

export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  const dateSignal = useSignal(new Date())

  const features: Array<MapFeature> = [
    'contour', 
    'areaOfInterest',
    'shadow'
  ]

  const areaOfInterest = documentSignal.value.area_of_interest

  const $onLoad = $(() => {
  })
  const dt = new Date(dateSignal.value)
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
  

  return <>
    <Map 
      date={dateSignal.value}
      features={features} 
      areaOfInterest={areaOfInterest} 
      onLoad$={$onLoad} 
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