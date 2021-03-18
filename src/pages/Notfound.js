import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
const Notfound = (props) => {
    return (
    <div className="wrapper"> 
    <Header />
    <div className="content-page">
        <div className="content page_container">
            <div className="container-fluid content_box">
              <div className="card">
                  <div className="card-body text-center mt-4 pt-4 mb-4">
                  <h3>404 Page not Found</h3>
                  <p>We are sorry but the page you are looking for does not exist.</p>
                  </div>
              </div>
              
            </div>
        </div>
    </div>
    <Footer />
</div>
 );
};

export default Notfound;
