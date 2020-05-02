import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
	return(
		<div className='ma3 mt0 mb0'>
			<p className='f4'>
				{'This Magic Brain detects faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input 
						onChange={onInputChange} 
						className='f6 pa2 w-70 center' 
						type='text' 
						placeholder='Paste image url'/>
					<button 
						onClick={onImageSubmit} 
						className='w-30 grow f6 link ph3 pv2 dib white bg-light-purple'>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;