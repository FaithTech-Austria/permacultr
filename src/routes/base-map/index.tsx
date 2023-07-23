import { component$, useVisibleTask$ } from "@builder.io/qwik";
import AreaOfInterest from '~/components/AreaOfInterest/AreaOfInterest'
import { DocumentContext } from '~/routes/layout';
import { useContext } from '@builder.io/qwik';

export default component$(() => {
  const document = useContext(DocumentContext)

  useVisibleTask$(() => {
    console.log(document)
  })

  return (
    <div class="base-map">
      <div class="col-4 bg-white p-5">

      </div>

      <div class="col-8">
        <label for="area-of-interest" class="form-label">Area of interest</label>
        <AreaOfInterest />
      </div>


    </div>
  );
})