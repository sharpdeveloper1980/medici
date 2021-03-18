import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
const ErrorPage = (props) => {
    return (
    <div className="wrapper"> 
    <Header />
    <div className="content-page">
        <div className="content page_container">
            <div className="container-fluid content_box">
              <div className="card">
                  <div className="card-body text-center mt-4 pt-4 mb-4">
                  <h3>500 Error</h3>
                  <p>Internal Server Error</p>
                  </div>
              </div>
              
            </div>
        </div>
    </div>
    <Footer />
</div>
 );
};

export default ErrorPage;
