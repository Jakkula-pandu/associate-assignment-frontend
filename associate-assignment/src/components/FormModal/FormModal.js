import React from "react";
import { Offcanvas } from "react-bootstrap";
import "./FormModal.css";
import AddBatchForm, { handleSubmit } from "../AddBatchForm/AddBatchForm";
import AddAssessmentForm from "../AddAssessmentForm/AddAssessmentForm";

const OffcanvasComponent = ({ show, handleClose, activeTab }) => {
  return (
    <Offcanvas
      placement="end"
      className="me-1 mt-1 mb-1 rounded-2"
      show={show}
      onHide={handleClose}
    >
      <Offcanvas.Header closeButton>
        {activeTab === "tab1" && <Offcanvas.Title className="form-title">Add batch</Offcanvas.Title>}
      </Offcanvas.Header>
      <Offcanvas.Body className="mb-5">
      {activeTab === "tab1" && <AddBatchForm  handleCloseOffcanvas={handleClose} />}
        {activeTab === "tab2" && <AddAssessmentForm/>}
        {activeTab === "tab3" && <h1>form3</h1>}
        {activeTab === "tab4" && <h1>form4</h1>}
      </Offcanvas.Body>
  
    </Offcanvas>
  );
};

export default OffcanvasComponent;

