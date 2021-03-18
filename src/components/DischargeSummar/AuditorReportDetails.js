import React, { Component } from 'react';
import {  Card } from 'reactstrap';
import sortBy from 'lodash.sortby';
import ExecuteApi from '../ExecuteApi';
import Chip from '@material-ui/core/Chip';
import Spinner from '../Spinner';
import '../../assets/scss/annotation.scss';
let old_index='';
class AuditorReportDetails extends Component {
  
  constructor(props) {
    super(props);
	
  var annotations = [];
  if(props.id.annotations) {
  props.id.annotations.map((item,index) => {
						
						if(props.id.report_id === item.report && Number(item.label.id) === Number(props.id.label_id.label_id)){
              
                let label='';
                if(item.label)
                {
                if(item.label.label_type===1 || item.label.label_type===3)
                  label=item.label.diag;
                else 
                  label=item.label.proc;
                }
                if(item.status!==3) {
                let obj ={dis_id:item.id,'state':'OLD',start:item.initial_offset, end: item.final_offset, tag:'Person','label':label,'status':item.status,'label_status':0,'isActive':false};
                annotations.push(obj);
                }
              
						}
						  return 1;
						  
            });
  }
	
	this.state = {
      value: annotations,
      report_id : props.id.report_id,
      session_id : props.id.session_id,
      text : '',
      annotation_select:[],
      tag : '',
      tag_description : '',
      api_resp : '',
    };	
    
	ExecuteApi('reports/'+this.state.report_id,'GET').then((resp)=>{
        this.setState({
          text : resp.text
        })
      });
	
  }
 
  handleTagChange = e => {
    this.setState({tag: e.target.value})
  }
  
 Split = props => {
  if (props.mark){ 
    
   if(props.status===2 && props.label) {
    let custom_css = {
      'maxWidth': '100%',
      
    };
    if (props.stateValue.isActive === true) {
      custom_css = {
        'boxShadow': '8px 1px 20px 10px #CCC',
        'maxWidth': '100%',
        
      }
    }
    return(
      <React.Fragment>
        <Chip
          label={`${props.content} | ${props.label.name}`}
          style={custom_css}
          size="small"
          className="approve"
          />
      </React.Fragment>
    );
  }

  else if(props.status===1 && props.label)
  {
    let custom_css = {
      'maxWidth': '100%',
      
    };
    if (props.stateValue.isActive === true) {
      custom_css = {
        'boxShadow': '8px 1px 20px 10px #CCC',
        'maxWidth': '100%',
        
      }
    }
    return(
      <React.Fragment>
        <Chip
          label={`${props.content} | ${props.label.name}`}
          size="small"
          variant="outlined"
          style={custom_css}
          className="suggestion"
          />
      </React.Fragment>
    );
  }
	}

  return (
    <span
      data-start={props.start}
      data-end={props.end}
      onClick={() => props.onClick({start: props.start, end: props.end})}
    >
      {props.content}
      
    </span>
  )
}
splitWithOffsets = (text, offsets) => {
  let lastEnd = 0
  const splits = [];
  let indx=0;
  for (let offset of sortBy(offsets, o => o.start)) {
    const {start, end,status} = offset
    if (lastEnd < start) {
      splits.push({
        start: lastEnd,
        end: start,
        content: text.slice(lastEnd, start),
        status:status,
      })
    }
    splits.push({
      ...offset,
      mark: true,
      stateValue:offset,
      indexValue : indx,
      content: text.slice(start, end),
    })
    lastEnd = end
    indx++;
  }
  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      content: text.slice(lastEnd, text.length),
    })
  }
 // splits.id=
  return splits
}
handleActiveAnnotation =  (event) =>{
  let stateData=this.state.value;
  let index='';
  stateData.map((data,count)=>{
    if(event.start===data.start && event.end===data.end)
    {
      index=count;
    }
    return 1;
  });
  this.setState({tag: stateData[index].label.name});
  if(old_index!=='')
  {
    if(stateData[old_index]){ 
      stateData[old_index].isActive=false;
      stateData[old_index].label_status=0; 
    } 
  }
    
  stateData[index].isActive=true;
  stateData[index].label_status=1;
  if(stateData[index].label!=='')
     stateData[index].state='EDIT';
  this.setState({ value: stateData });
  old_index=index;
}
handleSplitClick = (event) => {
  const start=event.target.dataset.start;
  const end=event.target.dataset.end;
    const splitIndex = this.state.value.findIndex(s => s.start === Number(start) && s.end === Number(end))
    if (splitIndex >= 0) {
      let data=this.state.value[splitIndex];
      if(data.state==='OLD')
      {

        let json= {"status":3};
        ExecuteApi('coder_annotations/'+data.dis_id,'PATCH','',json).then((resp)=>{
         
        });
      }
      let arr=this.state.value;
      arr.splice(splitIndex, 1);
      this.setState({ value: arr });
    }
  }

  handleMouseUp = (props) => {
    const selection = window.getSelection()

    if (this.selectionIsEmpty(selection)) return

    let start =
      parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) +
      selection.anchorOffset
    let end =
      parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) +
      selection.focusOffset

    if (this.selectionIsBackwards(selection)) {
      ;[start, end] = [end, start]
    }

    let data={'state':'NEW',start:start, end:end, tag: this.state.text.slice(start, end),'label':'','status':1,'label_status':1,'isActive':false};
    this.setState({ value: [...this.state.value, data] });
    window.getSelection().empty()
  }
 selectionIsEmpty = (selection) => {
  let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)

  return position === 0 && selection.focusOffset === selection.anchorOffset
}
selectionIsBackwards = (selection) => {
  if (this.selectionIsEmpty(selection)) return false

  let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)

  let backward = false
  if (
    (!position && selection.anchorOffset > selection.focusOffset) ||
    position === Node.DOCUMENT_POSITION_PRECEDING
  )
    backward = true

  return backward
}
getSpan = (props,span) => {
    // TODO: Better typings here.
    if (props.getSpan) return props.getSpan(span)
   }
  changeTagLavelStatus(event)
  { 
      var state_data=this.state.value;
      if(old_index!=='')
      {
        state_data[old_index].isActive=false;
        state_data[old_index].label_status=0;  
      }
      state_data[event.target.dataset.index].label_status=1;
      state_data[event.target.dataset.index].isActive=true;
      this.setState({tag: state_data[event.target.dataset.index].label.name});
      this.setState({
        value:state_data,
      });
      old_index=event.target.dataset.index;
  } 
  enterPressed(event) {
    var code = event.keyCode || event.which;
    var stateData=this.state.value;
    let index='';
   
    stateData.map((data,count)=>{
      if(Number(event.target.dataset.start)===Number(data.start) && Number(event.target.dataset.end)===Number(data.end))
      {
        index=count;
      }
      return 1;
    });
    
    if(code === 13) { 
              let current_state=this.state.value[index];
              
              let json = {
                "report": this.state.report_id,
                "discharge": this.props.id.id,
                "coder_session": this.state.session_id,
                "label": {
                  "diag": {
                    "name": this.state.tag
                  }
                },
                "status": 2,
                "initial_offset": current_state.start,
                "final_offset": current_state.end,
              };
              if(current_state.state==='NEW') {
              
              ExecuteApi('coder_annotations' ,'POST','',json).then((resp)=>{  
                  if(resp.label) { 
                  stateData[index].label_status=0;
                  stateData[index].status=2;
                  if(resp.label.label_type===1 || resp.label.label_type===3)
                    stateData[index].label=resp.label.diag;
                  else 
                    stateData[index].label=resp.label.proc;
                  stateData[index].state='OLD';
                  this.setState({
                    value:stateData,
                  });
                 }
              });
            }
            else if(current_state.state==='EDIT')
            {
              let json= {
                "label":{
                  "diag": {
                      "name": this.state.tag
                    }
                  },
                "status": 2
              }; 
            
              ExecuteApi('coder_annotations/'+stateData[index].dis_id,'PATCH','',json).then((resp)=>{
                  stateData[index].label_status=0;
                  stateData[index].status=2;
                  stateData[index].label.name=this.state.tag;
                  
                  this.setState({
                    value:stateData,
                  });
              });
            }
            else
            {
              let json= {"status":2};
              ExecuteApi('coder_annotations/'+stateData[index].dis_id,'PATCH','',json).then((resp)=>{
                  stateData[index].label_status=0;
                  stateData[index].status=2;
                  this.setState({
                    value:stateData,
                  });
              });
            }
    } 
 }
 
  render() {
    let splits = this.splitWithOffsets(this.state.text,this.state.value);
    if(this.state.text !== '' && this.state.value.length > 0){
      return (
        <div className="row"> 
        <div className="col-sm-12">
        <Card className="pl-1 pt-1 pr-1 pb-1">  
          <div className="change_line">
            {splits.length>0 && splits.map((split,index)=>{ 
              split.index=index;
              return(<this.Split key={`${split.start}-${split.end}`}   {...split}  />)
            })}
          </div> 
          </Card>
        </div>
        </div>
      )
    }else{
      return( <div  className="col-lg-12 text-center pt-4" style={{marginTop:'180px'}}>
            <Spinner className="text-primary m-2" size='lg' />
        </div>);
    }
  }
}
export default AuditorReportDetails; 