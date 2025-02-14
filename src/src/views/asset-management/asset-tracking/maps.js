import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles = {
  width: '99%',
  height: '340px'
}

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={
          {
            lat: 38.770353,
            lng: -90.46608489999994
          }
        }
      >
      <Marker
                position={{ lat: 38.770353, lng: -90.46608489999994}}

              />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBZ9D3POYe26cnbtAolFlgZYPN7yqzLMs4'
})(MapContainer)