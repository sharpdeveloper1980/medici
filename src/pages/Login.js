import React from 'react';
import {  useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";



const Login=(props)=>{
  const history = useHistory();
  const { isAuthenticated,loginWithRedirect,getAccessTokenSilently,user } = useAuth0();
  const setToken = async () => {
    try{
    const token = await getAccessTokenSilently();  
    localStorage.setItem('token',token);
    history.push("/dashboard");
    } catch(e){
      
    }
  };
  
  if(isAuthenticated)
  {
    
      localStorage.setItem('activeusername',user.name);
      localStorage.setItem('activeuserimage',user.picture);
      setToken();
      
  }else{
    // eslint-disable-next-line
    if(history.location.pathname == '/'){
     
      var element = document.createElement("link");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("type", "text/css");
      element.setAttribute("href", "assets/css/theme.min.css");
      document.getElementsByTagName("head")[0].appendChild(element);
     
    }
  }
  /**
   * Redirect to root
   */
    
    return (
        
        <React.Fragment>
         
          <section>
            
            <div class=" container d-flex flex-column">
              <div class="row align-items-center justify-content-center no-gutters min-vh-100">
                <div class="col-12 col-md-6 col-lg-4 py-8 py-md-11">

                  
                  <form class="mb-6" onSubmit={loginWithRedirect}>
                    <h3 class="display-2"> <span class="text-dark">Medici </span><span class="text-danger">NOS</span> </h3>
                    <button  class="btn btn-block btn-primary font-size-lg btn-lg" type="submit">
                      <span class="fe fe-log-in">
                      </span>
                      Sign in
                    </button>

                  </form>

                </div>
                <div class="col-lg-7 offset-lg-1 align-self-stretch d-none d-lg-block">

                  
                  <div class="h-100 w-cover bg-cover" style={{backgroundImage: `url("../assets/img/covers/bg-auth.jpg")` }}></div>

                  
                  <div class="shape shape-left shape-fluid-y svg-shim text-white">
                    <svg viewBox="0 0 100 1544" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H100V386L50 1158V1544H0V0Z" fill="currentColor" style={{color:'#fafbfe'}}/>
                    </svg>
                  </div>

                </div>
              </div> 
            </div> 
          </section>

          <footer class="py-8 py-md-11 bg-dark border-top border-gray-800-50"> 
            <div class="container">
              <div class="row">
                <div class="col-12 col-md-4 col-lg-3">

                  
                  <img src="../assets/img/greenlake_medical_logo.svg" alt="..." class="footer-brand img-fluid mb-2"/>

                  
                  <p class="text-gray-700 mb-2">
                    Medical coding & grouping for the 21st century.
                  </p>


                </div>
                <div class="col-6 col-md-4 col-lg-2">



                </div>
                <div class="col-6 col-md-4 col-lg-2">

                
                  <h6 class="font-weight-bold text-uppercase text-gray-700">
                    Policies
                  </h6>

                  
                  <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                    <li class="mb-3">
                      <a href="./terms-of-service.html" class="text-reset">
                        Terms of service
                      </a>
                    </li>
                    <li class="mb-3">
                      <a href="./app-privacy-policy-web.html" class="text-reset">
                        AU privacy policy
                      </a>
                    </li>
                   
                  </ul>

                </div>
                <div class="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">

                
                  <h6 class="font-weight-bold text-uppercase text-gray-700">
                    Contact
                  </h6>

                
                  <ul class="list-unstyled text-muted mb-0">
                   
                    <li class="mb-3">
                      <a href="./contactprivacy.html" class="text-reset">
                        Data privacy
                      </a>
                    </li>
                  </ul>

                </div>
                <div class="col-6 col-md-4 col-lg-2">

                  
                  <h6 class="font-weight-bold text-uppercase text-gray-700">
                    &copy; Greenlake Medical 2020 All Rights Reserved
                  
                  </h6>


                </div>




              </div> 
            </div>
          </footer>
        </React.Fragment>
    );
  }

export default Login;