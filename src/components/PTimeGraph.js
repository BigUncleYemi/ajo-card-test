import React, { Component } from 'react'
import Chart from 'chart.js';

const date =  new Date();

export default class PTimeGraph extends Component {
  componentDidUpdate(prevProps, prevState){
    if(this.props.data !== prevProps.data){
      const data = this.props.data.pTimeGraphs[0].graph.points.map(item => item.y);

      const data2 = this.props.data.pTimeGraphs[1].graph.points.map(item => item.y);

      const label = this.props.data.pTimeGraphs[0].graph.points.map(item => date.toLocaleTimeString(date.setTime(item.x)));

      console.log(label, data, data2, this.props.data)
      const graph = this.graph;

      const lineChartData = {
        labels: label,
        datasets: [{
          label: this.props.data.pTimeGraphs[0].graph.legend,
          borderColor: "red",
          backgroundColor: "red",
          fill: false,
          data: data,
					pointRadius: 4,
					pointHoverRadius: 6,
          yAxisID: 'y-axis-1',
        }, {
          label: this.props.data.pTimeGraphs[1].graph.legend,
          borderColor: "blue",
          backgroundColor: "blue",
          fill: false,
          data: data2,
					pointRadius: 4,
					pointHoverRadius: 6,
          yAxisID: 'y-axis-2'
        }]
      };
      // eslint-disable-next-line no-unused-vars
      var graphChart  = Chart.Line(graph, {
				data: lineChartData,
				options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: true,
						text: 'PTime Graph'
					},
					scales: {
						yAxes: [{
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear',
							display: true,
							position: 'right',
							id: 'y-axis-2',
							gridLines: {
								drawOnChartArea: false, 
							},
						}],
					}
				}
			});
    }
  }

  render() {
    return (
      <canvas  ref={input => this.graph = input}  width="400" height="400"></canvas>
    )
  }
}
