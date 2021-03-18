import React from 'react';
import {Modal,ModalBody,ModalHeader } from 'reactstrap';
import { Document,Page,pdfjs   } from 'react-pdf'; 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  
 
  
const Pdf = (props) => {
    // eslint-disable-next-line
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber] = React.useState(1);
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
 return (
    
            <Modal
                isOpen={props.popupModal}
                toggle={props.Pdfclosepopup}
                className='modal-full-width'
                >
                <ModalHeader toggle={props.Pdfclosepopup}></ModalHeader>
                <ModalBody style={{'background':'#f3f4f8',margin:'auto'}}>
                <Document
                    file={props.pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                </ModalBody>
               
            </Modal>
    );
    
};

export default Pdf;