import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, Marker, InfoWindow } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../css/index.css';

import * as continue_button from '../continue.png';

Geocode.setApiKey("AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY");
Geocode.enableDebug();

class MapPage extends React.Component{
	constructor( props ){
    super( props );
    this.state = {
        // keep record of the restaurant info
        address: '2190 Barranca Pkwy, Irvine, CA 92606',
        name: '',
        // center of the map
        // the original latlng is just a random value
        mapPosition: {
            lat: 48.85,
            lng: 2.35
        },
        // where to place the marker
        markerPosition: {
            lat: 48.85,
            lng: 2.35
        },
				basicInfo: this.props.location.query.basicInfo,
				options: this.props.location.query.options
    }
  }

  componentDidMount() {
      this.geolocate()
      this.address2latlng(this.state.address)
  }

	addOptionAndRedicrect(content){
    var array = [...this.state.options];
    var option = {
      content: content,
      isCreator: true,
      isVoted: false
    }
    array.push(option);
    this.setState({options: array}, () => {
			this.props.history.push({pathname: '/optionsPage', query: {basicInfo: this.state.basicInfo, options: this.state.options}});
		});
  }

  // get latlng of the user
  geolocate = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  this.setState(prevState => ({
                      mapPosition: {
                          ...prevState.mapPosition,
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                      },
                  }))
              }
          )
      } else {
          console.log("error")
      }
  }

  // convert address to latlng
  address2latlng = (address) => {
      Geocode.fromAddress(address).then(
          response => {
              const { lat, lng } = response.results[0].geometry.location;
              // console.log(lat, lng);
              this.setState({
                  markerPosition: {
                      lat: lat,
                      lng: lng
                  },
                  mapPosition: {
                      lat: lat,
                      lng: lng
                  },
              })
          },
          error => {
              console.error(error);
          }
      );
  }

  // when one of the options provided by autocomplete is selected
  onAutoCompleteSelected = ( place ) => {
    const address = place.formatted_address,
        name = place.name,
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

		//const content = name + ", " + address;
		//this.addOption(content);
		// Set these values in the state.
		this.setState({
	          address: ( address ) ? address : '',
	          name: ( name ) ? name : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};

	render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        style={{
                            position: 'relative'
                        }}
                        google={this.props.google}
                        defaultZoom={14}
                        defaultCenter={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                    >

                        <Marker google={this.props.google}
                            name={'Restaurant'}
                            draggable={false}
                            position={{lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
						/>
						<Marker />
                        <InfoWindow
                            position={{lat: (this.state.markerPosition.lat + 0.002), lng: this.state.markerPosition.lng}}
                        >
                            <span style={{padding: 0, margin: 0}}>{this.state.name}<br/>{this.state.address}</span>
                        </InfoWindow>
                        <Autocomplete
							style={{
                                position: 'absolute',
								width: '100%',
                                height: '33px',
                                width: '301px',
                                top: '60px',
                                left: '37px',
                                border: '0px',


                            }}
							onPlaceSelected={this.onAutoCompleteSelected}
                            placeholder='Search a restaurant'
                            types={['establishment']}
                            fields={['name', 'formatted_address', 'geometry']}
						/>

                    </GoogleMap>
                )
            )
        );
        let map;
        map = <div>
            <AsyncMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY&libraries=places"
                loadingElement={
                <div style={{height: `100%`}} />
                }
                containerElement={
                <div style={{height: '574px', width: '375px'}} />
                }
                mapElement={
                <div style={{height: `100%`}} />
                }
            />

            <div className="bottom" style={{position: 'absolute', top: '559px'}}>
                <button onClick={() => {
													var content = this.state.name + ", " + this.state.address;
													console.log(content);
													this.addOptionAndRedicrect(content);

												}}
                        style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}>
                    <img src= {continue_button}  alt="continue" style={{width:"359px", height:"50px"}} />
                </button>
            </div>
        </div>
        return(map);
    }
}

export default MapPage;