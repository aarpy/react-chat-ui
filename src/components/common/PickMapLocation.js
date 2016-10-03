import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

export default class PickMapLocation extends Component {
  render() {
    return (
       <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
      </GoogleMap>
    );
  }

  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };
}
