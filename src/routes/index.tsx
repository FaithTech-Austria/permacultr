import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Base from '~/components/Base/Base';
import Load from '~/components/Load/Load'
import { useContextProvider, createContextId } from '@builder.io/qwik';
import { Signal, useSignal } from '@builder.io/qwik';
import { PermaCultureDocument } from '~/types';

export const DocumentContext = createContextId<Signal<PermaCultureDocument>>('document-context')

export default component$(() => {
  const document = useSignal({
    "area_of_interest": null
  })
  useContextProvider(DocumentContext, document)
  
  return (
    <>
      <Load />
      <button>Create a new project</button>
      {/* <Base document={document} /> */}
    </>
  );
});

export const head: DocumentHead = {
  title: "Perma Culture"
};
