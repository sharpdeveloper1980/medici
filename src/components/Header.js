import React, { Component,useEffect,useState } from 'react';
import { Link,useHistory } from 'react-router-dom'; 
import { useAuth0 } from "@auth0/auth0-react";
import  logo from '../assets/images/medici_logo.svg';
// import UserIcon from '../assets/images/gr.png';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import {Chardin} from 'chardin.ts';
import 'chardin.ts/chardinjs.scss';
import { Divider } from '@material-ui/core';
import { DriveEta } from '@material-ui/icons';
let chardin;
const HeaderParent = (props) => { 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [title, setTitle] = useState([]);
  const history = useHistory();
  const {
    logout,
    isAuthenticated,
  } = useAuth0();
  var logoElement = document.getElementById("appLogo");
  if(logoElement)
  {
      if(!localStorage.getItem('appOpen')) {
        logoElement.click();
        localStorage.setItem('appOpen','1');
      }
  }
  const logoutApp =() => {
    localStorage.removeItem('openReportId');
    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });
    logoutWithRedirect();
  }
  if(!isAuthenticated)
  { 
        history.push("/"); 
  }
    let location = props.actiontoken;
    useEffect(()=>{
      window.onbeforeunload = function() {
        // logoutApp(); 
      };
      let activeusername = localStorage.getItem('activeusername');
      let name = activeusername.split(' ');
      let firstchar ='';
      let secondchar = '';
      // eslint-disable-next-line
      if(name[0].length>0){
          firstchar = name[0].charAt(0);
      }
      // eslint-disable-next-line
      if(name[1].length >0){
          secondchar = name[1].charAt(0);
      }
      setTitle(firstchar+''+secondchar);
      chardin = new Chardin(document.querySelector('body'));
      
        // $('body').on('click', 'button[data-toggle="chardinjs"]', function (e) {
        //     e.preventDefault();
        //     return ($('body').data('chardinJs')).toggle();
        // });  
    },[]);
    const showHelp=()=>{
        chardin.start();
    }
    let coderUrl='/discharges/discharge';
	  const toggleDropdown=() => {
      setDropdownOpen(!dropdownOpen);
    }
    const toggleDropdown1=() => {
      setDropdownOpen1(!dropdownOpen1);
    }
    const toggleDropdown2=() => {
      setDropdownOpen2(!dropdownOpen2);
    }
    const notificationContainerStyle = {
        maxHeight: '230px',
        display: 'none',
    };
    const returnTo=(param)=>{
        
        if(localStorage.getItem('ischanged') == 'true'){
            let ele = document.getElementById("saveonTabChange");
                if(ele)
                {
                    ele.click();
                   
                }
        }else{
            
            history.push(param);
        }
    }
    return (
      <React.Fragment>
            
      <div className="navbar-custom " style={{'height':'92px'}}>
          <div className="topnav-navbar-dark">
          <div className="container-fluid">
              <ul className="list-unstyled topbar-right-menu float-right mb-0">
                  <li className="notification-list topbar-dropdown d-lg-none">
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle
                            data-toggle="dropdown"
                            tag="a"
                            className="nav-link dropdown-toggle arrow-none mr-0"
                            onClick={toggleDropdown}
                            aria-expanded={dropdownOpen}>
                            <i className="mdi mdi-magnify noti-icon"></i>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-animated topbar-dropdown-menu dropdown-lg">
                            <form className="p-3">
                                <input type="text" className="form-control" placeholder="Search ..." />
                            </form>
                        </DropdownMenu>
                    </Dropdown>
                  </li>
                  <li className="notification-list">
                    <Dropdown>
                      <DropdownToggle
                          data-toggle="dropdown"
                          tag="button"
                          className="nav-link dropdown-toggle arrow-none btn btn-link"
                         >
                          <i onClick={showHelp} className="dripicons-question noti-icon" data-toggle="chardinjs"></i>
                      </DropdownToggle>
                  </Dropdown>
                  </li>
                  <li className="notification-list" style={{'marginTop':'4px'}} >
                    <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                      <DropdownToggle
                          data-toggle="dropdown"
                          tag="button"
                          className="nav-link dropdown-toggle arrow-none btn btn-link"
                          onClick={toggleDropdown1}
                          aria-expanded={dropdownOpen1}>
                          <i className="mdi mdi-bell-outline noti-icon"></i>
                          <span className="noti-icon-badge"></span>
                      </DropdownToggle>
                      <DropdownMenu right className="dropdown-menu-animated dropdown-lg">
                          <div onClick={toggleDropdown1}>
                              <div className="dropdown-item noti-title">
                                  <h5 className="m-0">
                                      <span className="float-right">
                                          
                                              <small>Clear All</small>
                                          
                                      </span>
                                      Notification
                                  </h5>
                              </div>
                              <SimpleBar style={{notificationContainerStyle}}>
                                          <Link style={{'display':'none'}}
                                              to="/"
                                              className="dropdown-item notify-item"
                                              key="1">
                                              <div className={`notify-icon bg-success`}>
                                                  <i className=""></i>
                                              </div>
                                              <p className="notify-details">
                                                  sdasd
                                                  <small className="text-muted">B</small>
                                              </p>
                                          </Link>
                              </SimpleBar>

                              <Link to="/" className="dropdown-item text-center text-primary notify-item notify-all">
                                  View All
                              </Link>
                          </div>
                      </DropdownMenu>
                  </Dropdown>
                  </li>
                  <li className="notification-list">
                    <Dropdown>
                      <DropdownToggle
                          data-toggle="dropdown"
                          tag="button"
                          className="nav-link dropdown-toggle arrow-none btn btn-link"
                         >
                          <i className="dripicons-gear noti-icon noti-icon"></i>
                      </DropdownToggle>
                  </Dropdown>
                  </li>
                  <li className="notification-list">
                    <Dropdown isOpen={dropdownOpen2} className="mt-1" toggle={toggleDropdown2}>
                      <DropdownToggle
                          data-toggle="dropdown"
                          tag="button"
                          className="nav-link dropdown-toggle nav-user arrow-none mr-0"
                          onClick={toggleDropdown2}
                          aria-expanded={dropdownOpen2}>
                          <span className=" account-user-avatar">
                               {/* <img src={localStorage.getItem('activeuserimage')} className="rounded-circle" alt="user" />  */}
                              <div className="rounded-circle" alt="user">
                                    <span class="avatar-title bg-success rounded-circle" style={{padding:'0.4rem'}}>
                                                { title }
                                    </span>
                              </div>
                          </span>
                          
                          <span>
                              <span className="account-user-name" style={{marginLeft:'0.5rem'}}>{localStorage.getItem('activeusername')}</span>
                              <span className="account-position" style={{marginLeft:'0.5rem'}}>Coder</span>
                          </span>
                      </DropdownToggle>
                      <DropdownMenu right className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                          <div onClick={toggleDropdown2}>
                              <div className="dropdown-header noti-title">
                                  <h6 className="text-overflow m-0">Welcome !</h6>
                              </div>
                            <div
                                onClick={()=>returnTo('/dashboard')}
                                className="dropdown-item notify-item"
                                key="1">
                                <i className="mdi mdi-account-circle mr-1"></i>
                                <span>My Account</span>
                            </div>
                            <div
                                onClick={()=>returnTo('/dashboard')}
                                className="dropdown-item notify-item"
                                key="1">
                                <i className="mdi mdi-account-edit mr-1"></i>
                                <span>Setting</span>
                            </div>
                            <div
                                onClick={()=>returnTo('/dashboard')}
                                className="dropdown-item notify-item"
                                key="1">
                                <i className="mdi mdi-lifebuoy mr-1"></i>
                                <span>Support</span>
                            </div>
                            <div
                                onClick={()=>returnTo('/dashboard')}
                                className="dropdown-item notify-item"
                                key="1">
                                <i className="mdi mdi-lock-outline mr-1"></i>
                                <span>Lock Screen</span>
                            </div>
                            <span style={{'cursor':'pointer'}}
                                onClick={logoutApp}
                                className="dropdown-item notify-item"
                                key="1">
                                <i className="mdi mdi-logout mr-1"></i>
                                <span>Logout</span>
                            </span>
                          </div>
                      </DropdownMenu>
                  </Dropdown>
                  </li>
              </ul>
              <div returnTo={()=>returnTo('/dashboard')} id="appLogo"><img alt="MediciNos" src={logo} style={{'width':'100px','height':'65px'}} /></div>
          </div>
          </div>
          <div className="card second_header shadow-sm">
            <div className="card-body second_header_body">
                <div class="container-fluid">
                        <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
                            <div class="collapse navbar-collapse" id="topnav-menu-content">
                                <ul class="navbar-nav">
                                    <li class="nav-item" data-intro="An awesome." data-position="right">
                                        <div className={`${location === 'dashboard' ? 'nav-link showActive' : 'nav-link'}`} onClick={()=>returnTo('/dashboard')}   id="topnav-dashboards" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="uil-dashboard mr-1"></i>
                                            Dashboard
                                        </div>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <div className={`${location === 'discharge' ? 'nav-link showActive' : 'nav-link'}`} onClick={()=>returnTo(coderUrl)}  id="topnav-apps"
                                            role="button" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i class="uil-apps mr-1"></i>
                                            Discharges
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
            </div>
        </div>
      </div>
      
  </React.Fragment>     
      );
} 
class Header extends Component {
  render() {
    return (
      <div>
         <HeaderParent actiontoken={this.props.actiontoken}  />
      </div>        
    );
  }
}
export default Header;