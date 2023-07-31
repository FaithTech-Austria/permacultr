import { component$, useContext, $ } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import type { Map as MapLibre } from 'maplibre-gl'
import Map from '../Map/Map'

export default component$(() => {
  const documentSignal = useContext(DocumentContext)

  const $callback = $((map: MapLibre) => {
    console.log(map)
  })

  return <Map 
    features={[
      'contour', 
      '3d', 
      'geocode',
      'drawAreaOfInterest'
    ]} 
    areaOfInterest={documentSignal.value.area_of_interest} 
    callback$={$callback} 
  />
})