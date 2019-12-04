import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import "../css/index.css";

import * as continue_button from "../continue.png";

Geocode.setApiKey("AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY");
Geocode.enableDebug();

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    var query = this.props.location.query;
    this.state = {
      // keep record of the restaurant info
      address: "Irvine, CA 92697, USA",
      name: "University of California Irvine",
      // center of the map
      // the original latlng is just a random value
      mapPosition: {
        lat: 33.640495,
        lng: -117.844296
      },
      // where to place the marker
      markerPosition: {
        lat: 33.640495,
        lng: -117.844296
      },
      userId: query.userId,
      pollingId: query.pollingId,
      basicInfo: {
        isOwner: query.basicInfo.isOwner,
        subject: query.basicInfo.subject,
        pollingEndTime: query.basicInfo.pollingEndTime,
        availableTimeFrom: query.basicInfo.availableTimeFrom,
        availableTimeTo: query.basicInfo.availableTimeTo,
        startPoint: query.basicInfo.startPoint,
        isMultipleChoice: query.basicInfo.isMultipleChoice
      },
      options: query.options,
      previousPath: query.previousPath,
      socketpush: query.socketpush
    };
  }

  componentDidMount() {
    this.geolocate();
    this.address2latlng(this.state.address);
    // console.log('page2 pollingId', this.state.pollingId)
  }

  addOptionAndRedicrect(content) {
    if (this.state.previousPath === "/optionsPage") {
      var optionsContents = this.state.options.map(
        item => item.content
      );

      // console.log("pollingId:", this.state.pollingId)

      if (optionsContents.includes(content)) {
        alert("This option already exists!");
      } else {
        var array = [...this.state.options];
        var option = {
        content: content,
        isCreator: true,
        isVoted: false
        };
        array.push(option);
        this.setState({ options: array }, () => {
          this.props.history.push({
            pathname: this.state.previousPath,
            query: {
              userId: this.state.userId,
              pollingId: this.state.pollingId,
              basicInfo: this.state.basicInfo,
              options: this.state.options,
              socketpush: this.state.socketpush
            }
          });
        });
      }

    } else {
      var basicInfo = { ...this.state.basicInfo };
      basicInfo.startPoint = content;
      console.log('startPoint at mapPage',basicInfo.startPoint);
      this.setState({ basicInfo: basicInfo }, () => {
        this.props.history.push({
          pathname: '/basicInfoPage',
          query: {
            userId: this.state.userId,
            pollingId: this.state.pollingId,
            basicInfo: this.state.basicInfo,
            options: this.state.options,
            socketpush: this.state.socketpush
          }
        });
      });
    }
  }

  // get latlng of the user
  geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(prevState => ({
          mapPosition: {
            ...prevState.mapPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
    } else {
      console.log("error");
    }
  };

  // convert address to latlng
  address2latlng = address => {
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
          }
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  // when one of the options provided by autocomplete is selected
  onAutoCompleteSelected = place => {
    const address = place.formatted_address,
      name = place.name,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng(),

      opening_hours = place.opening_hours;

    console.log(opening_hours)
    //const content = name + ", " + address;
    //this.addOption(content);
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      name: name ? name : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      }
    });
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          style={{
            position: "relative"
          }}
          google={this.props.google}
          defaultZoom={14}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
        >
          <Marker
            google={this.props.google}
            name={"Restaurant"}
            draggable={false}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng
            }}
          />
          <Marker />
          <InfoWindow
            position={{
              lat: this.state.markerPosition.lat + 0.002,
              lng: this.state.markerPosition.lng
            }}
          >
            <span style={{ padding: 0, margin: 0 }}>
              {this.state.name}
              <br />
              {this.state.address}
            </span>
          </InfoWindow>
          <Autocomplete
            style={{
              position: "absolute",
              width: "100%",
              height: "33px",
              width: "301px",
              top: "60px",
              left: "37px",
              border: "0px"
            }}
            onPlaceSelected={this.onAutoCompleteSelected}
            placeholder="Search a restaurant"
            types={[]}
            fields={["name", "formatted_address", "geometry"]}
            componentRestrictions={{country: "us"}}
          />
        </GoogleMap>
      ))
    );
    let map;
    map = (
      <div>
        <AsyncMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: "574px", width: "375px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <div className="bottom" style={{ position: "absolute", top: "559px" }}>
          <button
            onClick={() => {
              var content = "";
              if (this.state.name) {
                content = this.state.name + ", " + this.state.address;
              } else {
                content = this.state.address;
              }
              this.addOptionAndRedicrect(content);

            }}
            style={{
              outline: "none",
              position: "absolute",
              padding: "0px",
              left: "8px",
              bottom: "5px",
              border: "none"
            }}
          >
            <img
              src={continue_button}
              alt="continue"
              style={{ width: "359px", height: "50px" }}
            />
          </button>
        </div>
      </div>
    );
    return map;
  }
}

export default MapPage;
