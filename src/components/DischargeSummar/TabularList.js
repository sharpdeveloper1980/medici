import React,{useState,useEffect} from 'react';
import ExecuteApi from '../ExecuteApi';   
import {Row,Col,Button, Modal, ModalHeader, ModalBody,Input,CustomInput,UncontrolledTooltip} from 'reactstrap'; 
import TabularListInner from './TabularListInner';
import Spinner from '../Spinner';
import history from '../../utils/history';

const data = {
  id: 'root',
  name: 'Parent',
  children: [
  ],
};
function insert_node(data_arr, left, right,  node){
    if (data_arr.length === 0) {
      data_arr[0] = node;
      return 0;
    }
    
    if (left < right) { 
      var middle = Math.floor((left+right)/2);
      
      if (data_arr[middle].id === node.id) {
        return middle;
      }
      else if (data_arr[middle].id > node.id) {
        return insert_node(data_arr, left, middle, node);
      }
      else {
        return insert_node(data_arr, middle+1, right, node);
      }
    }
    
    data_arr.splice(right, 0, node)
    return right;
  }
export default function RecursiveTreeView(props) {
    const [response,setresponse] = useState([]);
    const [indexICDresponse,setindexIcdresponse] = useState([]);
    const [neoplasmICDresponse,setneoplasmIcdresponse] = useState([]);
    /* Old Code */
    const [options,setOption] = useState([]);
    const [selectedValue,setSelectedValue] = useState([]);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);
    const [ICDCode, setICDCode] = useState([]);
    const [ICDDesc, setICDDesc] = useState([]);
    const [ICDStatus, setICDStatus] = useState([]);
    
    const [ICDCodeTable, setICDCodeTable] = useState([]);
    const [ICDCheck, setICDCheck] = useState(1);
    const [ICDTable, setICDTable] = useState({'display':'none'});
    const [radioStatus, setradioStatus] = useState(1);
    const [ApiresponseLoader, setApiresponseLoader] = useState([]);
    const [innerModel, setinnerModel] = useState(false);
    const [diagsInformation, setDiagsInformation] = React.useState([]);
    const [sectionsData, setSectionsData] = React.useState([]);
    const [SearchWork, setSearchWork] = React.useState(false);
    const [searchFullindex, setsearchFullindex] = React.useState(false);
    
   
    const checkbocList=[
        {
            id:1,
            title:'Diseases & Injuries',
            isChecked:true
        },
        {
          id:2,
          title:'External causes of injuries',
          isChecked:false
      },
      {
          id:3,
          title:'Drugs and Chemicals',
          isChecked:false
      },
      {
          id:4,
          title:'Neoplasms',
          isChecked:false
      }
    ];
    useEffect(()=>{
        setICDCode(props.selectedCode);
       
    },[props.selectedCode]);
    const getSuggestion=(e)=>{
        setSelectedValue(e.target.value);
        setOption([]);
        if(e.target.value){
            setIsLoading(true);
            let url='';
            if (searchFullindex){
                if(Number(ICDCheck)===1)
                        url='icd/index/functional_suggest/?full_title_no_nemod_suggest_prefix__completion_match='+e.target.value;
                else if(Number(ICDCheck)===2)
                        url='icd/e_injury/functional_suggest/?full_title_no_nemod_suggest_prefix__completion_match='+e.target.value;
                else if(Number(ICDCheck)===3)
                        url='icd/drug/functional_suggest/?full_title_no_nemod_suggest_prefix__completion_match='+e.target.value;
                else if(Number(ICDCheck)===4)
                        url='icd/neoplasm/functional_suggest/?full_title_no_nemod_suggest_prefix__completion_match='+e.target.value;
            }
            else {
                if(Number(ICDCheck)===1)
                        url='icd/index_filter/suggest/?full_title_no_nemod_suggest__completion='+e.target.value;
                else if(Number(ICDCheck)===2)
                        url='icd/e_injury_filter/suggest/?full_title_no_nemod_suggest__completion='+e.target.value;
                else if(Number(ICDCheck)===3)
                        url='icd/drug_filter/suggest/?full_title_no_nemod_suggest__completion='+e.target.value;
                else if(Number(ICDCheck)===4)
                        url='icd/neoplasm_filter/suggest/?full_title_no_nemod_suggest__completion='+e.target.value;
            }
            ExecuteApi(url,'GET').then((resp)=>{
            try {
                if(searchFullindex) {
                    const options1 = resp.full_title_no_nemod_suggest_prefix__completion_match[0].options.map((i) => ({
                        id: i._id,
                        value : i.text,
                        label : i.text
                    }));
                
                    setOption(options1);
                }
                else 
                {
                    const options1 = resp.full_title_no_nemod_suggest__completion[0].options.map((i) => ({
                        id: i._id,
                        value : i.text,
                        label : i.text
                    }));
                    

                    setOption(options1);
                }
                
                setIsLoading(false);
            }
            catch(e) {
                history.push('/errorpage');
            }  
            });
        }
   }
   const handleChange=(value)=>{
      
       setSelectedValue(value);
        searchApi(value);
        setOption([]);
       
   }
   const manageKeyword=(e)=>{
       setSelectedValue(e.target.dataset.keyword);
       searchApi(e.target.dataset.keyword);
    }
  const setCodeonField=(e)=>{
      setICDCode(e.target.dataset.code);
      document.getElementById('text').value=e.target.dataset.code;
        addCodeOperation(e.target.dataset.code);
  }
  const DaggerCode=(e)=>{
    setICDCode(e.target.dataset.code);
    props.handleDagger(true);
    props.handleAsterisk(e.target.dataset.asterisk)
    document.getElementById('text').value=e.target.dataset.code;
      addCodeOperation(e.target.dataset.code);
}
  const setTagonChange=(e)=>{
    setICDCode(e.target.value);
  }
  const setICDCheckValue=(e)=>{
    setradioStatus(e.target.value);
        setresponse([]);
        setICDCode('');
        setSelectedValue([]);
        setICDTable({'display':'none'});
        setICDCheck(e.target.value);
        setindexIcdresponse([]);
        setneoplasmIcdresponse([]);
        setSearchWork(false);
  }
   function searchApi(value)
   {
    setSearchWork(1);
    let urlSegment ="index"; 
    let argument="search_simple_query_string";
    if (searchFullindex) {
        if(Number(ICDCheck)===1)
            urlSegment="index"; 
        else if(Number(ICDCheck)===2)
            urlSegment="e_injury";
        else if(Number(ICDCheck)===3)
            urlSegment="drug";
        else if(Number(ICDCheck)===4)
            urlSegment="neoplasm";
    }
    else {
        argument="full_title_no_nemod";
        if(Number(ICDCheck)===1)
            urlSegment="index_filter"; 
        else if(Number(ICDCheck)===2)
            urlSegment="e_injury_filter";
        else if(Number(ICDCheck)===3)
            urlSegment="drug_filter";
        else if(Number(ICDCheck)===4)
            urlSegment="neoplasm_filter"; 
    }

    setApiresponseLoader(1);
    ExecuteApi('icd/'+urlSegment+'/?'+argument+'='+value,'GET').then((resp)=>{ 
        try {
        if(resp){
            if(resp) {
                if(Number(ICDCheck)===1 || Number(ICDCheck)===2) {
                    if(searchFullindex)
                        setresponse(resp.results);
                    else 
                        setindexIcdresponse(resp.results);
                }
                if(Number(ICDCheck)===3 || Number(ICDCheck)===4) {
                    if(searchFullindex) {
                        setICDTable({'display':'block'});
                        let ICDArr=[];
                        resp.results.map((data)=>{
                        /* if(data.path.length===0) { */
                                //data.parent='';
                                ICDArr.push(data);
                                /*resp.results.map((data1)=>{
                                    if(data1.path.length>0)
                                    {
                                        data1.path.map((item)=>{
                                            if(item.title===data.title)
                                            {
                                                data1.parent=item.title;
                                                ICDArr.push(data1);
                                            }
                                            return 1;
                                        });
                
                                    }
                                    return 1;
                                });*/
                            return 1;
                        });
                        setICDCodeTable(ICDArr);
                    }
                    else
                        setneoplasmIcdresponse(resp.results);
                }
            }
        }
        setApiresponseLoader(0);
        }
        catch(e) {
            history.push('/errorpage');
        }
    });
   }
   function addCodeOperation(ICDCode)
   {
       if(ICDCode) {
        setinnerModel(true);
          setTimeout(() => {
            ExecuteApi('icd/diags/?name='+ICDCode,'GET').then((resp)=>{
                if(resp.length>0) {
                    setICDDesc(resp[0].desc);
                    setICDStatus(resp[0].billable);
                    ExecuteApi('icd/sections/'+resp[0].section,'GET').then((sectionsResp)=>{ 
                        setSectionsData(sectionsResp);
                    });
                    setDiagsInformation(resp);
                   
                }
            });   
          }, 500);
           

       }
   }
   
   function close_popup()
   {
        props.toggleModal();
        setresponse([]);
        //setICDCode('');
        setSelectedValue([]);
        setindexIcdresponse([]);
        setneoplasmIcdresponse([]);
        setICDTable({'display':'none'});
        setSearchWork(false);

   }
   const resetSession=()=>{
        setresponse([]);
        setICDCode('');
        setSelectedValue([]);
        setICDTable({'display':'none'});
   }
   const toggleTabularListInner=()=>{
    if(innerModel)
    {
      setDiagsInformation([]);
      setSectionsData([]);
      setinnerModel(false);
    }
    else 
    {
      setinnerModel(true);
    }
}
const manageSearch=(event)=>{
     var code = event.keyCode || event.which;
     var value = event.target.value;
     // eslint-disable-next-line
    if(selectedValue == ''){
         setOption([]);
     }
     if(code === 13) { 
        setresponse([]);
        setICDCode('');
        setOption([]);
        setICDTable({'display':'none'});
        searchApi(value);
     } 
}
   /* Olld Code */
  var i;
  if(response) {
	  data.children = [];
    for (i=0; i<response.length; i++){
        var path = response[i].path
    
        var j;
        var ind;
        var children = data.children;
        for (j=0; j<path.length; j++) {
          ind = insert_node(children, 0, children.length,
          {
            'id': path[j].title,
            'name': path[j].title,
            'code': path[j].code,
            'seecat': path[j].seecat,
            'subcat': path[j].subcat,
            'children': []
          });
          
          children = children[ind].children
        }
        ind = insert_node(children, 0, children.length,
          {
            'id': response[i].title,
            'name': response[i].title,
            'code': response[i].code,
            'seecat': response[i].seecat,
            'subcat': response[i].subcat,
            'path': response[i].path,
            'children' : []
          }
        )
        children[ind]['see'] = response[i].see;
        children[ind]['seeAlso'] = response[i].seeAlso;
        children[ind]['path'] = response[i].path;
        
      };
}
let index_lavel=0;
function manageInnerChield(clieldData,parentStr='',c1,objectLength)
{
    let itemData= '';
    if(clieldData.length>0)
    {   
        /* ICD Code */
        itemData = clieldData.map((data,index)=>{
            let chield_btn='';
            let str1='';
            let seeAlso='';
            let see='';
            let seecat='';
            let subcat='';
            if(data.seeAlso)
                seeAlso=<em><span className="icd_search_heading_2"> - see also </span><span className="icd_search_heading_3" data-keyword={data.seeAlso} onClick={manageKeyword}> {data.seeAlso} </span></em>
            if(data.see)
                see=<em><span className="icd_search_heading_2"> - see </span><span className="icd_search_heading_3" data-keyword={data.see} onClick={manageKeyword}> {data.see} </span></em>
            
            if(data.seecat) {
                seecat=<span onClick={setCodeonField} data-code={data.seecat.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.seecat.name}</span>; 
            }
            if(data.subcat) {
                subcat=<span onClick={setCodeonField} data-code={data.subcat.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.subcat.name}</span>; 
            }
            let pstring = '';
            if(data.path) {
            data.path.forEach((item)=>{
                pstring=item.title;
                if(item.code)
                {
                    pstring=pstring+' '+item.code.name;
                }
            })
            } 
            
            c1++;
            if(index!==(clieldData.length-1)){
                if(data.code)
                { 
                    chield_btn=<span onClick={setCodeonField} data-code={data.code.name} className="ml-1 icd_search_sub_2 linkbtn badge">{data.code.name}</span>;  
                }
                str1=<React.Fragment><span className="">{data.name}</span>{chield_btn} {seecat} {subcat} {seeAlso} {see}</React.Fragment>;
             } 
             else
             {
                if(data.code)
                {
                    chield_btn=<span onClick={setCodeonField} data-code={data.code.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.code.name}</span>;  
                }
                str1=<React.Fragment><span className="icd_search_sub_3">{data.name}</span>{chield_btn} {seecat} {subcat} {seeAlso} {see}</React.Fragment>;
             }
             return str1;
        })
    }
    return itemData;
}
function manageICDChield(clieldData,parentStr='')
{
    let c1=0;
    let itemData= '';
    if(clieldData.length>0)
    {   
        /* ICD Code */
        itemData = clieldData.map((data,index)=>{
            let chield_btn='';
            let str1='';
            let seeAlso='';
            let see='';
            let seecat='';
            let subcat='';
            if(data.seeAlso)
                seeAlso=<em><span className="icd_search_heading_2"> - see also </span><span className="icd_search_heading_3" data-keyword={data.seeAlso} onClick={manageKeyword}> {data.seeAlso} </span></em>
            if(data.see)
                see=<em><span className="icd_search_heading_2"> - see </span><span className="icd_search_heading_3" data-keyword={data.see} onClick={manageKeyword}> {data.see} </span></em>
            
            if(data.seecat) {
                seecat=<span onClick={setCodeonField} data-code={data.seecat.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.seecat.name}</span>; 
            }
            if(data.subcat) {
                subcat=<span onClick={setCodeonField} data-code={data.subcat.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.subcat.name}</span>; 
            }
            let pstring = '';
            if(data.path) {
            data.path.forEach((item)=>{
                pstring=item.title;
                if(item.code)
                {
                    pstring=pstring+' '+item.code.name;
                }
            })
            }
            if(data.d1.length>0)
            {
                if(data.code)
                {
                    chield_btn=<span onClick={setCodeonField} data-code={data.code.name} className="ml-1 icd_search_sub_2 linkbtn badge">{data.code.name}</span>;  
                }
                str1=<li key={index}><span className="">{data.name}</span>{chield_btn} {seecat} {subcat} {seeAlso} {see} { manageInnerChield(data.d1,parentStr,c1,data.children.length) }</li>;
            }
            else 
            {
                if(data.code)
                {
                    chield_btn=<span onClick={setCodeonField} data-code={data.code.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.code.name}</span>;  
                }
                str1=<li key={index}><span className="icd_search_sub_3">{data.name}</span>{chield_btn} {seecat} {subcat} {seeAlso} {see} { manageInnerChield(data.d1,parentStr,c1,data.children.length) }</li>;
            }
            return str1;
        })
    } 
    return itemData;
}
let mainData=data.children;

let chield_obj=[];
mainData.map((item)=>{
    item.c1=getFirstChield(item.children);
    chield_obj.push(item);
    return 1;
});
function getFirstChield(clieldData)
{
    let itemData= [];
    if(clieldData.length>0)
    {   
        /* ICD Code */
        itemData = clieldData.map((data)=>{
            data.d1=getLastChield1(data.children);
            return data;
        })
    } 
    return itemData;
}
function getLastChield1(clieldData)
{
    let itemData=[];
    if(clieldData.length>0)
    {   
        /* ICD Code */
       clieldData.map((data)=>{
            let d2=[];
            if(data.children.length>0) {
                d2=getLastChield(data.children);
                itemData.push(data);
                d2.map((it)=>{
                    itemData.push(it);
                    return 1;
                })
            }
            d2.push(data);
            return d2;
        })
       
    } 
    return itemData;
}

function getLastChield(clieldData)
{
    let itemData=[];
    if(clieldData.length>0)
    {   
        /* ICD Code */
        clieldData.map((data)=>{
            let d2=[];
            itemData.push(data);
            if(data.children.length>0) {
                d2=getLastChield(data.children);
            }
            d2.map((it)=>{
                itemData.push(it);
                return 1;

            })
            return d2;
        })   
    } 
    return itemData;
   
}
function ShowICDCodeTree()
   {   if(indexICDresponse.length>0)
       {
        return(<Row> 
            <Col md={12}>
                <ul className="icd_parent_list">
                    {indexICDresponse && indexICDresponse.map((item,index)=>{
                    let seeAlso='';
                    let see='';
                    let seecat='';
                    let subcat='';
                    let chield_btn='';
                    let dagger = '';
                    let asterisk = '';
                    if(item.dagger !== null && item.dagger){
                        dagger=<span onClick={DaggerCode} data-asterisk={item.asterisk.name} data-code={item.dagger.name} className="ml-1 icd_search_sub_2 badge">{item.dagger.name} †</span>; 
                    }
                    if(item.asterisk !== null && item.asterisk){
                        asterisk=<span  data-code={item.asterisk.name} className="ml-1 icd_search_sub_2 badge">{item.asterisk.name} *</span>; 
                    }
                    if(item.code !== null && item.code) {
                        chield_btn=<span onClick={setCodeonField} data-code={item.code.name} className="ml-1 icd_search_sub_2 badge">{item.code.name}</span>; 
                    }
                    if(item.seecat !== null && item.seecat) {
                        seecat=<span onClick={setCodeonField} data-code={item.seecat.name} className="ml-1 icd_search_sub_2 badge">{item.seecat.name}</span>; 
                    }
                    if(item.subcat !== null && item.subcat) {
                        subcat=<span onClick={setCodeonField} data-code={item.subcat.name} className="ml-1 icd_search_sub_2 badge">{item.subcat.name}</span>; 
                    }
                
                    if(item.seeAlso)
                            seeAlso=<em><span className="icd_search_heading_2"> - see also </span><span className="icd_search_heading_3" data-keyword={item.seeAlso} onClick={manageKeyword}> {item.seeAlso} </span></em>
    
                            if(item.see)
                                see=<em><span className="icd_search_heading_2"> - see </span><span className="icd_search_heading_3" data-keyword={item.see} onClick={manageKeyword}> {item.see} </span></em>
                        return (<li key={index}><strong>{item.full_title}</strong>{chield_btn} { dagger } { asterisk } {seecat} {subcat} {seeAlso} {see} <ul className="chieldList">{ manageindexICDChield(item.children) }</ul> </li>)
                   
                    })}
                </ul>
            </Col>
        </Row>);
       }
       if(neoplasmICDresponse.length>0)
       {
            if (Number(ICDCheck)===4){
                return(<Row> 
                    <Col md={12}>
                        <ul className="icd_parent_list">
                            {neoplasmICDresponse && neoplasmICDresponse.map((item,index)=>{
                            let seeAlso='';
                            let see='';
                            let chield_btn_1='-';
                            let chield_btn_2='-';
                            let chield_btn_3='-';
                            let chield_btn_4='-';
                            let chield_btn_5='-';
                            

                            if(item.col_1_code !== null && item.col_1_code) {
                                chield_btn_1=<span onClick={setCodeonField} data-code={item.col_1_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_1_code.name}</span>; 
                            }
                            if(item.col_2_code !== null && item.col_2_code) {
                                chield_btn_2=<span onClick={setCodeonField} data-code={item.col_2_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_2_code.name}</span>; 
                            }
                            if(item.col_3_code !== null && item.col_3_code) {
                                chield_btn_3=<span onClick={setCodeonField} data-code={item.col_3_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_3_code.name}</span>; 
                            }
                            if(item.col_4_code !== null && item.col_4_code) {
                                chield_btn_4=<span onClick={setCodeonField} data-code={item.col_4_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_4_code.name}</span>; 
                            }
                            if(item.col_5_code !== null && item.col_5_code) {
                                chield_btn_5=<span onClick={setCodeonField} data-code={item.col_5_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_5_code.name}</span>; 
                            }

                            if(item.seeAlso)
                                seeAlso=<em><span className="icd_search_heading_2"> - see also </span><span className="icd_search_heading_3" data-keyword={item.seeAlso} onClick={manageKeyword}> {item.seeAlso} </span></em>
            
                            if(item.see)
                                see=<em><span className="icd_search_heading_2"> - see </span><span className="icd_search_heading_3" data-keyword={item.see} onClick={manageKeyword}> {item.see} </span></em>
                            
                            return (<li key={index}><strong>{item.full_title}</strong> {seeAlso} {see}
                                <ol>
                                    <li><strong>Malignant Primary</strong>: {chield_btn_1}</li>
                                    <li><strong>Malignant Secondary</strong>: {chield_btn_2}</li>
                                    <li><strong>In Situ</strong>: {chield_btn_3}</li>
                                    <li><strong>Benign</strong>: {chield_btn_4}</li>
                                    <li><strong>Uncertain or unknown behaviour</strong>: {chield_btn_5}</li>
                                </ol>
                                <ul className="chieldList">{ manageindexICDChield(item.children) }</ul> </li>)
                        
                            })}
                        </ul>
                    </Col>
                </Row>);
            }
            else {
                return(<Row> 
                    <Col md={12}>
                        <ul className="icd_parent_list">
                            {neoplasmICDresponse && neoplasmICDresponse.map((item,index)=>{
                            let seeAlso='';
                            let see='';
                            let chield_btn_1='-';
                            let chield_btn_2='-';
                            let chield_btn_3='-';
                            let chield_btn_4='-';
                            let chield_btn_5='-';
                            

                            if(item.col_1_code !== null && item.col_1_code) {
                                chield_btn_1=<span onClick={setCodeonField} data-code={item.col_1_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_1_code.name}</span>; 
                            }
                            if(item.col_2_code !== null && item.col_2_code) {
                                chield_btn_2=<span onClick={setCodeonField} data-code={item.col_2_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_2_code.name}</span>; 
                            }
                            if(item.col_3_code !== null && item.col_3_code) {
                                chield_btn_3=<span onClick={setCodeonField} data-code={item.col_3_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_3_code.name}</span>; 
                            }
                            if(item.col_4_code !== null && item.col_4_code) {
                                chield_btn_4=<span onClick={setCodeonField} data-code={item.col_4_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_4_code.name}</span>; 
                            }
                            if(item.col_5_code !== null && item.col_5_code) {
                                chield_btn_5=<span onClick={setCodeonField} data-code={item.col_5_code.name} className="ml-1 icd_search_sub_2 badge">{item.col_5_code.name}</span>; 
                            }

                            if(item.seeAlso)
                                seeAlso=<em><span className="icd_search_heading_2"> - see also </span><span className="icd_search_heading_3" data-keyword={item.seeAlso} onClick={manageKeyword}> {item.seeAlso} </span></em>
            
                            if(item.see)
                                see=<em><span className="icd_search_heading_2"> - see </span><span className="icd_search_heading_3" data-keyword={item.see} onClick={manageKeyword}> {item.see} </span></em>
                            
                            return (<li key={index}><strong>{item.full_title}</strong> {seeAlso} {see}
                                <ol>
                                    <li><strong>Poisoning, Chapter 19</strong>: {chield_btn_1}</li>
                                    <li><strong>Poisoning, Accidental</strong>: {chield_btn_2}</li>
                                    <li><strong>Poisoning, Intentional self-harm</strong>: {chield_btn_3}</li>
                                    <li><strong>Poisoning, Undetermined intent</strong>: {chield_btn_4}</li>
                                    <li><strong>Adverse effect in therapeutic use</strong>: {chield_btn_5}</li>
                                </ol>
                                <ul className="chieldList">{ manageindexICDChield(item.children) }</ul> </li>)
                        
                            })}
                        </ul>
                    </Col>
                </Row>); 
            }
       }  
       else if(response.length>0) {
        return(<Row> 
        <Col md={12}>
            <ul className="icd_parent_list">
                {mainData && mainData.map((item,index)=>{
                let seeAlso='';
                let see='';
                let seecat='';
                let subcat='';
                let chield_code='';
                let chield_btn='';
                if(item.code !== null && item.code) {
                    chield_code=item.code.name;
                    chield_btn=<span onClick={setCodeonField} data-code={item.code.name} className="ml-1 icd_search_sub_2 badge badge-info">{item.code.name}</span>; 
                }
                if(item.seecat !== null && item.seecat) {
                    seecat=<span onClick={setCodeonField} data-code={item.seecat.name} className="ml-1 icd_search_sub_2 badge badge-info">{item.seecat.name}</span>; 
                }
                if(item.subcat !== null && item.subcat) {
                    subcat=<span onClick={setCodeonField} data-code={item.subcat.name} className="ml-1 icd_search_sub_2 badge badge-info">{item.subcat.name}</span>; 
                }
                
                if(item.seeAlso)
                    seeAlso=<em><span className="icd_search_heading_2"> - see also </span><span className="icd_search_heading_3" data-keyword={item.seeAlso} onClick={manageKeyword}> {item.seeAlso} </span></em>

                if(item.see)
                    see=<em><span className="icd_search_heading_2"> - see </span><span className="icd_search_heading_3" data-keyword={item.see} onClick={manageKeyword}> {item.see} </span></em>
                
                let parentStr=item.title+chield_code;

                if(item.children.length>0) {
                    index_lavel++
                }
                else 
                {
                    if(index_lavel>0)
                        index_lavel--;
                }
                if(item.c1>0) {
                    return (<li key={index}><strong>{item.name}</strong>{chield_btn} {seecat} {subcat} {seeAlso} {see} <ul className="chieldList">{ manageICDChield(item.c1,parentStr) }</ul> </li>)
                }
                else 
                {
                    return (<li key={index}><span className="icd_search_sub_3">{item.name}</span>{chield_btn} {seecat} {subcat} {seeAlso} {see} <ul className="chieldList">{ manageICDChield(item.c1,parentStr) }</ul> </li>)
                }
                })}
            </ul>
        </Col>
    </Row>);
    } 
    else if(ICDCodeTable.length>0)
    {
        if (Number(ICDCheck)===3){
            return(<Row>
                <Col md={12}>
                    <table className="table" style={ICDTable}>
                        <thead>
                                <tr>
                                    <th>Substance</th>
                                    <th>Poisoning, Chapter 19</th>
                                    <th>Poisoning, Accidental</th>
                                    <th>Poisoning, Intentional self-harm</th>
                                    <th>Poisoning, Undetermined intent</th>
                                    <th>Adverse effect in therapeutic use</th>
                                </tr>
                        </thead>
                        <tbody>
                        {ICDCodeTable && ICDCodeTable.map((item)=>{
                                let tagsArr={'tag1':'-','tag2':'-','tag3':'-','tag4':'-','tag5':'-','tag6':'-'};
                                if(item.col_1_code)
                                    tagsArr.tag1=item.col_1_code.name;
                                if(item.col_2_code)
                                    tagsArr.tag2=item.col_2_code.name;
                                if(item.col_3_code)
                                    tagsArr.tag3=item.col_3_code.name;
                                if(item.col_4_code)
                                    tagsArr.tag4=item.col_4_code.name;
                                if(item.col_5_code)
                                    tagsArr.tag5=item.col_5_code.name;
                                return(<tr>
                                    <td>{item.parent} <span className="table_icd_code_parent">{item.full_title}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag1} className="table_icd_code">{tagsArr.tag1}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag2} className="table_icd_code">{tagsArr.tag2}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag3} className="table_icd_code">{tagsArr.tag3}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag4} className="table_icd_code">{tagsArr.tag4}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag5} className="table_icd_code">{tagsArr.tag5}</span></td>
                                </tr>)          
                            })}    
                            
                        </tbody>
                    </table>
                </Col>
            </Row> 
            );
        }
        else {
            return(<Row>
                <Col md={12}>
                    <table className="table" style={ICDTable}>
                        <thead>
                                <tr>
                                    <th>Neoplasm</th>
                                    <th>Malignant Primary</th>
                                    <th>Malignant Secondary</th>
                                    <th>In Situ</th>
                                    <th>Benign</th>
                                    <th>Uncertain or unknown behaviour</th>
                                </tr>
                        </thead>
                        <tbody>
                        {ICDCodeTable && ICDCodeTable.map((item)=>{
                                let tagsArr={'tag1':'-','tag2':'-','tag3':'-','tag4':'-','tag5':'-','tag6':'-'};
                                if(item.col_2_code)
                                    tagsArr.tag1=item.col_2_code.name;
                                if(item.col_3_code)
                                    tagsArr.tag2=item.col_3_code.name;
                                if(item.col_4_code)
                                    tagsArr.tag3=item.col_4_code.name;
                                if(item.col_5_code)
                                    tagsArr.tag4=item.col_5_code.name;
                                if(item.col_6_code)
                                    tagsArr.tag5=item.col_6_code.name;
                                return(<tr>
                                    <td>{item.parent} <span className="table_icd_code_parent">{item.full_title}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag1} className="table_icd_code">{tagsArr.tag1}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag2} className="table_icd_code">{tagsArr.tag2}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag3} className="table_icd_code">{tagsArr.tag3}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag4} className="table_icd_code">{tagsArr.tag4}</span></td>
                                    <td><span onClick={setCodeonField} data-code={tagsArr.tag5} className="table_icd_code">{tagsArr.tag5}</span></td>
                                </tr>)          
                            })}    
                            
                        </tbody>
                    </table>
                </Col>
            </Row>);
        }
    }
    else 
    {
        if(SearchWork) {
            return(<Row>
                <Col md={12} className="text-center pt-4">
                <h4 className="mt-4">No results found! Please try a different search term.</h4>    
                </Col></Row>);
        }
        else 
        {
            return('');
        }
    }
   }
   function manageindexICDChield(children)
   {
       let itemData='';
       if(children.length>0)
       {    
            itemData = children.map((data,index)=>{
                let str1=<li key={index}><span data-keyword={data.full_title_no_nemod} onClick={manageKeyword} className="icd_search_sub_3">{data.title}</span></li>;
                return str1;
            });
            return itemData;
       }
   }
  function ShowBody()
  {
    if(ApiresponseLoader===1)
    {
        return (
            <Row>
                <Col md={12}>
                <div  className="col-lg-12 text-center pt-4" style={{marginTop:'50px'}}>
                    <Spinner className="text-primary m-2" size='lg' />
                </div>
                </Col>
            </Row>
        );
    }
    else 
    {
        return (<Row>
            <Col md={12}>
             <ShowICDCodeTree />
            </Col>
        </Row>);
    }
  }

  const manageSearchfullindex=(e) =>{
        setresponse([]);
        setICDCode('');
        setSelectedValue([]);
        setICDTable({'display':'none'});
        setindexIcdresponse([]);
        setneoplasmIcdresponse([]);
        setSearchWork(false);
        setsearchFullindex(e.target.checked);
  }
  
  return (
     
    <React.Fragment>
         
    <Modal
        isOpen={props.data.modal}
        toggle={close_popup}
        className='modal-full-width'
        >
        <ModalHeader toggle={close_popup}>ICD-10 AM</ModalHeader>
        <ModalBody>
            <Row>
                <Col md={7}>
                    <label>Search for all term(s)</label>
                    
                    <input onKeyDown={manageSearch} value={selectedValue} placeholder="Enter search term(s)" className="form-control"  type="text" onChange={getSuggestion}/>
                   {options.length> 0 && <div style={{position:'absolute',backgroundColor:'#fff',width:'90%',padding:'1rem',zIndex:'999'}}>
                    {options.map((item)=>{
                            return (
                                <p onClick={()=>handleChange(item.value)} style={{cursor:'pointer'}}>{ item.label }</p>
                            )
                        })
                    }
                    </div> }
                    
                </Col>
               
                
                <Col md={5}>
                    <label>Enter ICD code directly</label>
                    <Row>
                        <Col md={6}>
                            <Input type="text" value={ICDCode} onChange={setTagonChange} name="text" id="text" placeholder="ICD code" />{' '}
                        </Col>
                        <Col md={6}>
				    <Button color="primary" className="btn-sm" onClick={close_popup}>
				    Cancel
                        </Button>{' '}
                        <Button color="success" className="btn-sm" onClick={()=>addCodeOperation(ICDCode)}>
                            Search
                        </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
		  <Col md={6} className="mt-2">
          <input type="checkbox" onChange={manageSearchfullindex} value="1" id="searchCheck" /> <label for="searchCheck">Search full index </label><i id={`tooltip-top`} style={{'fontSize':'14px','cursor':'pointer'}} className="uil uil-question-circle ml-1"></i>
                    <React.Fragment key={i}>
                            <UncontrolledTooltip placement="top" target={`tooltip-top`}>
                            Search the full index manually without smart search assistance
                            </UncontrolledTooltip>
                        </React.Fragment>
		  </Col>
                 <Col md={6}> </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <Row>
                        {checkbocList.map((item,index)=>{
                        let checked=false;
                        if(Number(item.id)===Number(radioStatus))
                        {
                            checked=true;
                        }
                       
                            return (
                            <Col md={3} key={index} style={{paddingRight:"0px"}}>
                                <CustomInput  onClick={setICDCheckValue} type="radio" value={item.id} id={item.id} defaultChecked={checked} name="customRadio" label={item.title}   />
                            </Col>
                            );
                        
                        })}
                    </Row>
                </Col>

                <Col md={5}> </Col>
            </Row>
            <hr style={{'border':'2px solid'}} />
            <ShowBody />
        </ModalBody>
    </Modal>
    <TabularListInner modal={innerModel} resetSession={resetSession} addICDCode={props.addICDCode} sectionsData={sectionsData} diagsInformation={diagsInformation}   ICDcode={ICDCode} ICDStatus={ICDStatus} ICDDesc={ICDDesc} close_popup={close_popup} toggleTabularListInner={toggleTabularListInner} />
    </React.Fragment>
  );
}
