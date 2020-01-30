import React from 'react'
import { Scatter } from 'react-chartjs-2'

function Chart(props) {
  const options = {
    title: {
      display: true,
      text: props.title
    },
    tooltips: {
      displayColors: false,
      titleFontSize: 16,
      bodyFontSize: 14,
      xPadding: 10,
      yPadding: 10,
      callbacks: {
        label: (tooltipItem, data) => {
          return [`Time : ${new Date(data.labels[tooltipItem.index].x).toGMTString()}`, `Amount : ${data.labels[tooltipItem.index].y}`, `Block Height : ${data.labels[tooltipItem.index].blockheight}`]
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    elements: {
      point: {
        radius: 1
      }
    },
    legend: {
      display: false
    },
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          displayFormats: {
            'millisecond': 'MMM DD',
            'second': 'MMM DD',
            'minute': 'MMM DD',
            'hour': 'MMM DD',
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
            'quarter': 'MMM DD',
            'year': 'MMM DD',
          }
        },
        position: 'bottom'
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          position: 'top',
          labelString: 'PLT'
        }
      }]
    }
  }
  return (
    <div>
      {<Scatter
        data={props.chartData}
        options={options} />
      }
    </div>
  )
}

export default Chart
