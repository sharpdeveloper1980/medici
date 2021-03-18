import React, { Component } from 'react';

import { Chart, Line } from 'react-chartjs-2';
const Parent = (props) => {
    
     var cummulative_revenue_month=props.chartdata.cummulative_revenue_month;
     let h = new Date();
    let days = new Date(h.getFullYear(), h.getMonth() , 0).getDate();
    let days_array = [];
    for(let i=1; i<days; i++){
        days_array.push('day'+i);
        days--;
    }
    
    var draw = Chart.controllers.line.prototype.draw;
    Chart.controllers.line.prototype.draw = function() {
        draw.apply(this, arguments);
        var ctx = this.chart.chart.ctx;
        var _stroke = ctx.stroke;
        ctx.stroke = function() {
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.01)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 5;
            _stroke.apply(this, arguments);
            ctx.restore();
        };
    };

    const lineChartData = {
        labels: days_array,
        datasets: [
            {
                
                backgroundColor: 'rgba(114, 124, 245, 0.3)',
                borderColor: '#727cf5',
                data: cummulative_revenue_month,
            },
            
        ],
    };

    const lineChartOpts = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            intersect: false,
        },
        hover: {
            intersect: true,
        },
        plugins: {
            filler: {
                propagate: false,
            },
        },
        scales: {
            xAxes: [
                {
                    reverse: true,
                    gridLines: {
                        color: 'rgba(0,0,0,0.05)',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Days of month'
                      },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        stepSize: 100,
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: 'rgba(0,0,0,0)',
                        fontColor: '#fff',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Revenue (AUD)'
                      },
                },
            ],
        },
    }; 

    return (
        <div>
                <div className="row">
                    <div className="col-sm-9">
                        <h6 style={{ fontSize:'12px' }} className="header-title mb-2 mt-1">Coding Team Cumulative Revenue</h6>
                    </div>
                  
                </div>
                <div style={{ height: '300px' }} className="mt-3 chartjs-chart">
                    <Line data={lineChartData} options={lineChartOpts} />
                </div>
               
        </div>
    );
}
class CodingTeamRevenue extends Component {

  render() {
    return (
      <div>
         <Parent chartdata={this.props.chartdata} />
      </div>        
    );
  }
}
export default CodingTeamRevenue;
