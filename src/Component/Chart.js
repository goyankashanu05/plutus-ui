import React from 'react'
import { Scatter } from 'react-chartjs-2'

function Chart(props) {
  const options = {
    tooltips: {
      displayColors: false,
      titleFontSize: 16,
      bodyFontSize: 14,
      xPadding: 10,
      yPadding: 10,
      callbacks: {
        label: (tooltipItem, data) => {
          return [`Time : ${ new Date(data.labels[tooltipItem.index].x* 1000).toGMTString()}` , `Amount : ${data.labels[tooltipItem.index].y}`,`Block Height : ${data.labels[tooltipItem.index].blockheight}`]
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    maintainAspectRatio: true,
    responsive:true,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
  return (
    <div>
      <Scatter 
        data={props.chartData}
        options={options} />
    </div>
  )
}

export default Chart
