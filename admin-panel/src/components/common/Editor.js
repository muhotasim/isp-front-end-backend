
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
const Editor = ({ value, onChange, onBlur, ref })=>{
    // const editor = useRef(null);
    return <JoditEditor
    ref={ref}
    value={value}
    config={{
        statusbar: false,
        readonly: false, 
        placeholder: 'Start typings...'
    }}
    onChange={onChange}
    // onBlur={onBlur}
    tabIndex={1}
/>
}

export default Editor;