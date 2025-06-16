import React, { Component } from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";

//Import Charts
import PieChart from "./PieChart";
import "./dashboard.scss";

class TechSkillPC extends Component {
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
            colors: ['#5664d2', '#1cbb8c', '#eeb902', '#eeb952'],

        }
    }

      componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          
        //  ApexCharts.exec('routestatus-pie')
           let tempoptions = {...this.state.options};
           tempoptions.labels = this.props.data.techStatusVO && this.props.data.techStatusVO.labels;

            this.setState({
                series : this.props.data.techStatusVO && this.props.data.techStatusVO.series,
                 options : tempoptions
            })

        }
      }


    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Technicians By Skill</h4>

                        <div id="donut-chart" className="apex-charts">
                            <PieChart options={this.state.options} series={this.state.series}  height="150" />
                        </div>

                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default TechSkillPC;