import React, { Component } from 'react'
import Chart from 'chart.js';

const date =  new Date();

export default class PosGraph extends Component {
  componentDidUpdate(prevProps, prevState){
    if(this.props.data !== prevProps.data){
      const data = this.props.data.graphs[0].graph.points.map(item => (item.failed /item.total)*100);

      const data2 = this.props.data.graphs[1].graph.points.map(item => (item.failed /item.total)*100);

      const label = this.props.data.graphs[0].graph.points.map(item => date.toLocaleTimeString(date.setTime(item.x)));

      const graph = this.graph;

      const lineChartData = {
        labels: label,
        datasets: [{
          label: `${this.props.data.graphs[0].graph.legend} - failure rate(%)`,
          borderColor: "red",
          backgroundColor: "red",
          fill: false,
          data: data,
					pointRadius: 4,
					pointHoverRadius: 6,
          yAxisID: 'y-axis-1',
        }, {
          label: `${this.props.data.graphs[0].graph.legend} - failure rate(%)`,
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
						text: 'POS - failure against time'
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
      <canvas  ref={input => this.graph = input}></canvas>
    )
  }
}
