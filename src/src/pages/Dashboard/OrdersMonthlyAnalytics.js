import React, { Component } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button } from 'reactstrap';

//Import Charts
import ReactApexChart from 'react-apexcharts';
import "./dashboard.scss";

class TechAnalytics extends Component {
    state = {

               series: [{
                name: 'To Plan',
                data: [0,0,0,5,18]
               },
               {
                               name: 'Planned',
                               data: [0,0,0,8,40]
                              },
               {
                               name: 'Completed',
                               data: [0,0,0,2,36]
                              },
               {
                               name: 'Cancelled',
                               data: [0,0,0,1,18]
                              },
               {
                               name: 'Skipped',
                               data: [0,0,0,0,5]
                              }],
               options: {
                 chart: {
                   type: 'bar',
                   height: 350
                 },
                 plotOptions: {
                   bar: {
                     horizontal: false,
                     columnWidth: '55%',
                     endingShape: 'rounded'
                   },
                 },
                 dataLabels: {
                   enabled: false
                 },
                 stroke: {
                   show: true,
                   width: 2,
                   colors: ['transparent']
                 },
                 xaxis: {
                   categories: ['Jan-23','Feb-23','Mar-23','Apr-23', 'May-23'],
                 },
                 yaxis: {
                   title: {
                     text: 'count'
                   }
                 },
                 fill: {
                   opacity: 1
                 },
                 tooltip: {
                   y: {
                     formatter: function (val) {
                       return "$ " + val + " thousands"
                     }
                   }
                 }
               },


             }






    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Service Orders Analytics</h4>
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