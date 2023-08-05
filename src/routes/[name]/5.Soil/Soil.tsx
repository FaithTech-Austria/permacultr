import { component$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';

export default {
  title: 'Soil',
  slug: 'soil',
  inList: true,
  template: component$(() => (
    <SlottedLayout>
      <h1 q:slot="title">Soil</h1>
 
      <p>
        Can we show here the typical soil conditions and also allow the end user to add their own soil areas?
      </p>
 
      <img q:slot="right" class="fit" src="https://images.unsplash.com/photo-1510844355160-2fb07bf9af75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" />
    </SlottedLayout>
  ))
}