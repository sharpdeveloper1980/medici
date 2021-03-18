import React, { Component } from 'react';
import { Bar,defaults as ChartjsDefaults, Chart } from 'react-chartjs-2';
const Parent = (props) => {
    var projected=[];
    var actual=[];
    var weeklygoal=props.chartdata.weeklygoal;
    if(weeklygoal)
    {
        for(var wl=0;wl<weeklygoal.length;wl++)
        {
            projected.push(weeklygoal[wl].projected);   
            actual.push(weeklygoal[wl].actual);   
        }
      
    }
    ChartjsDefaults.global.defaultFontColor = '#8391a2';
    ChartjsDefaults.scale.gridLines.color = '#8391a2';
    ChartjsDefaults.global.defaultFontFamily =
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
    var draw3 = Chart.controllers.bar.prototype.draw;
    Chart.controllers.bar = Chart.controllers.bar.extend({
        draw: function() {
            draw3.apply(this, arguments);
            var ctx = this.chart.chart.ctx;
            var _fill = ctx.fill;
            ctx.fill = function() {
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.01)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 4;
                ctx.shadowOffsetY = 5;
                _fill.apply(this, arguments);
                ctx.restore();
            };
        },
    });

    const barChartData = canvas => {
        const ctx = canvas.getContext('2d');
        var gradientStroke = ctx.createLinearGradient(0, 500, 0, 150);
        gradientStroke.addColorStop(0, '#fa5c7c');
        gradientStroke.addColorStop(1, '#727cf5');

        return {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
                {
                    label: 'Projected',
                    backgroundColor:'#7380f5',
                    borderColor: '#98a3b0',
                    hoverBackgroundColor: '#7380f5',
                    hoverBorderColor: '#98a3b0',
                    data: projected,
                    barPercentage: 0.7,
                    categoryPercentage: 0.5,
                },
                {
                    label: 'Actual',
                    backgroundColor: '#98a3b0', 
                    borderColor: '#98a3b0',
                    hoverBackgroundColor: '#98a3b0',
                    hoverBorderColor: '#98a3b0',
                    data: actual,
                    barPercentage: 0.7,
                    categoryPercentage: 0.5,
                },
            ],
        };
    };

    // options
    const barChartOpts = {
        maintainAspectRatio: false,
        legend: {
            display: true,
        },
        
        tooltips: {
            backgroundColor: '#1265a1',
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: false,
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        color: 'rgba(0,0,0,0.05)',
                    },
                    stacked: false,
                    ticks: {
                        stepSize: 2,
                    },
			scaleLabel: {
				display: true,
				labelString:'Revenues (in 100K AUD)',
			
			}
                },

            ],
            xAxes: [
                {
                    stacked: false,
                    gridLines: {
                        color: 'rgba(0,0,0,0.05)',
                    },
                },
            ],
        },
    };

    return (
        <div>
           <div className="row">
                <div className="col-sm-9">
                    <h6 style={{ fontSize:'12px' }} className="header-title mb-2 mt-1">Team Revenue(Projections Vs Actual)</h6>
                </div>
                
            </div>
            <div style={{ height: '310px' }} className="chartjs-chart">
                <Bar data={barChartData} options={barChartOpts} />
            </div>
        </div>        
      );
}
class RevenueChart extends Component {

  render() {
    return (
      <div>
         <Parent chartdata={this.props.chartdata} />
      </div>        
    );
  }
}
export default RevenueChart;
