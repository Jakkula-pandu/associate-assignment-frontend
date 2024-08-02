import React, { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import { ADD_ASSESSMENT_LABELS } from "../../constants/uiTextSamples";
import './AddAssessmentForm.css';
import { fetchBatch } from "../../actions/batchesActions";
import { useSelector, useDispatch } from "react-redux";
import { addAssessment } from "../../actions/assessmentActions";

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const AddAssessmentForm = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [batchDetails, setBatchDetails] = useState();
    const dataState = useSelector((state) => state.batchdata);
    
    const [formData, setFormData] = useState({
        batchName: '',
        assessmentName: null,
    });
   
    const [errors, setErrors] = useState({
        batchName: '',
        assessmentName: '',
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
        if (dataState.batches && dataState.batches.Batches && dataState.batches.Batches.length > 0) {
            const newData = dataState.batches.Batches.map(batch => ({
                value: batch.batch_id,
                label: batch.batch_name,
            }));
            setBatchDetails(newData) ;
        }
      }, [dataState.batches]);

    const onHandleChange = useCallback((value, name) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        onValidate('', name);
    }, []);

    const validateForm = () => {
        let isInvalid = false;
        let newErrors = {};

        if (!formData.batchName) {
            newErrors.batchName = 'Batch name is required';
            isInvalid = true;
        }

        if (!formData.assessmentName) {
            newErrors.assessmentName = 'Assessment name is required';
            isInvalid = true;
        }

        setErrors(newErrors);
        return !isInvalid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            console.error('Invalid Form!');
            return false;
        }else {
            const { batchName, assessmentName } = formData;
           
            const requestBody = {
                assessment_name: assessmentName
            };
            dispatch(addAssessment(requestBody,batchName ))
           
        }

    };

    return (
        <form className="form-styles" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="assessmentName">
                    {ADD_ASSESSMENT_LABELS.ASSESSMENT_NAME} <strong className="error-color">*</strong>
                </label>
                <input
                    type="text"
                    id="assessmentName"
                    name="assessmentName"
                    className="form-control"
                    value={formData.assessmentName}
                    onChange={(e) => onHandleChange(e.target.value, 'assessmentName')}
                />
                {errors.assessmentName && (
                    <span className="error error-color">{errors.assessmentName}</span>
                )}
            </div>
            <br />
            <div>
                <label htmlFor="batchName">
                    {ADD_ASSESSMENT_LABELS.BATCH_NAME} <strong className="error-color">*</strong>
                </label>
                <Select
                    id="batchName"
                    name="batchName"
                    options={batchDetails}
                    className="basic-single-select"
                    classNamePrefix="select"
                    value={formData.batchName}
                    onChange={(selectedOption) => onHandleChange(selectedOption, 'batchName')}
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
