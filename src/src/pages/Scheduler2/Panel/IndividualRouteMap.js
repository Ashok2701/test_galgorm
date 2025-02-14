import React, { Component } from "react";
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


import classnames from "classnames";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class IndividualRouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: ''
    };
  }

  render(){

     return(

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
                           zoom={14}
                         >
                           <Marker onClick={this.onMarkerClick} />
                           <InfoWindow>
                             <div>
                             </div>
                           </InfoWindow>
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
                              })(IndividualRouteMap);