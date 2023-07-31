import { component$, useContext } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';
import 'iconify-icon';
import Map from '../Map/Map'

/**
 * This is a proof of cocept of using MapLibre.
 * It think it would be great to have a component map that gives a way of extending the map, but also some things that we could toggle.
 */
export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  return <Map features={['contour', '3d', 'drawAreaOfInterest']} areaOfInterest={documentSignal.value.area_of_interest} />
})