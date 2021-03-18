import React, { Component,useState,useEffect } from 'react';
import ExecuteApi from '../ExecuteApi';
import ReportDetails from './ReportDetails';
import AuditorReportDetails from './AuditorReportDetails';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Spinner from '../Spinner';
const Parent = (props) => {
    const id=props.id.id;
    
    const type=props.id.type;
    const [reportdata, setData] = useState([]);
    useEffect(()=>{
        ExecuteApi('reports/?discharge__id='+id,'GET').then((resp)=>{
            setData(resp);
        });
		
    },[id]);
    const handleClick=(id)=>{
        var ele = document.getElementsByClassName("active_report_"+id);
       var value = ele[0].getAttribute('aria-expanded');
       // eslint-disable-next-line
        if(value == 'true'){
            
            localStorage.removeItem('openReportId');
        }else{
            
            localStorage.setItem('openReportId',id);
        }
        
    }
    function ReportDetailsTag(props)
    {
        if(type==='discharge')
            return <ReportDetails id={props.pass_obj} />;
        else 
            return <AuditorReportDetails id={props.pass_obj} />;
    }
    if(reportdata.length>0){
    localStorage.setItem('report_count',reportdata.length);
    return (
        <React.Fragment>
        <Accordion allowZeroExpanded>
             {reportdata && reportdata.map((item,index) => {
				
				 
						
             let report_class="mb-2 accordion__button active_report_"+item.id+" accordion_block_"+index;
             let pass_obj ={'id':id,'report_id':item.id,'session_id':props.id.disid,'annotations':props.id.selectedLabelAnnotation,label_id:props.id.label_id}
             let report_id_field='report_'+item.id;
             let className2="desc_"+index+" activedesc_"+item.id;
             let panel = "panel"+item.id;
            return(
                <React.Fragment>
                <AccordionItem key={index}>
                    <AccordionItemHeading onClick={()=>handleClick(item.id)}>
                        <AccordionItemButton  className={report_class} id={report_id_field}>
                        <div className="AccordionHeaderblock">
                            <div className="AccordionHeaderblock1"><b>CATEGORY</b></div>
                            <div className="AccordionHeaderblock2"> { item.category }
                            </div>
                        </div>
                        <div className="AccordionHeaderblock">
                            <div className="AccordionHeaderblock1"><b>DESCRIPTION</b></div>
                            <div className="AccordionHeaderblock2"> { item.description }</div>
                        </div>
                        <div className="AccordionHeaderblock">
                            <div className="AccordionHeaderblock1"><b>DATE</b></div>
                            <div className="AccordionHeaderblock2"> { item.chartdate }</div>
                        </div>
                        
                       
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel id={panel} className={className2} aria-labelledby={report_id_field}>
                        <ReportDetailsTag pass_obj={pass_obj} />
                    </AccordionItemPanel>
                </AccordionItem>
                <span id="ShowAuditorNotFoundMessage"></span>
                </React.Fragment>
            )})}
            
       
        </Accordion>
        </React.Fragment>
        
    );
    }
    else 
    {
        return (
            <div  className="col-lg-12 text-center pt-4" style={{marginTop:'180px'}}>
                <Spinner className="text-primary m-2" size='lg' />
            </div>
        );
    }

   
}
class Report2 extends Component {

  render() {
    return (
      <div>
         <Parent id={this.props.id} />
      </div>        
    );
  }
}
export default Report2;