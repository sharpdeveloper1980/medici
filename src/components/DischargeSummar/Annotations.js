import React, { useState,useEffect } from 'react';


const Annotations = (props) => {
  let value = props.value;
    const tagArr = [];
    const [data,setData] = useState([]);
    
    useEffect(()=>{
        
        let alreadyexits = [];
        let alreadyexitsData = [];
        let finalData = [];
        props.value.forEach((item)=>{
          if(alreadyexits.indexOf(item.label.name)!=-1){
            let indx = alreadyexits.indexOf(item.label.name);
            if(alreadyexitsData[indx].status == 1 && item.status == 2){
              finalData.push(item);
            }else if(alreadyexitsData[indx].status == 2 && item.status == 1){
              finalData.push(alreadyexitsData[indx]);
            }else if(alreadyexitsData[indx].status == 1 && item.status == 1){
              finalData.push(item);
            }else if(alreadyexitsData[indx].status == 2 && item.status == 2){
              finalData.push(item);
            }

          }else{
            alreadyexits.push(item.label.name);
            alreadyexitsData.push(item);
            finalData.push(item);
          }
        });
        
        setData(finalData);
    },[value])
 
    return (
        <React.Fragment>
        { data.map((item, index) => {
            
            let text = '';
            if (tagArr.indexOf((item.label.name)) < 0) {
             let classAttr = '';
             let despColor = '';
             let custom_css = {
               'cursor': 'pointer',
             };
             if (item.isActive1 === true) {
               custom_css = {
                 'boxShadow': '8px 1px 20px 10px #CCC',
                 'cursor': 'pointer',
               };
             }
             tagArr.push(item.label.name);
           
            
            if (item.status === 2) {
              classAttr = 'badge badge-success badge-pill pl-2 pr-2 pt-1 pb-1 right_tag';
              despColor = 'badge-success-description annotation_description ml-2';

            }
            else {
              classAttr = 'badge badge-outline-secondary badge-pill pl-2 pr-2 pt-1 pb-1 right_tag';
              despColor = 'annotation_description ml-2';
            }
            if (item.state !== 'CUSTOM') {
              if (item.label_status === 0 && item.label) {
                text = <div className="row" key={index}>
                  <div className="col-sm-12 mb-2">
                    <span style={custom_css} onClick={() => props.activeTag1(item.start, item.end)} className={classAttr}>{item.label.name}</span>
                    <span className={despColor} id={`tightTag${item.start}`}>{item.label.desc}</span>
                  </div>
                </div>
              }
            } else {
              text = <div className="row">
                <div className="col-sm-3 pt-1">
                  <input type="text" data-start={item.start} data-end={item.end} name="tag" data-index={index} onKeyPress={props.enterPressed.bind(this)} onChange={props.handleTagChange} class="tag_field" />
                </div>
                <div className="col-sm-9 pt-1">
                  <input type="text" class="description_field" />
                </div>
              </div>
            }
          }
            return(
              text
            )
                
          })}       
       </React.Fragment>            
    );
}
export default Annotations;