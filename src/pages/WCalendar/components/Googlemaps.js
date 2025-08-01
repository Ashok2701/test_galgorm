import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { Paper, Typography } from "@material-ui/core";
import Datatable from "./Datatable/Datatable";
import MyMarker from "./MyMarker";
import GoogleMapReact from "google-map-react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';



const drawerWidth = 72;
const mapStyles = {
  width: "100%",
  height: "100%",
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconItemCode: '',
      changeEyeIcon: false,
      showingInfoWindow: false, // Hides or shows the InfoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
    };
    
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onEyeClick = (type,status,itemcode, index) => {
    this.props.onEyeIconClick(type,status,itemcode, index);
    this.setState({
      iconItemCode: itemcode,
    })
  }

  render() {
   
    let points = [];
    let TotalDistance = 0,TotalWeight = 0,TotalVolume = 0;
    this.props && this.props.tripList && this.props.tripList.map((trip) => {

       
      if (trip.markers && trip.markers.length > 0 && !trip.eyeIcon) {
         let tdis = 0;
         if(trip.totalDistance !== "null"){
              tdis = trip.totalDistance;
         }

         TotalDistance = TotalDistance + parseFloat(tdis);
       let tvol = trip.totalVolume;
         TotalVolume = TotalVolume + parseFloat(tvol);

       let twei = trip.totalWeight;
        TotalWeight = TotalWeight + parseFloat(twei);
       
       

         
        trip.markers.map(item => { item.color = trip.color; return item; });
        trip.markers.map((marker, index) => {
          marker.itemCode = trip.itemCode
          marker.position = index + 1;
          marker.status = marker.status;
          marker.color = trip.bgcolor
          points.push(marker)
        })
      }
    });

    TotalDistance = parseFloat(TotalDistance).toFixed(2);
    TotalVolume =  parseFloat(TotalVolume).toFixed(2);
    TotalWeight =  parseFloat(TotalWeight).toFixed(2);

    return (
      <React.Fragment>
         <AppBar position="fixed" style={{ 'width' : `calc(100%)`,
                                                      'marginLeft': {drawerWidth},
                                                      'backgroundColor': "#424B4D"}} >
                          <Toolbar >
                        <h2>Maps </h2>
                     </Toolbar>
                     </AppBar>
        <div
          style={{
            height: "50vh",
            width: "100%",
            flex: 1,
            position: "relative",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              // remove the key if you want to fork
              key: "AIzaSyCezUPUlJ28J6S_1o7TDwjoKW2si4o4U4c",
              language: "en",
              region: "US"
            }}
            defaultCenter={{ lat: 46.2276, lng: 2.2137 }}
            defaultZoom={0}
          >
            {points.map(({ lat, lng, id, title, color,status, type, sameTrip, position, custName, itemCode }, index) => {
             
              return (
                <MyMarker key={index} lat={lat} lng={lng} id={id} tooltip={id}
                  index={index} color={color} type={type} sameTrip={sameTrip}
                  position={position} custName={custName} itemCode={itemCode} docstatus={status}
                />
              );
            })}
          </GoogleMapReact>
        </div>
        <div style={{ width: "100%" }}>
          <Datatable
            changeEyeIcon={this.state.changeEyeIcon}
            totalDistance = {TotalDistance}
            totalWeight = {TotalWeight}
            totalVolume = {TotalVolume}
            onEyeClick={this.onEyeClick}
            onMapDateChange={this.props.onMapDateChange}
            tripList={this.props.tripList}
            calenderMapDate={this.props.calenderMapDate}
            onDaysChanged = {this.props.onDaysChanged}
            sitelist={this.props.sitelist}
            selectedSite={this.props.selectedSiteValue}
            handleSiteChange={this.props.handleSiteChange}
            sitesArr={this.props.sitesArr}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: "AIzaSyCezUPUlJ28J6S_1o7TDwjoKW2si4o4U4c",
}))(App);