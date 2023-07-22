import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useContextProvider, createContextId } from '@builder.io/qwik';
import { Signal, useSignal } from '@builder.io/qwik';
import { PermaCultureDocument } from '~/types';

export const DocumentContext = createContextId<Signal<PermaCultureDocument>>('document-context')

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const document = useSignal({
    "area_of_interest": null
  })
  useContextProvider(DocumentContext, document)
  
  return <Slot />;
});
