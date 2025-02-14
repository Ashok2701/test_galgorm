import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RouteInfoRenderer extends Component {
  constructor(props) {
      super(props);
      this.OnVRClick = this.OnVRClick.bind(this);
    }

 OnVRClick() {
   //this.props.clicked(this.props.value);
   console.log("inside RouteInforender details clicked",this.props);
  }

  render() {
     console.log("inside RouteInforender details clicked at render",this.props);
    return (
      <a href="#"
        onClick={() => this.OnVRClick()}><i class="fa fa-info-circle" aria-hidden="true"></i>
      </a>
    );
  }
}
