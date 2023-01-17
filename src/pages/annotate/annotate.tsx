import { useState, useEffect } from 'react';

import GradientLink from '../../components/UI/gradientLink/gradientLink';
import Label from '../../components/dashboard/annotate/label/label';
import Wrapper from '../../components/dashboard/annotate/wrapper/wrapper';
import Loading from '../../components/loading/loading';

import classes from './annotate.module.css';

export default function Annotate() {
	const [images, updateImages] = useState([] as Image[]);
	
	const [imageIndex, updateImageIndex] = useState(0);
	const [isLoading, updateLoading] = useState(false);

	useEffect(() => {
		updateLoading(true);

		(async function() {
			// fetch images here

			updateImages(
				[
					{
						url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzsi4JX8QgMg_J0-xUHxeJ9Ot_2zVfoh2Gw&usqp=CAU',
						name: 'dog'
					}
				]
			);

			updateLoading(false);
		})();
	});

	const rect = {
		x: 150,
    	y: 150,
    	width: 100,
    	height: 100
	};

	if(isLoading) return <Loading />;

    return (
        <div className={ classes.annotateContainer }>
			<h1>Picture - { imageIndex + 1 }/50</h1>

			<div className={ classes.contentContainer }>
				<div className={ classes.leftContainer }>
					<div 
						className={ classes.wrapperDiv } 
						style={
							{
								backgroundImage: `url(${ images[imageIndex].url })`
							}
						}
					>
						<Wrapper rect={ rect } imgWidth={ 635 } imgHeight={ 423 }/>
					</div>

					<div className={ classes.labelsContainer }>
						<Label text="Dog" />
						<Label text="Playing" />
						<Label text="Golden Spaniel" />

						<button className={ classes.addLabelButton }>+</button>
					</div>
				</div>

				<div className={ classes.rightContainer }>
					<div className={ classes.submitButtonContainer }>
						<GradientLink to="/" text="Submit" gradientDirection="rightToLeft" />
					</div>

					<div className={ classes.box } />

					<div className={ classes.switchImageContainer }>
						<button className={ classes.switchImageButton }> 
							<svg
								className={ classes.svg + ' ' + classes.leftSvg }
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
								/>
							</svg>
						</button>
		
						<button className={ classes.switchImageButton }> 
							<svg
								className={ classes.svg }
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>	
        </div>
    );
}
