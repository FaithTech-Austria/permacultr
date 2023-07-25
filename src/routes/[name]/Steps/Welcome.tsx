import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';
import { Link } from '@builder.io/qwik-city';
import { steps } from '../Steps';
import { DocumentContext } from '~/routes/layout';
import { useContext } from '@builder.io/qwik';
import Buttons from '~/components/Buttons/Buttons'

export default {
  title: 'Welcome',
  slug: 'welcome',
  inList: false,
  template: component$(() => {
    const hasLocalProject = useSignal(false)
    const documentSignal = useContext(DocumentContext)
    
    useVisibleTask$(() => {
      if (localStorage['permacultur:project'] && localStorage['permacultur:project'] !== '{}') hasLocalProject.value = true
    })

    return <SlottedLayout>
      <h1 q:slot="title">PermaCultur</h1>
  
      <p q:slot="title">An online tool to create and view Permaculture maps</p>
  
      <Buttons /><br /><br />

      {hasLocalProject.value ? <><Link class="" onClick$={() => {
          documentSignal.value = JSON.parse(localStorage['permacultur:project'])
        }} href={steps.project.slug}>Continue to your PermaCultur map</Link></> : null}

      <img q:slot="right" class="fit" src="https://images.unsplash.com/photo-1625395944199-3f09ebc31e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
    </SlottedLayout>
  })
}