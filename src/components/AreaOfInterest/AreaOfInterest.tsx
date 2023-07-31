import { component$, useContext, $ } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import Map from '../Map/Map'
import type { MapFeature } from '../Map/Map';
import './AreaOfInterest.scss'

export default component$(() => {
  const documentSignal = useContext(DocumentContext)

  const features: Array<MapFeature> = [
    // 'contour', 
    // '3d', 
    'geocode',
    'drawAreaOfInterest'
  ]

  const areaOfInterest = documentSignal.value.area_of_interest

  const $onLoad = $(() => {
    if (areaOfInterest) {
      window.draw.setMode('select')
    }
  })

  const $onShape = $((shapes: Array<any>) => {
    documentSignal.value = Object.assign({}, documentSignal.value, {
      area_of_interest: shapes[0]
    })
  })
  return <div class="area-of-interest">
    <Map 
      features={features} 
      areaOfInterest={areaOfInterest} 
      onLoad$={$onLoad} 
      onShape$={$onShape}
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
      <button onClick$={() => window.draw?.clear()} class="btn btn-secondary">
        <iconify-icon icon="bi:trash"></iconify-icon>&nbsp;
        <span>Clear</span>
      </button>
    </div>

  </div>
})