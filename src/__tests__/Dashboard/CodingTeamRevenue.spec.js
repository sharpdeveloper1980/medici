import React, { Component } from "react";
import { create } from "react-test-renderer";
import Chart from 'react-apexcharts';
const CodingTeamRevenue = (props) => {
    const apexLineChartWithLables = {
        chart: {
            height: 380,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors:['#ffaf47', '#ffaf47', '#ffaf47'],
        dataLabels: {
            enabled: false,
            
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        title: {
            text: '',
            align: 'left',
            style: {
                fontSize: '14px',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        
        xaxis: {
            categories: ['July 01 ,2020', ' ', ' ', ' ', ' ', ' ', ' ',' ',' ','Aug 01 ,2020'],
            title: {
                text: 'Month',
            },
        },
        yaxis: {
            title: {
                text: '',
            },
            labels: {
                formatter: function (value) {
                  return value + "$";
                }
              },
            min: 0,
            max: 1000,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };
    var apexLineChartWithLablesData = [
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    ];
    return (
        <div>
                <div className="row">
                    <div className="col-sm-9">
                        <h6 style={{ fontSize:'12px' }} className="header-title mb-2 mt-1">Coding Team Cumulative</h6>
                    </div>
                    <div className="col-sm-3">
                        <select className="form-control form-control-sm" style={{ fontSize:'10px',height:'23px' }}>
                            <option>Last 30 Days</option>
                            <option>Last 60 Days</option>
                        </select>
                    </div>
                </div>
                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="line"
                    className="apex-charts"
                />
        </div>
    );
}

describe("CodingTeamRevenue component", () => {
  test("Matches the snapshot", () => {
    const codingTeamRevenue = create(<CodingTeamRevenue />);
    expect(codingTeamRevenue.toJSON()).toMatchSnapshot();
  });
});