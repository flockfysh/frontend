import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DatasetCard from '../../components/dashboard/viewDatasets/datasetCard/datasetCard';
import Loading from '../../components/loading/loading';

import MiniProfile from '../../components/dashboard/viewDatasets/miniProfile/miniProfile';

import Button from '../../components/UI/button/button';

import Image from '../../images/heroImage.jpg';
import Icon from '../../images/icons/search.svg';

import classes from './viewDatasets.module.css';

export default function ViewDatasets() {
	const [datasets, updateDatasets] = useState([] as Dataset[]);
	const [isLoading, updateLoadingState] = useState(true);
	const [filter, updateFilter] = useState('');

	useEffect(() => {
		updateLoadingState(true);

		(async function () {
			// fetch user datasets here
			const testDatasets = [];

			for (let i = 0; i < 6; i++) {
				testDatasets.push({
					name: 'Dogs',
					id: '50',
					numImages: 50,
					overview:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
					dateCreated: '31st Novemeber, 2022',
					plan: 'Hobbyist',
					monthlyCost: {
						storage: 100,
						creation: 23,
						total: 123
					},
					size: 3.2,
					uploadedImages: [
						{
							url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
							name: 'dog_dog'
						}
					],
					datasetImages: [
						{
							url: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
							name: 'dog_dog_dog'
						}
					]
				});
			}

			updateDatasets(testDatasets);

			updateLoadingState(false);
		})();
	}, []);

	if (isLoading) return <Loading />;

	return (
		<div className={ classes.viewDatasetsContainer }>
			<header className={ classes.header }>
				<MiniProfile name="Ray" email="ray@gmail.com" image={ Image } />

				<div className={ classes.searchWrapper }>
					<div className={ classes.container }>
						<input
							type="text"
							placeholder="Find your dataset..."
							onChange={ e => updateFilter(e.target.value) }
						/>

						<img src={ Icon } alt="" />
					</div>
				</div>

				<div className={ classes.btnWrapper }>
					<Button
						hasArrow={ true }
						gradientDirection="leftToRight"
						text="Create a new dataset"
						to="/dashboard/create-dataset"
					/>
				</div>
			</header>

			<h1 className={ classes.viewDatasetsHeader }>Your Datasets</h1>

			<div className={ classes.datasetsContainer }>
				{
					(function generateFilterElements() {
						const elements =
							filter.length === 0
								? datasets
								: datasets.filter(d =>
										d.name
											.toLowerCase()
											.includes(
												filter
													.replaceAll(' ', '')
													.toLowerCase()
											)
								  );
											
						if (elements.length === 0)
							return (
								<h1 className={ classes.noDatasetsFound }>
									Sorry, no datasets found. Go {' '}
									<Link to="/dashboard/create-dataset">here</Link> {' '}
									to create one.
								</h1>
							);
						else
							return elements.map(
								(dataset, index) => (
									<DatasetCard key={ index } dataset={ dataset } />
								)
							);
					})()
				}
			</div>
		</div>
	);
}
