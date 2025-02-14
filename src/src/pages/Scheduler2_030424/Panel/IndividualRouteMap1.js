import React from 'react';
import GoogleMapReact from "google-map-react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import MyMarker from './MyMarker';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
class IndividualRouteMap1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log("inside indiv map1, site details",this.props.siteDetails);
        console.log("inside indiv map1, tripsList",this.props.tripsList);
            console.log("inside indiv map1, markers",this.props.markers);
                console.log("inside indiv map1, bl_tripsList",this.props.bl_tripsList);
    let points = [
      // { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
    ];
    let depDetails = {};
    let arrDetails = {};
    if (this.props.tripsList && this.props.vrdata && this.props.triplock == true)
    {
    console.log("inside IndividualMap , lock");
      this.props.tripsList.map((tripList) => {
        if (tripList.code === this.props.vrdata.codeyve && this.props.vrdata.xnumpc === tripList.itemCode) {
          // points.push({})
          this.props.sites.map((site) => {
            if (tripList.depSite === site.id) {
              depDetails.id = 0;
              depDetails.title = 'Home';
              depDetails.lat = site.lat;
              depDetails.lng = site.lng;
              depDetails.site = site.value
            }
            if (tripList.arrSite === site.id) {
              arrDetails.title = "arrival";
              arrDetails.lat = site.lat;
              arrDetails.lng = site.lng;
              arrDetails.site = site.value
            }
          })
        }
      })
    }
    else if(this.props.bl_tripsList && this.props.bl_tripsList.lock == false) {
      console.log("inside IndividualMap , unlock");
      console.log("inside IndividualMap , unlock",this.props.bl_tripsList);
         this.props.sites.map((site) => {
            if (this.props.bl_tripsList.depSite === site.id) {
              depDetails.id = 0;
              depDetails.title = 'Home';
              depDetails.lat = site.lat;
              depDetails.lng = site.lng;
              depDetails.site = site.value
            }
            if (this.props.bl_tripsList.arrSite === site.id) {
              arrDetails.title = "arrival";
              arrDetails.lat = site.lat;
              arrDetails.lng = site.lng;
              arrDetails.site = site.value
            }
          })
    }
    if (Object.keys(depDetails).length > 0) {
      points.push(depDetails)

    }
    else {
      if (this.props.markers && this.props.markers[0]) {
        if (this.props.markers[0].lat && this.props.markers[0].lng) {
          points.push({
            id: 0, title: 'Home', lat: this.props.markers[0].lat, lng: this.props.markers[0].lng,
            site: this.props.markers[0].value
          })
        }
      }
    }
    let selectedData;
    if (this.props.tripsList && this.props.vrdata && this.props.triplock == true) {
      this.props.tripsList.map((tripList) => {
        if (tripList.code === this.props.vrdata.codeyve && this.props.vrdata.xnumpc === tripList.itemCode) {

          if (tripList.totalObject && tripList.totalObject.selectedTripData) {
            tripList.totalObject.selectedTripData.map((selectedTrips, index) => {
              selectedData = tripList.totalObject.selectedTripData;
              points.push({
                id: index + 1, title: selectedTrips.bpname,
                lat: selectedTrips.lat, lng: selectedTrips.lng,
                type: selectedTrips.doctype, selectedTrips: selectedTrips
              })
            })
          }
        }
      })
    }
    else if(this.props.bl_tripsList){
          if (this.props.bl_tripsList.totalObject && this.props.bl_tripsList.totalObject.selectedTripData) {
                     this.props.bl_tripsList.totalObject.selectedTripData.map((selectedTrips, index) => {
                       selectedData = this.props.bl_tripsList.totalObject.selectedTripData;
                       points.push({
                         id: index + 1, title: selectedTrips.bpname,
                         lat: selectedTrips.lat, lng: selectedTrips.lng,
                         type: selectedTrips.doctype, selectedTrips: selectedTrips
                       })
                     })
                   }
    }
    if (Object.keys(arrDetails.length > 0) && selectedData) {
      arrDetails.id = (selectedData.length) + 1;
      if (!(depDetails.lat === arrDetails.lat && depDetails.lng === arrDetails.lng)) {
        points.push(arrDetails)
      }
    }

    let arrivalCheck = {};
    arrivalCheck = points.find(data => data.title === "arrival");
    if (!(arrivalCheck && arrivalCheck.title && arrivalCheck.title.length > 0
      && arrivalCheck.title === "arrival")) {
      let pointHome = {}
      points.map((point) => {
        if (point.title === "Home") {
          pointHome = point;
          pointHome.sameSite = true;
        }
      })
      let homeIndex = points.findIndex(data => data.title === "Home");
      points.splice(homeIndex, 1, pointHome);
      // points.splice(homeIndex, 0, pointHome);
    }
    let pointsOccurance;
    if (points && points.length > 0) {
      function findOcc(arr, lat, lng, id) {
        let arr2 = [];

        arr.forEach((x) => {

          // Checking if there is any object in arr2
          // which contains the key value
          if (arr2.some((val) => {
            return (val[lat] == x[lat] && val[lng] == x[lng])
          })) {

            // If yes! then increase the occurrence by 1
            arr2.forEach((k) => {
              if (k[lat] === x[lat] && k[lng] === x[lng]) {
                k["occurrence"]++;
              }
            })

          } else {
            let a = {}
            a[lat] = x[lat]
            a[lng] = x[lng]
            a[id] = x[id]
            a["occurrence"] = 1
            arr2.push(a);
          }
        })

        return arr2
      }

      pointsOccurance = findOcc(points, "lat", "lng", "id")
    }

    if (pointsOccurance && pointsOccurance.length > 0) {
      pointsOccurance.map((ponitOcc) => {
        points.map((point) => {
          if (ponitOcc.occurrence == 1) {
            if (ponitOcc.id === point.id) {
              point["occurrence"] = ponitOcc.occurrence
            }
          }

        })
      })
    }
    let pointsOcc1 = [];
    let pointsMulti = []
    if (points && points.length > 0) {
      points.map((point) => {
        if (point.occurrence === 1) {
          pointsOcc1.push(point)
        } else {
          pointsMulti.push(point)
        }
      })
    }
    return (
       <Card>
                            <CardBody className="p-2">
                              <div
                                id="gmaps-markers"
                                className="gmaps"
                                style={{ position: "relative" }}
                              >
                                <Map
                                                          google={this.props.google}
                                                          style={{ width: "100%", height: "100%" }}
                                                          zoom={9}
                                                          initailCenter = {this.props.siteDetails}
                                                        >

              {points.map(({ lat, lng, id, title, type, selectedTrips, site, sameSite, occurrence }) => {
                return (
                  <Marker key={id}
                     id = {id}
                     position = {{
                     lat:{lat},
                    lng:{lng}
                    }}
                     />
                );
              })}
            </Map>
                       </div>
                                           </CardBody>
                                         </Card>
    );
  }
}
export default GoogleApiWrapper({
                                               apiKey: "AIzaSyAQb-7NDLDsJh-l3siJQ_1gEw2lBgWKYlU",
                                               v: "3",
                                             })(IndividualRouteMap1);