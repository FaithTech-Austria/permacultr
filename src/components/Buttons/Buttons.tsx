import { component$, useSignal, useVisibleTask$, useContext } from "@builder.io/qwik";
import { steps } from '~/routes/[name]/Steps';
import { Link } from '@builder.io/qwik-city';
import { DocumentContext } from '~/routes/layout';
import LoadButton from './LoadButton/LoadButton';
import { BsSave, BsFolder2Open, BsFileEarmarkPlus } from "@qwikest/icons/bootstrap";
import { fileSave } from 'browser-fs-access';
import { slugify } from '~/helpers/slugify';

export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  const hasLocalProject = useSignal(false)
  
  useVisibleTask$(() => {
    if (localStorage['permacultr:project'] && localStorage['permacultr:project'] !== '{}') hasLocalProject.value = true
  })

  return <div class="btn-group">
  <LoadButton class="btn btn-secondary"><BsFolder2Open class="me-2" /> Open</LoadButton>
  
  {hasLocalProject.value ? <button class="btn-secondary btn" onClick$={async () => {
    const blob = new Blob([JSON.stringify(documentSignal.value, null, 2)], { type : 'plain/text' })
  
    await fileSave(
      blob,
      { fileName: `${slugify(documentSignal.value.name ?? 'permacultre-project')}.pcp` },
      window.handle
    )
  
  }}><BsSave class="me-2" /> Save</button> : null}
  
  <Link onClick$={() => {
    localStorage.removeItem('permacultr:project')
    documentSignal.value = {}
  }} class="btn-primary btn" href={steps.project.slug}><BsFileEarmarkPlus class="me-2" /> New</Link>
  </div>
})
