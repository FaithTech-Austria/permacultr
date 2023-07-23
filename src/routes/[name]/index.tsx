import Index from '../index'
export default Index
import { type StaticGenerateHandler } from '@builder.io/qwik-city';
import { steps } from './Steps';

export const onStaticGenerate: StaticGenerateHandler = async () => {
   return {
    params: Object.values(steps).map(step => ({ name: step.slug }))
  }
};