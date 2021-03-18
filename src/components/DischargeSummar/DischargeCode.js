import React, { Component,useState,useEffect } from 'react';
import ExecuteApi from '../ExecuteApi';
import { Row,Col,Card,CardBody,CardHeader,Button,Label,UncontrolledPopover,Input , PopoverBody } from 'reactstrap';
import { ReactSortable } from "react-sortablejs";
import {useHistory} from "react-router-dom";
import Spinner from '../Spinner';
import { makeStyles } from '@material-ui/core/styles';
import TabularList from './TabularList';
import ProcedureModal from './ProcedureModal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import SimpleBar from 'simplebar-react';
import '../../assets/scss/annotation.scss';
import $ from 'jquery';
import parse from 'html-react-parser';
import Checkbox from './checkbox';
var  Modal= require('react-bootstrap').Modal;

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 800,
      fontSize:10,
    },
  });
  let diags=[];  
 
  const Parent = (props) => {
    
    
   
    const classes = useStyles();
    const [stateId, setStateId] = useState([]);
    const [digCheck, setdigCheck] = useState([]);
    const [stateId1, setStateId1] = useState([]);
    const [state, setState] = useState([]);
    const [state1, setState1] = useState([]);
    const [chronic, setchronic] = useState([]);
    const [pprocedure, setpprocedure] = useState([]);
    const [sprocedure, setsprocedure] = useState([]);
    const [notestate, setNotes] = useState({'status':0});
    const [notetextstate, setNotestext] = useState('');
    const [show, setShow] = useState(false);
    const [done, setDone] = useState(false);   
    const [CheckPopupState, setCheckPopupState] = useState(false);  
    const [isIcdDrg, setisIcdDrg] = useState(false);      
    const [diagnosisList, setDiagnosisList] = useState([]);
    const [procedureList, setProcedureList] = useState([]);
    const [cronicList, setCronicList] = useState([]);
    const [icdDrg, setIcdDrg] = useState([]);
    const [DrgCheckPopupTitle, setDrgCheckPopupTitle] = useState('');
    const [DrgCheckPopupTag, setDrgCheckPopupTag] = useState('');
    const [DrgCheckPopupMessage, setDrgCheckPopupMessage] = useState([]);
    const [
        DrgCheckPopuprightData, SetDrgCheckPopuprightData] = useState({'desc':'','cfirst':'','useACode':'','excludes1':'','excludes2':'','codeAlso':''});
    const [innerModel, setinnerModel] = useState(false);
    const [secondPopupRightData, setSecondPopupRightData] = useState([]);
    const [innerModelconfirm, setinnerModelconfirm] = useState(false);
    const [modal, setModal] = useState(false);
    const [stateprocedureModal,setStateProcedureModal] = useState(false);
    const [removeCode, setRemoveCode] = useState(false);
    const [labelid,setLabelId] = useState('');
    const [labelname,setLabelName] = useState('');
    const [moreinfoState, setmoreinfoState] = React.useState(false);
    const [expanded1, setExpanded1] = React.useState(false);
    const [labeltype,setLabeltype] = React.useState('');
   
    // eslint-disable-next-line
    const [ICDDesc, setICDDesc] = useState([]);
    const [ICTag, setICTag] = useState([]);
    // eslint-disable-next-line
    const [ICDStatus, setICDStatus] = useState([]);
    const [DiagsInformation, setDiagsInformation] = useState([]);
    const [SectionInformation, setSectionInformation] = useState([]);
    
    const [expanded, setExpanded] = React.useState(["1"]);
    const [selected, setSelected] = React.useState([]);

    const [expanded11, setExpanded11] = React.useState(["1"]);
    const [selected11, setSelected11] = React.useState([]);
    const [IcdSaveOppStatus, setIcdSaveOppStatus] = React.useState(1);
    
    let disid=props.data.disid;
    const [dischargesummarydata, setData] = useState([]);
    
    const location1 = useHistory(); 
    
    const handleToggle11 = (event, nodeIds) => {
        setExpanded11(nodeIds);
    };
    const handleSelect11 = (event, nodeIds) => {
        setSelected11(nodeIds);
    };
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };
    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    useEffect(()=>{
        
        
            
            let primary_diagnosis =[];
            let secondary_diagnosis =[];
            let primary_procedure = [];
            let secondary_procedure = [];
            let chronic_arr =[];
            ExecuteApi('coder_sessions/'+disid,'GET').then((resp)=>{
                setData(resp);
                if(resp) {
                    if(resp.note)
                    {
                        setNotestext(resp.note);
                        setNotes({'status':1});    
                    }
                    let minLabelPriority1='';
                    let minLabelPriority2='';
                    resp.coder_discharge_labels && resp.coder_discharge_labels.map((item)=>{
                        if(item.status === 2) {
                            if(item.label_type===1)
                            {
                                if(minLabelPriority1==='')
                                {
                                    if(item.status!==3) {
                                        minLabelPriority1=item.label_priority;
                                    }
                                }
                                else if(item.label_priority<minLabelPriority1)
                                {
                                    if(item.status!==3) {
                                        minLabelPriority1=item.label_priority;
                                    }
                                }
                            }

                            if(item.label_type===2)
                            {
                                if(!minLabelPriority2)
                                {
                                    if(item.status!==3) {
                                        minLabelPriority2=item.label_priority;
                                    }
                                }
                                else if(item.label_priority<minLabelPriority2)
                                {
                                    if(item.status!==3) {
                                        minLabelPriority2=item.label_priority;
                                    }
                                }
                            }
                        }
                            return 0;
                    });
                    let dList=[];
                    let pList=[];
                    let cList=[];
                    let diagList =[];
                    resp.coder_discharge_labels && resp.coder_discharge_labels.map((item,index) => {
                        if(item.status === 2) {
                        if(item.label_type===1) {
                            if(item.label_priority===minLabelPriority1) {
                                let obj = {id:item.id,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc,'label_type':item.label_type};
                                primary_diagnosis.push(obj);
                                setStateId(item.id);
                                diagList.push({ "diag": item.diag.name });
                            
                            }
                            if(item.label_priority!==minLabelPriority1) {
                                diagList.push({ "diag": item.diag.name });
                                let obj = {id:item.id,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'label_priority':item.label_priority,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc,'label_type':item.label_type};
                                secondary_diagnosis.push(obj);
                            
                            }
                            dList.push(item.diag.name);
                        }
                        if(item.label_type===3) {
                            let obj = {id:item.id,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc,'label_type':item.label_type};
                            chronic_arr.push(obj);
                        
                                cList.push(item.diag.name);
                        }
                        if(item.label_type===2) {
                            if(item.label_priority===minLabelPriority2) {
                                setStateId1(item.id);
                            diagList.push({ "diag": item.proc.name });
                                let obj = {id:item.id,'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc,'label_type':item.label_type };
                                primary_procedure.push(obj);
                            
                            }
                            if(item.label_priority!==minLabelPriority2) {
                            diagList.push({ "diag": item.proc.name });
                                let obj = {id:item.id,'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc,'label_type':item.label_type};
                                secondary_procedure.push(obj);
                                
                            }
                            pList.push(item.proc.name);
                        }
                    } 
                
                    
                    return 0; } );
                    if(resp.coder_discharge_labels.length === 0){
                        setisIcdDrg(true);
                    }
                    if(resp.coder_discharge_labels)
                    {
                        let json = {
                            "drg_version": "V10",
                            "diags": dList,
                            "procs": pList,
                            "cccs": cList
                        };
                        ExecuteApi('icd/drg/' ,'POST','',json).then((resp)=>{
                            setIcdDrg(resp);
                            setisIcdDrg(true);
                        });
                    }
                    if(diagList)
                    {
                        
                        ExecuteApi('icd/diag-check/' ,'POST','',diagList).then((resp)=>{
                        
                            setdigCheck(resp);
                        
                        });
                    } 
                    if(dList) {
                        setDiagnosisList(dList);
                    }
                    if(pList) {
                        setProcedureList(pList);
                    }
                    if(cList) {
                        setCronicList(cList);
                    }
                    if(primary_diagnosis) {
                        setState(primary_diagnosis);
                    }
                    if(secondary_diagnosis) {
                        setState1(secondary_diagnosis);
                    }
                    if(chronic_arr) {
                        setchronic(chronic_arr);   
                    }
                    if(primary_procedure)
                    {
                        setpprocedure(primary_procedure);
                    }
                    if(secondary_procedure)
                    {
                        setsprocedure(secondary_procedure);
                    }    
                }
            });
        
            
        
    },[disid]); 
    
    
    const reCallAPi = () =>{
        let primary_diagnosis =[];
        let secondary_diagnosis =[];
        let primary_procedure = [];
        let secondary_procedure = [];
        let chronic_arr =[];
        ExecuteApi('coder_sessions/'+disid,'GET').then((resp)=>{
            setData(resp);
            if(resp) {
                if(resp.note)
                {
                    setNotestext(resp.note);
                    setNotes({'status':1});    
                }
                let minLabelPriority1='';
                let minLabelPriority2='';
                resp.coder_discharge_labels && resp.coder_discharge_labels.map((item)=>{
                    if(item.status === 2) {
                        if(item.label_type===1)
                        {
                            if(minLabelPriority1==='')
                            {
                                if(item.status!==3) {
                                    minLabelPriority1=item.label_priority;
                                }
                            }
                            else if(item.label_priority<minLabelPriority1)
                            {
                                if(item.status!==3) {
                                    minLabelPriority1=item.label_priority;
                                }
                            }
                        }

                        if(item.label_type===2)
                        {
                            if(!minLabelPriority2)
                            {
                                if(item.status!==3) {
                                    minLabelPriority2=item.label_priority;
                                }
                            }
                            else if(item.label_priority<minLabelPriority2)
                            {
                                if(item.status!==3) {
                                    minLabelPriority2=item.label_priority;
                                }
                            }
                        }
                    }
                        return 0;
                });
                let dList=[];
                let pList=[];
                let cList=[];
                let diagList =[];
                resp.coder_discharge_labels && resp.coder_discharge_labels.map((item,index) => {
                    if(item.status === 2) {
                    if(item.label_type===1) {
                        if(item.label_priority===minLabelPriority1) {
                            let obj = {id:item.id,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':''};
                            primary_diagnosis.push(obj);
                            setStateId(item.id);
                            diagList.push({ "diag": item.diag.name });
                          
                        }
                        if(item.label_priority!==minLabelPriority1) {
                            diagList.push({ "diag": item.diag.name });
                            let obj = {id:item.id,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'label_priority':item.label_priority,'status':item.status,'cof':item.cof,'check':''};
                            secondary_diagnosis.push(obj);
                           
                        }
                        dList.push(item.diag.name);
                    }
                    if(item.label_type===3) {
                        let obj = {id:item.id,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':''};
                        chronic_arr.push(obj);
                       
                            cList.push(item.diag.name);
                    }
                    if(item.label_type===2) {
                        if(item.label_priority===minLabelPriority2) {
                            setStateId1(item.id);
                            diagList.push({ "diag": item.proc.name });
                            let obj = {id:item.id,'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc};
                            primary_procedure.push(obj);
                         
                        }
                        if(item.label_priority!==minLabelPriority2) {
                            diagList.push({ "diag": item.proc.name });
                            let obj = {id:item.id,'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'cof':item.cof,'check':'','num_proc' : item.num_proc};
                            secondary_procedure.push(obj);
                           
                        }
                        pList.push(item.proc.name);
                    }
                } 
                
                
                return 0; } );
                if(resp.coder_discharge_labels.length === 0){
                    setisIcdDrg(true);
                }
                if(resp.coder_discharge_labels)
                {
                    let json = {
                        "drg_version": "V10",
                        "diags": dList,
                        "procs": pList,
                        "cccs": cList
                    };
                    ExecuteApi('icd/drg/' ,'POST','',json).then((resp)=>{
                        setIcdDrg(resp);
                        setisIcdDrg(true);
                    });
                } 
                if(diagList)
                {
                    
                    ExecuteApi('icd/diag-check/' ,'POST','',diagList).then((resp)=>{
                       
                        setdigCheck(resp);
                        
                    });
                } 
                if(dList) {
                    setDiagnosisList(dList);
                }
                if(pList) {
                    setProcedureList(pList);
                }
                if(cList) {
                    setCronicList(cList);
                }
                if(primary_diagnosis) {
                    setState(primary_diagnosis);
                }
                if(secondary_diagnosis) {
                    setState1(secondary_diagnosis);
                }
                if(chronic_arr) {
                    setchronic(chronic_arr);   
                }
                if(primary_procedure)
                {
                    setpprocedure(primary_procedure);
                }
                if(secondary_procedure)
                {
                    setsprocedure(secondary_procedure);
                }    
            }
        });
    }
    const toggleConfirmModel = () =>{
        var element = document.querySelector('.details_error');
        if(element) {
            if(innerModelconfirm===true)
                element.style.setProperty('z-index', '10000', 'important');
            else 
                element.style.setProperty('z-index', '1000', 'important');
        }
        setinnerModelconfirm(!innerModelconfirm);
    }
    const toggleModal = () => {
        setModal(!modal);
    }
    const toggleProcedureModal = () => {
        setStateProcedureModal(!stateprocedureModal);
    }
    const addICDCode = (code, cof,label_type) => {
       // eslint-disable-next-line
        if(label_type == 1){
            let json = {
                "status": 2,
                "label_type" : 1,
                "discharge": props.data.id,
                "coder_session": props.data.disid,
                "diag": {
                    "name": code
                },
                cof : cof,
                seventh_char:"",
                reviewed: true
            };

            ExecuteApi('coder_discharge_labels/', 'POST', '', json).then((resp) => {
                setModal(!modal);
                reCallAPi();
            });
            // eslint-disable-next-line
        }else if(label_type == 2){
            let json = {
                "status": 2,
                "label_type" : 2,
                "discharge": props.data.id,
                "coder_session": props.data.disid,
                "proc": {
                    "name": code
                },
                cof : cof,
                num_proc : 1,
                seventh_char:"",
                reviewed: true
                
            };

            ExecuteApi('coder_discharge_labels/', 'POST', '', json).then((resp) => {
                setStateProcedureModal(!stateprocedureModal);
                reCallAPi();
            });
        }
    }
    const openRemoveCodeModel=(id,name)=>{
        setRemoveCode(!removeCode);
        setLabelId(id);
        setLabelName(name);

    }
    const removeCodeLabel=()=>{
        ExecuteApi('coder_discharge_labels/'+labelid, 'DELETE', '','').then((resp) => {
            setRemoveCode(!removeCode);
            setLabelId('');
            setLabelName('');
            reCallAPi();
        });
    }
    const toggleTabularListInner=()=>{
        if(innerModel)
        {
          setCheckPopupState(true);
          setSectionInformation([]);
          setinnerModel(false);
        }
        else 
        {
          setCheckPopupState(false);
          setinnerModel(true);
        }
    }
    const handleClose = () => { 
        if(localStorage.getItem('tab_index'))
        {
            //props.data.openTab();
        }
        setShow(false);
        props.data.setChangeState(false);
        localStorage.removeItem('ischanged'); 
    }
    const handleDoneClose = ()=>{
        setDone(false);
    }
    const handleShow = () => {  setShow(true); }
    const handleDoneShow = () =>  {  setDone(true); }
    // if(dischargesummarydata)
    // {
    //    // notes=dischargesummarydata.note;
    //    setNotestext(dischargesummarydata.note);
    // }
        function AdmissionID() {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return dischargesummarydata.discharge.hadm_id;
                }
            }
            else {
            return 0;
            }
        }
        function AdmissionDate() {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return new Date(dischargesummarydata.discharge.admittime).toLocaleDateString();
                }
            }
            else {
            return 0;
            }
        }
        function AdmissionTime() {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return dischargesummarydata.discharge.admittime.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1");
                    
                }
            }
            else {
            return 0;
            }
        }
        function DischargeDate()
        {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return new Date(dischargesummarydata.discharge.dischtime).toLocaleDateString();
            
                }
            }
            else {
            return 0;
            }
        }
        function DischargeTime()
        {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return dischargesummarydata.discharge.dischtime.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1");
            
                }
            }
            else {
            return 0;
            }
        }
        function Speciality()
        {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return dischargesummarydata.discharge.admission_type;
                }
            }
            else {
            return 0;
            }
        }
        function PatientID()
        {
            if (dischargesummarydata.length!==0) {
                if(!dischargesummarydata.discharge)
                {
                    location1.push('/discharges/'+props.data.type);
                }
                else 
                {
                    return dischargesummarydata.discharge.patient.subject_id;
                }
            }
            else {
            return 0;
            }
        }
        
        const changeTagLavelStatus=event=>{ 
            setNotes({'status':2});
           
        }
        const saveNotes=(param)=>{
         
           
       
        let final_order=[];
        let i=0;
        state.map((item)=>{
            final_order.push({'id':item.label_id,'label_priority':i,'label_type':1});
            i++;
            return '';
        });
        state1.map((item)=>{
            final_order.push({'id':item.label_id,'label_priority':i,'label_type':1});
            i++;
            return '';
        });
        pprocedure.map((item)=>{
            final_order.push({'id':item.label_id,'label_priority':i,'label_type':2});
            i++;
            return '';
        });
        sprocedure.map((item)=>{
            final_order.push({'id':item.label_id,'label_priority':i,'label_type':2});
            i++;
            return '';
        });
        chronic.map((item)=>{
            final_order.push({'id':item.label_id,'label_priority':i,'label_type':3});
            i++;
            return '';
        });
        let json = {};
        if(param == 1){
            json={
                "note": notetextstate,
                "done": true,
                "coder_discharge_labels":final_order
            };
        }else{
            json={
                "note": notetextstate,
                "done": dischargesummarydata.done,
                "coder_discharge_labels":final_order
            };
        }
        
        
        ExecuteApi('coder_sessions/'+disid,'PATCH','',json).then((resp)=>{
            setNotes({'status':1});
            
        });

        let diags = [];
        let procs = [];
        let diagList = [];
        state.map((item)=>{
            diagList.push({ "diag": item.name });
            diags.push(item.name);
            i++;
            return '';
        }); 
        state1.map((item)=>{
            diagList.push({ "diag": item.name });
            diags.push(item.name);
            i++;
            return '';
        }); 
        pprocedure.map((item)=>{
            diagList.push({ "diag": item.name });
            procs.push(item.name);
            i++;
            return '';
        }); 
        sprocedure.map((item)=>{
            diagList.push({ "diag": item.name });
            procs.push(item.name);
            i++;
            return '';
        });
        let json_drg = {
            "drg_version": "V10.0",
            "diags": diags,
            "procs": procs,
            "cccs": []
        };
        ExecuteApi('icd/drg/' ,'POST','',json_drg).then((resp)=>{
            setIcdDrg(resp);
            setisIcdDrg(true);
            localStorage.removeItem('ischanged');
            props.data.setChangeState(false);
            if(diagList){
                ExecuteApi('icd/diag-check/' ,'POST','',diagList).then((resp)=>{
                    setdigCheck(resp);
                });
            }
            if(param == 1){
                location1.push('/discharges/discharge');
            }
            
        });
        
        setShow(false);
            // if(tab_index) {
            //     props.data.openTab();   
            // }
              
        }
           
    if(Object.keys(state).length>1)
    {
        //props.data.setChangeState(true);
        let data=state1;
        state.map((item)=>{
            if(stateId===item.label_id)
            {
                data.push(item);
                setState1(data);
            }
            else 
            {
                setState([item]);
                setStateId(item.label_id);
            }
            return 0;
        });
      
    }
    if(Object.keys(pprocedure).length>1)
    {
        //props.data.setChangeState(true);
        let data1=sprocedure;
        pprocedure.map((item)=>{
            if(stateId1===item.label_id)
            {
                data1.push(item);
                setsprocedure(data1);
            }
            else 
            {
                setpprocedure([item]);
                setStateId1(item.label_id);
            }
            return 0;
        }); 
    }
    const cofFlag=(e) =>{
        
        let id=e.target.dataset.flag;
        
            if(document.getElementById("popovertop"+id)) {
                document.getElementById("popovertop"+id).click();
            }
    }
    const setLableFlag=(newState,id,newStatus,callBack,type) =>{
        newState.map((item,index)=>{
            if(Number(item.label_id)===Number(id))
            {
                // eslint-disable-next-line
                if(type ==1){
                    newState[index].cof=newStatus;
                    callBack(newState);
                    var elem = document.querySelector('#label_'+id);
                    if(newStatus===true)
                    {
                        if(elem)
                            elem.style.display = 'inherit';
                    }
                    else 
                    {
                        if(elem)
                            elem.style.display = 'none';
                    }
                }
                // eslint-disable-next-line
                else if(type == 2){
                    // newState[index].num_proc=newStatus;
                    

                }
                
            }
            return 1;
        })
    }
    const cofFlagOperation = (e) =>{
        let id = e.target.dataset.id;
        let status = '';
        let type = e.target.dataset.type;
        let newStatus = false;
        let num_proc = $('#label_'+id).text();
        let json ={};
        
        
        // eslint-disable-next-line
        if(type == 1 || type == 3){
            status = e.target.dataset.status;
           
            json = {'cof': status};
        }
        // eslint-disable-next-line 
        else if(type == 2){
            // eslint-disable-next-line 
            if(e.target.dataset.operation == 'plus'){
                num_proc = Number(num_proc)+1;
                // eslint-disable-next-line 
            }else if(e.target.dataset.operation == 'minus'){
                num_proc = Number(num_proc)-1;
            }
            
            json = {'num_proc' : num_proc};
        }
        if(status==='true')
        {
            newStatus=true;
        }
        if(document.getElementById("popovertop"+id)) {
            document.getElementById("popovertop"+id).click();
        }
        ExecuteApi('coder_discharge_labels/'+id,'PATCH','',json).then((resp)=>{ 
            // eslint-disable-next-line
            if(type==1)
            {
                
                reCallAPi();
               
            }
            // eslint-disable-next-line
            else if(type=='12')
            {
                let newState = state1;
                
                setLableFlag(newState,id,newStatus,setState1,type);
            }
             // eslint-disable-next-line
            else if(type==2)
            {
                let newState = pprocedure;
                reCallAPi();
                setLableFlag(newState,id,num_proc,setpprocedure,type);
            }
            // eslint-disable-next-line
            else if(type=='22')
            {
                let newState = sprocedure;
                setLableFlag(newState,id,newStatus,setsprocedure,type);
            }
            // eslint-disable-next-line
            else if(type=='3')
            {
                let newState = chronic;
                setLableFlag(newState,id,newStatus,setchronic,type);
            }
        });
    }
  
    if(Object.keys(dischargesummarydata).length !== 0 && isIcdDrg){
        if(!dischargesummarydata.discharge)
        {
            location1.push('/discharges/'+props.data.type);
        }
          
    function SetNWAU()
    {
        if(icdDrg.length!==0) {
            if(icdDrg.nwau){
                return icdDrg.nwau;
            }
            else 
            {
                return 'N/A';
            } 
        }
        else { 
            return 'N/A';
        }
    }
    function SetDrg()
    {
        if(icdDrg.length!==0) {
            if(icdDrg.drg) {
                return icdDrg.drg; 
            }
            else 
            {
                return 'N/A';
            }
        }
        else {
            return 'N/A';
        }
    }
    function Setnep20()
    {
        if(icdDrg.length!==0) {
            if(icdDrg.nep20) {
                return icdDrg.nep20; 
            }
            else 
            {
                return 'N/A';
            }
        }
        else {
            return 'N/A';
        }
    }
    const changeDrgVersion = (e) =>{
        let json = {
            "drg_version": 'v10',
            "diags": diagnosisList,
            "procs": procedureList,
            "cccs": cronicList
        };
        ExecuteApi('icd/drg/' ,'POST','',json).then((resp)=>{
            setIcdDrg(resp);
        });
    }
    function procedureErrorMessage(tag){
        let error_code = tag.split(',');
        if(error_code[0]==='Error: Excludes1')
        {
            let v =error_code.map((item, i)=>{
                if(i != 0){
                    return(
                        <span style={{lineHeight:'0.5'}} data-tag={item} onClick={manageKeyword} className='pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode'>{ item }</span> 
                    )
                }
           });
            
            
            return({'data' : 	
            <React.Fragment>	
                <b>Excludes1</b> : Cannot co-occur with code {v}. Click <span data-index="5" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to see Exclude rules.	
                rules	
            </React.Fragment>, 'errorCode' : 1});
        }
        else if(error_code[0]==='Error: AdditionalCode')  
        {
            return({'data' : <React.Fragment><b>AdditionalCode :</b> Additional codes must be
                coded. Click <span data-index="3" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to see Additional Code
                rules</React.Fragment>, 'errorCode' : 5});
        }
        else if(error_code[0]==='Error: CodeFirst')  
        {
            return({'data' : <React.Fragment><b>CodeFirst :</b> Another intervention codes must be coded first.
                Click <span data-index="2" onClick={openDropDown} className="seeLinkErrorWarning">here</span> see Code first rules.</React.Fragment>, 'errorCode' : 4});
        }
        else if(error_code[0]==='Error: CodeAlso')  
        {
            return({'data' :<React.Fragment><b>CodeAlso :</b> Additional codes must be coded to fully
                describe the condition. Click <span data-index="4" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to
                show Code Also rules.</React.Fragment>, 'errorCode' : 3});
        }
        else if(error_code[0]==='Error: CodeAlsoWhenPerf'){
            return({'data' : <React.Fragment><b>CodeAlsoWhenPerf :</b> Additional codes must be coded to fully
            describe the interventions. Click <span data-index="4" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to
            see code also when performed rules.</React.Fragment>, 'errorCode' : 6});
        }
        else if(error_code[0]==='Warning: Excludes1')
        {
            return({'data' : 
            <React.Fragment>	
                <b>Excludes1</b> : Click <span data-index="5" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to see Exclude rules.	
                rules	
            </React.Fragment>, 'errorCode' : 1});
        }
        else if(error_code[0]==='Warning: AdditionalCode')  
        {
            return({'data' : <React.Fragment><b>AdditionalCode :</b> Additional interventions may need to be coded. Click <span data-index="3" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to see Additional
                Code rules.</React.Fragment>, 'errorCode' : 5});
        }
        else if(error_code[0]==='Warning: CodeFirst')  
        {
            return({'data' : <React.Fragment><b>CodeFirst :</b> 
            Another intervention, in applicable, may need to be coded first. Click <span data-index="2" 
            onClick={openDropDown} className="seeLinkErrorWarning">here</span> 
            see Code first rules.</React.Fragment>, 'errorCode' : 4});
        }
        else if(error_code[0]==='Warning: CodeAlso')  
        {
            return({'data' : <React.Fragment><b>CodeAlso :</b> Additional codes, if applicable, may be needed to fully describe the interventions. Click <span data-index="4" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to show Code Also rules</React.Fragment>, 'errorCode' : 3});
        }
        else if(error_code[0]==='Warning: CodeAlsoWhenPerf'){
            return({'data' : <React.Fragment><b>CodeAlsoWhenPerf :</b> Additional interventions, if performed, must be
            coded to fully describe the interventions. Click <span data-index="4" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to see Code also when performed rules</React.Fragment>, 'errorCode' : 6});
        }
        
    }
    function getErrorMessage(tag){
        let error_code = tag.split(',');
        if(error_code[0]==='Error: Excludes1')
        {
            
           let v =error_code.map((item, i)=>{
                if(i != 0){
                    return(
                        <span style={{lineHeight:'0.5'}} data-tag={item} onClick={manageKeyword} className='pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode'>{ item }</span> 
                    )
                }
           });
           
            return({'data' : 
            <React.Fragment>
                <b>Excludes1</b> : Cannot co-occur with code {v}. Click <span data-index="5" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to see Exclude rules.
            </React.Fragment>, 'errorCode' : 1}	
            );
        }
        else if(error_code[0]==='Error: AdditionalCode')  
        {
            return({'data' : <React.Fragment><b>AdditionalCode :</b> Additional codes must be
                coded. Click <span data-index="3" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to see Additional Code
                rules</React.Fragment>, 'errorCode' : 5});
        }
        else if(error_code[0]==='Error: CodeFirst')  
        {
            return({'data' : <React.Fragment><b>CodeFirst :</b> Underlying etiology must be coded first.
                Click <span data-index="2" onClick={openDropDown} className="seeLinkErrorWarning">here</span> see Code first rules.</React.Fragment>, 'errorCode' : 4});
        }
        else if(error_code[0]==='Error: CodeAlso')  
        {
            return({'data' :<React.Fragment><b>CodeAlso :</b> Additional codes must be coded to fully
                describe the condition. Click <span data-index="4" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to
                show Code Also rules.</React.Fragment>, 'errorCode' : 3});
        }
        else if(error_code[0]==='Warning: Excludes1')
        {
            return({'data' : <React.Fragment><b>Excludes1</b> : Click <span data-index="5" onClick={openDropDown} className="seeLinkErrorWarning">here</span> to see Exclude rules.</React.Fragment>, 'errorCode' : 1});
        }
        else if(error_code[0]==='Warning: AdditionalCode')  
        {
            return({'data' : <React.Fragment><b>AdditionalCode :</b> Additional codes may be required. Click <span data-index="3" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to see Additional
                Code rules.</React.Fragment>, 'errorCode' : 5});
        }
        else if(error_code[0]==='Warning: CodeFirst')  
        {
            return({'data' : <React.Fragment><b>CodeFirst :</b> Underlying etiology, if applicable, must be
                coded first. Click <span data-index="2" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  see Code first
                rules.</React.Fragment>, 'errorCode' : 4});
        }
        else if(error_code[0]==='Warning: CodeAlso')  
        {
            return({'data' : <React.Fragment><b>CodeAlso :</b> Additional codes, if applicable, must be
                coded to fully describe the condition. Click <span data-index="4" onClick={openDropDown} className="seeLinkErrorWarning">here</span>  to show Code Also rules</React.Fragment>, 'errorCode' : 3});
        }
        

    }
    const openDropDown = (e) =>{
        setExpanded(["1",e.target.dataset.index]);
    }
    const showButton = (item) => {
      
        let new_item = item.replaceAll("<link>", "<diag>").replaceAll("</link>", "</diag>")
           
            return parse(new_item,{
                replace : domNode=>{
                    if(domNode.name == 'diag'){
                    return <span></span>
                    }
                    if(domNode.name == 'code_text'){
                        let code = domNode.next.children[0].data;
                        return <span style={{lineHeight:'0.5'}} data-tag={code} onClick={manageKeyword} className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{domNode.children[0].data}</span>
                    }
                }
            });
    }
    const showButtonProcedure = (item) => {
        return parse(item,{
            replace : domNode=>{
                if(domNode.name == 'proc'){
                    let code_text = domNode.prev.children[0].data
                    return <span style={{lineHeight:'0.5'}} data-tag={domNode.firstChild.data} onClick={manageKeyword} className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{code_text}</span>
                }
                if(domNode.name == 'block'){
                    let code_text = domNode.prev.children[0].data
                    return <span style={{lineHeight:'0.5'}}  data-tag={domNode.firstChild.data} onClick={manageKeyword} className="pt-1 pl-1 pr-1 pb-1 badge block_css">{code_text}</span>
                }
                if(domNode.name == 'text')
                    return <span></span>
            }
        });
      
    }
    const getParsedString = (s) => {
        if ((typeof s === 'string' || s instanceof String)) {
            return parse(s)
        }
        else {
            return null
        }
    }
    const getParsedNote = (s) => {
        if ((typeof s === 'string' || s instanceof String)) {
            return parse("<b><em>Notes: </em></b>" + s)
        }
        else {
            return null
        }
    }
    const showButtonSecondPopup = (item,desc,id) => {
       
         let new_item = item.replaceAll("<link>", "<diag>").replaceAll("</link>", "</diag>")
           
            return parse(new_item,{
                replace : domNode=>{
                    if(domNode.name == 'diag'){
                    return <span></span>
                    }
                    if(domNode.name == 'code_text'){
                        let code = domNode.next.children[0].data;
                        return <span style={{lineHeight:'0.5'}}  data-tag={code} onClick={()=>setKeyword(code,id,desc)} className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{domNode.children[0].data}</span>
                    }
                }
            });
    }
    const showButtonProcedureSecondPopup = (item,desc,id) => {
       
        return parse(item,{
            replace : domNode=>{
                if(domNode.name == 'proc'){
                    let code_text = domNode.prev.children[0].data
                    return <span style={{lineHeight:'0.5'}} data-tag={domNode.firstChild.data} onClick={()=>setKeyword(code_text,id,desc)} className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{code_text}</span>
                }
                if(domNode.name == 'block'){
                    let code_text = domNode.prev.children[0].data
                    return <span style={{lineHeight:'0.5'}}  data-tag={domNode.firstChild.data} onClick={()=>setKeyword(code_text,id,desc)}  className="pt-1 pl-1 pr-1 pb-1 badge block_css">{code_text}</span>
                }
                if(domNode.name == 'text')
                    return <span></span>
            }
        });
   }
    const manageKeyword = (e) =>{
        setICTag(e.target.dataset.tag);
        localStorage.setItem('currentdiag',e.target.dataset.tag);
        ExecuteApi('icd/diags/?name='+e.target.dataset.tag,'GET').then((resp)=>{
            if(resp.length>0) {
                setICDDesc(resp[0].desc);
                setICDStatus(resp[0].billable);
                ExecuteApi('icd/sections/'+resp[0].section,'GET').then((sectionsResp)=>{ 
                    setSectionInformation(sectionsResp);
                });
               setDiagsInformation(resp[0]);
               setSecondPopupRightData([]);
               showRightInfo(resp[0]);
               toggleTabularListInner();
           
               
            }
        });   
    }
    const openPopupdigCheck = (e) => {
        localStorage.setItem('currentSelectedICDCode',e.target.dataset.id);
        let json = JSON.parse(e.target.dataset.json);
        localStorage.setItem('currentdiag',json.diag);
        let messageArr = json.messages;
        let label_type = 1;	
        if (json.diag.charAt(0) <= '9' && json.diag.charAt(0) >= '0'){	
            label_type = 2;	
        }
        setLabeltype(label_type);
        if(messageArr)
        {
            // eslint-disable-next-line
            if(label_type == 1){
                let obj = [];
               
                messageArr.map((item)=>{
                    let errormessage = getErrorMessage(item);
                    errormessage.name = json.diag;
                    obj.push(errormessage);
                    return 1;
                });
                setDrgCheckPopupMessage(obj);
                // eslint-disable-next-line
            }else if(label_type == 2){
                let obj = [];
               
                messageArr.map((item)=>{
                    let errormessage = procedureErrorMessage(item);
                    errormessage.name = json.diag;
                    obj.push(errormessage);
                    return 1;
                });
                setDrgCheckPopupMessage(obj);
            }
        }
        setDrgCheckPopupTag(json.diag);
        if(json.status===1)
            setDrgCheckPopupTitle('Error (s)');
        else if(json.status===2)
            setDrgCheckPopupTitle('Warning (s)');
        
        let url = 'icd/diags/?name='; 
        if (json.diag.charAt(0) <= '9' && json.diag.charAt(0) >= '0'){
            url = 'icd/procs/?name=' 
        }
        ExecuteApi(url+json.diag,'GET').then((resp)=>{
            SetDrgCheckPopuprightData([]);
            if(resp.length>0)
            { 
                let codeFirst = [];
                let useAdditionalCode = [];
                let codeAlsoList = [];
                let includes =[];
                let excludes1 =[];
                let CodeAlsoWhenPerfList = []
                let cfirst ='';
                let useACode='';
                let codeAlso='';
                let excludes1data='';
                let includesdata='';
                let CodeAlsoWhenPerf = ''

                let rightObj  = {'desc':resp[0].desc, 'inclusionTerm': resp[0].inclusionTerm};
                
                resp[0].rules.map((item,index)=>{
                   
                    if(item.rule_type === 1){
                      excludes1.push(item);
                    }
                    if(item.rule_type === 2){
                      includes.push(item);
                    }
                    if(item.rule_type === 3){
                        codeAlsoList.push(item);
                    }
                    if(item.rule_type === 4){
                        codeFirst.push(item);
                    }
                    if(item.rule_type === 5){
                        useAdditionalCode.push(item);
                    }
                    if(item.rule_type === 6){
                        CodeAlsoWhenPerfList.push(item);
                    }
                    return '';
                });
                if(codeFirst.length>0) {
                    let cfirstInnser = codeFirst.map((item,index)=>{
                        let newIndex = index+100;
                        // eslint-disable-next-line
                        if(label_type == 1){
                            var finalStr = showButton(item.note);
                        }else{
                            var finalStr = showButtonProcedure(item.note);
                        }
                       
                        let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                        return str;
                    });
                    cfirst=<React.Fragment><TreeItem nodeId="2" label="Code First">{cfirstInnser}</TreeItem></React.Fragment>
                    rightObj.cfirst=cfirst;
                }
                if(useAdditionalCode.length>0)
                {
                    let useACodeInnser = useAdditionalCode.map((item,index)=>{
                        let newIndex = index+200;
                        // eslint-disable-next-line
                        if(label_type == 1){
                            var finalStr = showButton(item.note);
                        }else{
                            var finalStr = showButtonProcedure(item.note); 
                        }
                        let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                        return str;
                    });
                    useACode=<React.Fragment><TreeItem nodeId="3" label="Use Additional Code">{useACodeInnser}</TreeItem></React.Fragment>
                    rightObj.useACode=useACode;
                }
                if(CodeAlsoWhenPerfList.length>0)
                {
                    let codeAlsoWhenPerfInnser = CodeAlsoWhenPerfList.map((item,index)=>{
                        let newIndex = index+200;
                        // eslint-disable-next-line
                        if(label_type == 1){
                            var finalStr = showButton(item.note);
                        }else{
                            var finalStr = showButtonProcedure(item.note);  
                        }
                        let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                        return str;
                    });
                    CodeAlsoWhenPerf=<React.Fragment><TreeItem nodeId="3" label="Code Also When Performed">{codeAlsoWhenPerfInnser}</TreeItem></React.Fragment>
                    rightObj.CodeAlsoWhenPerf=CodeAlsoWhenPerf;
                }
                if(codeAlsoList.length>0)
                {
                    let codeAlsoInner = codeAlsoList.map((item,index)=>{
                        let newIndex = index+300;
                        // eslint-disable-next-line
                        if(label_type == 1){
                          var finalStr = showButton(item.note);
                        }else{
                          var finalStr = showButtonProcedure(item.note);    
                        }
                        //let finalStr = item.note;
                        let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                        return str;
                    });
                    codeAlso=<React.Fragment><TreeItem nodeId="4" label="Code Also">{codeAlsoInner}</TreeItem></React.Fragment>
                    rightObj.codeAlso=codeAlso;
                }
                if(excludes1.length>0)
                {
                    let excludes1Inner = excludes1.map((item,index)=>{
                        let newIndex = index+400;
                        // eslint-disable-next-line
                        if(label_type == 1){
                         var finalStr = showButton(item.note);
                        }else{
                         var finalStr = showButtonProcedure(item.note);   
                        }
                        //let finalStr = item.note;
                        let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                        return str;
                    });
                    excludes1data=<React.Fragment><TreeItem nodeId="5" label="Excludes1">{excludes1Inner}</TreeItem></React.Fragment>
                    rightObj.excludes1=excludes1data;
                }
                if(includes.length>0)
                {
                    let includesInner = includes.map((item,index)=>{
                        let newIndex = index+500;
                        // eslint-disable-next-line
                        if(label_type == 1){
                         var finalStr = showButton(item.note);
                        }else{
                         var finalStr = showButtonProcedure(item.note);  
                        }    
                        let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                        return str;
                    });
                    includesdata=<React.Fragment><TreeItem nodeId="6" label="Includes">{includesInner}</TreeItem></React.Fragment>
                    rightObj.includes=includesdata;
                }
                
                SetDrgCheckPopuprightData(rightObj);
            }
        });
        setExpanded(["1"]);
        handledigCheckPopup();
    }
    function getCodeByError(tag){
        let error_code = tag.split(',');
        if(error_code[0]==='Error: Excludes1')
        {
            return 1;
        }
        else if(error_code[0]==='Error: Excludes2')
        {
            return 2;
        }
        else if(error_code[0]==='Error: AdditionalCode')  
        {
            return 5;
        }
        else if(error_code[0]==='Error: CodeFirst')  
        {
            return 4;
        }
        else if(error_code[0]==='Error: CodeAlso')  
        {
           return 3;
        }
        else if(error_code[0]==='Error: CodeAlsoWhenPerf'){
            return 6;
        }
        else if(error_code[0]==='Warning: Excludes1')
        {
            return 1;
        }
        else if(error_code[0]==='Warning: Excludes2')  
        {
            return 2;
        }
        else if(error_code[0]==='Warning: AdditionalCode')  
        {
            return 5;
        }
        else if(error_code[0]==='Warning: CodeFirst')  
        {
            return 4;
        }
        else if(error_code[0]==='Warning: CodeAlso')  
        {
            return 3;
        }
        else if(error_code[0]==='Warning: CodeAlsoWhenPerf'){
            return 6;
        }
    }
    function setdiagcheckStatus(data){
        
        if(digCheck.length>0) {
        let checkObj ={};
        let messages = [];
        digCheck.map((item)=>{
            if(item.diag===data.name)
            {
                checkObj=item;
                messages = item.messages;
            }
            return 0;
        })
        
        let allChecked = true;
        if(dischargesummarydata.read_messages == null){
            allChecked = false
        }
        else{
            for (var i = 0; i < messages.length; i++) {
                let code = getCodeByError(messages[i]);
                if(dischargesummarydata.read_messages.indexOf(data.name+','+String(code)) == -1){
                    allChecked = false;
                    break;
                } 
            }
        }
        
        if(props.data.ActionSection && checkObj) {
            try {
                let id = "error_control_"+data.label_id
                if(checkObj.status===2 && allChecked === false)
                    return <i data-complete={JSON.stringify(data)} data-label_type={data.label_type} data-json={JSON.stringify(checkObj)} className="mdi mdi-alert-outline text-warning diagcheckStatus openPopupdigCheck" style={{'fontSize':'15px',position:'relative',top:'2px'}} id={id} data-id={data.label_id} onClick={openPopupdigCheck} ></i>;
                else if(checkObj.status===1 && allChecked === false)
                    return <i data-complete={JSON.stringify(data)} data-label_type={data.label_type} data-json={JSON.stringify(checkObj)} className="mdi mdi-alert-circle-outline text-danger diagcheckStatus" style={{'fontSize':'15px',position:'relative',top:'2px'}} id={id} data-id={data.label_id} onClick={openPopupdigCheck} ></i>;
                else if(checkObj.status===1 && allChecked === true)
                    return <i data-complete={JSON.stringify(data)} data-label_type={data.label_type} data-json={JSON.stringify(checkObj)} className="mdi mdi-check-box-outline text-secondary diagcheckStatus openPopupdigCheck" style={{'fontSize':'15px',position:'relative',top:'2px'}} id={id} data-id={data.label_id} onClick={openPopupdigCheck} ></i>;
                else if(checkObj.status===2 && allChecked === true)
                    return <i data-complete={JSON.stringify(data)} data-label_type={data.label_type} data-json={JSON.stringify(checkObj)} className="mdi mdi-check-box-outline text-secondary diagcheckStatus" style={{'fontSize':'15px',position:'relative',top:'2px'}} id={id} data-id={data.label_id} onClick={openPopupdigCheck} ></i>;
                else if(checkObj.status===3 || allChecked === true) 
                    return <i  style={{'fontSize':'15px',position:'relative',top:'2px'}} className="mdi mdi-check-box-outline text-success diagcheckStatus" ></i>;  
                else 
                    return ''; 
            }
            catch(e) {
            }
        }
        else 
        {
            return '';
        }  
        }
        else 
        {
            return '';
        }
    }
    const handledigCheckPopup = () =>{
        setCheckPopupState(!CheckPopupState);
    }
    if(SectionInformation) {
        diags=SectionInformation.diags;
     
    }

    let indexCount=0;
    function showChield(children,treeIds)
    {
        if(children.length>0) {
           let data = children.map((item,index)=>{
                indexCount++;
                if(ICTag===item.name) {
                        if(!expanded1) {
                        treeIds.push(indexCount);
                        setExpanded1(treeIds);
                    }
                return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name} nodeId={indexCount} label={<React.Fragment><div style={{'fontWeight':'bold'}} id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span style={{'boxShadow':'rgb(158, 143, 143) -2px 3px 20px 10px'}}  data-nodeId={indexCount}  data-id={item.id} id={item.id} className="mt-2 mb-2 ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc} </div> {showChield(item.children,treeIds)}</React.Fragment>}></TreeItem>);
                    }
                else 
                {
                    return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name} nodeId={indexCount} label={<React.Fragment><div id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span data-nodeId={indexCount} data-tag={item.name} data-id={item.id} id={item.id}  className="mt-2 mb-2 ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc}</div> {showChield(item.children,treeIds)} </React.Fragment>}></TreeItem>);
                }
                
            })
            return data;
        }
        else {
            return '';
        }
    }
    const setKeyword = (tag,id,desc) => {
        setmoreinfoState(false);
        if(Number(id)!==Number(localStorage.getItem('old_id'))) {
            let elementId = document.getElementById(id);
            if(elementId) {
                elementId.style.boxShadow = '-2px 3px 20px 10px rgb(158 143 143)';
            }

            let elementIdb = document.getElementById('parent_'+id);
            if(elementIdb) {
                elementIdb.style.fontWeight = 'bold';
            }

            let elementId1 = document.getElementById(localStorage.getItem('old_id'));
            if(elementId1) {
                elementId1.style.boxShadow = '0px 0px 0px 0px';
            }

            let elementIdb1 = document.getElementById('parent_'+localStorage.getItem('old_id'));
            if(elementIdb1) {
                elementIdb1.style.fontWeight = '100';
            }

            localStorage.setItem('old_id',id);
        }
        setICTag(tag);
       
        localStorage.setItem('currentdiag',tag);
        setICDDesc(desc);
        
        ExecuteApi('icd/diags/?name='+tag,'GET').then((resp)=>{
            if(resp.length>0) {
                setICDStatus(resp[0].billable);
                ExecuteApi('icd/sections/'+resp[0].section,'GET').then((sectionsResp)=>{ 
                    if(sectionsResp)
                    {
                        setSectionInformation(sectionsResp);      
                    }
                });
                if(resp.length > 0) {
                    setDiagsInformation(resp[0]);
                    setSecondPopupRightData([]);
                    showRightInfo(resp[0]);
                }
            }
        });  
    }
    const handleToggle1 = (event, nodeIds) => {
        setExpanded1(nodeIds);
    };
    const handleSelect1 = (event, nodeIds) => {
    };
    
   
    
    function showRightInfo(data){
        
        let codeFirst = [];
        let useAdditionalCode = [];
        let codeAlsoList = [];
        let excludes1 =[];
        let includes =[];
      
        let cfirst ='';
        let useACode='';
        let codeAlso='';
        let excludes1data='';
        let includesdata='';
        let rightObj  = {'desc':data.desc, 'inclusionTerm': data.inclusionTerm};
       
      
       
            if(!moreinfoState) {
                setmoreinfoState(true);
            }
            data.rules.map((item,index)=>{
           
            if(item.rule_type === 1){
              excludes1.push(item);
            }
            if(item.rule_type === 2){
              includes.push(item);
            }
            if(item.rule_type === 3){
                codeAlsoList.push(item);
            }
            if(item.rule_type === 4){
                codeFirst.push(item);
            }
            if(item.rule_type === 5){
                useAdditionalCode.push(item);
            }
            return '';
        });
        if(codeFirst.length>0) {
            let cfirstInnser = codeFirst.map((item,index)=>{
                let newIndex = index+100;
                // eslint-disable-next-line
                if(labeltype == 1){
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
                }else{
                    var finalStr = showButtonProcedureSecondPopup(item.note,data.desc,item.id); 
                }
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            cfirst=<React.Fragment><TreeItem nodeId="2" label="Code First">{cfirstInnser}</TreeItem></React.Fragment>
            rightObj.cfirst=cfirst;
        }
        if(useAdditionalCode.length>0)
        {
            let useACodeInnser = useAdditionalCode.map((item,index)=>{
                let newIndex = index+200;
                // eslint-disable-next-line
                if(labeltype == 1){
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
                }else{
                    var finalStr = showButtonProcedureSecondPopup(item.note,data.desc,item.id);  
                }
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            useACode=<React.Fragment><TreeItem nodeId="3" label="Use Additional Code">{useACodeInnser}</TreeItem></React.Fragment>
            rightObj.useACode=useACode;
        }
        if(codeAlsoList.length>0)
        {
            let codeAlsoInner = codeAlsoList.map((item,index)=>{
                let newIndex = index+300;
                // eslint-disable-next-line
                if(labeltype == 1){
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
                }else{
                    var finalStr = showButtonProcedureSecondPopup(item.note,data.desc,item.id);    
                }
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            codeAlso=<React.Fragment><TreeItem nodeId="4" label="Code Also">{codeAlsoInner}</TreeItem></React.Fragment>
            rightObj.codeAlso=codeAlso;
        }
        if(excludes1.length>0)
        {
            let excludes1Inner = excludes1.map((item,index)=>{
                let newIndex = index+400;
                // eslint-disable-next-line
                if(labeltype == 1){
                    var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
                }else{
                  var finalStr = showButtonProcedureSecondPopup(item.note,data.desc,item.id);   
                }
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            excludes1data=<React.Fragment><TreeItem nodeId="5" label="Excludes1">{excludes1Inner}</TreeItem></React.Fragment>
            rightObj.excludes1=excludes1data;
        }
        if(includes.length>0)
        {
            let includesInner = includes.map((item,index)=>{
                let newIndex = index+500;
                // eslint-disable-next-line
                if(labeltype == 1){
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
                }else{
                 var finalStr = showButtonProcedureSecondPopup(item.note,data.desc,item.id);   
                }
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            includesdata=<React.Fragment><TreeItem nodeId="6" label="Includes">{includesInner}</TreeItem></React.Fragment>
            rightObj.includes=includesdata;
        }
       
         setSecondPopupRightData({rightObj});
         
    };
   
    const selectCode = () =>{
        toggleConfirmModel();
    }
    const backtoreviewCode=()=>{
        localStorage.removeItem('linkCodeTODoc');
    
        setTimeout(function(){
            setTimeout(function(){
                if($('#error_control_'+localStorage.getItem('currentSelectedICDCode'))) {
                    $('#error_control_'+localStorage.getItem('currentSelectedICDCode')).click();
                }
            },500);
            
        },1000);
    }
        const acceptAndContinue = () =>{
           
            if(IcdSaveOppStatus===1)
            {
                localStorage.setItem('linkCodeTODoc','1');
                backtoReviewconfirmpopup();
                setCheckPopupState(false);  
                document.getElementById('codeBlock').click();
                setTimeout(function(){
                if($("ul.react-tabs__tab-list li:nth-child(2)")) {
                    $("ul.react-tabs__tab-list li:nth-child(2)").click();
                }
                },200);
                setTimeout(function(){
                    if(document.getElementById('accordion__heading-raa-0')) {
                        document.getElementById('accordion__heading-raa-0').click();
                    }
                    else if(document.getElementById('accordion__heading-raa-4'))
                    {
                        document.getElementById('accordion__heading-raa-4').click();
                    }
                    
                },1000); 
                
                
            }
            else
            {
                        let cof = false;
                        if(localStorage.getItem("cofStatus")){
                            cof = true;
                        }
                        let json = {
                            "status": 2,
                            "label_type" : 1,
                            "discharge": props.data.id,
                            "coder_session": props.data.disid,
                            "diag": {
                                "name": ICTag
                            },
                            cof : cof,
                            seventh_char:""
                            
                        };

                        ExecuteApi('coder_discharge_labels/', 'POST', '', json).then((resp) => {
                            backtoReviewconfirmpopup(); 
                            reCallAPi();
                           
            
                        });
                    
                    
            
            
                
            }
        }
        const ManageAddToCodeApplyStatus = (e) =>{
            setIcdSaveOppStatus(e.target.value); 
        }
        const backtoReviewconfirmpopup = () =>{
            toggleConfirmModel();
            toggleTabularListInner();
        }
        const manageCOF =(e)=>{
            localStorage.setItem('cofStatus',e.target.checked);
        }
        
        
       
        return (
       
        <React.Fragment>
           
            <button id="backtoreviewCode" onClick={backtoreviewCode} style={{'opacity':'0'}}>..</button>
        <div className="summary_header_parent mb-4">
            <div className="row pl-2">
                <div className="col-sm-3">
                    <h2>Jack McEvoy</h2>
                    <button  id="saveonTabChange" style={{'display':'none'}} onClick={handleShow}>Test</button>
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-12">Admission ID</div>
                                <div className="col-sm-12"> <h4>{AdmissionID()}</h4></div>
                            </div>
                            <div className="row mt-2" >
                                <div className="col-sm-12">Admission Date</div>
                                <div className="col-sm-12"><h4>{AdmissionDate()}</h4></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-12">Discharge Date</div>
                                <div className="col-sm-12"><h4>{DischargeDate()}</h4></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-12">Speciality</div>
                                <div className="col-sm-12"><h4>{Speciality()}</h4></div>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-12">Patient ID</div>
                                <div className="col-sm-12"><h4>{PatientID()}</h4></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-12">Admission Time</div>
                                <div className="col-sm-12"><h4>{AdmissionTime()}</h4></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-12">Discharge Time</div>
                                <div className="col-sm-12"><h4>{DischargeTime()}</h4></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-12">Admission Diagnosis</div>
                                <div className="col-sm-12"><h4>Polysubstance Overdose</h4></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="row" style={{marginTop: "1%"}}>
            <div className="col-sm-12">  
                <div className="data_block1 mb-4">
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mt-3 ml-2">AR-DRG</p>
                        </div>
                        <div className="col-sm-9">
                            <div className="row mt-3 mb-2">
                                <div className="col-sm-5">
                                    <div className="row">
                                        <div className="col-sm-12">DRG-VERSION</div>
                                        <div className="col-sm-12">
                                            <select value={icdDrg.drg_version} onChange={changeDrgVersion} className="form-control">
                                                <option  value="V10.0">V10.0</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-4" >
                                        <div className="col-sm-12 ">DRG</div>
                                        <div className="col-sm-12"><h4><SetDrg /></h4></div>
                                    </div>
                                </div>
                                <div className="col-sm-2"></div>
                                <div className="col-sm-5">
                                    <div className="row">
                                        <div className="col-sm-12">NWAU</div>
                                        <div className="col-sm-12"><h4><SetNWAU /></h4></div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12">NEP 20</div>
                                        <div className="col-sm-12"><h4>AU$ <Setnep20 /></h4></div>
                                    </div>
                                </div>
                            </div>    
                        </div>    
                    </div> 
                </div>
               <div className="data_block1 mb-4">
               <span className="pl-2">PRIMARY DIAGNOSIS</span>
               <ReactSortable list={state} setList={setState}
                id="example2Left"
                className="badge_container"
                animation={200}
                delayOnTouchStart={true}
                delay={2}
                group={{name:"pd",put:"sd"}}
                style={{margin:'0.75rem'}}
                onChange={()=>{
                   props.data.setChangeState(true);
                    
                    
                }}
                >
                    {state.length>0 && state.map((item,index) => {
                        
                    let cof={'display':'none'};
                    let cofMessage=<div id={`button_block_${item.label_id}`}><button data-status={!item.cof} data-id={item.label_id} data-type='1' onClick={cofFlagOperation} className="btn btn-info btn-sm">Add COF flag</button><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)} style={{margin:'0.5rem'}}></i></div>;
                    if(item.cof===true)
                    {
                        cofMessage=<div id={`button_block_${item.label_id}`}><button data-status={!item.cof} data-id={item.label_id} data-type='1' onClick={cofFlagOperation} className="btn btn-info btn-sm">Remove COF flag</button><i className=" btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)} style={{margin:'0.5rem'}}></i></div>;
                        cof={'display':'inherit' };
                    }
                            let custom_style='';
                            if(item.status===2) {
                                custom_style='dsapprove' 
                            }
                           
                    return (<div onClick={cofFlag} data-flag={item.label_id}  className={`badge dischargeSummaryCodeLabel  pt-2 pb-2 pl-2 pr-2 mr-1 mb-1 ${custom_style}`} key={item.id}>
                        <button style={{'opacity':'0','position':'absolute'}} id={`popovertop${item.label_id}`}></button>
                        <UncontrolledPopover className="flagPopover"  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top" target={`popovertop${item.label_id}`}>
                            <PopoverBody>
                                {cofMessage}
                            </PopoverBody>
                        </UncontrolledPopover>
                        {item.name}-{item.desc} <span style={{fontSize: '14px',position: 'relative', top: '2px'}}><i style={cof} id={`label_${item.label_id}`} className="mdi mdi-alpha-c-box"></i></span>
                         { setdiagcheckStatus(item) }
                        </div>);  })}
                </ReactSortable>
                </div>
            </div>
            </div>
            <div className="row" style={{marginTop: "1%"}}>
            <div className="col-sm-12">
                <div className="data_block1 mb-4">
                <span className="pl-2">SECONDARY DIAGNOSIS</span>
                <ReactSortable list={state1} setList={setState1}
                id="example2Right"
                className="badge_container"
                animation={200}
                group="sd"
                delayOnTouchStart={true}
                delay={2}
                onChange={()=>{
                    
                    props.data.setChangeState(true);
                   
                    
                }}
                style={{margin:'0.75rem'}}
                >
                    {state1.length>0 && state1.map((item,index) => {
                            let custom_style='';
                            let cof={'display':'none' };
                            let cofMessage=<div id={`button_block_${item.label_id}`}><button data-status={!item.cof} data-id={item.label_id} data-type='1' onClick={cofFlagOperation} className="btn btn-info btn-sm">Add COF flag</button><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)} style={{margin:'0.5rem'}}></i></div>;
                            if(item.cof===true)
                            {
                                cofMessage=<div id={`button_block_${item.label_id}`}><button data-status={!item.cof} data-id={item.label_id} data-type='1' onClick={cofFlagOperation} className="btn btn-info btn-sm">Remove COF flag</button><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)} style={{margin:'0.5rem'}}></i></div>;
                                cof={'display':'inherit' };
                            }
                            if(item.status===2) {
                                custom_style='dsapprove' ;   
                            }
                        return (<div onClick={cofFlag} data-flag={item.label_id}   className={`badge dischargeSummaryCodeLabel pt-2 pb-2 pl-2 pr-2 mr-1 mb-1 ${custom_style}`} key={item.id}>
                            <button style={{'opacity':'0','position':'absolute'}} id={`popovertop${item.label_id}`}></button>
                            <UncontrolledPopover  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top" target={`popovertop${item.label_id}`}>
                                <PopoverBody>
                                    {cofMessage}
                                </PopoverBody>
                            </UncontrolledPopover>
                            {item.name}-{item.desc}<span style={{fontSize: '14px',position: 'relative', top: '2px'}}><i style={cof} id={`label_${item.label_id}`} className="mdi mdi-alpha-c-box"></i></span> 
                            { setdiagcheckStatus(item) }
                            </div>); } )}
                            
                </ReactSortable>
                   
                         <i className="mdi mdi-plus-box" onClick={toggleModal} style={{fontSize:'1.5rem',margin:'0.75rem'}}></i>
                    
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="data_block2 mb-4">
                        <span className="pl-2">PRIMARY PROCEDURE</span>
                        
                        <ReactSortable list={pprocedure} setList={setpprocedure}
                        id="example2Right"
                        className="badge_container"
                        animation={200}
                        delayOnTouchStart={true}
                        delay={2}
                        group={{name:"pp",put:"sp"}}
                        style={{margin:'0.75rem'}}
                        onChange={()=>{
                            props.data.setChangeState(true);
                            
                            
                        }}
                        >
                             {pprocedure && pprocedure.map((item,index) => {
                                let custom_style='';
                                
                              
                                let cofMessage = '';
                                // eslint-disable-next-line 
                                if(item.num_proc == 1){
                                    cofMessage = <div><i data-operation="plus"  data-id={item.label_id} data-type='2' onClick={cofFlagOperation} className="btn btn-primary btn-sm mdi mdi-plus-box-outline"></i><i id={`minus_${item.label_id}`}data-operation="minus"   data-id={item.label_id} data-type='2' style={{color:'#e8e8e8',margin:'0.5rem'}} className="btn disabled  btn-primary btn-sm mdi mdi-minus-box-outline"></i><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)} style={{margin:'0.5rem'}}></i></div>
                                }else{
                                     cofMessage = <div><i data-operation="plus"   data-id={item.label_id} data-type='2' onClick={cofFlagOperation} className="btn btn-primary btn-sm mdi mdi-plus-box-outline"></i><i id={`minus_${item.label_id}`} data-operation="minus" style={{margin:'0.5rem'}}  data-id={item.label_id} data-type='2' onClick={cofFlagOperation} className="btn btn-primary btn-sm mdi mdi-minus-box-outline"></i><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)} ></i></div>
                                }
                                if(item.status===2) {
                                    custom_style='dsapprove';  
                                }
                            return (<div onClick={cofFlag} data-flag={item.label_id}  className={`badge dischargeSummaryCodeLabel pt-2 pb-2 pl-2 pr-2 mr-1 mb-1 ${custom_style}`} key={item.id}>
                                <button style={{'opacity':'0','position':'absolute'}} id={`popovertop${item.label_id}`}></button>
                                <UncontrolledPopover  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top" target={`popovertop${item.label_id}`}>
                                    <PopoverBody>
                                        {cofMessage}
                                    </PopoverBody>
                                </UncontrolledPopover>
                                {item.name}-{item.desc}  <span style={{padding:'0  0.2rem 0 0.2rem',backgroundColor:'#000',color:'#fff'}}  id={`label_${item.label_id}`}>{ item.num_proc }</span>
                                { setdiagcheckStatus(item) }
                                </div>);  })}
                        </ReactSortable>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="data_block2 mt-4">
                        <span className="pl-2">SECONDARY PROCEDURE</span>
                        
                        <ReactSortable list={sprocedure} setList={setsprocedure}
                        id="example2Right"
                        className="badge_container"
                        animation={200}
                        delayOnTouchStart={true}
                        delay={2}
                        group="sp"
                        onChange={()=>{
                            
                            props.data.setChangeState(true);
                        }}
                        style={{margin:'0.75rem'}}
                        >
                            {sprocedure && sprocedure.map((item,index) => {
                                    let custom_style='';
                                   
                                    let cofMessage = '';
                                    // eslint-disable-next-line 
                                if(item.num_proc == 1){
                                    cofMessage = <div><i data-operation="plus"  data-id={item.label_id} data-type='2' onClick={cofFlagOperation} className="btn btn-primary btn-sm mdi mdi-plus-box-outline"></i><i id={`minus_${item.label_id}`}data-operation="minus"  data-id={item.label_id} data-type='2' style={{color:'#e8e8e8',margin:'0.5rem'}} className="btn disabled btn-primary btn-sm mdi mdi-minus-box-outline"></i><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)}></i></div>
                                }else{
                                     cofMessage = <div><i data-operation="plus"   data-id={item.label_id} data-type='2' onClick={cofFlagOperation} className="btn btn-primary btn-sm mdi mdi-plus-box-outline"></i><i id={`minus_${item.label_id}`} data-operation="minus" style={{margin:'0.5rem'}}  data-id={item.label_id} data-type='2' onClick={cofFlagOperation} className="btn btn-primary btn-sm mdi mdi-minus-box-outline"></i><i className="btn btn-danger btn-sm mdi mdi-delete" onClick={()=>openRemoveCodeModel(item.label_id,item.name)}></i></div>
                                }
                                    if(item.status===2) {
                                        custom_style='dsapprove';  
                                    }
                                return (<div onClick={cofFlag} data-flag={item.label_id}  className={`badge dischargeSummaryCodeLabel pt-2 pb-2 pl-2 pr-2 mr-1 mb-1 ${custom_style}`} key={item.id}>
                                    <button style={{'opacity':'0','position':'absolute'}} id={`popovertop${item.label_id}`}></button>
                                    <UncontrolledPopover  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top" target={`popovertop${item.label_id}`}>
                                        <PopoverBody>
                                            {cofMessage}
                                        </PopoverBody>
                                    </UncontrolledPopover>
                                    {item.name}-{item.desc}<span style={{padding:'0  0.2rem 0 0.2rem',backgroundColor:'#000',color:'#fff'}}  id={`label_${item.label_id}`}>{ item.num_proc }</span>
                                    { setdiagcheckStatus(item)}
                                    </div>); } )}
                        </ReactSortable>
                        <i className="mdi mdi-plus-box" onClick={toggleProcedureModal} style={{fontSize:'1.5rem',margin:'0.75rem'}}></i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                   <div className="data_block3 mt-4">
                        <span className="pl-2">CHRONIC CONDITION</span>
                         <ReactSortable list={chronic} setList={setchronic}
                            id="example2Left"
                            className="badge_container"
                            animation={200}
                            delayOnTouchStart={true}
                            delay={2}
                            group="sd"
                            style={{margin:'0.75rem'}}
                            >
                                {chronic && chronic.map((item,index) => { 
                                        let custom_style='';
                                        let cof={'display':'none'};
                                        let cofMessage=<div id={`button_block_${item.label_id}`}><button data-status={!item.cof} data-id={item.label_id} data-type='22' onClick={cofFlagOperation} className="btn btn-info btn-sm">Add COF flag</button></div>;
                                        if(item.cof===true)
                                        {
                                            cofMessage=<div id={`button_block_${item.label_id}`}><button data-status={!item.cof} data-id={item.label_id} data-type='22' onClick={cofFlagOperation} className="btn btn-danger btn-sm">Remove COF flag</button></div>;
                                            cof={'display':'inherit',fontSize: '15px',position: 'relative', top: '2px' };
                                        }
                                        if(item.status===2) {
                                            custom_style='dsapprove';    
                                        }
                                    return (<div onClick={cofFlag} data-flag={item.label_id}  className={`badge dischargeSummaryCodeLabel pt-2 pb-2 pl-2 pr-2 mr-1 mb-1 ${custom_style}`} key={item.id}>
                                        <button style={{'opacity':'0','position':'absolute'}} id={`popovertop${item.label_id}`}></button>
                                            <UncontrolledPopover  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top" target={`popovertop${item.label_id}`}>
                                                <PopoverBody>
                                                    {cofMessage}
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        {item.name}-{item.desc} <span style={cof} id={`label_${item.label_id}`} className="mdi mdi-alpha-c-box"></span>
                                      
                                        </div>); } )}
                        </ReactSortable>
                    </div>
                    
                </div>
            </div> 
            <div className="row mt-2">
                <div className="col-sm-12">
                    <Label style={{ position:'absolute' }}>Additional Notes</Label>
                   
                    {
                        notestate.status==1 &&
                            <Input type="textarea" onClick={changeTagLavelStatus}  className="add_note mt-3" readOnly value={notetextstate}/>
                    }  
                    {  notestate.status==0 &&
                             <Input type="textarea" value={notetextstate} onChange={e => setNotestext(e.target.value)} placeholder=" Your notes"  className="add_note mt-3" />
                           
                    }
                    {  notestate.status==2 &&
                             <Input type="textarea" value={notetextstate} onChange={e => setNotestext(e.target.value)} placeholder=" Your notes"  className="add_note mt-3" />
                           
                    } 
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">
                   
                </div>
                <div className="col-sm-12 mt-4 text-right">
                <Button   onClick={handleShow} className="mr-2">Save Progress</Button>  
                { props.data.ActionSection && <Button onClick={handleDoneShow}>Done</Button> }   
                </div>
            </div>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               
            </Modal.Header>
            <Modal.Body>
            <Modal.Title> Do you want to save your changes? </Modal.Title>
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button className="btn-success" variant="primary" onClick={()=>saveNotes(0)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={done} onHide={handleDoneClose}>
            <Modal.Header closeButton>
               
            </Modal.Header>
            <Modal.Body>
            <Modal.Title> Are you sure you have finished coding? </Modal.Title>
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleDoneClose}>
                Close
            </Button>
            <Button className="btn-success" variant="primary" onClick={()=>saveNotes(1)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal className='modeErr' show={CheckPopupState} onHide={handledigCheckPopup}>
            <Modal.Header closeButton>
                <div className="row">
                    <div className="col-sm-12"><h2>Error(s) & Warning(s) flagged</h2></div>
                    <div className="col-sm-12"><p className="text-danger">This Following are potential errors & warnings discovered in the current set of disease and procedure codes entered . Please resolve where relevent to re-submit</p></div>
                </div>
            </Modal.Header>
            <Modal.Body>
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                    <div className="col-sm-8"><h4>{DrgCheckPopupTitle}</h4></div>
                                        <div className="col-sm-4 text-right"><h4>Ignore</h4></div>
                                    </div>
                                </div>
                                <div className="card-body" style={{'maxheight':'375px', 'height':'375px'}}>
                               
                                {DrgCheckPopupMessage && DrgCheckPopupMessage.map((item,i)=>{
                                    
                                    //  let checked =<input type="checkbox" data-id={i} data-errorCode={item.errorCode} onChange={toggleCheck}  />;
                                    let checked = <Checkbox disid={disid} dischargesummarydata={dischargesummarydata} check={false} i={i} errorCode={item.errorCode} name={item.name} />
                                    let desp = <p>{ item.data }</p>
                                    
                                     dischargesummarydata.read_messages && dischargesummarydata.read_messages.forEach((val,j)=>{
                                        // eslint-disable-next-line
                                        if(val == item.name+','+item.errorCode){
                                            checked = <Checkbox disid={disid} dischargesummarydata={dischargesummarydata} check={true} i={i} errorCode={item.errorCode} name={item.name} />;
                                            desp = <p style={{color:"#ccc"}}>{ item.data }</p>
                                            
                                        }
                                    });
                                    
                                    return(<div className="row">
                                        <div className="col-sm-11">
                                            { desp }
                                        </div>
                                        <div className="col-sm-1 text-right" id={`checkbox_${i}`}>
                                            
                                            {checked}
                                        </div>
                                    </div>);
                                 })} 
                                
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-sm-12"><h4>Selected  Code <span className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{DrgCheckPopupTag}</span></h4>
                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body" style={{'maxheight':'375px', 'height':'375px'}}>
                                <SimpleBar style={{ maxHeight: 350 }}>
                                   
                                        <span>{DrgCheckPopuprightData.desc}</span>
                                        <div>{getParsedString(DrgCheckPopuprightData.inclusionTerm)}</div>
                                        <div>{getParsedString(DrgCheckPopuprightData.definition)}</div>
                                        <div>{getParsedNote(DrgCheckPopuprightData.notes)}</div>
 
                                        <TreeView
                                            className={classes.root}
                                            defaultCollapseIcon={<ExpandMoreIcon />}
                                            defaultExpandIcon={<ChevronRightIcon />}
                                            expanded={expanded}
                                            selected={selected}
                                            onNodeToggle={handleToggle}
                                            onNodeSelect={handleSelect}
                                            >
                                            <TreeItem data-id="A" nodeId="1" label={<span className="text-dark">More Information</span>}>
                                                {DrgCheckPopuprightData.includes}
                                                {DrgCheckPopuprightData.excludes1}
                                                {DrgCheckPopuprightData.codeAlso}
                                                {DrgCheckPopuprightData.cfirst} 
                                                {DrgCheckPopuprightData.useACode}
                                                {DrgCheckPopuprightData.CodeAlsoWhenPerf}
                                            </TreeItem>
                                         </TreeView>
                                       
                                    </SimpleBar>
                                </div>
                            </div> 
                        </div>
                    </div>

            </Modal.Body>
            <Modal.Footer>
                    <Button className="btn-sm" onClick={handledigCheckPopup}>Back to review</Button>
            </Modal.Footer>
        </Modal>

        <Modal className='modeErr details_error' show={innerModel} onHide={toggleTabularListInner}>
            <Modal.Header closeButton>
                <div className="row">
                    <div className="col-sm-12"><h4>ICD-10</h4></div>
                    
                </div>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={7}>
                            <Card>
                                <CardHeader>
                                    <h4>{SectionInformation.desc}</h4>
                                </CardHeader>
                                <CardBody style={{'height':'375px'}}>
                                <SimpleBar style={{ maxHeight: 350 }}>
                                <TreeView
                                    className={classes.root}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    expanded={expanded1}
                                    onNodeToggle={handleToggle1}
                                    onNodeSelect={handleSelect1}
                                    >
                                    {diags && diags.map((item)=>{
                                        let treeIds=[];
                                        indexCount++;
                                        treeIds.push(indexCount);
                                        if(ICTag===item.name) {
                                            if(!expanded1) {
                                                treeIds.push(indexCount);
                                                setExpanded1(treeIds);
                                            }
                                            return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name}   nodeId={indexCount}  label={<React.Fragment><div style={{'fontWeight':'bold'}} id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span style={{'boxShadow':'rgb(158, 143, 143) -2px 3px 20px 10px'}} data-nodeId={indexCount} data-tag={item.name} data-id={item.id} id={item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)} className="mt-2 mb-2 ml-2 badge  pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc}</div></React.Fragment>}>
                                                {showChield(item.children,treeIds)}
                                            </TreeItem>);
                                        }
                                        else 
                                        {
                                            return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name}   nodeId={indexCount}  label={<React.Fragment><div id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span data-nodeId={indexCount} data-tag={item.name} data-id={item.id} id={item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)} className="mt-2 mb-2 ml-2 badge  pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc}</div></React.Fragment>}>
                                                {showChield(item.children,treeIds)}
                                            </TreeItem>);
                                        }
                                    })}
                                </TreeView>
                                </SimpleBar>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={5}>
                            <Card>
                                <CardHeader>
                                <h4 className="text-dark">Selected Code <span className="ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{ICTag}</span> <span style={{'fontSize':'12px  ','color':'#0000008c'}}>{DiagsInformation.desc}</span></h4>
                             
                                </CardHeader>
                                <CardBody style={{'height':'375px'}}>
                                <SimpleBar style={{ maxHeight: 350 }}>
                                    <div>{getParsedString(DiagsInformation.inclusionTerm)}</div>
                                    <div>{getParsedString(DiagsInformation.definition)}</div>
                                    <div>{getParsedNote(DiagsInformation.notes)}</div>
                                    <TreeView
                                    className={classes.root}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    expanded={expanded11}
                                    selected={selected11}
                                    onNodeToggle={handleToggle11}
                                    onNodeSelect={handleSelect11}
                                    >
                                    <TreeItem  data-id="A" nodeId="1" label={<span className="text-dark">More Information</span>}>
                                                {secondPopupRightData.excludes1}
                                                {secondPopupRightData.excludes1}
                                                {secondPopupRightData.codeAlso}
                                                {secondPopupRightData.cfirst} 
                                                {secondPopupRightData.useACode}
                                    </TreeItem>
                                    </TreeView>
                                    </SimpleBar>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <Row>
                    <Col md={7}>
                        &nbsp;
                    </Col>
                    <Col md={5}>
                        <div className="cof_checkbox">          
                            <input value="1" onChange={manageCOF} style={{'zIndex':'100'}} type="checkbox" /> <label>Condition Onset Flag</label>
                        </div>
                        <div className="innerpopup_button">
                            <Button onClick={toggleTabularListInner} className="btn-sm" style={{'zIndex':'100'}} color="secondary" ><i className="mdi mdi-arrow-left"></i>Back to review</Button>
                            <Button onClick={selectCode} className="btn-sm" style={{'zIndex':'100'}} color="success" >Select code <i className="mdi mdi-arrow-right"></i></Button>
                        </div>  
                    </Col>  
                </Row>                      
            </Modal.Footer>
        </Modal>


        <Modal show={innerModelconfirm} onHide={toggleConfirmModel}>
            <Modal.Header closeButton>
                <div className="row">
                    <div className="col-sm-12"><h4>Choose how you would like to add to code </h4></div>
                </div>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={12}>
                         <input type="radio" onChange={ManageAddToCodeApplyStatus} checked="checked" name="radio1" value="1" id="linkCodeToDocument" /><label for="linkCodeToDocument" className="ml-2">Link code to documentation (make audits simple)</label><br />
                         <span className="text-success ml-3">(Recommended)</span><br /><br />
                         <input type="radio" name="radio1" onChange={ManageAddToCodeApplyStatus} value="2" id="addCodeToDischarge" /><label for="addCodeToDischarge" className="ml-2">Add code to discharge directly (no linking)</label> 
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer style={{'background':'#f3f4f8'}} className="float-right">
            <br /><br />
                <Button onClick={backtoReviewconfirmpopup} className="btn-sm">Back to review</Button>
                <Button color="success" onClick={acceptAndContinue} className="btn-sm">Accept & continue</Button>
            </Modal.Footer>
        </Modal>
        <Modal show={removeCode}>
            <Modal.Header>
               
            </Modal.Header>
            <Modal.Body>
            <div className="col-sm-12"><h4>Are   you   sure you   want   to   delete { labelname } ? </h4></div>
            </Modal.Body>
            <Modal.Footer style={{'background':'#f3f4f8'}} className="float-right">
            <br /><br />
                <Button onClick={()=>setRemoveCode(!removeCode)} className="btn-sm">No</Button>
                <Button color="success" onClick={removeCodeLabel} className="btn-sm">Yes</Button>
            </Modal.Footer>
        </Modal>
        <TabularList data={{ 'modal': modal }} addICDCode={addICDCode} toggleModal={toggleModal} />
        <ProcedureModal data={{ 'stateprocedureModal' : stateprocedureModal }}  addICDCode={addICDCode} toggleProcedureModal={toggleProcedureModal}/>
        </React.Fragment>
        );
    }
    else 
    {
        return( <div  className="col-lg-12 text-center pt-4" style={{marginTop:'180px'}}>
            <Spinner className="text-primary m-2" size='lg' />
        </div>);
    }
}
class Labs extends Component {
  render() {
    return (
      <div>
         <Parent data={this.props.data} />
      </div>        
    );
  }
}
export default Labs;
