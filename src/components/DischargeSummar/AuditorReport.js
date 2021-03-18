import React,{ useState,useEffect } from "react";
import ExecuteApi from '../ExecuteApi';
import Report2 from './Report2';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import '../../assets/scss/annotation.scss';
import $ from 'jquery';

const AuditorReport = (props) => {
    const disid=props.id.disid;
    
    const [state, setState] = useState([]);
    const [state1, setState1] = useState([]);
    const [chronic, setchronic] = useState([]);
    const [pprocedure, setpprocedure] = useState([]);
    const [sprocedure, setsprocedure] = useState([]);
	 const [selectedLabelAnnotation, setSelectedLabelAnnotation] = useState([]);
     const [activeItem, setActiveItem] = useState([]);
    
     let padd_obj = {id:props.id.id,disid:disid,type:props.id.type,label_id:activeItem,selectedLabelAnnotation:[]};
	 padd_obj.selectedLabelAnnotation = selectedLabelAnnotation;
    useEffect(()=>{
        let primary_diagnosis =[];
        let secondary_diagnosis =[];
        let primary_procedure = [];
        let secondary_procedure = [];
        let chronic_arr =[];
        ExecuteApi('coder_sessions/'+disid,'GET').then((resp)=>{
            if(resp) {
                let minLabelPriority1='';
                let minLabelPriority2='';
                resp.coder_discharge_labels && resp.coder_discharge_labels.map((item)=>{
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
                        return 0;
                });
                resp.coder_discharge_labels && resp.coder_discharge_labels.map((item,index) => {
                    if(item.status !== 3){
                    if(item.label_type===1) {
                        if(item.label_priority===minLabelPriority1) {
                            let obj = {id:index,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                            primary_diagnosis.push(obj);
                        }
                        if(item.label_priority!==minLabelPriority1) {
                            let obj = {id:(1000+index),'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'label_priority':item.label_priority,'status':item.status,'reviewed':item.reviewed};
                            secondary_diagnosis.push(obj);
                        }
                    }
                    if(item.label_type===3) {
                        let obj = {id:(2000+index),'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                        chronic_arr.push(obj);
                    }
                    if(item.label_type===2) {
                        if(item.label_priority===minLabelPriority2) {
                            let obj = {id:(3000+index),'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                            primary_procedure.push(obj);
                        }
                        if(item.label_priority!==minLabelPriority2) {
                            let obj = {id:(4000+index),'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                            secondary_procedure.push(obj);
                        }
                    }
                }   
                return 0; } );
               
                
                if(primary_diagnosis) {
                    if(primary_diagnosis[0]) {
                        let current_level=primary_diagnosis[0].label_id;
                        let currentItem = { label_id : current_level, label_status : primary_diagnosis[0].status};
                        

                        const count = localStorage.getItem('report_count');
                        if(count) {
                            for(let i=0;i<count;i++)
                            {

                                var elem1 = document.querySelector('.accordion_block_'+i);
                                if(elem1) {
                                    elem1.style.display = 'none';
                                }
                                var elem12 = document.querySelector('.desc_'+i);
                                if(elem12) {
                                    elem12.style.display = 'none';
                                }
                            }
                        }
                        ExecuteApi('coder_annotations/?coder_session__id='+padd_obj.disid+'&label__id='+current_level,'GET').then((resp)=>{
                            if(resp.length>0) {
                                setTimeout(function(){
                                    var elem0 = document.querySelector('.label_tab_'+current_level);
                                    if(elem0) {
                                        // eslint-disable-next-line
                                        if(resp[0].status == 2){
                                       // elem0.style.backgroundColor = selectedBackground;
                                        }
                                       // elem0.style.borderColor = selectedBorder;
                                    }
                                },500);
                                if(document.getElementById('ShowAuditorNotFoundMessage')) {
                                    document.getElementById('ShowAuditorNotFoundMessage').innerHTML="";
                                }
                                setSelectedLabelAnnotation(resp);
                                resp.map((item) =>{
                                        if(item.status!==3){
                                            var elem = document.querySelector('.active_report_'+item.report);
                                            if(elem) {
                                                elem.style.setProperty('background-color', '#f3f4f8', 'important');
                                                elem.style.display = 'block';
                                            }

                                            var elem1 = document.querySelector('.activedesc_'+item.report);
                                            if(elem1) {
                                                elem1.style.setProperty('background-color', '#f3f4f8', 'important');
                                                elem1.style.display = 'block';
                                            }
                                        }
                                    return 1;
                                });
                            }
                            else 
                            {
                                if(document.getElementById('ShowAuditorNotFoundMessage')) {
                                    document.getElementById('ShowAuditorNotFoundMessage').innerHTML="<h2 className='mt-4' align='center'>No Record Found</h2>";
                                }
                            }
                            
                        }); 
                        setActiveItem(currentItem);
                    }
                    else 
                    {
                        const count = localStorage.getItem('report_count');
                        if(count) {
                            for(let i=0;i<count;i++)
                            {
                                var elem11 = document.querySelector('.accordion_block_'+i);
                                if(elem11) {
                                    elem11.style.display = 'none';
                                }

                                var elem122 = document.querySelector('.desc_'+i);
                                if(elem122) {
                                    elem122.style.display = 'none';
                                }
                            }
                        }
                        if(document.getElementById('ShowAuditorNotFoundMessage')) {
                            document.getElementById('ShowAuditorNotFoundMessage').innerHTML="<h2 className='mt-4' align='center'>No Record Found</h2>";
                        }
                    }
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
    },[disid,padd_obj.disid]);
    const recallApi = ()=>{
        let primary_diagnosis =[];
        let secondary_diagnosis =[];
        let primary_procedure = [];
        let secondary_procedure = [];
        let chronic_arr =[];
        ExecuteApi('coder_sessions/'+disid,'GET').then((resp)=>{
            if(resp) {
                let minLabelPriority1='';
                let minLabelPriority2='';
                resp.coder_discharge_labels && resp.coder_discharge_labels.map((item)=>{
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
                        return 0;
                });
                resp.coder_discharge_labels && resp.coder_discharge_labels.map((item,index) => {
                    if(item.status !== 3){
                    if(item.label_type===1) {
                        if(item.label_priority===minLabelPriority1) {
                            let obj = {id:index,'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                            primary_diagnosis.push(obj);
                        }
                        if(item.label_priority!==minLabelPriority1) {
                            let obj = {id:(1000+index),'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'label_priority':item.label_priority,'status':item.status,'reviewed':item.reviewed};
                            secondary_diagnosis.push(obj);
                        }
                    }
                    if(item.label_type===3) {
                        let obj = {id:(2000+index),'name':item.diag.name,'desc':item.diag.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                        chronic_arr.push(obj);
                    }
                    if(item.label_type===2) {
                        if(item.label_priority===minLabelPriority2) {
                            let obj = {id:(3000+index),'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                            primary_procedure.push(obj);
                        }
                        if(item.label_priority!==minLabelPriority2) {
                            let obj = {id:(4000+index),'name':item.proc.name,'desc':item.proc.desc,'label_id':item.id,'status':item.status,'reviewed':item.reviewed};
                            secondary_procedure.push(obj);
                        }
                    }
                }   
                return 0; } );
               
                
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
    const labelFilter=(e)=> {
       
        $('.badge').removeClass('selected selectedBorder');
        
        let current_level=e.target.dataset.label_id;
		let currentItem = { label_id : current_level, label_status : e.target.dataset.label_status};
        var elem0 = document.querySelector('.label_tab_'+current_level);
        if(elem0) {
            // eslint-disable-next-line
            if(e.target.dataset.label_status ==2){
            // elem0.style.backgroundColor = selectedBackground;
            
            $('#tag'+current_level).addClass('selected');
            }
            // elem0.style.borderColor = selectedBorder;
            $('#tag'+current_level).addClass('selectedBorder');
        }
        const count = localStorage.getItem('report_count');
         if(count) {
            for(let i=0;i<count;i++)
            {
                var elem1 = document.querySelector('.accordion_block_'+i);
                if(elem1) {
                    elem1.style.display = 'none';
                }
                var elem12 = document.querySelector('.desc_'+i);
                if(elem12) {
                    elem12.style.display = 'none';
                }
            }
        }
        ExecuteApi('coder_annotations/?coder_session__id='+padd_obj.disid+'&label__id='+e.target.dataset.label_id,'GET').then((resp)=>{
            if(resp.length>0) {
                if(document.getElementById('ShowAuditorNotFoundMessage')) {
                    document.getElementById('ShowAuditorNotFoundMessage').innerHTML="";
                }
                setSelectedLabelAnnotation(resp);
                resp.map((item) =>{
                        if(item.status!==3){
                            var elem = document.querySelector('.active_report_'+item.report);
                            if(elem) {
                                elem.style.setProperty('background-color', '#f3f4f8', 'important');
                                elem.style.display = 'block';
                            }   
                            var elem1 = document.querySelector('.activedesc_'+item.report);
                            if(elem1) {
                                elem1.style.setProperty('background-color', '#f3f4f8', 'important');
                                elem1.style.display = 'block';
                            }
                        }

                    return 1;
                });
            }
            else 
            {
                if(document.getElementById('ShowAuditorNotFoundMessage')) {
                    document.getElementById('ShowAuditorNotFoundMessage').innerHTML="<h2 className='mt-4' align='center'>No Record Found</h2>";
                }
            }
            
        }); 
       if(activeItem){
                if(activeItem.label_id !== current_level){
				 var elem2 = document.querySelector('.label_tab_'+activeItem.label_id);
				 if(elem2){
                    if(Number(activeItem.label_status) === 2){
                        elem2.style.backgroundColor = 'rgba(10, 207, 151, 0.18)';
                        elem2.style.borderColor = '#0acf97';
                    }
                    else{
                        elem2.style.backgroundColor = 'transparent';
                        elem2.style.borderColor = '#0acf97';
                    }
                 }
                }
		}
		setActiveItem(currentItem);

    }
    const changeReviewStatus =(e)=>{
        let id=e.target.dataset.id;
        let value = e.target.dataset.check;
        ExecuteApi('coder_discharge_labels/'+id,'PATCH','',{'reviewed': value}).then((resp)=>{ 
            // setChange(!change);
            recallApi();
        
            if(document.getElementById("popovertop"+id)) {
                document.getElementById("popovertop"+id).click();
                
            }
          
        });
    }
    return (
        <div className="row mt-4"> 
            <div className="col-sm-6">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="data_block1 mb-4">
                    <div className="pt-2 pl-2">PRIMARY DIAGNOSIS </div>
                        {state && state.map((item,index) => {
                           
                            if(item.status !== 3){
                        let custom_style='';
                        if(item.status===2) {
                            custom_style=' confirmed selected';   
                        }
                        else {
                            custom_style=' confirmed-without-background';
                        }
                       
                        let review = <i className="mdi mdi-account-minus" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                        let changeReview = <i className="mdi mdi-account-check" data-id={item.label_id} data-check='true' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                        if(item.reviewed===true)
                        {
                          
                            review = <i className="mdi mdi-account-check" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                            changeReview = <i className="mdi mdi-account-minus" data-id={item.label_id} data-check='false' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                        }
                        let classnamestr="badge  badge-outline-success label_tab_"+item.label_id+''+custom_style;
                        return (<React.Fragment><div style={{cursor:'pointer'}} className={classnamestr} id={`tag${item.label_id}`}><span data-label_status={item.status} style={{padding:'8px 0px 8px 0px'}} data-label_id={item.label_id}  onClick={labelFilter} key={item.id}>{item.name}-{item.desc}</span><span id={`popovertop${item.label_id}`} >{review}</span></div><UncontrolledPopover className="flagPopover"  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top-end" target={`popovertop${item.label_id}`}>
                        <PopoverBody>
                        { changeReview }
                        
                        </PopoverBody>
                    </UncontrolledPopover></React.Fragment>); 
                        }else { return ''}
                        } )}
                    </div>
                    <div className="data_block1 mb-4">
                    <div className="p-2 pl-2">SECONDARY DIAGNOSIS</div>
                            {state1 && state1.map((item,index) => {
                                if(item.status !== 3){
                        let custom_style='';
                        if(item.status===2) {
                            custom_style=' confirmed';   
                        }
                        else {
                            custom_style=' confirmed-without-background' ;
                        }
                       
                        let review = <i className="mdi mdi-account-minus" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                        let changeReview = <i className="mdi mdi-account-check" data-id={item.label_id} data-check='true' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                        if(item.reviewed===true)
                        {
                            
                            review = <i className="mdi mdi-account-check" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                            changeReview = <i className="mdi mdi-account-minus" data-id={item.label_id} data-check='false' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                        }
						let classnamestr="badge badge-outline-success label_tab_"+item.label_id+''+custom_style;
                    return (<div style={{cursor:'pointer'}} id={`tag${item.label_id}`}   className={classnamestr}><span data-label_status={item.status} style={{padding:'8px 0px 8px 0px'}} data-label_id={item.label_id}  onClick={labelFilter} key={item.id}>{item.name}-{item.desc}</span><span id={`popovertop${item.label_id}`} > {review} </span><UncontrolledPopover className="flagPopover"  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top-end" target={`popovertop${item.label_id}`}>
                    <PopoverBody>
                    { changeReview }
                    
                    </PopoverBody>
                </UncontrolledPopover></div>); 
                        }else { return ''; }
                        } )}
                    </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="data_block2 mb-4">
                            <div className="pt-2 pl-2">PRIMARY PROCEDURE</div>
                           
                                    {pprocedure && pprocedure.map((item,index) => {
                                        if(item.status !== 3){
                                    let custom_style='';
                                    if(item.status===2) {
                                        custom_style=' confirmed' 
                                    }
                                    else {
                                        custom_style=' confirmed-without-background' 
                                    }
                                 
                                    let review = <i className="mdi mdi-account-minus" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                                    let changeReview = <i className="mdi mdi-account-check" data-id={item.label_id} data-check='true' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                                    if(item.reviewed===true)
                                    {
                                       
                                        review = <i className="mdi mdi-account-check" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                                        changeReview = <i className="mdi mdi-account-minus" data-id={item.label_id} data-check='false' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                                    }
									let classnamestr="badge badge-outline-success label_tab_"+item.label_id+''+custom_style;
                                return (<div  style={{cursor:'pointer'}} id={`tag${item.label_id}`}  className={classnamestr}><span style={{padding:'8px 0px 8px 0px'}}  data-label_status={item.status} data-label_id={item.label_id}  onClick={labelFilter}  key={item.id}>{item.name}-{item.desc}</span><span id={`popovertop${item.label_id}`}> {review}</span> <UncontrolledPopover className="flagPopover"  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top-end" target={`popovertop${item.label_id}`}>
                                <PopoverBody>
                                { changeReview }
                                
                                </PopoverBody>
                            </UncontrolledPopover></div>); }else { return ''; }} )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="data_block2 mb-4">
                            <div className="pt-2 pl-2">SECONDARY PROCEDURE</div>
                            
                                {sprocedure && sprocedure.map((item,index) => {
                                    if(item.status !== 3){
                                    let custom_style= '';
                                    if(item.status===2) {
                                        custom_style= ' confirmed';  
                                    }
                                    else {
                                        custom_style=' confirmed-without-background'
                                    }
                                   
                                    let review = <i className="mdi mdi-account-minus" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                                    let changeReview = <i className="mdi mdi-account-check" data-id={item.label_id} data-check='true' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                                    if(item.reviewed===true)
                                    {
                                       
                                        review = <i className="mdi mdi-account-check" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                                        changeReview = <i className="mdi mdi-account-minus" data-id={item.label_id} data-check='false' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                                    }
									let classnamestr="badge badge-outline-success label_tab_"+item.label_id+''+custom_style;
                                return (<div style={{cursor:'pointer'}} id={`tag${item.label_id}`}  className={classnamestr}><span style={{padding:'8px 0px 8px 0px'}}  data-label_status={item.status} data-label_id={item.label_id}  onClick={labelFilter} key={item.id}>{item.name}-{item.desc}</span> <span  id={`popovertop${item.label_id}`}>{review}</span>
                                    <UncontrolledPopover className="flagPopover"  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top-end" target={`popovertop${item.label_id}`}>
                                <PopoverBody>
                                { changeReview }
                                
                                </PopoverBody>
                            </UncontrolledPopover>
                                </div>); }else { return ''; }} )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="data_block3 mt-4">
                            <div className="pt-2 pl-2">CHRONIC CONDITION</div>
                                    {chronic && chronic.map((item,index) => {
                                        if(item.status !== 3){
                                    let custom_style='';
                                    if(item.status===2) {
                                        custom_style=' confirmed';   
                                    }
                                    else {
                                        custom_style=' confirmed-without-background';
                                    }
                                   
                                    let review = <i className="mdi mdi-account-minus" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                                    let changeReview = <i className="mdi mdi-account-check" data-id={item.label_id} data-check='true' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                                    if(item.reviewed===true)
                                    {
                                       
                                        review = <i className="mdi mdi-account-check" style={{fontSize:'15px;',marginLeft:'0.5rem'}}></i>
                                        changeReview = <i className="mdi mdi-account-minus" data-id={item.label_id} data-check='false' onClick={changeReviewStatus} style={{fontSize:'15px;'}}></i>
                                    }
										let classnamestr="badge badge-outline-success label_tab_"+item.label_id+''+custom_style;
                                return (<div style={{cursor:'pointer'}} id={`tag${item.label_id}`} className={classnamestr}><span style={{padding:'8px 0px 8px 0px'}} data-label_id={item.label_id} data-label_status={item.status}  onClick={labelFilter} key={item.id}>{item.name}-{item.desc}</span><span id={`popovertop${item.label_id}`}> {review}</span>
                                 <UncontrolledPopover className="flagPopover"  trigger="legacy" id={`popovertop1${item.label_id}`}  placement="top" target={`popovertop${item.label_id}`}>
                                <PopoverBody>
                                { changeReview }
                                
                                </PopoverBody>
                            </UncontrolledPopover>
                                </div>); }else { return ''; }} )}
                        </div>
                        
                    </div>
                </div> 
            </div>
            <div className="col-sm-6">
                <Report2 id={padd_obj} />
            </div>
        </div>
    );
};
export default AuditorReport;
