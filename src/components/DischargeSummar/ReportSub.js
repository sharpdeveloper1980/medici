import React, { Component,useState,useEffect } from 'react';
import { Collapse  } from 'reactstrap';
import classNames from 'classnames';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import ReportDetails from './ReportDetails';
import AuditorReportDetails from './AuditorReportDetails';
import ReadReport from './ReadReport';

const Parent = (props) => {
    let disid=props.data.disid;
    const [collapse, setCollapse] = useState(true);
    
    const [preExpand, setpreExpand] = React.useState([parseInt(localStorage.getItem('openReportId'))]);
    
    const toggle = () => setCollapse(!collapse); 
    let type = props.data.type;
    useEffect(()=>{
        
        
        // eslint-disable-next-line
        if(localStorage.getItem('openReportId') != null){
            var id = localStorage.getItem('openReportId');
           
            let ids = [];
            ids.push(parseInt(id));
            setpreExpand(ids);
            
        }
    },[disid]);
        
    
    
    function ReportDetailsTag(props)
    {
        if(type)
            return <AuditorReportDetails id={props.pass_obj}/>;
        else 
            return <ReportDetails id={props.pass_obj}  />;
    }
    let colId= 'col1_'+props.data.index;
    let colId1= 'col2_'+props.data.index;
    
     
    return (
        <React.Fragment>
            
             
            <br />
                <span id={colId1} className="text-dark"  onClick={toggle}>
                    <h5 className="m-0 pb-2" style={{'borderBottom': '1px solid'}}>
                        <i
                            className={classNames(
                                'uil',
                                { 'uil-angle-down': collapse, 'uil-angle-right': !collapse },
                                'font-18'
                            )}></i>
                        {props.data.title}
                    </h5>
                </span> 

                <Collapse id={colId} className="CollapseBlock" isOpen={collapse}>
                    { preExpand && 
                    <Accordion allowZeroExpanded preExpanded={preExpand}>
                        {props.data.data && props.data.data.map((item,index) => {
                            
                        let str='';
                        
                        
                        if(item.category===props.data.title) {                
                        let report_class="accordion__button active_report_"+item.id+" accordion_block_"+index;
                        let pass_obj ={'id':props.data.id,'report_id':item.id,'session_id':props.data.disid,'annotations':props.data.selectedLabelAnnotation,label_id:props.data.label_id}
                        let report_id_field='report_'+item.id;
                        let desp = 'desp_report'+item.id;
                        let uuid = item.id;
                        str=
                            <React.Fragment>
                               {/* { checked } */}
                                <ReadReport disid={disid} id={item.id} labelid={props.data.categoryId} reports={props.data.reports}/>
                            <AccordionItem key={index} id={report_id_field} uuid={uuid}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={report_class} id={report_id_field}>
                                    <div> </div>
                                    <div className="row">
                                        <div className="col-sm-8"> <b>{ item.description }</b></div>
                                        <div className="col-sm-4 text-right">
                                            <div className="row">
                                            <div className="col-sm-11">
                                                { item.chartdate } 
                                            </div>
                                            <div className="col-sm-1" style={{'paddingTop':'2px'}}>
                                            
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    </AccordionItemButton>
                                    
                                </AccordionItemHeading>
                                <AccordionItemPanel className={desp} aria-labelledby={report_id_field}>
                                    <ReportDetailsTag pass_obj={pass_obj} />
                                </AccordionItemPanel>
                            </AccordionItem>
                            </React.Fragment>
                                 } return str; })}
                    </Accordion> }
                </Collapse>
        </React.Fragment>
        
    );
    
}
class ReportSub extends Component {
    render() {
        return (
        <div>
            <Parent data={this.props.data} />
        </div>        
        );
    }
}
export default ReportSub;