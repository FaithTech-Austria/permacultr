import { component$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';

export default {
  title: 'Rain',
  slug: 'rain',
  inList: true,
  template: component$(() => (
    <SlottedLayout>
      <h1 q:slot="title">Rain</h1>
  
      <p>
        TODO Add map here to edit ditches and other rain specific features.
      </p>

      <img q:slot="right" class="fit" src="https://images.unsplash.com/photo-1470137430626-983a37b8ea46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" />
    </SlottedLayout>
  ))
}