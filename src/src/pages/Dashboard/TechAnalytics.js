import React, { Component } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button } from 'reactstrap';

//Import Charts
import ReactApexChart from 'react-apexcharts';
import "./dashboard.scss";

class TechAnalytics extends Component {
    state = {

                series: [{
                 name: 'Planned',
                 data: [0,0,0,11,5,8]
                },
                {
                                 name: 'Completed',
                                 data: [5,0,0,2,4,7]
                                },
                 {
                                  name: 'Work in Progress',
                                  data: [0,2,0,4,1,7]
                                 },
                {
                                 name: 'Skipped',
                                 data: [0,0,0,1,0,0]
                                }],
                options: {
                  chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                      show: true
                    },
                    zoom: {
                      enabled: true
                    }
                  },
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                      }
                    }
                  }],
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 10,
                      dataLabels: {
                        total: {
                          enabled: true,
                          style: {
                            fontSize: '13px',
                            fontWeight: 900
                          }
                        }
                      }
                    },
                  },
                  xaxis: {
                    type: 'text',
                    categories: ['Holder', 'John', 'Mark', "Michael Adams", "Robert Harris", "Smith"],
                  },
                  legend: {
                    position: 'right',
                    offsetY: 40
                  },
                  fill: {
                    opacity: 1
                  }
                },


              }




    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Technicians Analytics - Technicians Order Count Per Month with Status</h4>
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

export default TechAnalytics;