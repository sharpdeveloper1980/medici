import React,{ useState,useEffect }  from "react";
import { Link,useHistory,useParams } from 'react-router-dom';
import {  Row, Col, Card, CardBody} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import "../assets/scss/discharge.scss";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { columns } from '../components/data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExecuteApi from '../components/ExecuteApi';
const Discharges = (props) => {
    let { type } = useParams();
    const history = useHistory();
    const [discharges_data, setData] = useState([]);
    useEffect(()=>{
        ExecuteApi('discharges/','GET').then((resp)=>{
            setData(resp);
        });
   },[]);
var records=[];
const handlePostRequest = e => {
    let id=e.target.dataset.discharges;
    let json = {
        "discharge": id,
        "import_annotations": true
    };
    ExecuteApi('coder_sessions' ,'POST','',json).then((resp)=>{
        const url="/discharge-summary/"+resp.id+'/'+id+'/'+type;
        history.push(url);
    });
  }
var discharges=discharges_data.results;
if(discharges) {
    var discharges_arr=discharges;
    for(var i=0;i<discharges_arr.length;i++)
    {
        let status='';
        var link_btn='';
        var id=discharges_arr[i].id;
    if(discharges_arr[i].coder_sessions.length>0){
            var url="/discharge-summary/"+discharges_arr[i].coder_sessions[0].id+'/'+id+'/'+type;
            link_btn=<Link to={url} ><i className="uil-edit"></i></Link> 
            if(discharges_arr[i].coder_sessions[0].done===false)
                status=<span className="text-primary">In-Progress</span>;
            else 
                status=<span className="text-success">Done </span>;
        }
        else 
        {
            link_btn=<i datadischarges={discharges_arr[i].id} onClick={handlePostRequest} className="uil-edit cursorpointer"></i>
        }
        var rec={
            id: discharges_arr[i].hadm_id,
            age: new Date(discharges_arr[i].dischtime).toLocaleDateString(),  
            name: discharges_arr[i].patient.subject_id,
            company: discharges_arr[i].admission_type,
            phone: new Date(discharges_arr[i].admittime).toLocaleDateString(),
            status: status,
            action:link_btn
        }
        records.push(rec);
    }
}
const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
]; 
const rowEvents = {
    onClick: (e, row, rowIndex) => {
    if(row.action.props.to)
    {
        history.push(row.action.props.to);
    }
    else 
    {
       let json = {
            "discharge": row.action.props.datadischarges,
            "import_annotations": true
        };
        ExecuteApi('coder_sessions' ,'POST','',json).then((resp)=>{
            const url="/discharge-summary/"+resp.id+'/'+row.action.props.datadischarges+'/'+type;
            history.push(url);
        });
     }
      
    }
  };

    return (
    <div className="wrapper"> 
    <Header actiontoken={type} />
    <div className="content-page">
        <div className="content page_container">
            <div className="container-fluid content_box" id="content_boxId">
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <ToolkitProvider
                                    bootstrap4
                                    keyField="id"
                                    data={records}
                                    columns={columns}
                                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                    {props => (
                                        <React.Fragment>
                                            <BootstrapTable
                                                {...props.baseProps}
                                                bordered={false}
                                                defaultSorted={defaultSorted}
                                                rowEvents={ rowEvents }
                                                pagination={paginationFactory({ sizePerPage: 10 })}
                                                 
                                                wrapperClasses="table-responsive"
                                            />
                                        </React.Fragment>
                                    )}
                                </ToolkitProvider>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    <Footer />

</div>
    );
};

export default Discharges;
