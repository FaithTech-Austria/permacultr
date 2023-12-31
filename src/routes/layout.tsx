import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useContextProvider, createContextId, useComputed$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';
import { permacultreDocument } from '~/types';

export const DocumentContext = createContextId<Signal<permacultreDocument>>('document-context')

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

  useVisibleTask$(() => {
    if (localStorage['permacultr:project']) {
      document.value = JSON.parse(localStorage['permacultr:project'])
    }

    if ("launchQueue" in window) {
      /** @ts-ignore */
      window.launchQueue.setConsumer((launchParams) => {
        if (launchParams.files && launchParams.files.length) {
          console.log(launchParams)
        }
      })
    }
  })

  useComputed$(() => {
    document.value // We need to touch this proxy.

    if (!import.meta.env.SSR) {
      localStorage['permacultr:project'] = JSON.stringify(document.value)
    }
  })

  return <Slot />
});
