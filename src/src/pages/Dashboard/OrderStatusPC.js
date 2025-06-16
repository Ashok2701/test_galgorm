import React, { Component } from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";

//Import Charts
import PieChart from "./PieChart";
import "./dashboard.scss";

class OrderAnalytics extends Component {
    state = {
        series: [],
        options: {
            labels: [],
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false,
            },
            noData : {
               text : 'Empty data',
            },
            colors: ['#5664d2', '#1cbb8c', '#eeb902'],

        }
    }


      componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          
        //  ApexCharts.exec('routestatus-pie')
           let tempoptions = {...this.state.options};
           tempoptions.labels = this.props.data.sorderStatusVO && this.props.data.sorderStatusVO.labels;

            this.setState({
                series : this.props.data.sorderStatusVO && this.props.data.sorderStatusVO.series,
                 options : tempoptions
            })

        }
      }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Service Order By Status</h4>

                        <div id="donut-chart" className="apex-charts">
                            <PieChart options={this.state.options} series={this.state.series}  height="150" />
                        </div>

                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default OrderAnalytics;