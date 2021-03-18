import React,{ useState,useEffect } from "react";
import {  Row, Col, Card, CardBody } from 'reactstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevenueChart from '../components/Dashboard/RevenueChart';
import Dischargeschart from '../components/Dashboard/Dischargeschart';
import CodingTeamRevenue from '../components/Dashboard/CodingTeamRevenue';
import ExecuteApi from '../components/ExecuteApi';
const Dashboard=(props)=>{
    const [dashboard_data, setData] = useState([]);
	
    useEffect(()=>{
        ExecuteApi('dashboard/','GET').then((resp)=>{
            setData(resp);
        });

       
          
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
            <Header actiontoken="dashboard" />
            <div className="content-page">
                <div className="content page_container">   
                    <div className="container-fluid content_box" id="content_boxId">
                        <Row>
                            <Col lg={6}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <i className="mdi mdi-file-document-box-check-outline widget-icon"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Number of Discharges">Team Discharges</h5>
                                                <h3 className="mt-3 mb-3"><Discharges /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-success mr-2"><i className="mdi mdi-arrow-up-bold"></i> 3.15%</div>
                                                    <div className="text-nowrap">Since last month</div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <i className="mdi mdi-currency-usd widget-icon"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Revenue">Revenue</h5>
                                                <h3 className="mt-3 mb-3">$ <Revenue /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-danger mr-2"><i className="mdi mdi-arrow-down-bold" ></i> 1.08%</div>
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
                                                    <i className="mdi mdi-file-document-box-check-outline widget-icon"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Number of Customers">Your Discharges </h5>
                                                <h3 className="mt-3 mb-3"><IndividualDischarges /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-success mr-2"><i className="mdi mdi-arrow-up-bold"></i> 1.27%</div>
                                                    <div className="text-nowrap">Since last month</div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-right">
                                                <i className="mdi mdi-currency-usd widget-icon"></i>
                                                </div>
                                                <h5 className="text-muted font-weight-normal mt-0" title="Number of Orders">Your Revenue Contribution</h5>
                                                <h3 className="mt-3 mb-3">$ <IndividualRevenue /></h3>
                                                <div className="mb-0 text-muted">
                                                    <div className="text-danger mr-2"><i className="mdi mdi-arrow-down-bold"></i> 1.15%</div>
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
                                       <RevenueChart  chartdata={dashboard_data}/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <Card style={{ height:'374px' }}>
                                    <CardBody>
                                        <Dischargeschart chartdata={dashboard_data}/>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <CardBody style={{height:'376px'}}>
                                        <CodingTeamRevenue chartdata={dashboard_data}/>
                                    </CardBody>
                                </Card>
                            </Col>
                            
                        </Row>
                       
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Dashboard;
