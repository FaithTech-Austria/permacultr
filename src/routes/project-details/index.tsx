import { component$ } from "@builder.io/qwik";
import AreaOfInterest from '~/components/AreaOfInterest/AreaOfInterest'

export default component$(() => {
  return (
    <>

    <form>
      <div class="mb-3">
        <label for="projectName" class="form-label">Project name</label>
        <input class="form-control" id="projectName" />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" />
      </div>

      <AreaOfInterest />

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>


    </>
  );
})