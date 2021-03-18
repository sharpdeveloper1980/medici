import React,{ useState,useEffect } from "react";
import { create } from "react-test-renderer";
import {  Row, Col, Card, CardBody } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react"; 
import config from "../auth_config.json";
import Header from '../components/Header';
import RevenueChart from '../components/Dashboard/RevenueChart';
import Dischargeschart from '../components/Dashboard/Dischargeschart';
import CodingTeamRevenue from '../components/Dashboard/CodingTeamRevenue';
const Dashboard=(props)=>{
    const [dashboard_data, setData] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    useEffect(()=>{
        let responseJson={
            "Discharges": {
              "value": 364,
              "change": 3
            },
            "revenue": {
              "value": "32 M",
              "change": 2
            },
            "individual_discharges": {
              "value": 21,
              "change": 3
            },
            "individual_revenue": {
              "value": "37K",
              "change": 2
            },
            "cummulative_revenue_month": [
              0,
              120,
              180,
              244,
              354,
              440,
              520,
              600,
              680,
              720,
              770
            ],
            "completion_pie": {
              "done": 33,
              "progress": 3,
              "remaining": 43
            },
            "weeklygoal": [
              {
                "projected": 6,
                "actual": 8
              },
              {
                "projected": 6,
                "actual": 5
              },
              {
                "projected": 6,
                "actual": 5
              },
              {
                "projected": 6,
                "actual": 7
              },
              {
                "projected": 4,
                "actual": 0
              }
            ]
          };
        setData(responseJson); 
    },[]);
    /* Card date Start */
    function Discharges() {
        const Discharges = dashboard_data.Discharges;
        if (Discharges) {
            return dashboard_data.Discharges.value;
        }
        return 0;
    }
    function Revenue()
    {
        const Revenue = dashboard_data.revenue;
        if (Revenue) {
            return dashboard_data.revenue.value;
        }
        return 0;
    }
    function IndividualDischarges()
    {
        const IndividualDischarges = dashboard_data.individual_discharges;
        if (IndividualDischarges) {
            return dashboard_data.individual_discharges.value;
        }
        return 0;
    }
    function IndividualRevenue()
    {
        const IndividualRevenue = dashboard_data.individual_revenue;
        if (IndividualRevenue) {
            return dashboard_data.individual_revenue.value;
        }
        return 0;
    }
    /* Card date End */
    return (
        <div className="wrapper">
            <div className="content-page">
            <div className="content page_container">   
                    <div className="container-fluid content_box">
                        
                        <Row>
                            <Col>
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        
                                    </div>
                                    <h4 className="page-title">Dashboard</h4>
                                    <p>Welcome back, James</p>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <i className="mdi mdi-file-document-box-check-outline"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Number of Discharges">Discharges</h5>
                                                <h3 className="mt-3 mb-3"><Discharges /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-success mr-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</div>
                                                    <div className="text-nowrap">Since last month</div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <i className="mdi mdi-currency-usd"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Revenue">Revenue</h5>
                                                <h3 className="mt-3 mb-3">$ <Revenue /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-danger mr-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</div>
                                                    <div className="text-nowrap">Since last month</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <i className="mdi mdi-file-document-box-check"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Number of Customers">Team Discharges </h5>
                                                <h3 className="mt-3 mb-3"><IndividualDischarges /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-success mr-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</div>
                                                    <div className="text-nowrap">Since last month</div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <i className="mdi mdi-coin-outline"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Number of Orders">Team Revenue</h5>
                                                <h3 className="mt-3 mb-3">$ <IndividualRevenue /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-danger mr-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</div>
                                                    <div className="text-nowrap">Since last month</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                       
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
            </div>


        </div>
    );
};
describe("Dashboard component", () => {
  test("Matches the snapshot", () => {
    const dashboard = create(<Dashboard />);
    expect(dashboard.toJSON()).toMatchSnapshot();
  });
});