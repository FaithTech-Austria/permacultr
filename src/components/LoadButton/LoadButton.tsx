import { Slot, component$ } from "@builder.io/qwik"
import { useContext } from '@builder.io/qwik'
import { DocumentContext } from '~/routes/layout'
import { useNavigate } from '@builder.io/qwik-city'
import { steps } from '~/routes/[name]/Steps'
import { fileOpen } from 'browser-fs-access';
import type { FileWithHandle } from 'browser-fs-access'

export default component$((props: { class: string }) => {
  const document = useContext(DocumentContext)
  const nav = useNavigate()
  return (
    <button class={props.class} onClick$={async () => {
      const pickerOpts = {
        extensions: ['.pcp'],
        description: 'Perma Culture Project',
        multiple: false
      };
      
      const file = await fileOpen(pickerOpts) as FileWithHandle
      const projectJson = await file.text()
      document.value = JSON.parse(projectJson)
      localStorage['permacultur:project'] = projectJson
      window.handle = file.handle
      nav(steps.project.slug)
    }}><Slot /></button>
  );
});
