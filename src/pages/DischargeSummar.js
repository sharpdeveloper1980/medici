import React,{useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Row, Col, Card,CardBody} from 'reactstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Report from '../components/DischargeSummar/Report';
import Labs from '../components/DischargeSummar/Labs';
import AuditorReport from '../components/DischargeSummar/AuditorReport';
import DischargeCode from '../components/DischargeSummar/DischargeCode';
import {useParams} from "react-router-dom";
const DischargeSummar = (props) => {
const [ActionSection, setActionSection] = useState(false);
const [onChangeEvent, setonChangeEvent] = useState(false);
const [tabIndex, setTabIndex] = useState(0);
let { id,disid,type } = useParams();
const setChangeState=(value)=>{
    localStorage.setItem('ischanged',value);
    setonChangeEvent(value);
}
const openTab = () =>{
    setTabIndex(Number(localStorage.getItem('tab_index')));
    setonChangeEvent(false);
    localStorage.removeItem('tab_index');
} 
let padd_obj = {onChangeEvent:onChangeEvent,ActionSection:ActionSection,id:id,disid:disid,type:ActionSection,setChangeState:setChangeState,openTab:openTab};
function ReportTab()
{
    if(ActionSection)
    {
        return <AuditorReport id={padd_obj} />;
    }
    else 
    {
        return <Report id={padd_obj} />;
    }
}
const saveChangeData=(index)=>{
    if(onChangeEvent) {
      let ele = document.getElementById("saveonTabChange");
      if(ele)
      {
          localStorage.setItem('tab_index',index);
          ele.click();
      }
    }
    else 
    {
        setonChangeEvent(false);
        localStorage.removeItem('ischanged');
        setTabIndex(index);
    }
}
const changeReportStatus= (e)=>{
    setActionSection(!ActionSection);
}
let cls1='codeBlock';
let cls2='reviewBlock';
if(ActionSection)
{
    cls2='reviewBlock active';
}
else 
{
    cls1='codeBlock active';
}
const manageCoder=()=>{
    setActionSection(false);
}
const managereviewer=()=>{
    setActionSection(true);
}
    return (
        <div className="wrapper"> 
            <Header actiontoken={type} />
            <div className="container-fluid">
            <div className="content-page">
                <div className="content page_container">
                    <div className="container-fluid content_box" id="content_boxId"> 
                        <Row>
                            <Col lg={12}>
                                <div className="toggleSwitchButton">
                                    <div className="switchBox">
                                        <div onClick={manageCoder} className={cls1} id="codeBlock">Code</div>
                                        <div onClick={managereviewer} id="reviewBlock" className={cls2}>Review</div>
                                    </div>
                                    <div class="can-toggle" style={{'display':'none'}}>
                                        <input onChange={changeReportStatus} value="1" id="a" type="checkbox" />
                                        <label for="a">
                                            <div class="can-toggle__switch" data-checked="Review" data-unchecked="Code"></div>
                                        </label>
                                    </div>
                                </div>

                           
                                <Card>
                                    <CardBody>
                                        <Tabs selectedIndex={tabIndex} onSelect={index => saveChangeData(index)}>
                                            <TabList>
                                            <Tab id="t1"><span>Patient : Jack McEvoy</span></Tab>
                                            <Tab id="t2"><span>Documents</span></Tab>
                                            <Tab><span>Labs</span></Tab>
                                            </TabList>
                                            <TabPanel>
                                                <DischargeCode   data={padd_obj} />
                                            </TabPanel>
                                            <TabPanel>
                                                <ReportTab />
                                            </TabPanel>
                                            <TabPanel>
                                                <Labs id={id} />
                                            </TabPanel>
                                        </Tabs>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
};
export default DischargeSummar;
