import { Slot, component$ } from "@builder.io/qwik"
import { useContext } from '@builder.io/qwik'
import { DocumentContext } from '~/routes/layout'
import { useNavigate } from '@builder.io/qwik-city'
import { steps } from '~/routes/[name]/Steps'

export default component$((props: { class: string }) => {
  const document = useContext(DocumentContext)
  const nav = useNavigate()
  return (
    <button class={props.class} onClick$={async () => {
      const pickerOpts = {
        types: [
          {
            description: 'Perma Culture Project',
            accept: {
              'perma-culture/text': ['.pcp']
            }
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false
      };
      
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts)
      const fileData = await fileHandle.getFile()
      const projectJson = await fileData.text()
      document.value = JSON.parse(projectJson)
      nav('/' + steps.project.slug) 
       
    }}><Slot /></button>
  );
});
