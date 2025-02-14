import React, { Component } from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";

//Import Charts
import PieChart from "./PieChart";
import "./dashboard.scss";

class SalesAnalytics extends Component {
    state = {
        series: [],
        options: {
            labels: [],
            dataLabels: {
                enabled: true
            },
            legend: {
                position : 'bottom'

            },
            colors: ['#5664d2', '#1cbb8c', '#eeb902'],
            chart: {
                    id: "routestatus-pie"
                  }

        }
    }


  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log("Some props changed. Rendering...");
    //  ApexCharts.exec('routestatus-pie')
       let tempoptions = {...this.state.options};
       tempoptions.labels = this.props.data.routeStatusVO && this.props.data.routeStatusVO.labels;

        this.setState({
            series : this.props.data.routeStatusVO && this.props.data.routeStatusVO.series,
             options : tempoptions
        })

    }
  }


    render() {
      console.log("route status =", this.props.data);
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Routes By Status</h4>

                        <div id="donut-chart" className="apex-charts">
                            <PieChart options={this.state.options} series={this.state.series}  height="150" />
                        </div>

                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default SalesAnalytics;