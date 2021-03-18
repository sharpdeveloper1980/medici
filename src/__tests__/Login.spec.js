import React,{ useState,useEffect } from "react";
import { create } from "react-test-renderer";
import {  FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { useAuth0 } from "@auth0/auth0-react";
const Login=(props)=>{
   // const history = useHistory();
    const { isAuthenticated,loginWithRedirect } = useAuth0();
    
   /* if(isAuthenticated)
    {
          document.body.classList.remove('authentication-bg'); 
          history.push("/dashboard"); 
    }*/
    /**
     * Redirect to root
     */
  
    const headding_block = {
        fontSize: "30px",
        fontWeight: "100 !important"
      };
      const headding_block1 = {
        color:"#040404"
      };
      const headding_block2 = {
        color:"#e26720"
      };
      const input_field={
        borderLeft:"0px",
        borderRight: "0px",
        borderTop:"0px",
        height: "45px",
      }
    //const isAuthTokenValid = isUserAuthenticated();   
      return (
          <div className="account-pages mt-5 mb-5">
              <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-lg-10"> 
                              <div className="card">
                                  <div className="card-header pt-4 pb-4 text-center">
                                      <div className="text-center w-75 m-auto">
                                          <p style={headding_block} className="text-dark-50 text-center mt-0">
                                              <span style={headding_block1}>Medici</span> <span style={headding_block2}>NOS</span>
                                          </p>
                                          <p className="text-muted mb-4">
                                              Please login to your account
                                          </p>
                                      </div>
                                      {props.error && (
                                          <Alert color="danger" isOpen={props.error ? true : false}>
                                              <div>{props.error}</div>
                                          </Alert>
                                      )}
                                       <AvForm onValidSubmit={loginWithRedirect}>
                                                  <AvField style={input_field}
                                                      name="username"
                                                      placeholder="Username"
                                                      
                                                  />
   
                                                  <AvGroup>
                                                      <AvInput style={input_field}
                                                          type="password"
                                                          name="password" 
                                                          id="password"
                                                          placeholder="Password"
                                                          
                                                      />
                                                      <AvFeedback>This field is invalid</AvFeedback>
                                                  </AvGroup>
                                                 {/*
                                                  <Row className="mt-2 mb-2">
                                                      <Col className="col-6 mt-1 text-left">
                                                      <AvCheckboxGroup name="remember_me" label="" >
                                                          <AvCheckbox label="Remember Me" value="1" />
                                                      </AvCheckboxGroup>
                                                      </Col>
                                                      <Col className="col-6">
                                                          <Link
                                                              to="/account/forget-password"
                                                              className="text-muted float-right">
                                                              <small>Forgot your password?</small>
                                                          </Link>
                                                      </Col>
                                                   </Row>
                                                 */}
                                                  <FormGroup className="text-center">
                                                  <Button style={{background:"radial-gradient(#18635c,50%, #071b19)",width: "200px",height:"50px",borderTopLeftRadius:"30px",borderBottomLeftRadius: "30px",borderTopRightRadius:"30px",borderBottomRightRadius: "30px" }} >Submit</Button>                                                    
                                                  </FormGroup>
                                              </AvForm>
                                  </div>
                              </div>
                          </div>
                      </div>
               </div>
          </div>
      );
    }
describe("Login component", () => {
  test("Matches the snapshot", () => {
    const login = create(<Login />);
    expect(login.toJSON()).toMatchSnapshot();
  });
});