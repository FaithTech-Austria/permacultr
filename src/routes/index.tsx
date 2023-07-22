import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Load from '~/components/Load/Load'

export default component$(() => {  
  return (
    <>
      <Load />
      <button>Create a new project</button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Perma Culture"
};
