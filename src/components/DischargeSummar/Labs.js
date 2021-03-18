import React, { Component,useState,useEffect } from 'react';
import ExecuteApi from '../ExecuteApi';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import classNames from 'classnames';
import List from './Labs/List';
const Parent = (props) => {
    let disid=props.id;
    const [LabTestsstate, setLabTestsState] = useState([]);
    const [Microbiologystate, setMicrobiologyState] = useState([]);
    const [lab, setLab] = useState(false);
    const [micro, setMicro] = useState(false);
    useEffect(()=>{
        ExecuteApi('labs?discharge__id='+disid,'GET').then((resp)=>{
          setLabTestsState(resp);
        });
        ExecuteApi('microbiology_reports?discharge__id='+disid,'GET').then((resp)=>{
            setMicrobiologyState(resp);
          });
    },[disid]);
    const formatAMPM =(date) => {
        date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var s = date.getSeconds();
        var strTime = hours + ':' + minutes + ':'+s+' '+ampm;
        return strTime;
      }
      const labTestColumns = [
        {
            dataField: 'category',
            text: 'Category',
            sort: true,
        },
        {
            dataField: 'label',
            text: 'Label',
            sort: true,
        },
        {
            dataField: 'fluid',
            text: 'Fluid',
            sort: false,
        },
        {
            dataField: 'loniccode',
            text: 'Cronic Code',
            sort: false,
        },
        {
            dataField: 'chartdate',
            text: 'Chart Date',
            sort: false,
        },
        {
            dataField: 'value',
            text: 'Value',
            sort: false,
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: false,
        }
    ];
    const labTestRecords = [];
    LabTestsstate && LabTestsstate.map((item,index) => {
        
        let help_btn='';
        if(item.flag==='Abnormal')
            help_btn=<i className="mdi mdi-help-rhombus-outline help_thumb_red"></i>;
            labTestRecords.push({category:item.category,label:item.label,fluid:item.fluid,loniccode : item.loniccode,chartdate: new Date(item.charttime).toLocaleDateString(),value : item.value,status: help_btn})
        return 1
    })

    const MicroTestColumns = [
        {
            dataField: 'chartdate',
            text: 'Chart Date',
            sort: true,
        },
        {
            dataField: 'charttime',
            text: 'Chart Time',
            sort: true,
        },
        {
            dataField: 'speclabel',
            text: 'Spec Label',
            sort: false,
        },
        {
            dataField: 'orgname',
            text: 'Org Name',
            sort: false,
        },
        {
            dataField: 'isolatenum',
            text: 'Isolate Num',
            sort: false,
        },
        {
            dataField: 'Antibacteriallabel',
            text: 'Antibacterial Label',
            sort: false,
        },
        {
            dataField: 'DilutionTest',
            text: 'Dilution Test',
            sort: false,
        },
        {
            dataField: 'DilutionComparison',
            text: 'Dilution Comparison',
            sort: false,
        },
        {
            dataField: 'DilutionValue',
            text: 'Dilution Value',
            sort: false,
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: false,
        }
    ];
    const MicroTestRecords = [];
    Microbiologystate && Microbiologystate.map((item,index) => {
        let help_btn='';
        if(item.interpretation==='S')
            help_btn=<i className="mdi mdi-help-rhombus-outline help_thumb_red"></i>;
            MicroTestRecords.push({chartdate:new Date(item.chartdate).toLocaleDateString(),charttime:formatAMPM(item.charttime),speclabel:item.spec_type_desc,orgname : item.org_name,isolatenum: item.isolate_num,Antibacteriallabel : item.ab_name,DilutionTest: item.dilution_text,DilutionComparison:item.dilution_comparison,DilutionValue:item.dilution_value,status:help_btn})

            return 1
    })
    return (
      <React.Fragment>
          
          <Accordion className="mt-4" allowZeroExpanded onChange={(e) => {  if(e && Number(e[0]) === 1){ setLab(true); setMicro(false); } else if(e && Number(e[0]) === 2){ setLab(true);setMicro(true); }else{ setLab(false);setMicro(false); } }}>
                    <AccordionItem uuid="1">
                        <AccordionItemHeading>
                            <AccordionItemButton  style={{outlineColor:'#e7effe', borderBottom: '1px solid '}}>
                            <i
                            className={classNames(
                                'uil',
                                { 'uil-angle-down': lab, 'uil-angle-right': !lab },
                                'font-18'
                            )}></i> Lab Tests
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <List columns={labTestColumns} records={labTestRecords}/>
                            
                        </AccordionItemPanel>
                    </AccordionItem>  
                    <AccordionItem className="mt-4" uuid="2">
                        <AccordionItemHeading>
                            <AccordionItemButton   style={{outlineColor:'#e7effe', borderBottom: '1px solid '}}> 
                            <i
                            className={classNames(
                                'uil',
                                { 'uil-angle-down': micro, 'uil-angle-right': !micro },
                                'font-18'
                            )}></i> Microbiology Tests
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <List columns={MicroTestColumns} records={MicroTestRecords}/>
                       
                        </AccordionItemPanel>
                    </AccordionItem>           
            </Accordion>
      </React.Fragment>
    );
}
class Labs extends Component {

  render() {
    return (
      <div>
         <Parent id={this.props.id} />
      </div>        
    );
  }
}
export default Labs;