import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const RichTextEditor = ({ richText, setRichText }) => {
	const editorConfiguration = {
		toolbar: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'fontFamily',
			'fontSize',
			'|',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'alignment',
			'outdent',
			'indent',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'|',
			'link',
			'insertTable',
			'imageUpload',
			'mediaEmbed',
			'|',
			'undo',
			'redo',
		],
		fontSize: {
			options: [
				9,
				10,
				11,
				12,
				13,
				'big',
				16,
				18,
				20
			]
		},
		fontFamily: {
			options: [
				'default',
				'Arial, Helvetica, sans-serif',
				'Courier New, Courier, monospace',
				'Georgia, serif',
				'Lucida Sans Unicode, Lucida Grande, sans-serif',
				'Tahoma, Geneva, sans-serif',
				'Times New Roman, Times, serif',
				'Trebuchet MS, Helvetica, sans-serif',
				'Verdana, Geneva, sans-serif'
			]
		},
	};

	return (
		<>
			<CKEditor
				editor={Editor}
				config={editorConfiguration}
				data={richText}
				onReady={editor => {
					// console.log('Editor is ready to use!', editor);
					editor.execute('fontFamily', { value: 'Poppins' });
					editor.execute('fontSize', { value: 'big' });
				}}
				onChange={(event, editor) => {
					const data = editor.getData();
					setRichText(data);
				}}
				onBlur={(event, editor) => {
					// console.log('Blur.', editor);
				}}
				onFocus={(event, editor) => {
					// console.log('Focus.', editor);
				}}
			/>
		</>
	);
}

export default RichTextEditor;