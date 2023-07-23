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
    <div class="project-details">
      <div class="col-4 bg-white p-5">
        <div class="mb-3">
          <label for="projectName" class="form-label">Project name</label>
          <input value={document.value.name} onChange$={(event: any) => {
            document.value.name = event.target.value
          }} class="form-control" id="projectName" />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea rows={10} onChange$={(event: any) => {
            document.value.description = event.target.value
          }} class="form-control" id="description">{document.value.description ?? ''}</textarea>
        </div>
      </div>
    </div>
  );
})