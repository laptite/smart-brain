import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain.png'
 
const Logo = () => {
	return(
		<div className='ma5 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 75, width: 75 }} >
				<div className="Tilt-inner">
					<img alt='logo' src={brain}/>
				</div>
			</Tilt>
		</div>
	)
}

export default Logo;