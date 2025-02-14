import React, { Component } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button } from 'reactstrap';

//Import Charts
import ReactApexChart from 'react-apexcharts';
import "./dashboard.scss";

class RoutesAnalytics extends Component {
    state = {

                series: [{
                  name: 'Route Generated',
                  data: [0,0,0,0,5]
                },
                {
                                  name: 'Submitted to Technician',
                                  data: [0,0,0,3,20]
                                },
                 {
                                   name: 'Tech Checked In',
                                   data: [0,0,0,0,1]
                                 },
                {
                                  name: 'Work In Progress',
                                  data: [0,0,0,1,1]
                                },
                 {
                                   name: 'Completed',
                                   data: [0,0,0,0,1]
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
                    categories: ['Jan-23','Feb-23','Mar-23','Apr-23', 'May-23'],
                  }, noData: {
                        text: 'Loading...'
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

/*
    componentDidUpdate(prevProps) {
       if (prevProps.dash !== this.props.dash) {
         console.log("Some props changed. Analystics Rendering...");
       //  ApexCharts.exec('routestatus-pie')
          let tempoptions = {...this.state.series};
          let updtempoptions = []

/*
          if(this.props.dash.routeAnalticsVO.labelSeriesVOList.length > 0) {
             let routeAnalticsData = this.props.dash.routeAnalticsVO.labelSeriesVOList;


             for(let i = 0 ; i < routeAnalticsData.length ; i++) {
              let tempnamelabel = {}
               tempnamelabel.name = routeAnalticsData[i].labels;
               tempnamelabel.data = routeAnalticsData[i].series;

              updtempoptions.push(tempnamelabel);
          }
        }

        tempoptions = this.props.dash.routeAnalticsVO.labelSeriesVOList;


            // tempoptions = updtempoptions;
             let tempcategoptions = {...this.state.options};
             let tempcategxaxis = tempcategoptions.xaxis;
             tempcategxaxis.categories = this.props.dash.routeAnalticsVO.categ
             tempcategoptions.xaxis = tempcategxaxis;

 console.log("Some props changed. series", tempoptions);
  console.log("Some props changed. options =", tempcategoptions);

           this.setState({
               options : tempcategoptions,
                series : tempoptions
      });
       }

      // this.rerender();
     }

*/

    render() {
      console.log("Route Anal options=", this.state.options);
       console.log("Route Anal series =", this.state.series);
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Route Analytics - Routes Per Month with Status</h4>
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

export default RoutesAnalytics;