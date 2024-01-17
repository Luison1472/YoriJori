import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '/public/Board.css';


const CKEditorComponent = ({ content, setContent }) => {
    return (
        <div className='ckeditor'>
            <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                }}
            />
        </div>
    );
};

export default CKEditorComponent;