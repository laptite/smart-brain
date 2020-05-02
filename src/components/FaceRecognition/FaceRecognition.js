import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ boxes, imageUrl }) => {

	return(
		<div className='center ma'>
			<div className='mt4 absolute'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
				{
					Object.entries(boxes).map((box, i) => {
						const boxStyle = {
							top: box[1].topRow,
							right: box[1].rightCol,
							bottom: box[1].bottomRow,
							left: box[1].leftCol
						}
						return <div key={`fr-${i}`} className='bounding-box' style={boxStyle}></div>
					})
				}
			</div>
		</div>
	)
}

export default FaceRecognition;