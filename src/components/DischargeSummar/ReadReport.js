import React, {useState, useEffect} from 'react';
import ExecuteApi from '../ExecuteApi';
import Toast from '../toast/Toast';
import checkIcon from '../../assets/img/check.svg';
import errorIcon from '../../assets/img/error.svg';
import infoIcon from '../../assets/img/info.svg';
import warningIcon from '../../assets/img/warning.svg';

const ReadReport = (props) => {

    const [readReport, setReadReport] = useState([]);
    const [list, setList] = useState([]);
    let [checkValue, setCheckValue] = useState(false);
    const [dismissTime, setDismissTime] = useState(0);
    let toastProperties = null;
    useEffect(()=>{
        
              
                setReadReport(props.reports);
            
    },[props.reports])

    const showToast = type => {
        const id = Math.floor((Math.random() * 101) + 1);
    
        switch(type) {
          case 'success':
            toastProperties = {
              id,
              title: 'Success',
              description: ' Report marked as read ',
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
              description: 'Please approve or reject all annotations',
              backgroundColor: '#f0ad4e',
              icon: warningIcon
            }
            break;
    
            default:
              setList([]);
        }
    
        setList([...list, toastProperties]);
      }

    const toggleCheck=(e)=>{
        
        
        let id=e.target.dataset.id;
        let checked = e.target.checked;
       let disid= e.target.dataset.disid;
        let json = {};
        
        if(checked){
             ExecuteApi('coder_annotations/?coder_session__id=' +disid + '&report__id=' +id, 'GET').then((responseJson) => {
                
                
                var data = responseJson.find( function( ele ) { 
                    // eslint-disable-next-line
                    return ele.status == '1';
                } );
                
                
                   
                // eslint-disable-next-line
                    if(data && responseJson.length>0){
                      
                        
                        showToast('warning');
                    }else{
                        let reports = readReport;
                    
                        if(!reports.includes(id)){
                           
                            reports.push(parseInt(id));
                            
                        }
                        json = {
                            "read_reports": reports
                            }
                        document.getElementById("checkcontrool_"+id).checked =checked;
                        ExecuteApi('coder_sessions/'+disid,'PATCH','',json).then((resp)=>{
                           
                            setReadReport(resp.read_reports);
                            setCheckValue(true);
                            setDismissTime(2000);
                            showToast('success');
                           
                           
                        });  
                    }
                
            });
        }
        else{
        
            document.getElementById("checkcontrool_"+id).checked =checked;
            let reports = readReport;
            
             reports.forEach((val,i)=>{
                 // eslint-disable-next-line
                if(val == id){
                    reports.splice(i, 1);
                }
             });
             
                
                
                 json = {
                   "read_reports": reports
                  }
                  ExecuteApi('coder_sessions/'+props.disid,'PATCH','',json).then((resp)=>{
                 
                    setReadReport(resp.read_reports);
                    
                   
                   
                });
        }
        
    }
    function Func(){
        let checked =<input type="checkbox" id={`checkcontrool_${props.id}`} data-id={props.id} data-labelid={props.labelid} data-disid= {props.disid} onChange={toggleCheck}  style={{'z-index':'100','position':'relative','marginTop':'1.3rem','right':'1%','float':'right'}}/>
            if(readReport.includes(props.id)){
                
                checked = <input type="checkbox" checked="true" id={`checkcontrool_${props.id}`} data-id={props.id} data-labelid={props.labelid} data-disid= {props.disid} onChange={toggleCheck} style={{'z-index':'100','position':'relative','marginTop':'1.3rem','right':'1%','float':'right'}}/>;
            }
            return checked;
    }
    return (
      <React.Fragment>
          <Func /> 
          <Toast 
            toastList={list}
            position='top-right'
            autoDelete={checkValue}
            dismissTime={dismissTime}
        />
      </React.Fragment>
               
                   
    );
}
export default ReadReport;