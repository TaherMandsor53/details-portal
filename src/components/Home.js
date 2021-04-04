import React, { Component } from 'react';
import transform from '../utils/Transform';
import DropdownComponent from '../common-components/DropdownComponent';
import CardComponent from '../common-components/CardComponent';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			storeLocationDetails: [],
		};
	}

	componentDidMount() {
		this.props.requestGetLocation();
	}

	onDropdownChange = (val) => {
		this.props.requestGetLocationId(val);
	};

	render() {
		const { locationDetails, locationIdDetails, residentDetails } = this.props;
		const filterLocation = transform.transformLocationData(locationDetails && locationDetails.results);
		console.log('Filter location:', filterLocation);
		console.log('details:', locationIdDetails);
		console.log('Store resident details:', residentDetails);
		return (
			<div className="home-main">
				{filterLocation && (
					<DropdownComponent
						label="Locations"
						options={filterLocation}
						onDropdownChange={this.onDropdownChange}
					/>
				)}
				<div className="card-details">
					{residentDetails && residentDetails.length > 0 ? (
						residentDetails.map((_) => {
							return (
								<CardComponent
									imagepath={_.image}
									cardName={_.name}
									cardStatus={_.status}
									cardLocation={_.location && _.location.name}
									cardLocationHeader="Last known location:"
									id={_.id}
									type={_.type ? _.type : 'unknown'}
									gender={_.gender}
									species={_.species}
									characterCreated={_.created}
								/>
							);
						})
					) : (
						<div className="no-resident-found">No residents found for selected location</div>
					)}
				</div>
			</div>
		);
	}
}
