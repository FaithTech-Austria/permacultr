import { component$, Signal, useContext } from "@builder.io/qwik";
import { useVisibleTask$ } from '@builder.io/qwik';
import { PermaCultureDocument } from '~/types';
import { DocumentContext } from '~/routes/layout';
import { createMap } from '~/helpers/createMap'
import './AreaOfInterest.scss'

export default component$(() => {

  const document = useContext(DocumentContext)

  useVisibleTask$(({ track }) => {
    track(() => document.value)
    createMap(document.value)
  })

  // useVisibleTask$(({ track }) => {
  //   track(() => document.value);

  //   if (document.value.area_of_interest) {
  //     const jsonLayer = L.geoJSON(document.value.area_of_interest, {
  //       style: {
  //         "color": "#ff7800",
  //         "weight": 5,
  //         "fill": false,
  //         "opacity": 1
  //       }
  //     })
      
  //     jsonLayer.addTo(window.editableLayers)
  //     window.map.fitBounds(jsonLayer.getBounds());
  //   }
  // })

  return (
    <>
      {<div id="map"></div>}    
    </>
  )
})