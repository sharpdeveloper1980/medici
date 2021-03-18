import React, { useState,useEffect } from 'react';
import ExecuteApi from '../ExecuteApi';
const Checkbox = (props) => {
    const [checked,setChecked] = useState(false);

    useEffect(()=>{
        setChecked(props.check);
    },props.check,[]);

    const toggleCheck=(e)=>{
        let id=e.target.dataset.id;
        let checked = e.target.checked;
        let errorCode = e.target.dataset.errorcode;
        let json = {};
        let name = props.name
        let current_message_list = props.dischargesummarydata.read_messages
        if(checked){
            if(props.dischargesummarydata.read_messages != null && props.dischargesummarydata.read_messages.includes(name+','+errorCode) == false){
                props.dischargesummarydata.read_messages.push(name+','+errorCode);
            }else if(props.dischargesummarydata.read_messages == null){
                props.dischargesummarydata.read_messages = [];
                props.dischargesummarydata.read_messages.push(name+','+errorCode);
            }
            json = {
                "note": props.dischargesummarydata.note,
                "done": props.dischargesummarydata.done,
                "coder_discharge_labels": props.dischargesummarydata.coder_discharge_labels,
                "read_messages": props.dischargesummarydata.read_messages
               }
               setChecked(true);
            //   $("#checkbox_"+id).html('');
            // document.getElementById("checkctrl_"+id).checked ='true';
        }
        else{
            
            setChecked(false);
            // document.getElementById("checkctrl_"+id).checked = 'false';
           
                    const index = props.dischargesummarydata.read_messages.indexOf(name+','+errorCode);
                    if (index > -1) {
                        props.dischargesummarydata.read_messages.splice(index, 1);
                    }
               
            
           
            json = {
                "note": props.dischargesummarydata.note,
                "done": props.dischargesummarydata.done,
                "coder_discharge_labels": props.dischargesummarydata.coder_discharge_labels,
                "read_messages": props.dischargesummarydata.read_messages
                
              }
            
        }
        ExecuteApi('coder_sessions/'+props.disid,'PATCH','',json).then((resp)=>{
            
            props.dischargesummarydata.read_messages = resp.read_messages;
        });
    }
    const Func=()=>{
        
           
           return <input type="checkbox" data-id={props.i} checked={checked} data-errorCode={props.errorCode} onChange={toggleCheck}  />
        
    }
    return(
        <React.Fragment>
            <Func/>
        </React.Fragment>
    )

}
export default Checkbox;