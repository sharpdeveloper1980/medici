import React,{ useEffect  } from 'react';
import {Row,Col,Modal, ModalHeader,ModalBody,Card,CardBody,CardHeader,DropdownToggle,DropdownMenu,DropdownItem,UncontrolledButtonDropdown,ModalFooter,Button,UncontrolledTooltip } from 'reactstrap';
import createFragment from "react-addons-create-fragment";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import ExecuteApi from '../ExecuteApi';  
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; 
import Pdf from './Pdf';
import config from "../../auth_config.json";
import parse from 'html-react-parser';
import Toast from '../toast/Toast';
import checkIcon from '../../assets/img/check.svg';
import errorIcon from '../../assets/img/error.svg';
import infoIcon from '../../assets/img/info.svg';
import warningIcon from '../../assets/img/warning.svg';

const useStyles = makeStyles({
    root: { 
      flexGrow: 1,
      maxWidth: 800,
    },
  });
  let diags=[]; 
 
  
const TabularListInner = (props) => {
    let indexCount=0;
    const classes = useStyles();
    // eslint-disable-next-line
    const [expanded, setExpanded] = React.useState(["1"]);
    const [moreinfoState, setmoreinfoState] = React.useState(false);
    // eslint-disable-next-line
    const [selected, setSelected] = React.useState([]);
    const [expanded1, setExpanded1] = React.useState(false);
    const [innerICDCode, setinnerICDCode] = React.useState(false);

    const [innerICDCodeStatus, setinnerICDCodeStatus] = React.useState(false);
    // eslint-disable-next-line
    const [innerICDDesc, setinnerICDDesc] = React.useState(false);
    const [sectionsData, setsectionsData] = React.useState([]);
    const [secondPopupRightData, setSecondPopupRightData] = React.useState([]);
    const [diagsInformation, setdiagsInformation] = React.useState([]);
    const [popupModal,setpopupmodal] = React.useState(false);
    const [cof, setCof] = React.useState(false);
    const [pdfData,setPdfData] = React.useState([]);
    const [list, setList] = React.useState([]);
    // eslint-disable-next-line
    let [checkValue, setCheckValue] = React.useState(false);
    // eslint-disable-next-line
    const [dismissTime, setDismissTime] = React.useState(0);
    
    let toastProperties = null;

    // eslint-disable-next-line
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };
    
     // eslint-disable-next-line
    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const handleToggle1 = (event, nodeIds) => {
        setExpanded1(nodeIds);
    };
    const handleSelect1 = (event, nodeIds) => {
    };

    const showToast = type => {
        const id = Math.floor((Math.random() * 101) + 1);
    
        switch(type) {
          case 'success':
            toastProperties = {
              id,
              title: 'Success',
              description: ' Billable is not true ',
              backgroundColor: '#5cb85c',
              icon: checkIcon
            }
            break;
          case 'danger':
            toastProperties = {
              id,
              title: 'Danger',
              description: 'This is a error toast component',
              backgroundColor: '#d9534f',
              icon: errorIcon
            }
            break;
          case 'info':
            toastProperties = {
              id,
              title: 'Info',
              description: 'This is an info toast component',
              backgroundColor: '#5bc0de',
              icon: infoIcon
            }
            break;
          case 'warning':
            toastProperties = {
              id,
              title: 'Warning',
              description: ' Billable is not true ',
              backgroundColor: '#f0ad4e',
              icon: warningIcon
            }
            break;
    
            default:
              setList([]);
        }
    
        setList([...list, toastProperties]);
      }
    const closeInnerPOpup=()=>{
        setdiagsInformation('');
        setSecondPopupRightData([]);
       setsectionsData('');
       setExpanded(false);
       setExpanded1(false);
       setSelected([]);
       props.toggleTabularListInner();
       
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
        setinnerICDCode(tag);
        setinnerICDDesc(desc);
        ExecuteApi('icd/diags/?name='+tag,'GET').then((resp)=>{
            if(resp.length>0) {
                setinnerICDCodeStatus(resp[0].billable);
                ExecuteApi('icd/sections/'+resp[0].section,'GET').then((sectionsResp)=>{ 
                    if(sectionsResp)
                    {
                        setsectionsData(sectionsResp);      
                    }
                    if(resp.length > 0) {
                       setdiagsInformation(resp[0]);
                        showRightInfo(resp[0]);
                    }
                    indexCount = 0;
                });
                
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
                return <span style={{lineHeight:'0.5'}} data-tag={code} onClick={()=>setKeyword(code,id,desc)} className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{domNode.children[0].data}</span>
            }
        }
    });
    
     
    }
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
       
        let treeIndex =1001;
       
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
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
                
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            cfirst=<React.Fragment><TreeItem nodeId={treeIndex} label="Code First">{cfirstInnser}</TreeItem></React.Fragment>
            rightObj.cfirst=cfirst;
            treeIndex++;
        }
        if(useAdditionalCode.length>0)
        {
            let useACodeInnser = useAdditionalCode.map((item,index)=>{
                let newIndex = index+200;
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
               
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            useACode=<React.Fragment><TreeItem nodeId={treeIndex} label="Use Additional Code">{useACodeInnser}</TreeItem></React.Fragment>
            rightObj.useACode=useACode;
            treeIndex++;
        }
        if(codeAlsoList.length>0)
        {
            let codeAlsoInner = codeAlsoList.map((item,index)=>{
                let newIndex = index+300;
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
               
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            codeAlso=<React.Fragment><TreeItem nodeId={treeIndex} label="Code Also">{codeAlsoInner}</TreeItem></React.Fragment>
            rightObj.codeAlso=codeAlso;
            treeIndex++;
        }
        if(excludes1.length>0)
        {
            let excludes1Inner = excludes1.map((item,index)=>{
                let newIndex = index+400;
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
              
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            excludes1data=<React.Fragment><TreeItem nodeId={treeIndex} label="Excludes1">{excludes1Inner}</TreeItem></React.Fragment>
            rightObj.excludes1=excludes1data;
            treeIndex++;
        }
        if(includes.length>0)
        {
            let includesInner = includes.map((item,index)=>{
                let newIndex = index+500;
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
              
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            includesdata=<React.Fragment><TreeItem nodeId={treeIndex} label="Includes">{includesInner}</TreeItem></React.Fragment>
            rightObj.includes=includesdata;
            treeIndex++;
        }
       
         setSecondPopupRightData({rightObj});
         
         
   
   
    }

    useEffect(()=>{
        
        setCof(false);
        if(props.ICDcode) {
            setinnerICDCode(props.ICDcode);
            setinnerICDDesc(props.ICDDesc);
            setinnerICDCodeStatus(props.ICDStatus);
        }
        if(props.diagsInformation.length > 0 && props.sectionsData) {
            setsectionsData(props.sectionsData);
            setdiagsInformation(props.diagsInformation[0]);
            
            showRightInfo(props.diagsInformation[0]);
            
        }
// eslint-disable-next-line
   },[props.sectionsData,props.diagsInformation,props.ICDcode,props.ICDDesc,props.ICDStatus]);
  // eslint-enable-next-line
    if(props.diagsInformation.length > 0 && props.sectionsData) {
    function ShowCharacter()
    {
        if(diagsInformation)
        {
            if(diagsInformation.sevenChrDef) {
                let returnStr='';
                let sevenChrDef=[];
                if(diagsInformation.sevenChrDef.extensions) {
                for(let i=diagsInformation.sevenChrDef.extensions.length;i>=0;i--)
                {
                    sevenChrDef.push(diagsInformation.sevenChrDef.extensions[i]);
                } 
                sevenChrDef.map((item,index)=>{
                    if(item) {
                    returnStr = createFragment({
                        date:<DropdownItem tabindex={index}>Char="{item.char}" : {item.text}</DropdownItem>,
                        returnStr: returnStr,
                      });
                    }
                    return 1;
                }) 
                return(<React.Fragment><UncontrolledButtonDropdown><DropdownToggle color="secondary" className="btn-sm" caret>
                7th Character
                </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-animated"> 
                        {returnStr}   
                    </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </React.Fragment>
                );
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
        else 
        {
            return '';
        }
    }
  
    
    function showChield(children,treeIds)
    {
        if(children.length>0) {
           let data = children.map((item,index)=>{
                indexCount++;
                if(innerICDCode===item.name) {
                        if(!expanded1) {
                        treeIds.push(indexCount);
                        setExpanded1(treeIds);
                    }
                return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name} nodeId={`00${item.id}`} label={<React.Fragment><div style={{'fontWeight':'bold'}} id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span style={{'boxShadow':'rgb(158, 143, 143) -2px 3px 20px 10px'}}  data-nodeId={indexCount}  data-id={item.id} id={item.id} className="mt-2 mb-2 ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc} </div> {showChield(item.children,treeIds)}</React.Fragment>}></TreeItem>);
                    }
                else 
                {
                    return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name} nodeId={`00${item.id}`} label={<React.Fragment><div id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span data-nodeId={indexCount} data-tag={item.name} data-id={item.id} id={item.id}  className="mt-2 mb-2 ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc}</div> {showChield(item.children,treeIds)} </React.Fragment>}></TreeItem>);
                }
                
            })
            return data;
        }
        else {
            return '';
        }
    }
    
    const getPdf = () =>{
        let number = diagsInformation.acs;
        const token = localStorage.getItem('token');
            fetch(config.API_ORIGIN+'icd/acs/'+number, {
                method: "GET",
                headers: {
                    'Accept': 'application/json;x-www-form-urlencoded; charset=UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Authorization: "Bearer " + token
                },
            })
            .then(response => response.text())
            .then(res =>{
                var len = res.length;
                var bytes = new Uint8Array( len );
                for (var i = 0; i < len; i++){
                    bytes[i] = res.charCodeAt(i);
                }
               const  renderPdf = bytes.buffer;
                
                setPdfData(renderPdf);
                setpopupmodal(!popupModal);
            }
                
              )
            .catch(error => {
                // log(error)
            });
        
    }
    const applyCode = () =>{
        if(innerICDCode)
        {
            if(innerICDCodeStatus===true) {
                props.addICDCode(innerICDCode,cof,1);
                props.toggleTabularListInner();
                props.resetSession();
            }
            else 
            {
               
                showToast('warning');
            }
        }
    }
    if(sectionsData) {
        diags=sectionsData.diags;
     
    }
   
   
   
    const manageCofFlag = (e)=>{
        setCof(e.target.checked);
    }
    const Pdfclosepopup=()=>{
        
          setpopupmodal(!popupModal);
        
    }
        return (
            <React.Fragment>
              <Toast 
            toastList={list}
            position='top-right'
            autoDelete={checkValue}
            dismissTime={dismissTime}
        />   
            <Pdf popupModal={popupModal} Pdfclosepopup={Pdfclosepopup} pdfData={pdfData} />
            <Modal
                isOpen={props.modal}
                toggle={closeInnerPOpup}
                className='modal-full-width'
                >
                <ModalHeader style={{'background':'#f3f4f8' }} toggle={closeInnerPOpup}>ICD-10</ModalHeader>
                <ModalBody style={{'background':'#f3f4f8','height':'483px'}}>
                    <Row>

                        <Col md={7}>
                       
                            <Card>
                                
                            
                                <CardHeader style={{'height':'80px'}}>
                                 <h4>{sectionsData.desc}</h4>
                                </CardHeader>
                                <CardBody style={{'maxheight':'375px','height':'375px'}}>
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
                                        if(innerICDCode===item.name) {
                                            if(!expanded1) {
                                                treeIds.push(indexCount);
                                                setExpanded1(treeIds);
                                            }
                                            return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name}   nodeId={`00${item.id}`}  label={<React.Fragment><div style={{'fontWeight':'bold'}} id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span style={{'boxShadow':'rgb(158, 143, 143) -2px 3px 20px 10px'}} data-nodeId={indexCount} data-tag={item.name} data-id={item.id} id={item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)} className="mt-2 mb-2 ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc}</div></React.Fragment>}>
                                                {showChield(item.children,treeIds)}
                                            </TreeItem>);
                                        }
                                        else 
                                        {
                                            return (<TreeItem key={indexCount}  data-id={item.id} data-tag={item.name}   nodeId={`00${item.id}`}  label={<React.Fragment><div id={'parent_'+item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)}><span data-nodeId={indexCount} data-tag={item.name} data-id={item.id} id={item.id} onClick={()=>setKeyword(item.name,item.id,item.desc)} className="mt-2 mb-2 ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{item.name}</span> {item.desc}</div></React.Fragment>}>
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
                                <CardHeader style={{'height':'80px'}}>
                                <h4 className="text-dark">Selected Code <span className="ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{innerICDCode}</span> <span style={{'fontSize':'12px  ','color':'#0000008c'}}>{diagsInformation.desc}</span><br/> { diagsInformation.acs && <span onClick={getPdf} style={{color:'#ff8f8a',fontSize:'1.0rem',cursor:'pointer'}}>ACS : { diagsInformation.acs }</span> }</h4>
                                <ShowCharacter />
                                </CardHeader>
                                <CardBody style={{'maxheight':'375px', 'height':'375px'}}>
                                <SimpleBar style={{ maxHeight: 350,paddingBottom:'10px'}}>
                                    <div>{getParsedString(diagsInformation.inclusionTerm)}</div>
                                    <div>{getParsedString(diagsInformation.definition)}</div>
                                    <div>{getParsedNote(diagsInformation.notes)}</div>
                                     <TreeView
                                    className={classes.root}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    
                                    multiSelect
                                    >
                                    <TreeItem  data-id="A" nodeId="1000" label={<span className="text-dark">More Information</span>}>
                                         
                                        {secondPopupRightData.rightObj && secondPopupRightData.rightObj.includes }
                                        {secondPopupRightData.rightObj && secondPopupRightData.rightObj.excludes1 }
                                        {secondPopupRightData.rightObj && secondPopupRightData.rightObj.codeAlso }
                                        {secondPopupRightData.rightObj && secondPopupRightData.rightObj.cfirst } 
                                        {secondPopupRightData.rightObj && secondPopupRightData.rightObj.useACode }
                                        
                                        
                                      
                                        
                                    </TreeItem>
                                    </TreeView> 
                                 </SimpleBar>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className="modalFooter">
                    <Row>
                        
                        <Col md={7}>
                            &nbsp;
                        </Col>                  
                        <Col md={5}>
                            <div className="cof_checkbox">
                                <input value="1" onChange={manageCofFlag} style={{'zIndex':'100'}} type="checkbox" /> <label>Condition Onset Flag</label>
                            </div>
                            <div className="innerpopup_button">
                                <Button style={{'zIndex':'100'}} color="primary" onClick={closeInnerPOpup}><i className="mdi mdi-arrow-left"></i> Search Results</Button>&nbsp;&nbsp;
                                                
                                    { // eslint-disable-next-line 
                                    innerICDCodeStatus == false &&  <React.Fragment>
                                        <Button style={{'zIndex':'100'}} id={`tooltip-top`} color="secondary">Select Code <i className="mdi mdi-arrow-right"></i></Button>
                                        <UncontrolledTooltip placement="top" target={`tooltip-top`}>
                                        The selected code is
                                        not billable. Please choose a valid sub-category
                                        </UncontrolledTooltip>
                                        </React.Fragment>
                                    }
                                    
                                    {// eslint-disable-next-line 
                                    innerICDCodeStatus == true &&  <Button style={{'zIndex':'100'}} color="success" onClick={applyCode}>Select Code <i className="mdi mdi-arrow-right"></i></Button>
                                    }
                            </div>
                        </Col>    
                    </Row>    
                    
                   
                </ModalFooter>
            </Modal>
            </React.Fragment>
    );
    }
    else 
    {
        return(<div> <Toast 
            toastList={list}
            position='top-right'
            autoDelete={checkValue}
            dismissTime={dismissTime}
        /></div>);
    }
};

export default TabularListInner;