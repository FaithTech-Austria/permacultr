import { component$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';

export default {
  title: 'Rain',
  slug: 'rain',
  inList: true,
  template: component$(() => (
    <SlottedLayout>
      <h1 q:slot="title">Rain</h1>
  
      <img q:slot="right" class="fit" src="https://images.unsplash.com/photo-1625395944199-3f09ebc31e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
    </SlottedLayout>
  ))
}