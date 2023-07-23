import { component$ } from "@builder.io/qwik";
import LoadButton from '~/components/LoadButton/LoadButton';
import SlottedLayout from '../SlottedLayout';
import { Link } from '@builder.io/qwik-city';
import { steps } from '../Steps';

export default {
  title: 'Welcome',
  slug: 'welcome',
  inList: false,
  template: component$(() => (
    <SlottedLayout>
      <h1 q:slot="title">PermaCultur</h1>
  
      <p q:slot="title">An online tool to create and view Permaculture maps</p>
  
      <LoadButton class="btn btn-secondary">Load project from file</LoadButton>
      <Link class="ms-2 btn-primary btn" href={steps.project.slug}>Create a new project</Link>
  
      <img q:slot="right" class="fit" src="https://images.unsplash.com/photo-1625395944199-3f09ebc31e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
    </SlottedLayout>
  ))
}