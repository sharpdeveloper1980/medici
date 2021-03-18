import React,{useState,useEffect} from 'react';
import ExecuteApi from '../ExecuteApi';   
import {Row,Col,Button, Modal, ModalHeader, ModalBody,Input,UncontrolledTooltip} from 'reactstrap'; 
import ProcedureInnerModal from './ProcedureInnerModal';
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
export default function ProcedureModal(props) {
  const [response,setresponse] = useState([]);
  const [indexICDresponse,setindexIcdresponse] = useState([]);
  /* Old Code */
  const [options,setOption] = useState([]);
    const [selectedValue,setSelectedValue] = useState([]);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);
    const [ICDCode, setICDCode] = useState([]);
    const [ICDDesc, setICDDesc] = useState([]);
    const [ICDStatus, setICDStatus] = useState([]);
    const [block,setBlock] = useState([]);
   const [ApiresponseLoader, setApiresponseLoader] = useState([]);
    const [innerModel, setinnerModel] = useState(false);
    const [diagsInformation, setDiagsInformation] = React.useState([]);
    const [sectionsData, setSectionsData] = React.useState([]);
    const [SearchWork, setSearchWork] = React.useState(false);
    const [searchFullindex, setsearchFullindex] = React.useState(false);
  
    
    
    useEffect(()=>{
      
        setICDCode(props.selectedCode);
    },[props.selectedCode]);
    const getSuggestion=(e)=>{
        setSelectedValue(e.target.value);
        setOption([]);
        if(e.target.value){
            let url ='';
            if(!searchFullindex){
                setIsLoading(true);
                url='icd/achi_index_filter/suggest/?full_title_no_nemod_suggest__completion='+e.target.value;
            
        ExecuteApi(url,'GET').then((resp)=>{
            try {
                
               
                   
                    const options1 = resp.full_title_no_nemod_suggest__completion[0].options.map((i) => {
                        return ({
                            id: i._id,
                            value: i.text,
                            label: i.text
                        });
                    });
                    
                   
                    
                    setOption(options1);
                    
                
                    setIsLoading(false);
            
                
            }
            catch(e) {
                history.push('/errorpage');
            }  
            });
        }
        else{
                const newLocal = 'icd/achi_index/functional_suggest/?full_title_no_nemod_suggest_match__completion_match=';
            url=newLocal+e.target.value;
            ExecuteApi(url,'GET').then((resp)=>{
                try {
                   
                      const options1 = resp.full_title_no_nemod_suggest_match__completion_match[0].options.map((i) => ({
                            id: i._id,
                            value : i.text,
                            label : i.text
                        }));
                        
    
                        setOption(options1);
                        setIsLoading(false);
                    
                }
                catch(e) {
                    history.push('/errorpage');
                }  
                });

        }
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
      setBlock(e.target.dataset.block);
      document.getElementById('text').value=e.target.dataset.code;
        addCodeOperation(e.target.dataset.code,e.target.dataset.block);
  }

  const setTagonChange=(e)=>{
    setICDCode(e.target.value);
  }
 
   function searchApi(value)
   {
    setSearchWork(1);
    let urlSegment ="index"; 
    let argument="search_simple_query_string";
    
        if(searchFullindex)
        {
            urlSegment="achi_index";
        }
        else 
        {
            urlSegment="achi_index_filter";
            argument="full_title_no_nemod";
        }
     
    
    
    setApiresponseLoader(1);
    ExecuteApi('icd/'+urlSegment+'/?'+argument+'='+value,'GET').then((resp)=>{ 
        try {
        if(resp){
            if(resp) {
                
                    if(searchFullindex)
                        setresponse(resp.results);
                    else 
                        setindexIcdresponse(resp.results);
                
                
                
            }
        }
        setApiresponseLoader(0);
        }
        catch(e) {
            history.push('/errorpage');
        }
    });
   }
   function addCodeOperation(ICDCode,block)
   {
      
      
       // eslint-disable-next-line
       if(ICDCode) {
        
          
            ExecuteApi('icd/procs/?name='+ICDCode,'GET').then((resp)=>{
                if(resp.length>0) {
                    setICDDesc(resp[0].desc);
                    setICDStatus(resp[0].billable);
                    setDiagsInformation(resp);
                  // eslint-disable-next-line
                    if(block != ''){
                        ExecuteApi('icd/achi_blocks/?name='+block,'GET').then((sectionsResp)=>{ 
                            setSectionsData(sectionsResp);
                            setinnerModel(true);
                        });
                    }else{
                        ExecuteApi('icd/achi_blocks/?name='+resp[0].block,'GET').then((sectionsResp)=>{ 
                            setSectionsData(sectionsResp);
                            setinnerModel(true);
                        });
                    }
                    
                }
            });   
          
           

       }
       // eslint-disable-next-line
       else if(block){
            ExecuteApi('icd/achi_blocks/?name='+block,'GET').then((sectionsResp)=>{ 
                setSectionsData(sectionsResp);
                setinnerModel(true);
            
            });
       }
      // eslint-disable-next-line
        // if(procsData.length > 0 || blocksData.length > 0){
        //     setTimeout(()=>{
                
        //         setinnerModel(true);
        //     },500)
        // }
   }
  
   function close_popup()
   {
        
        setresponse([]);
        // setICDCode([]);
        setSelectedValue([]);
        setindexIcdresponse([]);
        setSearchWork(false);
        props.toggleProcedureModal();
   }
   const resetSession=()=>{
        setresponse([]);
        setICDCode('');
        setSelectedValue([]);
        
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
            'block' : path[j].block,
            'seeBlock' : path[j].seeBlock,
            'children': []
          });
          
          children = children[ind].children
        }
        ind = insert_node(children, 0, children.length,
          {
            'id': response[i].title,
            'name': response[i].title,
            'code': response[i].code,
            'block' : response[i].block,
            'seeBlock' : response[i].seeBlock,
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
            let block_btn = ''
            let see_block = '';
            
            
            
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
                    
                    chield_btn=<span onClick={setCodeonField} data-block={data.block && data.block.name}  data-code={data.code.name} className="ml-1 icd_search_sub_2 linkbtn badge">{data.code.name}</span>;  
                }
                if(data.block && data.block !== null)
                {
                  
                        block_btn=<span onClick={setCodeonField} data-code={data.code && data.code.name} data-block={data.block.name} className="ml-1 block_css badge">{data.block.name}</span>; 
                    
                    
                }
                if(data.seeBlock && data.seeBlock  !== null)
                {
                   
                        see_block=<span onClick={setCodeonField} data-code={data.code && data.code.name}  data-block={data.seeBlock.name} className="ml-1 block_css badge">{data.seeBlock.name}</span>; 
                    
                    
                }
                str1=<React.Fragment><span className="">{data.name}</span>{chield_btn} {block_btn} {see_block} {
                            
                    data.see &&
                    data.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                        see = see+' '+seeDataItem;
                        return (
                         <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                        )
                    })
                }
                {
                            
                            data.seeAlso &&
                            data.seeAlso.split('/').map((seeDataItem,key)=>{
                                seeAlso = seeAlso+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                )
                            })
                }
        </React.Fragment>;
             } 
             else
             {
                if(data.code)
                {
                    chield_btn=<span onClick={setCodeonField} data-block={data.block && data.block.name} data-code={data.code.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.code.name}</span>;  
                }
                if(data.block && data.block !== null)
                {
                  
                        block_btn=<span onClick={setCodeonField} data-code={data.code && data.code.name}  data-block={data.block.name} className="ml-1 block_css badge">{data.block.name}</span>; 
                    
                    
                }
                if(data.seeBlock && data.seeBlock  !== null)
                {
                   
                        see_block=<span onClick={setCodeonField} data-code={data.code && data.code.name} data-block={data.seeBlock.name} className="ml-1 block_css badge">{data.seeBlock.name}</span>; 
                    
                    
                }
                str1=<React.Fragment><span className="icd_search_sub_3">{data.name}</span>{chield_btn} {block_btn} {see_block} 
                {
                            
                            data.see &&
                            data.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                                see = see+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                                )
                            })
                        }
                        {
                                    
                                    data.seeAlso &&
                                    data.seeAlso.split('/').map((seeDataItem,key)=>{
                                        seeAlso = seeAlso+' '+seeDataItem;
                                        return (
                                         <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                        )
                                    })
                        }
                </React.Fragment>;
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
            let block_btn = ''
            let see_block = '';
           
                
            
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
                    chield_btn=<span onClick={setCodeonField} data-block={data.block && data.block.name} data-code={data.code.name} className="ml-1 icd_search_sub_2 linkbtn badge">{data.code.name}</span>;  
                }
                if(data.block && data.block !== null)
                {
                  
                        block_btn=<span onClick={setCodeonField} data-code={data.code && data.code.name}  data-block={data.block.name} className="ml-1 block_css badge">{data.block.name}</span>; 
                    
                    
                }
                if(data.seeBlock && data.seeBlock  !== null)
                {
                   
                        see_block=<span onClick={setCodeonField} data-code={data.code && data.code.name}  data-block={data.seeBlock.name} className="ml-1 block_css badge">{data.seeBlock.name}</span>; 
                    
                    
                }
                str1=<li key={index}><span className="">{data.name}</span>{chield_btn} {block_btn } { see_block }
                {
                            
                            data.see &&
                            data.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                                see = see+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                                )
                            })
                }
                {
                            
                            data.seeAlso &&
                            data.seeAlso.split('/').map((seeDataItem,key)=>{
                                seeAlso = seeAlso+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                )
                            })
                }
                 { manageInnerChield(data.d1,parentStr,c1,data.children.length) }</li>;
            }
            else 
            {
                if(data.code)
                {
                    chield_btn=<span onClick={setCodeonField} data-block={data.block && data.block.name} data-code={data.code.name} className="ml-1 icd_search_sub_2 badge badge-info">{data.code.name}</span>;  
                }
                str1=<li key={index}><span className="icd_search_sub_3">{data.name}</span>{chield_btn} {block_btn } { see_block } 
                {
                            
                            data.see &&
                            data.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                                see = see+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                                )
                            })
                }
                {
                            
                            data.seeAlso &&
                            data.seeAlso.split('/').map((seeDataItem,key)=>{
                                seeAlso = seeAlso+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                )
                            })
                }
                 { manageInnerChield(data.d1,parentStr,c1,data.children.length) }</li>;
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
   {   
    
       if(indexICDresponse.length>0)
       {
        return(<Row> 
            <Col md={12}>
                <ul className="icd_parent_list">
                    {indexICDresponse && indexICDresponse.map((item,index)=>{
                    let seeAlso='';
                    let see='';
                    let chield_btn='';
                    let block_btn = ''
                    let see_block = '';
                        if(item.code !== null)
                        {
                            if(item.code) {
                                chield_btn=<span onClick={setCodeonField}  data-block={item.block && item.block.name}  data-code={item.code.name} className="ml-1 icd_search_sub_2 badge">{item.code.name}</span>; 
                            }
                            
                        }
                        if(item.block !== null)
                        {
                            if(item.block) {
                                block_btn=<span onClick={setCodeonField} data-code={item.code && item.code.name} data-block={item.block.name}  className="ml-1 block_css badge">{item.block.name}</span>; 
                            }
                            
                        }
                        if(item.seeBlock  !== null)
                        {
                            if(item.seeBlock ) {
                                see_block=<span onClick={setCodeonField} data-code={item.code && item.code.name} data-block={item.seeBlock.name} className="ml-1 block_css badge">{item.seeBlock.name}</span>; 
                            }
                            
                        }
                    
    
                           
                        return (<li key={index}><strong>{item.full_title}</strong>{chield_btn} {block_btn} { see_block }

                            {
                            
                            item.see &&
                            item.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                                see = see+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                                )
                            })
                            }
                           {
                            
                            item.seeAlso &&
                            item.seeAlso.split('/').map((seeDataItem,key)=>{
                                seeAlso = seeAlso+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                )
                            })
                          }
                        
                         <ul className="chieldList">{ manageindexICDChield(item.children) }</ul> </li>)
                   
                    })}
                </ul>
            </Col>
        </Row>);
       }  
       else if(response.length>0) {
           
        return(<Row> 
        <Col md={12}>
            <ul className="icd_parent_list">
                {
                mainData && mainData.map((item,index)=>{
                let seeAlso='';
                let see='';
                let chield_btn='';
                let block_btn = ''
                let see_block = '';
                let chield_code='';
                    
                        if(item.code !== null) {
                            chield_code=item.code.name;
                            chield_btn=<span onClick={setCodeonField} data-block={item.block && item.block.name} data-code={item.code.name} className="ml-1 icd_search_sub_2 badge badge-info">{item.code.name}</span>; 
                        }
                        if(item.block && item.block !== null)
                        {
                            chield_code=item.block.name;
                                block_btn=<span onClick={setCodeonField} data-code={item.code && item.code.name} data-block={item.block.name} className="ml-1 block_css badge">{item.block.name}</span>; 
                            
                            
                        }
                        if(item.seeBlock && item.seeBlock  !== null)
                        {
                            chield_code=item.block.name;
                                see_block=<span onClick={setCodeonField} data-code={item.code && item.code.name} data-block={item.seeBlock.name} className="ml-1 block_css badge">{item.seeBlock.name}</span>; 
                            
                            
                        }
                        
                    
                
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
                    return (<li key={index}><strong>{item.name}</strong>{chield_btn} {block_btn} {see_block}
                    {
                            
                            item.see &&
                            item.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                                see = see+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                                )
                            })
                            }
                           {
                            
                            item.seeAlso &&
                            item.seeAlso.split('/').map((seeDataItem,key)=>{
                                seeAlso = seeAlso+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                )
                            })
                          }
                     <ul className="chieldList">{ manageICDChield(item.c1,parentStr) }</ul> </li>)
                }
                else 
                {
                    return (<li key={index}><span className="icd_search_sub_3">{item.name}</span>{chield_btn} {block_btn} {see_block} 
                    {
                            
                            item.see &&
                            item.see.replace('— see', ' ').split('/').map((seeDataItem,key)=>{
                                see = see+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={see} onClick={manageKeyword}> {see} </span></em>
                                )
                            })
                            }
                           {
                            
                            item.seeAlso &&
                            item.seeAlso.split('/').map((seeDataItem,key)=>{
                                seeAlso = seeAlso+' '+seeDataItem;
                                return (
                                 <em><span className="icd_search_heading_3" data-keyword={seeAlso} onClick={manageKeyword}> {seeAlso} </span></em>
                                )
                            })
                          }
                    <ul className="chieldList">{ manageICDChield(item.c1,parentStr) }</ul> </li>)
                }
                })}
            </ul>
        </Col>
    </Row>);
    } 
    
    else 
    {
        if(SearchWork) {
            return(<Row>
                <Col md={12} className="text-center pt-4">
                <h4 className="mt-4">Result Not Found</h4>    
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
       
        setindexIcdresponse([]);
        setSearchWork(false);
        setsearchFullindex(e.target.checked);
  }
  
  return (
     
    <React.Fragment>
        
    <Modal
        isOpen={props.data.stateprocedureModal}
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
                        <Button color="success" className="btn-sm" onClick={()=>addCodeOperation(ICDCode,block)}>
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
                        
                    </Row>
                </Col>

                <Col md={5}> </Col>
            </Row>
            <hr style={{'border':'2px solid'}} />
            <ShowBody />
        </ModalBody>
    </Modal>
    <ProcedureInnerModal modal={innerModel} resetSession={resetSession} addICDCode={props.addICDCode} sectionsData={sectionsData} diagsInformation={diagsInformation}   ICDcode={ICDCode} ICDStatus={ICDStatus} ICDDesc={ICDDesc} close_popup={close_popup} toggleTabularListInner={toggleTabularListInner} />
    </React.Fragment>
  );
}
