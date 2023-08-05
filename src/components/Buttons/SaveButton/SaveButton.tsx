import { component$, useSignal, useVisibleTask$, useContext } from "@builder.io/qwik";
import { DocumentContext } from '~/routes/layout';

import { BsSave } from "@qwikest/icons/bootstrap";
import { fileSave } from 'browser-fs-access';
import { slugify } from '~/helpers/slugify';

export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  const hasLocalProject = useSignal(false)
  
  useVisibleTask$(() => {
    if (localStorage['permacultr:project'] && localStorage['permacultr:project'] !== '{}') hasLocalProject.value = true
  })

  return hasLocalProject.value ? <button class="btn-secondary btn" onClick$={async () => {
    const blob = new Blob([JSON.stringify(documentSignal.value, null, 2)], { type : 'plain/text' })
  
    await fileSave(
      blob,
      { fileName: `${slugify(documentSignal.value.name ?? 'permacultre-project')}.pcp` },
      window.handle
    )
  
  }}><BsSave class="me-2" /> Save</button> : null
})
