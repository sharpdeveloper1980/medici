import React, { Component } from 'react';
import { Card,Button, UncontrolledPopover, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import sortBy from 'lodash.sortby';
import ExecuteApi from '../ExecuteApi';
import TabularList from './TabularList';
import ProcedureModal from './ProcedureModal';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import history from '../../utils/history';

import '../../assets/scss/annotation.scss';
import $ from 'jquery';
import Annotations from './Annotations';
import Toast from '../toast/Toast';
import checkIcon from '../../assets/img/check.svg';
import errorIcon from '../../assets/img/error.svg';
import infoIcon from '../../assets/img/info.svg';
import warningIcon from '../../assets/img/warning.svg';
var  Model= require('react-bootstrap').Modal;
let old_index = '';

let toastProperties = null;
class ReportDetails extends Component {

  constructor(props) {
    
    super(props);
    var self = this;
    this.state = {
      value: [],
      value1: [],
      report_id: props.id.report_id,
      session_id: props.id.session_id,
      text: '',
      annotation_select: [],
      tag: '',
      tag_description: '',
      api_resp: '',
      modal: false,
      stateprocedureModal : false,
      modalopenmode: '',
      activeIndex: '',
      custom_icdSession: {},
      customIcdPopupStatus: false,
      icdPOPUPConfirm: false,
      applyAsteriskCode : false,
      customICDTag: '',
      selectedCode : '',
      isdagger : false,
      asteriskCode : '',
      asteriskModal : false,
      asktoapplycodeModal : false,
      icdSaveOppStatus : 1,
      cof : false,
      checkValue : true,
      dismissTime : 2000,
      list : [],
      approveLabel : []
      
    };
  
    $(document).on('click', function () {
      let stateData = self.state.value;
      let newEfeect = false;
      stateData.map((item, index) => {
        if (item.isActive) {
          newEfeect = true;
          stateData[index].isActive = false;
        }
        if (item.isActive1) {
          newEfeect = true;
          stateData[index].isActive1 = false;
        }
        return 1;
      })
      if (newEfeect) {
        self.setState({ 'value': stateData });
      }
    });
    $(document).on('click', '.MuiButtonBase-root', function (event) {
      event.stopPropagation();
    });
    $(document).on('click', '.right_tag', function (event) {
      event.stopPropagation();
    });
  }
  handleTagChange = e => {
    this.setState({ tag: e.target.value })
  }
  handleDagger =(val)=>{
    this.setState({ isdagger : val })
  }
  handleAsterisk =(val)=>{
    this.setState({ asteriskCode : val })
  }

  showToast = (type,description) => {
    const id = Math.floor((Math.random() * 101) + 1);

    switch(type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: description,
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
          description: description,
          backgroundColor: '#f0ad4e',
          icon: warningIcon
        }
        break;

        default:
          this.setState({
            list : []
          })
         
    }
    this.setState({
      list : [...this.state.list, toastProperties]
    })
    
  }
  
  componentDidMount(props) {
    ExecuteApi('reports/' + this.state.report_id, 'GET').then((resp) => {
      this.setState({
        text: resp.text
      })
    });

    ExecuteApi('coder_annotations/?coder_session__id=' + this.state.session_id + '&report__id=' + this.state.report_id, 'GET').then((responseJson) => {
      let annotation_value = [];
      let appLabel = [];

      responseJson.map((item, index) => {
        let label = '';
        let label_type = '';
        if (item.label) {
          label_type = item.label.label_type;
          if (item.label.label_type === 1 || item.label.label_type === 3)
            label = item.label.diag;
          else
            label = item.label.proc;
            
            
        }
        let obj={};
        if (item.status !== 3) {
          if(label) {
            obj = { dis_id: item.id, 'state': 'OLD', start: item.initial_offset, end: item.final_offset, tag: label.name, 'label': label, 'status': item.status, 'label_status': 0, 'isActive': false, 'label_type': label_type };
          }
          else 
          {
            obj = { dis_id: item.id, 'state': 'OLD_NO_LABEL', start: item.initial_offset, end: item.final_offset, tag: label.name, 'label': label, 'status': item.status, 'label_status': 0, 'isActive': false, 'label_type': label_type };
          }
          if(item.status == 2){
            appLabel.push(label.name);
            
          }
          annotation_value.push(obj);
           
        }
        return 1;
      });
      annotation_value.sort(function (a, b) {
        var keyA = a.start,
          keyB = b.start;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      this.setState({
        value: annotation_value,
        approveLabel : appLabel
      });
      
    });
  }
  toggleModal = (start, end, popcount, type) => {
    let statedata = this.state.value;
    let index = '';
    statedata.map((item, count) => {
      if (item.start === start && item.end === end) {
        index = count;
       
        this.setState({
          selectedCode  : item.label.name
        });
        
      }
      return 0;
    })
    this.setState({ activeIndex: index })
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    let element = document.getElementById('popovertop' + start);
    if (element) {
      element.click();
    }
  }
  //open and close procedure modal
  toggleProcedureModal = (start, end, popcount, type) => {
    let statedata = this.state.value;
    let index = '';
    statedata.map((item, count) => {
      if (item.start === start && item.end === end) {
        index = count;
       
        this.setState({
          selectedCode  : item.label.name
        });
        
      }
      return 0;
    })
    this.setState({ activeIndex: index })
    this.setState(prevState => ({
      stateprocedureModal: !prevState.stateprocedureModal,
    }));
    let element = document.getElementById('popovertop' + start);
    if (element) {
      element.click();
    }
  }
  setAnnotationInformation = (e) => {
    let index = e.target.dataset.index;
    localStorage.setItem('annotation_temp_json', e.target.dataset.json);
    localStorage.setItem('annotation_temp_index', index);

  }
  addICDCode = (code, cof,label_type) => {
    
    this.setState({
      modal: false,
      cof : cof,
      stateprocedureModal : false
    })
    /* main code */
    
    let index = this.state.activeIndex;
    let current_state = this.state.value[this.state.activeIndex];
    let tag_text = code;
    let stateData = this.state.value;
    let json = {};
    // let tags = this.state.tagArr;
    // eslint-disable-next-line
    if(label_type == 1){
      json = {
        "report": this.state.report_id,
        "discharge": this.props.id.id,
        "coder_session": this.state.session_id,
        "label": {
          "diag": {
            "name": tag_text
          },
          "cof": cof,
        },
        "status": 2,
       "initial_offset": current_state.start,
        "final_offset": current_state.end,
      };
      // eslint-disable-next-line
    }else if(label_type == 2){
      json = {
        "report": this.state.report_id,
        "discharge": this.props.id.id,
        "coder_session": this.state.session_id,
        "label": {
          "proc": {
            "name": tag_text
          },
         
        },
       "status": 2,
        "num_proc": 1,
        "initial_offset": current_state.start,
        "final_offset": current_state.end,
      };
    }
    if (current_state.state === 'NEW' || current_state.label === 'NEW') {
      ExecuteApi('coder_annotations', 'POST', '', json).then((resp) => {
        if (resp.label) {
          stateData[index].label_status = 0;
          stateData[index].dis_id = resp.id;
          stateData[index].label_type = resp.label.label_type;
          stateData[index].status = 2;
          if (resp.label.label_type === 1 || resp.label.label_type === 3)
            stateData[index].label = resp.label.diag;
          else
            stateData[index].label = resp.label.proc;
          stateData[index].state = 'OLD';
          // stateData.map((data, count) => {
          //   if (current_state.tag === data.tag) {
          //     if (data.state === 'NEW') {
          //       let json1 ={};
          //       // eslint-disable-next-line
          //       if(label_type == 1){
          //         json1 = {
          //           "report": this.state.report_id,
          //           "discharge": this.props.id.id,
          //           "coder_session": this.state.session_id,
          //           "label": {
          //             "proc": {
          //               "name": tag_text
          //             },
          //             "cof": cof,
          //           },
          //           "status": 2,
          //           "initial_offset": data.start,
          //           "final_offset": data.end,
          //         };
          //     }
          //     // eslint-disable-next-line
          //     else if(label_type == 2){
          //       json1 = {
          //         "report": this.state.report_id,
          //         "discharge": this.props.id.id,
          //         "coder_session": this.state.session_id,
          //         "label": {
          //           "diag": {
          //             "name": tag_text
          //           },
                    
          //         },
          //         "status": 2,
          //         "num_proc": 1,
          //         "initial_offset": data.start,
          //         "final_offset": data.end,
          //       };
          //     }
          //       ExecuteApi('coder_annotations', 'POST', '', json1).then((resp) => {
          //         if (resp) {
          //           stateData[count].label_status = 0;
          //           stateData[count].status = 2;
          //           stateData[index].dis_id = resp.id;
          //           stateData[index].label_type = resp.label.label_type;
          //           if (resp.label.label_type === 1 || resp.label.label_type === 3)
          //             stateData[count].label = resp.label.diag;
          //           else
          //             stateData[count].label = resp.label.proc;
          //           stateData[count].state = 'OLD';
          //           this.setState({
          //             value: stateData,
          //           });
          //         }

          //       });
          //     }
          //   }
            
          //   return 1;
          // });
          this.setState({
            value: stateData,
          });
        }
      });
    }
    else if (current_state.state === 'EDIT' || current_state.state === 'OLD'  || current_state.state === 'OLD_NO_LABEL') {
      let json = {};
       // eslint-disable-next-line
      if(label_type == 1){
        json = {
          "label": {
            "diag": {
              "name": tag_text
            },
            "cof": cof,
          },
          "status": 2
        };
         // eslint-disable-next-line
      }else if(label_type == 2){
        
        json = {
          "label": {
            "proc": {
              "name": tag_text
            },
            
          },
          "status": 2,
          "num_proc" : 0,
        };
      }
      ExecuteApi('coder_annotations/' + stateData[index].dis_id, 'PATCH', '', json).then((resp) => {
        try {
          stateData[index].label_status = 0;
          stateData[index].status = 2;

          if (resp.label.label_type === 1 || resp.label.label_type === 3)
            stateData[index].label = resp.label.diag;
          else
            stateData[index].label = resp.label.proc;
          this.setState({
            value: stateData,
          });
        }
        catch (e) {
          history.push('/errorpage');
        }
      });
    }
    if(this.state.isdagger){
      this.closeAsteriskModal();
    }
  }
  ManageAddToCodeApplyStatus = (e) =>{
    this.setState({
      icdSaveOppStatus : e.target.value
    })
   
  }
  addCustomICDCode = (e) => {
    let stateData = this.state.value;
    let index = '';
    let start = e.target.dataset.start;
    stateData.map((data, count) => {
      if (Number(e.target.dataset.start) === Number(data.start) && Number(e.target.dataset.end) === Number(data.end)) {
        index = count;
      }
      return 1;
    });

    let element = document.getElementById('popovertop' + start);
    if (element) {
      element.click();
    }
    stateData[index].state = "CUSTOM";
    this.setState({
      value: stateData,
    });
  }
  activeTag = (start, end) => {
    let statedata = this.state.value;
    let tag = '';
    statedata.map((item, count) => {

      if (item.start === start && item.end === end) {
        tag = item.label.name;
        localStorage.setItem('lastActiveToken', count);
        statedata[count].isActive = true;
      }
      else {
        statedata[count].isActive = false;
      }
      this.rightTagActive(tag);
      return 0;
    });
    this.setState({
      value: statedata,
    });

  }
  activeTag1 = (start, end) => {
    let statedata = this.state.value;
    let tag = '';
    statedata.map((item, count) => {

      if (item.start === start && item.end === end) {
        tag = item.label.name;
        statedata.map((item, count) => {

          if (item.label.name === tag) {
            statedata[count].isActive1 = true;
            statedata[count].isActive = true;
          }
          else {
            statedata[count].isActive1 = false;
            statedata[count].isActive = false;
          }
          return 0;
        });
        this.setState({
          value: statedata,
        });
      }
      return 1;
    });
    this.setState({
      value: statedata,
    });

  }
  rightTagActive(tag) {
    let statedata = this.state.value;
    statedata.map((item, count) => {

      if (item.label.name === tag) {
        statedata[count].isActive1 = true;
      }
      else {
        statedata[count].isActive1 = false;
      }
      return 0;
    });
    this.setState({
      value: statedata,
    });
  }
  addAsteriskCode =() => {
   
    if(this.state.icdSaveOppStatus===1){
    
      // this.icdPOPUPConfirm();
      this.handleasktoapplycodemodal();
      localStorage.setItem('linkAsteriskCodeTODoc',1);  
      localStorage.setItem('currentdiag',this.state.asteriskCode);
    }else{
      
          let json = {
              "status": 2,
              "label_type" : 1,
              "discharge": this.props.id.id,
              "coder_session": this.state.session_id,
              "diag": {
                  "name": this.state.asteriskCode
              },
              cof : this.state.cof,
              seventh_char:"",
              reviewed: true
              
          };

          ExecuteApi('coder_discharge_labels/', 'POST', '', json).then((resp) => {
            this.handleasktoapplycodemodal();
            this.handleDagger(false);
            this.handleAsterisk('');
            this.showToast('success','Success, code added directly');
            
          });
      }
  }
  openPopupForCustomICDCode(e) {
    let obj = { 'start': e.target.dataset.start, 'end': e.target.dataset.end };
    this.setState({ custom_icdSession: obj });
    if (document.getElementById("popovertop" + e.target.dataset.start)) {
      document.getElementById("popovertop" + e.target.dataset.start).click();
    }
    this.custom_icd_popup(this.self);

  }
  custom_icd_popup = (e) => {
    this.setState({ customIcdPopupStatus: !this.state.customIcdPopupStatus });
  }
  icdPOPUPConfirm = (e) => {
    this.setState({ icdPOPUPConfirm: !this.state.icdPOPUPConfirm });
  }
  applyAsteriskCode = (e) => {
    this.setState({ applyAsteriskCode : !this.state.applyAsteriskCode });
  }
  closeAsteriskModal = () =>{
    this.setState({ asteriskModal : !this.state.asteriskModal });
  }
  handleasktoapplycodemodal = () => {
    this.setState({
      asteriskModal : false,
       asktoapplycodeModal : !this.state.asktoapplycodeModal 
      });
  }
  cancelCustomICDCode = () => {
    this.handleSplitClick1(this.state.custom_icdSession.start, this.state.custom_icdSession.end);
    this.custom_icd_popup();
  }
  manageCustomICDTag = (e) => {
    this.setState({ customICDTag: e.target.value });
  }
  
 
  addCustomICDCodePop = () => {
    let stateData = this.state.value;
    let index = '';
    stateData.map((data, count) => {
      if (Number(this.state.custom_icdSession.start) === Number(data.start) && Number(this.state.custom_icdSession.end) === Number(data.end)) {
        index = count;
      }
      return 1;
    });

    let current_state = this.state.value[index];
    let tag_text = this.state.customICDTag;

    let proc_diag = "diag";	
    if (tag_text.charAt(0) <= '9' && tag_text.charAt(0) >=0){	
      proc_diag = "proc"	
    }

    let json = {
      "report": this.state.report_id,
      "discharge": this.props.id.id,
      "coder_session": this.state.session_id,
      "label": {
        [proc_diag]: {
          "name": tag_text
        }
      },
      "status": 2,
      "initial_offset": current_state.start,
      "final_offset": current_state.end,
    };
    if (tag_text) {
      if (current_state.state === 'CUSTOM' || current_state.state === 'NEW' || current_state.label === 'NEW') {
        ExecuteApi('coder_annotations', 'POST', '', json).then((resp) => {
          if (resp.label && resp.label[0] !== 'Incorrect Diagnosis Name') {
            
            stateData[index].label_status = 0;
            stateData[index].dis_id = resp.id;
            stateData[index].label_type = resp.label.label_type;
            stateData[index].status = 2;
            if (resp.label.label_type === 1 || resp.label.label_type === 3)
              stateData[index].label = resp.label.diag;
            else
              stateData[index].label = resp.label.proc;
            stateData[index].state = 'OLD';


            stateData.map((data, count) => {
              if (current_state.tag === data.tag) {
                if (data.state === 'NEW' || data.state === 'CUSTOM') {
                  let proc_diag = "diag";	
                  if (tag_text.charAt(0) <= '9' && tag_text.charAt(0) >=0){	
                    proc_diag = "proc"	
                  }
                  let json1 = {
                    "report": this.state.report_id,
                    "discharge": this.props.id.id,
                    "coder_session": this.state.session_id,
                    "label": {
                      [proc_diag]: {
                        "name": tag_text
                      }
                    },
                    "status": 2,
                    "initial_offset": data.start,
                    "final_offset": data.end,
                  };
                  ExecuteApi('coder_annotations', 'POST', '', json1).then((resp) => {

                    stateData[index].label_status = 0;
                    stateData[index].dis_id = resp.id;
                    stateData[index].label_type = resp.label.label_type;
                    stateData[index].status = 2;
                    if (resp.label.label_type === 1 || resp.label.label_type === 3)
                      stateData[index].label = resp.label.diag;
                    else
                      stateData[index].label = resp.label.proc;
                    stateData[index].state = 'OLD';
                    this.setState({
                      value: stateData,
                    });
                  });
                }
                else {
                  if (data.dis_id) {
                    let json = { "status": 2 };
                    ExecuteApi('coder_annotations/' + data.dis_id, 'PATCH', '', json).then((resp) => {

                      stateData[count].label_status = 0;
                      stateData[count].status = 2;
                      this.setState({
                        value: stateData,
                      });
                    });
                  }
                }

              }
              return 1;
            });
            this.custom_icd_popup();
            // ToastsStore.success("ICD/ACHI Code Added");
            this.showToast('success','ICD/ACHI Code Added');
            this.setState({ customICDTag: '' });
            this.setState({ custom_icdSession: {} });
            this.setState({
              value: stateData,
            });
          
        }else{
          this.showToast('warning','Please enter valid code');
        }
        });
      }
      else if (current_state.state === 'EDIT' || current_state.state === 'OLD' || current_state.state === 'OLD_NO_LABEL') {
        let proc_diag = "diag";	
        if (tag_text.charAt(0) <= '9' && tag_text.charAt(0) >=0){	
          proc_diag = "proc"	
        }
        let json = {
          "label": {
            [proc_diag]: {
              "name": tag_text
            }
          },
          "status": 2
        };
        ExecuteApi('coder_annotations/' + stateData[index].dis_id, 'PATCH', '', json).then((resp) => {
          if (resp.label && resp.label[0] !== 'Incorrect Diagnosis Name') {
              stateData[index].label_status = 0;
              stateData[index].status = 2;
              stateData[index].label.name = tag_text;
              this.setState({
                value: stateData,
              });
              this.custom_icd_popup();
              // ToastsStore.success("ICD/ACHI Code Added");
              this.showToast('success','ICD/ACHI Code Added');
              this.setState({ customICDTag: '' });
              this.setState({ custom_icdSession: {} });
          }else{
            this.showToast('warning','Please enter valid code');
          }
        });
      }
      else {

      }
    }
    else {
      this.showToast('warning','Please Enter ICD/ACHI Code');
    
    }

  }
  Split = props => {
    if (props.mark) {
      
      if (props.status === 2) {
        let custom_css = {
          'maxWidth': '100%',
        };
        if (props.stateValue.isActive === true) {
          custom_css = {
            'boxShadow': '8px 1px 20px 10px #CCC',
            'maxWidth': '100%',
          }
        }
        
        
        return (
          <React.Fragment>
            <Chip
              label={`${props.content} | ${props.stateValue.label.name}`}
              onDelete={()=>this.handleSplitClick(props.stateValue.start,props.stateValue.end)}
              onClick={() => this.activeTag(props.stateValue.start, props.stateValue.end)}
              deleteIcon={<CloseIcon data-start={props.stateValue.start} data-end={props.stateValue.end}  />}
              id={`popovertop${props.stateValue.start}`}
              size="small"
              style={custom_css}
              className={`${props.status === 2 ? 'approve' : '' }`}
            />
            <UncontrolledPopover trigger="legacy" id={`popover1${props.stateValue.start}`} placement="top" target={`popovertop${props.stateValue.start}`}>
              <PopoverBody>
                <i data-index={props.indexValue} onClick={() => this.toggleModal(props.start, props.end, props.indexValue + 1, 'EDIT')} className="mdi mdi-bacteria-outline icon tag_action_icon tag_icon_one" ></i>
                <i data-index={props.indexValue} onClick={()=> this.toggleProcedureModal(props.start,props.end,props.indexValue+1, 'EDIT')} className="mdi mdi-needle tag_action_icon tag_icon_two"></i>
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} data-a={JSON.stringify(props.stateValue)} className="mdi mdi-checkbox-marked-outline tag_action_icon tag_icon_three" data-tag={props.stateValue.label.name} data-id={props.dis_id} onClick={this.ApproveAnnotationAction}></i>
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} onClick={()=>this.handleSplitClick(props.stateValue.start,props.stateValue.end)} className="mdi mdi-trash-can tag_action_icon" ></i>
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} onClick={this.openPopupForCustomICDCode.bind(this)} className="mdi mdi-comment-plus-outline tag_action_icon" ></i>
              </PopoverBody>
            </UncontrolledPopover>
          </React.Fragment>
        );
      } else if (props.state === 'NEW' || props.state === 'CUSTOM' || props.state === 'OLD_NO_LABEL') {
        let custom_css = {
          'background': 'none',
          'maxWidth': '100%',
          
        }
        if (props.stateValue.isActive === true) {
          custom_css = {
            'boxShadow': '8px 1px 20px 10px #CCC',
            'background': 'none',
            'maxWidth': '100%',
            
          }
        }
        return (
          <React.Fragment>
            <Chip
              label={`${props.content}`}
              onDelete={()=>this.handleSplitClick(props.stateValue.start,props.stateValue.end)}
              deleteIcon={<CloseIcon data-start={props.stateValue.start} data-end={props.stateValue.end} />}
              
              onClick={() => this.activeTag(props.stateValue.start, props.stateValue.end)}
              variant="outlined"
              data-start={props.stateValue.start}
              id={`popovertop${props.stateValue.start}`}
              style={custom_css}
              size="small"
              className="suggestion"
            />
            <UncontrolledPopover trigger="legacy" id={`popovertop1${props.stateValue.start}`} placement="top" target={`popovertop${props.stateValue.start}`}>
              <PopoverBody>
                <i onClick={() => this.toggleModal(props.start, props.end, '', 'ADD')} className="mdi mdi-bacteria-outline tag_action_icon icon mr-1" data-index={props.indexValue} ></i>
                <i data-index={props.indexValue} onClick={()=> this.toggleProcedureModal(props.start,props.end,'', 'ADD')} data-start={props.start} data-end={props.end} className="mdi mdi-needle tag_action_icon tag_icon_two  ml-1" ></i>   {/* onClick={this.addCustomICDCode} */}
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} onClick={this.openPopupForCustomICDCode.bind(this)} className="mdi mdi-comment-plus-outline tag_action_icon" ></i>
              </PopoverBody>
            </UncontrolledPopover>
          </React.Fragment>
        );
      }
      else if (props.status === 1 && props.stateValue.label) {
       
        let custom_css = {
          'maxWidth': '100%',
          
        };
        if (props.stateValue.isActive === true) {
          custom_css = {
            'boxShadow': '8px 1px 20px 10px #CCC',
            'maxWidth': '100%',
            
          }
        }
        let clsname = '';
        
        if(this.state.approveLabel.indexOf(props.stateValue.label.name)!= -1){
          clsname = "annoApprove";
        }else{
          clsname = "suggestion";
        }
        
        return (
          <React.Fragment>
            <Chip
              label={`${props.content} | ${props.stateValue.label.name}`}
              variant="outlined"
              onDelete={()=>this.handleSplitClick(props.stateValue.start,props.stateValue.end)}
              deleteIcon={<CloseIcon style={{ 'color': '#808080' }} data-start={props.stateValue.start} data-end={props.stateValue.end} />}
              data-start={props.stateValue.start}
              onClick={() => this.activeTag(props.stateValue.start, props.stateValue.end)}
              id={`popovertop${props.stateValue.start}`}
              size="small"
              style={custom_css}
              className={clsname}
            />
            <UncontrolledPopover trigger="legacy" id={`popovertop1${props.stateValue.start}`} placement="top" target={`popovertop${props.stateValue.start}`}>
              <PopoverBody>
                <i data-index={props.indexValue} onClick={() => this.toggleModal(props.start, props.end, props.indexValue + 1, 'EDIT')} className="mdi mdi-bacteria-outline icon tag_action_icon tag_icon_one" ></i>
                <i data-index={props.indexValue} onClick={()=> this.toggleProcedureModal(props.start,props.end,props.indexValue+1, 'EDIT')} className="mdi mdi-needle tag_action_icon tag_icon_two text-primary"></i>
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} data-a={JSON.stringify(props.stateValue)} className="mdi mdi-checkbox-marked-outline tag_action_icon tag_icon_three " data-tag={props.stateValue.label.name} onClick={this.ApproveAnnotationAction} data-id={props.dis_id}></i>
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} onClick={()=>this.handleSplitClick(props.stateValue.start,props.stateValue.end)} className="mdi mdi-trash-can tag_action_icon " ></i>
                <i data-index={props.indexValue} data-start={props.stateValue.start} data-end={props.stateValue.end} onClick={this.openPopupForCustomICDCode.bind(this)} className="mdi mdi-comment-plus-outline tag_action_icon " ></i>
              </PopoverBody>
            </UncontrolledPopover>
          </React.Fragment>
        );
      }
    }
    return (
      <span
        data-start={props.start}
        data-end={props.end}
        onClick={() => props.onClick({ start: props.start, end: props.end })}
      >
        {props.content}

      </span>
    )
  }
  ApproveAnnotationAction = (event) => {
    let id = event.target.dataset.id;
    let tag = event.target.dataset.tag;
    let start = event.target.dataset.start;
    let stateData = this.state.value;
    let json = { "status": 2 };
    let element = document.getElementById('popovertop' + start);
    if (element) {
      element.click();
    }
    stateData.map((manageMultipal, indexCount) => {
      let tag_second = manageMultipal.dis_id;
      if (tag_second == id) {
        ExecuteApi('coder_annotations/' + stateData[indexCount].dis_id, 'PATCH', '', json).then((resp) => {
          stateData[indexCount].label_status = 0;
          stateData[indexCount].status = 2;
          this.setState({
            approveLabel : [...this.state.approveLabel, tag],
            value: stateData
          });
        });
      }
      return 1;
    })
  }
  splitWithOffsets = (text, offsets) => {
    let lastEnd = 0
    const splits = [];
    let indx = 0;
    for (let offset of sortBy(offsets, o => o.start)) {
      const { start, end, status } = offset
      if (lastEnd < start) {
        splits.push({
          start: lastEnd,
          end: start,
          content: text.slice(lastEnd, start),
          status: status,
        })
      }
      splits.push({
        ...offset,
        mark: true,
        stateValue: offset,
        indexValue: indx,
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
    return splits
  }
  ChangeNewTagStatus = (event) => {
    let stateData = this.state.value;
    let index = '';
    let start1 = event.target.dataset.start;
    let end1 = event.target.dataset.end;
    stateData.map((data, count) => {
      if (Number(start1) === Number(data.start) && Number(end1) === Number(data.end)) {
        index = count;
      }
      return 1;
    });

    if (index || index === 0) {
      stateData[index].label = 'NEW';
      this.setState({ value: stateData });
    }
    document.getElementById('popovertop-' + start1).click();

  }
  resetActiveTag(e) {
    let statedata1 = JSON.parse(e.target.dataset.json);
    let lastActiveToken = localStorage.getItem('lastActiveToken');
    if (lastActiveToken) {
      statedata1[lastActiveToken].isActive = false;
      this.setState({
        value: statedata1,
      });
    }
  }
  handleActiveAnnotation = (event) => {
    let statedata1 = this.state.value;
    statedata1.map((indexData, i) => {
      statedata1[i].isActive = false;
      statedata1[i].isActive1 = false;
      return 1;
    });
    this.setState({
      value: statedata1,
    });

    let stateData = this.state.value;
    let index = '';
    stateData.map((data, count) => {
      if (event.start === data.start && event.end === data.end) {
        index = count;
      }
      return 1;
    });

    if (stateData[index]) {
      this.setState({ tag: stateData[index].label.name });
    }
    if (old_index !== '') {
      if (stateData[old_index]) {
        stateData[old_index].isActive = false;
        stateData[old_index].label_status = 0;
      }
    }
    if (stateData[index]) {
      stateData[index].isActive = true;
      stateData[index].label_status = 1;
      if (stateData[index].label !== '')
        stateData[index].state = 'EDIT';
      this.setState({ value: stateData });
    }
    old_index = index;
  }
  handleSplitClick = (start,end) => {
    const splitIndex = this.state.value.findIndex(s => s.start === Number(start) && s.end === Number(end))
   
    if (splitIndex >= -1) {
      let data = this.state.value[splitIndex];
      if (data.state === 'OLD' || data.state === 'OLD_NO_LABEL') {
        let json = { "status": 3 };
        ExecuteApi('coder_annotations/' + data.dis_id, 'PATCH', '', json).then((resp) => {
        });
      }
      let arr = [...this.state.value];
      arr.splice(splitIndex, 1);
      
      this.setState({ value: arr });
    }
  }
  handleSplitClick1 = (start, end) => {
    const splitIndex = this.state.value.findIndex(s => s.start === Number(start) && s.end === Number(end))
    if (splitIndex >= -1) {
      let data = this.state.value[splitIndex];
      if (data.state !== 'OLD' || data.state === 'OLD_NO_LABEL') {
        let arr = this.state.value;
        arr.splice(splitIndex, 1);
        this.setState({ value: arr });
      }

    }
  }
  handleMouseUp = (props) => {
    let id = 'text' + this.state.report_id;
    var test = document.getElementById(id);
    if (test) {
      test.addEventListener('mousedown', function (e) {
        if (e.detail > 1) {
          e.preventDefault();
        }
      });
    }



    const selection = window.getSelection()
    if (this.selectionIsEmpty(selection)) return
    if (selection.anchorNode) {
      let start =
        parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) +
        selection.anchorOffset
      let end =
        parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) +
        selection.focusOffset

      if (this.selectionIsBackwards(selection)) {
        ;[start, end] = [end, start]
      }

      let data = { dis_id: '', label_type: '', state: 'NEW', start: start, end: end, tag: this.state.text.slice(start, end), 'label': 'New', 'status': 1, 'label_status': 1, 'isActive': false, 'isActive1': false };
      
      if(localStorage.getItem('linkCodeTODoc')) {
        this.icdPOPUPConfirm();
      }
      if(localStorage.getItem('linkAsteriskCodeTODoc')){
          
         
          localStorage.setItem('start_ofset',start);
          localStorage.setItem('end_ofset',end);
        
        this.applyAsteriskCode();
      }
      localStorage.setItem('start_ofset',start);
      localStorage.setItem('end_ofset',end);
      this.setState({ value: [...this.state.value, data] });
      setTimeout(function () {
        if (document.getElementById('popovertop' + start)) {
          document.getElementById('popovertop' + start).click();
        }
      }, 100);
      window.getSelection().empty()
    }
  }
  selectionIsEmpty = (selection) => {
    if (selection.focusNode) {
      let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)
      return position === 0 && selection.focusOffset === selection.anchorOffset
    }
  }
  getIndex = (stateData, start, end) => {
    let index = '';
    stateData.map((data, count) => {
      if (Number(start) === Number(data.start) && Number(end) === Number(data.end)) {
        index = count;
      }
      return 1;
    });
    return index;
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
  getSpan = (props, span) => {
    // TODO: Better typings here.
    if (props.getSpan) return props.getSpan(span)
  }
  changeTagLavelStatus(event) {
    var state_data = this.state.value;
    if (old_index !== '') {
      state_data[old_index].isActive = false;
      state_data[old_index].label_status = 0;
    }
    state_data[event.target.dataset.index].label_status = 1;
    state_data[event.target.dataset.index].isActive = true;
    this.setState({ tag: state_data[event.target.dataset.index].label.name });
    this.setState({
      value: state_data,
    });
    old_index = event.target.dataset.index;
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    var stateData = this.state.value;
    let index = '';

    stateData.map((data, count) => {
      if (Number(event.target.dataset.start) === Number(data.start) && Number(event.target.dataset.end) === Number(data.end)) {
        index = count;
      }
      return 1;
    });

    if (code === 13) {
      if (this.state.tag) {

        let current_state = this.state.value[index];
        let tag_text = this.state.tag;
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


        if (current_state.state === 'CUSTOM' || current_state.state === 'NEW' || current_state.label === 'NEW') {
          ExecuteApi('coder_annotations', 'POST', '', json).then((resp) => {
            if (resp.label) {
              stateData[index].label_status = 0;
              stateData[index].status = 2;
              if (resp.label.label_type === 1 || resp.label.label_type === 3)
                stateData[index].label = resp.label.diag;
              else
                stateData[index].label = resp.label.proc;
              stateData[index].state = 'OLD';
              stateData.map((data, count) => {
                if (current_state.tag === data.tag) {
                  if (data.state === 'NEW' || data.state === 'CUSTOM') {

                    let json1 = {
                      "report": this.state.report_id,
                      "discharge": this.props.id.id,
                      "coder_session": this.state.session_id,
                      "label": {
                        "diag": {
                          "name": tag_text
                        }
                      },
                      "status": 2,
                      "initial_offset": data.start,
                      "final_offset": data.end,
                    };
                    ExecuteApi('coder_annotations', 'POST', '', json1).then((resp) => {

                      stateData[count].label_status = 0;
                      stateData[count].status = 2;
                      if (resp.label.label_type === 1 || resp.label.label_type === 3)
                        stateData[count].label = resp.label.diag;
                      else
                        stateData[count].label = resp.label.proc;
                      stateData[count].state = 'OLD';
                      this.setState({
                        value: stateData,
                      });
                    });
                  }
                  else {
                    if (data.dis_id) {
                      let json = { "status": 2 };
                      ExecuteApi('coder_annotations/' + data.dis_id, 'PATCH', '', json).then((resp) => {
                        stateData[count].label_status = 0;
                        stateData[count].status = 2;
                        this.setState({
                          value: stateData,
                        });
                      });
                    }
                  }

                }
                return 1;
              });
              this.setState({
                value: stateData,
              });
            }
          });
        }
        else if (current_state.state === 'EDIT') {
          let json = {
            "label": {
              "diag": {
                "name": this.state.tag
              }
            },
            "status": 2
          };
          ExecuteApi('coder_annotations/' + stateData[index].dis_id, 'PATCH', '', json).then((resp) => {
            stateData[index].label_status = 0;
            stateData[index].status = 2;
            stateData[index].label.name = this.state.tag;
            this.setState({
              value: stateData,
            });
          });
        }
        else {

        }
      }
    }
  }
  
  render() {
    const cancelConinueAndReview =() =>{
      localStorage.removeItem('linkCodeTODoc');
      if($("ul.react-tabs__tab-list li:nth-child(1)")) {
        $("ul.react-tabs__tab-list li:nth-child(1)").click();
      }
      setTimeout(function(){
        if(document.getElementById('backtoreviewCode'))
        {
          document.getElementById('reviewBlock').click();
          document.getElementById('backtoreviewCode').click();
        }
      },1000)
    }
    const acceptAndContinueCoding = () => {
      
      let cof=this.state.cof;
      let start = localStorage.getItem('start_ofset');
      let end = localStorage.getItem('end_ofset');
      let code = localStorage.getItem('currentdiag');
     
      let statedata = this.state.value;
  
      let json1 = {
        "report": this.state.report_id,
        "discharge": this.props.id.id,
        "coder_session": this.state.session_id,
        "label": {
          "diag": {
            "name": code 
          },
          "cof": cof,
        },
        "status": 2,
        "initial_offset": start,
        "final_offset": end,
      };
      ExecuteApi('coder_annotations', 'POST', '', json1).then((resp) => {
        this.handleDagger(false);
        localStorage.removeItem('start_ofset');
        localStorage.removeItem('end_ofset');
        localStorage.removeItem('currentdiag');
        localStorage.removeItem('cofStatus');
        localStorage.removeItem('linkAsteriskCodeTODoc');
        this.handleAsterisk('');
        this.applyAsteriskCode();
        
        if (resp.label) {
           statedata.map((item, count) => {
             // eslint-disable-next-line
            if (item.start == start && item.end == end) {
             
              statedata[count].label_status = 0;
              statedata[count].dis_id = resp.id;
              statedata[count].label_type = resp.label.label_type;
              statedata[count].status = 2;
              // eslint-disable-next-line
              if (resp.label.label_type == 1 || resp.label.label_type == 3){
                statedata[count].label = resp.label.diag;
              }
              else{
              statedata[count].label = resp.label.proc;
              }
              statedata[count].state = 'OLD';
            }
            return '';
          })
          this.setState({
            value : statedata
            
          })
          
        }
        
        
      });
      
      
     
     
      
  }
    const cancelConinueAndCoding =() =>{
      this.handleDagger(false);
        this.handleAsterisk('');
        this.applyAsteriskCode();
      localStorage.removeItem('linkAsteriskCodeTODoc');
      localStorage.removeItem('currentdiag');
      localStorage.removeItem('start_ofset');
        localStorage.removeItem('end_ofset');
      
    }
    const reselectText = (e) => {
      let data = this.state.value;
      if(data) 
      {
        data.map((item,index)=>{
          if(Number(item.start)===Number(localStorage.getItem('start_ofset')) && Number(item.end)===Number(localStorage.getItem('end_ofset')))
          {
            
            data.splice(index, 1);
            localStorage.removeItem('start_ofset');
            localStorage.removeItem('end_ofset');
            this.icdPOPUPConfirm();
            this.setState({ value: data });
          }
          return 1;
        })
      }

      
     


    }
    const reselectTextCoding = (e) => {
      let data = this.state.value;
      if(data) 
      {
        data.map((item,index)=>{
          if(Number(item.start)===Number(localStorage.getItem('start_ofset')) && Number(item.end)===Number(localStorage.getItem('end_ofset')))
          {
            
            data.splice(index, 1);
            localStorage.removeItem('start_ofset');
            localStorage.removeItem('end_ofset');
            this.applyAsteriskCode();
            this.setState({ value: data });
          }
          return 1;
        })
      }
    }
    
    const acceptAndContinue = () =>{
      let cof=this.state.cof;
      if(localStorage.getItem('cofStatus'))
       cof =localStorage.getItem('cofStatus');
    
      let json1 = {
        "report": this.state.report_id,
        "discharge": this.props.id.id,
        "coder_session": this.state.session_id,
        "label": {
          "diag": {
            "name": localStorage.getItem('currentdiag') 
          },
          "cof": cof,
        },
        "status": 2,
        "initial_offset": localStorage.getItem('start_ofset'),
        "final_offset": localStorage.getItem('end_ofset'),
      };
      ExecuteApi('coder_annotations', 'POST', '', json1).then((resp) => {
        localStorage.removeItem('start_ofset');
        localStorage.removeItem('end_ofset');
        localStorage.removeItem('currentdiag');
        localStorage.removeItem('cofStatus');
        localStorage.removeItem('linkCodeTODoc');
        
          cancelConinueAndReview(); 
      });
    }
    
    
    let splits = this.splitWithOffsets(this.state.text, this.state.value);
    
    return (
      <div>
      <div className="row" id={`text${this.state.report_id}`}>
          
        <div className="col-sm-8 text">
          <Card className="pl-3 pt-4 pr-3 pb-1" >

            <div className="change_line" onMouseUp={this.handleMouseUp}>
              {splits.length > 0 && splits.map((split, index) => {
                split.index = index;
                return (<this.Split key={`${split.start}-${split.end}`}   {...split} onClick={this.handleActiveAnnotation} />)
              })}
            </div>
          </Card>
        </div>
        <div className="col-sm-4"  >
          <Annotations value={this.state.value} activeTag1={this.activeTag1} handleTagChange={this.handleTagChange}  enterPressed={this.enterPressed}/>
         
        </div>
       </div>
       <Toast 
            toastList={this.state.list}
            position='top-right'
            autoDelete={this.state.checkValue}
            dismissTime={this.state.dismissTime}
        />
        <TabularList data={{ 'modal': this.state.modal }} selectedCode={this.state.selectedCode} addICDCode={this.addICDCode} toggleModal={this.toggleModal} handleDagger={this.handleDagger} handleAsterisk={this.handleAsterisk} />
        
        <ProcedureModal data={{ 'stateprocedureModal' : this.state.stateprocedureModal }} selectedCode={this.state.selectedCode} addICDCode={this.addICDCode} toggleProcedureModal={this.toggleProcedureModal} handleDagger={this.handleDagger} handleAsterisk={this.handleAsterisk} />
        <button style={{ 'display': 'none' }} id="manageIsActiveStateId" onClick={this.manageIsActiveState}></button>
        <Modal
          isOpen={this.state.customIcdPopupStatus}
        >
          <ModalHeader toggle={() => this.custom_icd_popup(this.self)}>ICD/ACHI</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Enter ICD/ACHI code</label>
                      <input onChange={this.manageCustomICDTag} type="text" name="icdCode" className="form-control" />
                    </div>
                    <div className="form-group">
                      <button onClick={this.cancelCustomICDCode} className="btn btn-secondary">Cancel</button>
                      <button onClick={this.addCustomICDCodePop} className="btn btn-success ml-2">Accept</button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>



        <Modal
          isOpen={this.state.icdPOPUPConfirm}
        >
          <ModalHeader toggle={() => this.icdPOPUPConfirm(this.self)}>Confirm text selection</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <div className="row">
                  <div className="col-sm-12">
                    <p>Please choose how you wish to continue</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-info mr-2 btn-sm textactionbtn" onClick={reselectText.bind(this)}>Reselect Text</button>
                    <button className="btn btn-success mr-2 btn-sm textactionbtn" onClick={acceptAndContinue}>Accept & continue review</button>
                    <button className="btn btn-secondary mr-2 btn-sm textactionbtn" onClick={cancelConinueAndReview}>Cancel & continue review</button>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Model
         
          show={this.state.applyAsteriskCode} onHide={this.applyAsteriskCode}
          id="asteriskModal"
        >
          <Model.Header>Confirm text selection</Model.Header>
          <Model.Body>
            <Row>
              <Col md={12}>
                <div className="row">
                  <div className="col-sm-12">
                    <p>Please choose how you wish to continue</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-info mr-2 btn-sm textactionbtn" onClick={reselectTextCoding.bind(this)}>Reselect Text</button>
                    <button className="btn btn-success mr-2 btn-sm textactionbtn" onClick={acceptAndContinueCoding}>Accept & continue coding</button>
                    <button className="btn btn-secondary mr-2 btn-sm textactionbtn" onClick={cancelConinueAndCoding}>Cancel & continue coding</button>
                    
                  </div>
                </div>
              </Col>
            </Row>
          </Model.Body>
        </Model>
        <Modal
          isOpen={this.state.asteriskModal}
        >
          <ModalHeader toggle={this.closeAsteriskModal}></ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <div className="row">
                  <div className="col-sm-12">
                    <p>Would you like to also add the asterisk code { this.state.asteriskCode }* </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                   
                    <button className="btn btn-success mr-2 btn-sm textactionbtn" onClick={this.handleasktoapplycodemodal}>Yes</button>
                    <button className="btn btn-secondary mr-2 btn-sm textactionbtn" onClick={this.closeAsteriskModal}>Back to coding</button>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.asktoapplycodeModal}>
            <ModalHeader toggle={this.closeAsteriskModal}>
                <div className="row">
                    <div className="col-sm-12"><h4>Choose how you would like to add to code </h4></div>
                </div>
            </ModalHeader>
            <ModalBody>
                    <Row>
                        <Col md={12}>
                         <input type="radio" onChange={this.ManageAddToCodeApplyStatus} checked="checked" name="radio1" value="1" id="linkCodeToDocument" /><label for="linkCodeToDocument" className="ml-2">Link code to documentation (make audits simple)</label><br />
                         <span className="text-success ml-3">(Recommended)</span><br /><br />
                         <input type="radio" name="radio1" onChange={this.ManageAddToCodeApplyStatus} value="2" id="addCodeToDischarge" /><label for="addCodeToDischarge" className="ml-2">Add code to discharge directly (no linking)</label> 
                        </Col>
                    </Row>
            </ModalBody>
            <ModalFooter style={{'background':'#f3f4f8'}} className="float-right">
            <br /><br />
                <Button onClick={this.handleasktoapplycodemodal} className="btn-sm">Back to coding</Button>
                <Button color="success" onClick={this.addAsteriskCode} className="btn-sm">Accept & continue</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default ReportDetails; 