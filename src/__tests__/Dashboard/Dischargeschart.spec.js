import React, { Component } from "react";
import { create } from "react-test-renderer";
import Chart from 'react-apexcharts';
const Dischargeschart = (props) => {
    const apexDonutOpts = {
        chart: {
            height: 340,
            type: 'donut',
        },
        colors: ['#1164a0','#fea939','#1a716a'],
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 376,
                options: {
                    chart: {
                        width: 250,
                        height: 250,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };
    var apexDonutData = [0, 0, 0];
    return (
            <div>
                <div className="row">
                    <div className="col-sm-9">
                        <h6 style={{ fontSize:'12px' }} className="header-title mb-2 mt-1">Discharges</h6>
                    </div>
                    <div className="col-sm-3">
                        <select className="form-control form-control-sm" style={{ fontSize:'10px',height:'23px' }}>
                            <option>One Week</option>
                            <option>Two Week</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Chart options={apexDonutOpts} series={apexDonutData} type="pie" height={200} className="apex-charts" />
                    </div>
                    <div className="col-sm-6 chart_data_info">
                        <div className="chart-widget-list">
                            <p>
                                <i className="mdi mdi-circle discharges_commenced"></i> Discharges Not Commenced
                                <span className="float-right">0</span>
                            </p>
                            <p>
                                <i className="mdi mdi-circle discharges_process"></i> Discharges In Process
                                <span className="float-right">0</span>
                            </p>
                            <p>
                                <i className="mdi mdi-circle discharges_completed"></i> Discharges Completed
                                <span className="float-right">0</span>
                            </p>
                        </div>
                    </div>
                </div>
                
               
            </div>
    );
}

describe("Dischargeschart component", () => {
  test("Matches the snapshot", () => {
    const dischargeschart = create(<Dischargeschart />);
    expect(dischargeschart.toJSON()).toMatchSnapshot();
  });
});