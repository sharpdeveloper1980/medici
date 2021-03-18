import React,{ useEffect  } from 'react';
import {Row,Col,Modal, ModalHeader,ModalBody,Card,CardBody,CardHeader,DropdownToggle,DropdownMenu,DropdownItem,UncontrolledButtonDropdown,ModalFooter,Button } from 'reactstrap';
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
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 800,
    },
  });

 
  
const ProcedureInnerModal = (props) => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [expanded, setExpanded] = React.useState(["1"]);
    const [moreinfoState, setmoreinfoState] = React.useState(false);
    // eslint-disable-next-line
    const [selected, setSelected] = React.useState([]);
   // const [expanded1, setExpanded1] = React.useState(false);
    const [innerICDCode, setinnerICDCode] = React.useState(false);

    
    // eslint-disable-next-line
    const [innerICDDesc, setinnerICDDesc] = React.useState(false);
    const [sectionsData, setsectionsData] = React.useState([]);
    const [secondPopupRightData, setSecondPopupRightData] = React.useState([]);
    const [diagsInformation, setdiagsInformation] = React.useState([]);
    const [popupModal,setpopupmodal] = React.useState(false);
    const [cof, setCof] = React.useState(false);
    const [pdfData,setPdfData] = React.useState([]);
    // eslint-disable-next-line
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };
    
    
    
    const closeInnerPOpup=()=>{
        setdiagsInformation('');
        setSecondPopupRightData([]);
       setsectionsData('');
       setExpanded(false);
       //setExpanded1(false);
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
        ExecuteApi('icd/procs/?name='+tag,'GET').then((resp)=>{
            if(resp.length>0) {
                if(resp[0].block){
                    ExecuteApi('icd/achi_blocks/?name='+resp[0].block,'GET').then((sectionsResp)=>{ 
                        if(sectionsResp)
                        {
                            setsectionsData(sectionsResp[0]);      
                        }
                    });
                }
                if(resp.length > 0) {
                    setdiagsInformation(resp[0]);
                    showRightInfo(resp[0]);
                }
            }
        });  
    }
    
    const setBlock = (tag) => {
        setmoreinfoState(false);
       
        
        ExecuteApi('icd/achi_blocks/?name='+tag,'GET').then((resp)=>{
            if(resp.length>0) {
               
                        setsectionsData(resp[0]);
                    
                    
                
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
        return parse(item,{
            replace : domNode=>{
                if(domNode.name == 'proc'){
                    let code_text = domNode.prev.children[0].data
                    return <span style={{lineHeight:'0.5'}} data-tag={domNode.firstChild.data} onClick={()=>setKeyword(domNode.firstChild.data,id,desc)} className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode">{code_text}</span>
                }
                if(domNode.name == 'block'){
                    let code_text = domNode.prev.children[0].data
                    return <span style={{lineHeight:'0.5'}}  data-tag={domNode.firstChild.data} onClick={()=>setBlock(domNode.firstChild.data)} className="pt-1 pl-1 pr-1 pb-1 badge block_css">{code_text}</span>
                }
                if(domNode.name == 'text')
                    return <span></span>
            }
        });
      
    }
    function showRightInfo(data){
        let codeFirst = [];
        let codeAlsoWhenPerfList = [];
        let codeAlsoList = [];
        let excludes1 =[];
        let includes =[];
       
        let cfirst ='';
        let codeAlsoWhenPerf='';
        let codeAlso='';
        let excludes1data='';
        let includesdata='';
        let rightObj = '';

        if(data){
            rightObj  = {'desc': data.desc};
        }
       
      
        if(data) {
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
            if(item.rule_type === 6){
                codeAlsoWhenPerfList.push(item);
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
            cfirst=<React.Fragment><TreeItem nodeId="2" label="Code First">{cfirstInnser}</TreeItem></React.Fragment>
            rightObj.cfirst=cfirst;
        }
        if(codeAlsoWhenPerfList.length>0)
        {
            let codeAlsoWhenPerfInnser = codeAlsoWhenPerfList.map((item,index)=>{
                let newIndex = index+200;
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
              
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            codeAlsoWhenPerf=<React.Fragment><TreeItem nodeId="3" label="Code Also When Performed">{codeAlsoWhenPerfInnser}</TreeItem></React.Fragment>
            rightObj.codeAlsoWhenPerf=codeAlsoWhenPerf;
        }
        if(codeAlsoList.length>0)
        {
            let codeAlsoInner = codeAlsoList.map((item,index)=>{
                let newIndex = index+300;
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
               
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
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
               
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
                 var finalStr = showButtonSecondPopup(item.note,data.desc,item.id);
               
                let str =<React.Fragment><TreeItem nodeId={newIndex} label={finalStr} /></React.Fragment>    
                return str;
            });
            includesdata=<React.Fragment><TreeItem nodeId="6" label="includes">{includesInner}</TreeItem></React.Fragment>
            rightObj.includes=includesdata;
        }
       
         setSecondPopupRightData({rightObj});
         
         
     }
   
}

    useEffect(()=>{
        
        setCof(false);
        if(props.ICDcode) {
            setinnerICDCode(props.ICDcode);
            setinnerICDDesc(props.ICDDesc);
            
        }
        if(props.diagsInformation && props.sectionsData) {
            setsectionsData(props.sectionsData[0]);
            setdiagsInformation(props.diagsInformation[0]);
            
            showRightInfo(props.diagsInformation[0]);
            
        }
// eslint-disable-next-line
   },[props.sectionsData,props.diagsInformation,props.ICDcode,props.ICDDesc,props.ICDStatus]);
  // eslint-enable-next-line
    if(props.diagsInformation && props.sectionsData) {
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
            //   log(error);
            });
        
    }
    const applyCode = () =>{
        if(innerICDCode)
        {
           
                props.addICDCode(innerICDCode,cof,2);
                props.toggleTabularListInner();
                props.resetSession();
           
        }
    }
    
   
  
    
    const Pdfclosepopup=()=>{
        
          setpopupmodal(!popupModal);
        
    }
        return (
            <React.Fragment>
                
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
                                 <h4>{sectionsData && sectionsData.desc}</h4>
                                </CardHeader>
                                <CardBody style={{'maxheight':'375px', 'height':'375px'}}>
                                <SimpleBar style={{ maxHeight: 350 }}>
                                    <h4>{sectionsData && sectionsData.chapter && sectionsData.chapter.name }</h4>
                                    <p>{sectionsData && sectionsData.chapter && sectionsData.chapter.desc }</p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.chapter && sectionsData.chapter.notes }} ></p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.chapter && sectionsData.chapter.excludes1 }}></p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.chapter && sectionsData.chapter.includes }}></p>
                                    
                                    <h4>{sectionsData && sectionsData.section && sectionsData.section.name }</h4>
                                    <p>{sectionsData && sectionsData.section &&  sectionsData.section.desc }</p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.section && sectionsData.section.notes }} ></p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.section && sectionsData.section.excludes1 }}></p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.section && sectionsData.section.includes }}></p>

                                    <h4>{sectionsData && sectionsData.category && sectionsData.category.name }</h4>
                                    <p>{sectionsData && sectionsData.category && sectionsData.category.desc }</p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.category && sectionsData.category.notes }} ></p>
                                    <p dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.category && sectionsData.category.excludes1 }}></p>
                                    <p  dangerouslySetInnerHTML={{__html: sectionsData && sectionsData.category && sectionsData.category.includes }}></p>
                                    
                                    {sectionsData && sectionsData.name  && <p>
                                        <span className="pt-1 pl-1 pr-1 pb-1 badge block_css">{ sectionsData.name }</span>
                                        <span>{ sectionsData.desc }</span>
                                    
                                    </p>}
                                    {sectionsData &&
                                        sectionsData.procs && sectionsData.procs.map((item)=>{
                                            return (
                                                <p>
                                            <span id={item.id}  className="pt-1 pl-1 pr-1 pb-1 badge tablularInnerPopupCode" style={{background:'#000',color:"#fff",padding:'0.5rem',marginRight:'1em'}} onClick={()=>setKeyword(item.name,item.id,item.desc)}>{ item.name }</span>
                                            <span>{ item.desc }</span>
                                            </p>
                                            );
                                        })
                                    }
                              
                                </SimpleBar>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={5}>
                            <Card>
                                <CardHeader style={{'height':'80px'}}>
                                <h4 className="text-dark">Selected Code <span className="ml-2 badge badge-primary pl-1 pr-1 pt-1 pb-1 tablularInnerPopupCode">{innerICDCode}</span> <span style={{'fontSize':'12px  ','color':'#0000008c'}}>{diagsInformation && diagsInformation.desc}</span><br/> {diagsInformation && diagsInformation.acs && <span onClick={getPdf} style={{color:'#ff8f8a',fontSize:'1.0rem',cursor:'pointer'}}>ACS : { diagsInformation.acs }</span> }</h4>
                                <ShowCharacter />
                                </CardHeader>
                                <CardBody style={{'maxheight':'375px', 'height':'375px'}}>

                                <SimpleBar style={{ maxHeight: 350,paddingBottom:'10px'}}>
                                    <div>{diagsInformation && getParsedString(diagsInformation.inclusionTerm)}</div>
                                    <div>{diagsInformation && getParsedString(diagsInformation.definition)}</div>
                                    <div>{diagsInformation && getParsedNote(diagsInformation.notes)}</div>
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
                                        {secondPopupRightData.rightObj && secondPopupRightData.rightObj.codeAlsoWhenPerf }
                                    </TreeItem>
                                    </TreeView> 
                                 </SimpleBar>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter style={{'background':'#f3f4f8'}} className="float-right">
                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
                
                 
                    <Button color="primary" style={{'zIndex':'100'}} onClick={closeInnerPOpup}><i className="mdi mdi-arrow-left"></i> Search Results</Button>
                                      
                        
                        
                        {// eslint-disable-next-line 
                         <Button style={{'zIndex':'100'}} color="success" onClick={applyCode}>Select Code <i className="mdi mdi-arrow-right"></i></Button>
                        }
                        
                    
                   
                </ModalFooter>
            </Modal>
            </React.Fragment>
    );
    }
    else 
    {
        return(<div><ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/></div>);
    }
};

export default ProcedureInnerModal;