import React, { Component } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button } from 'reactstrap';

//Import Charts
import ReactApexChart from 'react-apexcharts';
import "./dashboard.scss";

class OrderBarAnalytics extends Component {
    state = {

                series: [{
                  data: [75, 16, 12, 20, 1, 1]
                }],
                options: {
                  chart: {
                    type: 'bar',
                    height: 350
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      horizontal: true,
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  xaxis: {
                    categories: ["Installation", "Maintenance", "Repair", "Service", "Troubleshoot", "Verification"],
                  }
                },
              }



    render() {
     
           
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Service Orders by Type</h4>
                        <div>
                            <div id="line-column-chart" className="apex-charts" dir="ltr">
                                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="280" />
                            </div>
                        </div>
                    </CardBody>
               </Card>
            </React.Fragment>
        );
    }
}

export default OrderBarAnalytics;