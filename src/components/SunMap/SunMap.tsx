import { component$, useContext, $ } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import Map from '../Map/Map'
import type { MapFeature } from '../Map/Map';

export default component$(() => {
  const documentSignal = useContext(DocumentContext)

  const features: Array<MapFeature> = [
    'contour', 
    'areaOfInterest',
    // 'shadow'
  ]

  const areaOfInterest = documentSignal.value.area_of_interest

  const $onLoad = $(() => {
  })

  return <>
    <Map 
      features={features} 
      areaOfInterest={areaOfInterest} 
      onLoad$={$onLoad} 
    />

    <div class="area-of-interest-map map-buttons btn-group">
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