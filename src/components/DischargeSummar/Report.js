import React, { Component,useState,useEffect } from 'react';
import ExecuteApi from '../ExecuteApi';
import ReportSub from './ReportSub';
import Spinner from '../Spinner';
const Parent = (props) => {
    const id=props.id.id;
    const [reportdata, setData] = useState([]);
    const [categorydata, setCategoryData] = useState([]);
   const [reports,setReports] = useState([]);
    useEffect(()=>{
        ExecuteApi('reports/?discharge__id='+id,'GET').then((resp)=>{
            let catArr=[]
            resp.map((item)=>{
                if(catArr.indexOf((item.category))<0) {
                    catArr.push(item.category);
                }
                return 1;
            })
            setData(resp);
            setCategoryData(catArr);
        });

        ExecuteApi('coder_sessions/'+props.id.disid,'GET').then((resp)=>{
            if(resp){
              
                setReports(resp.read_reports);
            }
        });
		
    },[id,props.id.disid]);
    
    if(reportdata.length>0){
    localStorage.setItem('report_count',reportdata.length);
    return (
        <React.Fragment>
            {categorydata.map((item,index)=>{
                let obj1 = {
                    'title':item,
                    'data':reportdata,
                    'id':id,
                    'disid':props.id.disid,
                    'selectedLabelAnnotation':props.id.selectedLabelAnnotation,
                    'label_id':props.id.label_id,
                    'type':props.id.type,
                    'categoryId' : index,
                    'reports' : reports,
                    
                };
                return (<ReportSub data={obj1} />);
            })}
        </React.Fragment>
    );
    }
    else 
    {
        return (
            <div  className="col-lg-12 text-center pt-4" style={{marginTop:'180px'}}>
                <Spinner className="text-primary m-2" size='lg' />
            </div>
        );
    }
}
class Report extends Component {

  render() {
    return (
      <div>
         <Parent id={this.props.id} />
      </div>        
    );
  }
}
export default Report;