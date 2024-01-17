import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ImageUploadAdapter from '/src/components/ImageUploadAdapter.js';


const TextEditor = ({ setContent }) => {
  const editorConfiguration = {
        toolbar: {
      items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'undo',
            'redo'
          ]
        },
        language: 'ko',
        image: {
          toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
          ]
        }
  };
  

   return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data="<p>이곳에 내용을 작성해 주세요!</p>"
      onChange={(event, editor) => {
        const editorData = editor.getData();
        setContent(editorData);
      }}
      onReady={(editor) => {
        // 여기서 editor 객체를 사용하거나 설정하세요.
      

        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new ImageUploadAdapter(loader);
        };
      }}
    />
  );
};

export default TextEditor;