import { component$ } from "@builder.io/qwik";
import { steps } from '~/routes/[name]/Steps';
import { useLocation } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import './StepNavigation.scss'

export default component$(() => {
  const loc = useLocation()
  const currentStep = loc.params.name as keyof typeof steps
  let passedActive = false

  return <div class="d-flex justify-content-between bg-light steps ps-5 pe-5 col-12">
    {Object.values(steps)
    .filter((step) => step.inList)
    .map((step) => {
      const active = step.slug === currentStep

      const output = <Link 
        href={import.meta.env.BASE_URL + step.slug} 
        class={`${active ? 'active' : ''} step ${!passedActive && !active ? 'past' : ''}`}>
          {step.title}
      </Link>

      if (active) passedActive = true

      return output
    })}
  </div>
})