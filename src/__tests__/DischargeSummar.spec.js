import React,{ useState,useEffect } from "react";
import { create } from "react-test-renderer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Row, Col,Button } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react"; 
import Report from '../components/DischargeSummar/Report';
import {
    Link,
    useParams
  } from "react-router-dom";
  const DischargeSummar = (props) => {
    //let { id,disid } = useParams();
    //let padd_obj = {id:id,disid:disid};
    const [dischargesummarydata, setData] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    
      useEffect(()=>{
        responseJson  ={
            "created_at": "2020-06-11T20:28:57.570396Z",
            "updated_at": "2020-06-11T20:28:57.570505Z",
            "id": 59,
            "import_ml_id": null,
            "import_session_id": null,
            "note": null,
            "user": "Greenlake Demo",
            "coder_discharge_labels": [
              {
                "status": 1,
                "additional_text": null,
                "label_priority": 2,
                "label_type": 1,
                "diag": {
                  "name": "A00.0",
                  "desc": "Cholera due to Vibrio cholerae 01, biovar cholerae",
                  "id": 62432
                },
                "id": 114
              },
              {
                "status": 1,
                "additional_text": null,
                "label_priority": 1,
                "label_type": 1,
                "diag": {
                  "name": "A00",
                  "desc": "Cholera",
                  "id": 62431
                },
                "id": 115
              }
            ],
            "discharge": {
              "id": 1,
              "patient": {
                "id": 1,
                "subject_id": 10006,
                "gender": "F",
                "dob": "2094-03-05T00:00:00Z",
                "dod": "2165-08-12T00:00:00Z",
                "expire_flag": 1,
                "dod_hosp": "2165-08-12T00:00:00Z"
              },
              "hadm_id": 142345,
              "admittime": "2164-10-23T21:09:00Z",
              "dischtime": "2164-11-01T17:15:00Z",
              "deathtime": null,
              "admission_type": "EMERGENCY"
            },
            "session_status": 1
          };
        setData(responseJson);        
      },[]);
        
    function AdmissionID() {
        if (dischargesummarydata.length!==0) {
            return dischargesummarydata.discharge.hadm_id;
        }
        else {
           return 0;
        }
    }
    function AdmissionDate() {
        if (dischargesummarydata.length!==0) {
            return new Date(dischargesummarydata.discharge.admittime).toLocaleDateString();
        }
        else {
           return 0;
        }
    }
    function DischargeDate()
    {
        if (dischargesummarydata.length!==0) {
            return new Date(dischargesummarydata.discharge.dischtime).toLocaleDateString();
        }
        else {
           return 0;
        }
    }
    function Speciality()
    {
        if (dischargesummarydata.length!==0) {
            return dischargesummarydata.discharge.admission_type;
        }
        else {
           return 0;
        }
    }
    function PatientID()
    {
        if (dischargesummarydata.length!==0) {
            return dischargesummarydata.discharge.patient.subject_id;
        }
        else {
           return 0;
        }
    }
        return (
            <div className="wrapper"> 
        <div className="content-page">
            <div className="content page_container">
                <div className="container-fluid content_box"> 
                    
                <div className="row" >
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"></li>
                                    <li className="breadcrumb-item active">Discharge summary</li>
                                </ol>
                            </div>
                            <h4 className="page-title">Discharge summary</h4>
                        </div>
                    </div>
                </div>
                    <Row>
                        <Col lg={12}>
                                    <div className="row">
                                        <div className="col-12">
                                        </div>
                                    </div>
                                    <Tabs>
                                        <TabList>
                                        <Tab><span><i className="mdi mdi-clipboard-account"></i> Patient : Joe Bloggs</span></Tab>
                                        <Tab><span><i className="mdi mdi-clipboard-text"></i> Reports</span></Tab>
                                        <Tab><span><i className="mdi mdi-chart-bar"></i> Labs</span></Tab>
                                        </TabList>
                                        <TabPanel>
                                       
                                            <div className="summary_header_parent">
                                                <div className="summary_header_block summary_border">
                                                    <div className="summary_header_inner"><b>Admission ID</b></div>
                                                    <div className="summary_header_inner"><AdmissionID /></div>
                                                </div>
                                                <div className="summary_header_block summary_border">
                                                    <div className="summary_header_inner"><b>Admission Date</b></div>
                                                    <div className="summary_header_inner"><AdmissionDate /></div>
                                                </div>
                                            
                                                <div className="summary_header_block summary_border">
                                                    <div className="summary_header_inner"><b>Discharge Date</b></div>
                                                    <div className="summary_header_inner"><DischargeDate /></div>
                                                </div>
                                            
                                                <div className="summary_header_block summary_border">
                                                    <div className="summary_header_inner"><b>Speciality</b></div>
                                                    <div className="summary_header_inner"><Speciality /></div>
                                                </div>
                                            
                                                <div className="summary_header_block ">
                                                    <div className="summary_header_inner"><b>Patient ID</b></div>
                                                    <div className="summary_header_inner"><PatientID /></div>
                                                </div>
                                           
                                                <div className="summary_header_block ">
                                                    <div className="summary_header_inner"><b>Admission Time</b></div>
                                                    <div className="summary_header_inner">3.00 PM</div>
                                                </div>
                                            
                                                <div className="summary_header_block ">
                                                    <div className="summary_header_inner"><b>Discharge Time</b></div>
                                                    <div className="summary_header_inner">11.00 AM</div>
                                                </div>
                                           
                                                <div className="summary_header_block ">
                                                    <div className="summary_header_inner"><b>Admission Diagnosis</b></div>
                                                    <div className="summary_header_inner">Polysubstance Overdose</div>
                                                </div>
                                            </div>
                                            <div className="row" style={{marginTop: "1%"}}>
                                                <div className="col-sm-12">
                                                    <div className="data_block mt-4">
                                                        <span className="btn custom_tab btn-sm primary_tab_color">PRIMARY DIAGNOSIS</span>
                                                        <div className="backup_div">&nbsp;</div>
                                                        {dischargesummarydata.coder_discharge_labels && dischargesummarydata.coder_discharge_labels.map((item,index) => {
                                                            let p_diag='';
                                                            if(item.label_type===1) {
                                                            if(item.label_priority===1) {
                                                                p_diag = <button key={index} className="btn custom_tab btn-sm">{ item.diag.name } - { item.diag.desc }</button>
                                                            }} return (p_diag); } )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="data_block mt-4">
                                                        <span className="btn custom_tab btn-sm primary_tab_color">SECONDARY DIAGNOSIS</span>
                                                        <div className="backup_div">&nbsp;</div>
                                                        {dischargesummarydata.coder_discharge_labels && dischargesummarydata.coder_discharge_labels.map((item,index) => {
                                                            let s_diag='';
                                                            if(item.label_type===1) {
                                                            if(item.label_priority!==1) {
                                                                s_diag = <button key={index} className="btn custom_tab btn-sm">{ item.diag.name } - { item.diag.desc }</button>
                                                            }} return (s_diag);  })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="data_block2 mt-4">
                                                        <span className="btn custom_tab btn-sm secondry_tab_color">PRIMARY PROCEDURE</span>
                                                        <div className="backup_div">&nbsp;</div>
                                                        {dischargesummarydata.coder_discharge_labels && dischargesummarydata.coder_discharge_labels.map((item,index) => {
                                                            let p_proc='';
                                                            if(item.label_type===2) {
                                                            if(item.label_priority===0) {
                                                                p_proc = <button key={index} className="btn custom_tab btn-sm">{ item.diag.name } - { item.diag.desc }</button>
                                                            }} return (p_proc); })}
                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="data_block2 mt-4">
                                                        <span className="btn custom_tab btn-sm secondry_tab_color">SECONDARY PROCEDURE</span>
                                                        <div className="backup_div">&nbsp;</div>
                                                        {dischargesummarydata.coder_discharge_labels && dischargesummarydata.coder_discharge_labels.map((item,index) => {
                                                            let s_proc='';
                                                            if(item.label_type===2) {
                                                            if(item.label_priority!==0) {
                                                                s_proc=<button key={index} className="btn custom_tab btn-sm">{ item.diag.name } - { item.diag.desc }</button>
                                                            }} return s_proc; })}
                                
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="data_block3 mt-4">
                                                        <span className="btn custom_tab btn-sm choronic_tab_color">CHRONIC CONDITION</span>
                                                        <div className="backup_div">&nbsp;</div>
                                                        {dischargesummarydata.coder_discharge_labels && dischargesummarydata.coder_discharge_labels.map((item,index) => {
                                                           let cron='';
                                                           if(item.label_type===3) {
                                                            cron=<button key={index} className="btn custom_tab btn-sm">{ item.diag.name } - { item.diag.desc }</button>
                                                            } return (cron); })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    
                                                </div>
                                                <div className="col-sm-12 mt-4 text-right">
                                                <Button style={{background:"transparent",color:"#1b726b",border:"none",width: "200px",height:"50px",borderTopLeftRadius:"30px",borderBottomLeftRadius: "30px",borderTopRightRadius:"30px",borderBottomRightRadius: "30px" }} className="mr-2" >+ ADD NOTE</Button>
                                                <Button style={{background:"radial-gradient(#18635c,50%, #071b19)",width: "200px",height:"50px",borderTopLeftRadius:"30px",borderBottomLeftRadius: "30px",borderTopRightRadius:"30px",borderBottomRightRadius: "30px" }} className="mr-2">SAVE CHANGES</Button>     
                                                <Button style={{background:"radial-gradient(#18635c,50%, #071b19)",width: "200px",height:"50px",borderTopLeftRadius:"30px",borderBottomLeftRadius: "30px",borderTopRightRadius:"30px",borderBottomRightRadius: "30px" }} >DONE</Button>     
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            
                                        </TabPanel>
                                        <TabPanel>
                                        <h2>Labs 2</h2>
                                        </TabPanel>
                                    </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    
    
    </div>
        );
    };
describe("DischargeSummar component", () => {
  test("Matches the snapshot", () => {
    const dischargesummar = create(<DischargeSummar />);
    expect(dischargesummar.toJSON()).toMatchSnapshot();
  });
});