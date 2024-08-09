import React, { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import { ADD_ASSESSMENT_LABELS } from "../../constants/uiTextSamples";
import "./AddAssessmentForm.css";
import { fetchBatch } from "../../actions/batchesActions";
import { useSelector, useDispatch } from "react-redux";
import { addAssessment } from "../../actions/assessmentActions";
import { ADD_BATCH_ERROR_MESSAGES } from "../../constants/errorMessages";
import { ALERT_TEXT } from "../../constants/uiTextSamples";
import OffcanvasComponent from "../FormModal/FormModal";
import Swal from "sweetalert2";
import { fetchAssessment } from "../../actions/assessmentActions";

const AddAssessmentForm = ({ handleCloseOffcanvas }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [batchDetails, setBatchDetails] = useState();
  const dataState = useSelector((state) => state.batchdata);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasProps, setOffcanvasProps] = useState({ activeTab: "tab2" });

  const [formData, setFormData] = useState({
    batchName: "",
    assessmentName: null,
    questions :""
  });

  const [errors, setErrors] = useState({
    batchName: "",
    assessmentName: "",
    questions :""
  });

  const onValidate = (value, name) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchBatch(currentPage, searchValue));
  }, [dispatch, currentPage, searchValue]);

  useEffect(() => {
    if (
      dataState.batches &&
      dataState.batches.Batches &&
      dataState.batches.Batches.length > 0
    ) {
      const newData = dataState.batches.Batches.map((batch) => ({
        value: batch.batch_id,
        label: batch.batch_name,
      }));
      setBatchDetails(newData);
    }
  }, [dataState.batches]);

  const onHandleChange = useCallback((value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    onValidate("", name);
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    let newErrors = {};

    if (!formData.batchName) {
      newErrors.batchName = "Batch name is required";
      isInvalid = true;
    }

    if (!formData.assessmentName) {
      newErrors.assessmentName = "Assessment name is required";
      isInvalid = true;
    }
    if (!formData.questions) {
      newErrors.questions = "Number of questions is required";
      isInvalid = true;
    }

    setErrors(newErrors);
    return !isInvalid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      console.error("Invalid Form!");
      return false;
    } else {
        const { batchName, assessmentName,questions } = formData;   
        const requestBody = {
            assessment_name: assessmentName,
            no_of_questions :questions
            
        };
        dispatch(addAssessment(requestBody,batchName ))
             .then((response) => {               
          if (response.status === 200) {
            Swal.fire({
              title: ALERT_TEXT.SUCCESS,
              text: response.data.message,
              icon: "success",
              confirmButtonText: ALERT_TEXT.OK,
            }).then(() => {
              dispatch(fetchAssessment());
              setFormData({ batchName: "", assessmentName: "",questions:"" });
              setErrors({});
              setOffcanvasProps({ activeTab: "tab2" });
              setShowOffcanvas(false);
              handleCloseOffcanvas();
            });
          } else {
            Swal.fire({
              title: ALERT_TEXT.ERROR,
              text: response.data.message,
              icon: "error",
              confirmButtonText: ALERT_TEXT.OK,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: ALERT_TEXT.ERROR,
            text: error.response?.data?.message || error.message,
            icon: "error",
            confirmButtonText: ALERT_TEXT.OK,
          });
        });
    }
  };

  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="assessmentName">
          {ADD_ASSESSMENT_LABELS.ASSESSMENT_NAME}{" "}
          <strong className="error-color">*</strong>
        </label>
        <input
          type="text"
          id="assessmentName"
          name="assessmentName"
          className="form-control"
          placeholder="Enter Assessment name"
          value={formData.assessmentName}
          onChange={(e) => onHandleChange(e.target.value, "assessmentName")}
        />
        {errors.assessmentName && (
          <span className="error error-color">{errors.assessmentName}</span>
        )}
      </div>
      <div>
        <label htmlFor="questions">
          {ADD_ASSESSMENT_LABELS.ENTER_NO_OF_QUESTIONS}{" "}
          <strong className="error-color">*</strong>
        </label>
        <input
          type="number"
          id="questions"
          name="questions"
          className="form-control"
          placeholder="Enter no. of questions"
          value={formData.questions}
          onChange={(e) => onHandleChange(e.target.value, "questions")}
        />
        {errors.questions && (
          <span className="error error-color">{errors.questions}</span>
        )}
      </div>
     
      <div>
        <label htmlFor="batchName">
          {ADD_ASSESSMENT_LABELS.BATCH_NAME}{" "}
          <strong className="error-color">*</strong>
        </label>
        <Select
          id="batchName"
          name="batchName"
          options={batchDetails}
          className="basic-single-select"
          classNamePrefix="select"
          value={formData.batchName}
          onChange={(selectedOption) =>
            onHandleChange(selectedOption, "batchName")
          }
        />
        {errors.batchName && (
          <span className="error error-color">{errors.batchName}</span>
        )}
      </div>
      <button className="btn btn-primary button-styles" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddAssessmentForm;
