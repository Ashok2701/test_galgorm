import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component {

    render() {
        const data = {
            labels: this.props.options.labels,
            datasets: [
                {
                    data: this.props.series,
                    backgroundColor: this.props.options.colors,
                    hoverBackgroundColor: [
                        "#34c38f",
                        "#ebeff2",
                        '#eeb902'
                    ],
                    hoverBorderColor: "#fff"
                }]
        };

        return (
            <React.Fragment>

                <Pie width={474} height={220} data={data} />
            </React.Fragment>
        );
    }
}

export default PieChart;