import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Load from '~/components/Load/Load'

export default component$(() => {  
  return (
    <div class="homepage d-flex align-items-center">
      <div class="col-4 bg-white m-3 p-3 d-flex gap-2 flex-column justify-center">
        <h1>PermaCultur</h1>
        <p>An online tool to create and view Permaculture maps</p>
        <Load />
        <a class="btn-primary btn" href='/project-details'>Create a new project</a>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Perma Culture"
};
