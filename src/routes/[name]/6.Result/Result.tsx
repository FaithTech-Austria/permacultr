import { component$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';

export default {
  title: 'Result',
  slug: 'result',
  inList: true,
  template: component$(() => (
    <SlottedLayout>
      <h1 q:slot="title">Result</h1>
 
      <p>
        Here will be the final combined map.
      </p>
 
      <img q:slot="right" class="fit" src="https://images.unsplash.com/photo-1544127916-c437ec60ad71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" />
    </SlottedLayout>
  ))
}