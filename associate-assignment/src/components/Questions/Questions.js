import React, { useState, useEffect, useCallback } from "react";
import "./Questions.css";
import { ADD_ASSESSMENT_LABELS, ERROR_MESSAGES } from "../../constants/uiTextSamples";
import Select from "react-select";
import { fetchAssessment } from "../../actions/assessmentActions";
import { useDispatch, useSelector } from "react-redux";
import { addQuestions } from "../../actions/questionsActions";
import { ALERT_TEXT } from "../../constants/uiTextSamples";
import Swal from "sweetalert2";
import { fetchBatch } from '../../actions/batchesActions';

const QuestionsForm = () => {
  const [expand, setExpand] = useState(false);
  const [assessmentDetails, setassessmentDetails] = useState([]);
  const [batchDetails,setBatchDetails] = useState([]); 
  const [isBatchSelected, setIsBatchSelected] = useState(false);
  const [isAssessmentSelected, setIsAssessmentSelected] = useState(false);

  const batchesData = useSelector((state) => state.batchdata);
  const dataState = useSelector((state) => state.assessmentData);
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    assessmentName: null,
    batchName : null,
    questions: ""
  });

  const validate = () => {
    const newErrors = {};

    
    if (!formData.batchName) {
      newErrors.batchName = ERROR_MESSAGES.BATCH_NAME_IS_REQUIRED;
    }

    if (!formData.assessmentName) {
      newErrors.assessmentName = ERROR_MESSAGES.ASSESSMENT_NAME_IS_REQUIRED;
    }

      // if (user.length === 0) {
      //   newErrors.questions = ERROR_MESSAGES.AT_LEAST_ONE_QUESTION;
      // }
    user.forEach((q, qIndex) => {
      if (!q.question_text) {
        newErrors[`question_text-${qIndex}`] = ERROR_MESSAGES.QUESTION_IS_REQUIRED;
      }

      if (q.question_type === ERROR_MESSAGES.TEXT && !q.correct_answers.length) {
        newErrors[`answer-${qIndex}`] = ERROR_MESSAGES.ANSWER_IS_REQUIRED;
      }

      if (q.question_type === ERROR_MESSAGES.MULTIPLE_CHOICE) {
        if (q.options.some((option) => !option.option)) {
          newErrors[`options-${qIndex}`] = ERROR_MESSAGES.ALL_OPTIONS_MUST_BE_FILLED;
        }
        if (!q.options.some((option) => option.isCorrect)) {
          newErrors[`selection-${qIndex}`] =
           ERROR_MESSAGES.ATLEAST_ONE_OPTION;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const selectedQuestions = user;
      const { assessmentName,batchName } = formData;
      
      dispatch(addQuestions(selectedQuestions, assessmentName))
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: ALERT_TEXT.SUCCESS,
              text: response.data.message,
              icon: "success",
              confirmButtonText: ALERT_TEXT.OK,
            }).then(() => {
              setUser([]);
              setFormData({ assessmentName: "" ,batchName :"",questions: ""  });
              setErrors({});
              setIsBatchSelected(false);
              setIsAssessmentSelected(false);
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
  useEffect(() => {
    dispatch(fetchBatch());
  }, [dispatch]);

  useEffect(() => {
    if (
      batchesData.batches &&
      batchesData.batches.Batches &&
      batchesData.batches.Batches.length > 0
    ) {
      const newBatchData = batchesData.batches.Batches.map((batch) => ({
        value: batch.batch_id,
        label: batch.batch_name,
      }));
      setBatchDetails(newBatchData);
    }
  }, [batchesData.batches]);

  useEffect(() => {
    if (isBatchSelected) {
      dispatch(fetchAssessment(formData));
    }
  }, [dispatch, formData, isBatchSelected]);


  useEffect(() => {
    if (
      dataState.assessments &&
      dataState.assessments.Assessments &&
      dataState.assessments.Assessments.length > 0
    ) {
      const newData = dataState.assessments.Assessments.map((assessments) => ({
        value: assessments.assessment_id,
        label: assessments.assessment_name,
        questions: assessments.no_of_questions
      }));
      setassessmentDetails(newData);
    } 
  }, [dataState.assessments]);

  const addText = () => {
    setUser([
      ...user,
      {
        question_text: "",
        question_type: ERROR_MESSAGES.TEXT,
        correct_answers: [],
      },
    ]);
  };

  const addMultiSelect = () => {
    setUser([
      ...user,
      {
        question_text: "",
        question_type: ERROR_MESSAGES.MULTIPLE_CHOICE,
        options: [
          { option: "", isCorrect: false },
          { option: "", isCorrect: false },
        ],
        correct_answers: [],
      },
    ]);
  };

  const addOptions = (index) => {
    const newUser = [...user];
    newUser[index].options.push({
      option: "",
      isCorrect: false,
    });
    setUser(newUser);
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newUser = [...user];
    newUser[index][name] = value;
    setUser(newUser);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        delete newErrors[`question_text-${index}`];
        if (name === "answer") {
          delete newErrors[`answer-${index}`];
        }
      }
      return newErrors;
    });
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    const newUser = [...user];
    newUser[index].options[optionIndex].option = value;
    setUser(newUser);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        delete newErrors[`options-${index}`];
      }
      return newErrors;
    });
  };

  const handleCheckboxChange = (index, optionIndex) => {
    const newUser = [...user];
    newUser[index].options[optionIndex].isCorrect =
      !newUser[index].options[optionIndex].isCorrect;
    if (newUser[index].options[optionIndex].isCorrect) {
      if (
        !newUser[index].correct_answers.includes(
          newUser[index].options[optionIndex].option
        )
      ) {
        newUser[index].correct_answers.push(
          newUser[index].options[optionIndex].option
        );
      }
    } else {
      newUser[index].correct_answers = newUser[index].correct_answers.filter(
        (answer) => answer !== newUser[index].options[optionIndex].option
      );
    }
    setUser(newUser);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`selection-${index}`];
      return newErrors;
    });
  };

  const removeQuestion = (index) => {
    const newUser = [...user];
    newUser.splice(index, 1);
    setUser(newUser);
  };

  const onValidate = (value, name) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandleChange = useCallback((value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    onValidate("", name);
    if (name === "assessmentName") {
      const selectedAssessment = assessmentDetails.find(
        (assessment) => assessment.value === value.value
      );
      setFormData((prev) => ({
        ...prev,
        questions: selectedAssessment.questions,
      }));
    }
    if (name === "batchName") {
      setIsBatchSelected(true);
    } else if (name === "assessmentName") {
      setIsAssessmentSelected(true);
    }
  }, [assessmentDetails]);

  return (
    <form onSubmit={handleSubmit} className="total_container">
      <div className="card first_card_container">
      <div className="input-styles">
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
            isDisabled={isBatchSelected}
          />
          {errors.batchName && (
            <span className="error error-color">{errors.batchName}</span>
          )}
        </div>
        <div className="input-styles">
          <label htmlFor="assessmentName">
            {ADD_ASSESSMENT_LABELS.ASSESSMENT_NAME}{" "}
            <strong className="error-color">*</strong>
          </label>
          
          <Select
            id="assessmentName"
            name="assessmentName"
            options={assessmentDetails}
            className="basic-single-select"
            classNamePrefix="select"
            value={formData.assessmentName}
            onChange={(selectedOption) =>
              onHandleChange(selectedOption, "assessmentName")
            }
            isDisabled={isAssessmentSelected}
          />
          {errors.assessmentName && (
            <span className="error error-color">{errors.assessmentName}</span>
          )}
        </div>
        <div>
        <label htmlFor="questions">
            {ADD_ASSESSMENT_LABELS.NO_OF_QUESTIONS
            }{" "}
            <strong className="error-color">*</strong>
          </label>
        <input
          type="text"
          id="questions"
          name="questions"
          className="form-control"
          value={formData.questions}
          readOnly
      
        />
      
        </div>
        {user.map((key, index) => (
          <div key={index} className="card each_card">
            <i
              onClick={() => removeQuestion(index)}
              className="bi bi-x-circle-fill delete-icon"
            ></i>
            {key.question_type === "text" && (
              <div className="d-flex">
                <span>{index + 1}.</span>
                <span className="flex-grow-1 ps-2">
                  <input
                    id={key.question_text + index}
                    type="text"
                    className="form-control custom-outline-bottom"
                    name="question_text"
                    placeholder="Enter the question_text"
                    value={key.question_text}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  {errors[`question_text-${index}`] && (
                    <p className="text-danger mb-2">
                      {errors[`question_text-${index}`]}
                    </p>
                  )}
                  <input
                    type="text"
                    className="form-control custom-outline-input"
                    placeholder="Enter Your Answer"
                    name="correct_answers"
                    value={key.correct_answers || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  {errors[`answer-${index}`] && (
                    <p className="text-danger mb-2">
                      {errors[`answer-${index}`]}
                    </p>
                  )}
                </span>
              </div>
            )}
            {key.question_type === "multiple_choice" && (
              <div className="d-flex">
                <span>{index + 1}.</span>
                <span className="flex-grow-1 ps-2">
                  <input
                    id={key.question_text + index}
                    type="text"
                    className="form-control custom-outline-bottom "
                    name="question_text"
                    placeholder="Enter the question_text"
                    value={key.question_text}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  {errors[`question_text-${index}`] && (
                    <p className="text-danger mb-2">
                      {errors[`question_text-${index}`]}
                    </p>
                  )}
                  {key.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        id={`option-${index}-${optionIndex}`}
                        type="text"
                        placeholder="Add Option"
                        className="custom-outline-bottom ms-2"
                        name="option"
                        value={option.option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e)
                        }
                      />
                      <input
                        type="checkbox"
                        name={`optionGroup-${optionIndex}`}
                        value={option.option}
                        checked={option.isCorrect}
                        className="form-check-input checkbox-button-style ms-2 form-controls-styling"
                        onChange={() =>
                          handleCheckboxChange(index, optionIndex)
                        }
                      />
                    </div>
                  ))}
                  {errors[`options-${index}`] && (
                    <p className="text-danger mb-2">
                      {errors[`options-${index}`]}
                    </p>
                  )}
                  {errors[`selection-${index}`] && (
                    <p className="text-danger mb-2">
                      {errors[`selection-${index}`]}
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addOptions(index)}
                  >
                    +
                  </button>
                </span>
              </div>
            )}
          </div>
        ))}
        <br />
        <br />
        <div onClick={toggleExpand}  disabled={user.length >= formData.questions} className="button-modify">
          
          <button type="button" className="toggle-button">
            +<span className="ms-2">{!expand && "Add New"}</span>
            
          </button>
          {expand && (
            <>
              <button
                type="button"
                className="btn btn-light each-button"
                onClick={addText}
                disabled={user.length >= formData.questions}
              >
                Text
              </button>
              <button
                type="button"
                className="btn btn-light each-button ms-2"
                onClick={addMultiSelect}
                disabled={user.length >= formData.questions}
              >
                Multi Choice
              </button>
            </>
          )}
        </div>
        <div>
          <button type="submit" className="btn btn-secondary mt-3">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuestionsForm;


