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
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input class="form-control" id="exampleInputPassword1" />
      </div>

      <AreaOfInterest />

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>


    </>
  );
})