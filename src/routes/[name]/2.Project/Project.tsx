import { component$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';
import { DocumentContext } from '~/routes/layout';
import { useContext } from '@builder.io/qwik';
import EditAreaOfInterest from './EditAreaOfInterest/EditAreaOfInterest'

export default {
  title: 'Project',
  inList: true,
  slug: 'project',
  template: component$(() => {
    const documentSignal = useContext(DocumentContext)
    const  document = documentSignal.value
  
    return (
    <SlottedLayout>
      <h1 q:slot="title">Project</h1>
  
      <div class="mb-3">
        <label for="projectName" class="form-label">Project name</label>
        <input autoComplete="off" value={document.name} onChange$={(event: any) => {
          documentSignal.value = Object.assign({}, documentSignal.value, {
            name: event.target.value
          })
        }} class="form-control" id="projectName" />
      </div>
  
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea rows={10} onChange$={(event: any) => {
          documentSignal.value = Object.assign({}, documentSignal.value, {
            description: event.target.value
          })
        }} class="form-control" id="description" value={document.description}></textarea>
      </div>
  
      <EditAreaOfInterest q:slot="right" />
  
    </SlottedLayout>
    )
  })
}