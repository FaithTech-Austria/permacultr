import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useContextProvider, createContextId } from '@builder.io/qwik';
import { Signal, useSignal } from '@builder.io/qwik';
import { PermaCultureDocument } from '~/types';

export const DocumentContext = createContextId<Signal<PermaCultureDocument>>('document-context')

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const document = useSignal({
    "name": "",
    "description": "",
    "area_of_interest": null
  })
  useContextProvider(DocumentContext, document)
  
  return <Slot />
});
