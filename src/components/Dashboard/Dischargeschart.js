import React, { useState,useEffect,Component } from 'react';
import { Table, Progress } from 'reactstrap';
const Parent = (props) => {
    
    const [done, setDone] = useState(0);
    const [progress, setProgress] = useState(0);
    const [remaining, setRemaining] = useState(0);
    var completion_pie=props.chartdata.completion_pie
    
    useEffect(()=>{
        if(completion_pie){
           
        setDone(completion_pie.done);
        setProgress(completion_pie.progress);
        setRemaining(completion_pie.remaining);
        }
    },
    [completion_pie])
    
    return (
            <div>
                <div className="row mb-4">
                    <div className="col-sm-9">
                        <h6 style={{ fontSize:'12px' }} className="header-title mb-2 mt-1">DISCHARGES</h6>
                    </div>
                  
                </div>
                <div className="row mt-4 mb-4">
                  
                    <Table responsive className="table-sm table-centered mb-0 font-14">
                        <thead className="thead-light">
                            <tr>
                                <th>Discharge type</th>
                                <th>Count</th>
                                <th style={{ width: '40%' }}>Graph</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Not Commenced</td>
                                <td>{ remaining }</td>
                                <td>
                                    <Progress value={remaining} style={{ height: '3px' }} />
                                </td>
                            </tr>
                            <tr>
                                <td>In Process</td>
                                <td>{ progress }</td>
                                <td>
                                    <Progress value={progress} style={{ height: '3px' }} color="info" />
                                </td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>{ done }</td>
                                <td>
                                    <Progress value={done} style={{ height: '3px' }} color="warning" />
                                </td>
                            </tr>
                           
                        </tbody>
                    </Table>
                </div>
                
               
            </div>
    );
}
class Dischargeschart extends Component {

  render() {
    return (
      <div>
         <Parent chartdata={this.props.chartdata} />
      </div>        
    );
  }
}
export default Dischargeschart;