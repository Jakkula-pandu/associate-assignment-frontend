import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import "./FormModal.css"


const OffcanvasComponent = ({ show, handleClose, activeTab }) => {
  return (
    <Offcanvas placement='end' className="me-1 mt-1 mb-1 rounded-2" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='mb-5'>
      {activeTab === 'tab1' && <h1>form1 </h1> }
        {activeTab === 'tab2' &&  <h1>form2 </h1>  }
        {activeTab === 'tab3' &&  <h1>form3 </h1>}
        {activeTab === 'tab4' &&  <h1>form4</h1> }
        <div className='bottom-0 position-absolute end-0 bg-primary w-100 d-flex justify-content-end p-2 '>
          <span className='me-5'> Footer</span>
        </div>
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default OffcanvasComponent;
