import { component$, Signal, useContext } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import { DocumentContext } from '~/routes/layout';
import { createMap } from '~/helpers/createMap'
import './AreaOfInterest.scss'

export default component$(() => {

  const document = useContext(DocumentContext)

  useVisibleTask$(({ track }) => {
    track(() => document.value)
    createMap(document.value)

    window.map.on(L.Draw.Event.CREATED, function (event: any) {
      window.editableLayers.addLayer(event.layer)
      document.value.area_of_interest = window.editableLayers.toGeoJSON()

      console.log(document.value.area_of_interest)
    })
  })

  return (
    <>
      {<div id="map"></div>}    
    </>
  )
})