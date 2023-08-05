import { component$, useSignal, useVisibleTask$, useContext } from "@builder.io/qwik";
import { steps } from '~/routes/[name]/Steps';
import { Link } from '@builder.io/qwik-city';
import { DocumentContext } from '~/routes/layout';
import LoadButton from './LoadButton/LoadButton';
import { BsFolder2Open, BsFileEarmarkPlus } from "@qwikest/icons/bootstrap";

export default component$(() => {
  const documentSignal = useContext(DocumentContext)
  const hasLocalProject = useSignal(false)
  
  useVisibleTask$(() => {
    if (localStorage['permacultr:project'] && localStorage['permacultr:project'] !== '{}') hasLocalProject.value = true
  })

  return <div class="btn-group">
  <LoadButton class="btn btn-secondary"><BsFolder2Open class="me-2" /> Open</LoadButton>
  
  <Link onClick$={() => {
    localStorage.removeItem('permacultr:project')
    documentSignal.value = {}
  }} class="btn-primary btn" href={steps.project.slug}><BsFileEarmarkPlus class="me-2" /> New</Link>
  </div>
})
