import { component$, useContext, $, useSignal } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import Map from '../../../../components/Map/Map'
import type { MapFeature } from '../../../../components/Map/Map';
import './EditAreaOfInterest.scss'
import type { Map as MapLibre } from 'maplibre-gl'
import type { TerraDraw } from 'terra-draw'
import { zoomToAreaOfInterest } from '../../../../components/Map/helpers/zoomToAreaOfInterest';

export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  const sateliteVisibility = useSignal('none')

  const features: Array<MapFeature> = [
    'geocode',
    'draw',
    'satelite'
  ]

  const areaOfInterest = documentSignal.value.area_of_interest

  const $onLoad = $((map: MapLibre, draw: TerraDraw) => {
    if (areaOfInterest) {
      draw.addFeatures([areaOfInterest])
      zoomToAreaOfInterest(map, areaOfInterest)
    }
  
    if (areaOfInterest) {
      window.draw.setMode('select')
    }
  })

  const $onShape = $((shapes: Array<any>) => {
    console.log(shapes)
    documentSignal.value = Object.assign({}, documentSignal.value, {
      area_of_interest: shapes[0]
    })
  })
  
  return <>
    <Map 
      class="area-of-interest"
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
      <div>
        <select class="form-select" value={sateliteVisibility.value} onChange$={(event) => {
          const visibility = event.target.value
          sateliteVisibility.value = visibility           
          window.map.setLayoutProperty('satelite-layer', 'visibility', visibility)
        }}>
          <option value="none">Streets</option>
          <option value="visible">Satelite</option>
        </select>
      </div>
    </div>

  </>
})