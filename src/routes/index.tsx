import { component$ } from "@builder.io/qwik";
import { steps } from './[name]/Steps';
import { useLocation } from '@builder.io/qwik-city';

/**
 * This just picks the correct step for the URL.
 */
export default component$(() => {
  const loc = useLocation()
  const currentStep = loc.params.name as keyof typeof steps
  const Step = currentStep in steps ? steps[currentStep].template : steps.welcome.template
  return <Step />
});
