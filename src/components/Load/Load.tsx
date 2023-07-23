import { component$ } from "@builder.io/qwik";
import { useContext } from '@builder.io/qwik';
import { DocumentContext } from '~/routes/layout';
import { Link, useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const document = useContext(DocumentContext)
  const nav = useNavigate()
  return (
    <button class="btn btn-secondary" onClick$={async () => {
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
      nav('/project-details') 
       
    }}>Open a project</button>
  );
});
