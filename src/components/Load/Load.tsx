import { component$ } from "@builder.io/qwik";
import { useContext } from '@builder.io/qwik';
import { DocumentContext } from '~/routes';

export default component$(() => {
  const document = useContext(DocumentContext)
  
  return (
    <button onClick$={async () => {
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
      const writable = await fileHandle.createWritable()
      const fileData = await fileHandle.getFile()
      const projectJson = await fileData.text()
      document.value = JSON.parse(projectJson)      
    }}>Open a project</button>
  );
});
