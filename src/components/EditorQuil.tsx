import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// interface props {
//   value: string | undefined;
//   refTextEditor: any;
// }
// const TextEditor = ({ value, refTextEditor }: props) => {
//   const [values, setValue] = useState('');
//   return (
//     <ReactQuill
//       theme="snow"
//       value={value ? value : values}
//       onChange={(e) => {
//         setValue(e);
//         refTextEditor.currentValue = e;
//       }}
//     />
//   );
// };
// export default TextEditor;

export const TextEditor = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', ' underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bulet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};
