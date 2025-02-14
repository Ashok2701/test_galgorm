import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Maps from "./components/Googlemaps";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Maps" component={Maps} />
                </Switch>
            </Router>
        )
    }
}