import React from "react";
import Loading from "./pages/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes } from "./routes/Routes";
import { Router, Route } from "react-router-dom";

import history from "./utils/history";
// styles  
//import "./assets/react/scss/Saas.scss";

import "./assets/scss/icons.scss";
import "./assets/scss/app.scss";
import "./assets/scss/style.scss";
import "./App.css";


// fontawesome  
import initFontAwesome from "./utils/initFontAwesome";

initFontAwesome();

 

const App = () => {
  const { isLoading } = useAuth0();
  console.log(history.location.pathname);
 
  if (isLoading) {
    return <Loading />; 
  }
  return (
    <React.Fragment>
            
            <Router history = {history}>
              <Route path = "/" component = {App}>
                  <Routes />
              </Route>
            </Router>
    </React.Fragment>
  );
};

export default App;
