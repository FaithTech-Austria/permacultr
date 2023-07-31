import { component$ } from "@builder.io/qwik";
import SlottedLayout from '../SlottedLayout';
import SunMap from '~/components/SunMap/SunMap';

export default {
  title: 'Sun',
  slug: 'sun',
  inList: true,
  template: component$(() => (
    <SlottedLayout>
      <h1 q:slot="title">Sun</h1>

      <p>
        In this step you can add buildings and other big objects that leave a shadow.
        Think about big trees and roofs.
      </p>

      <p>
        The widgets of time and month are here to play with and not definitive. In your final map you can still adjust them.
      </p>

      <SunMap q:slot="right" />

    </SlottedLayout>
  ))
}