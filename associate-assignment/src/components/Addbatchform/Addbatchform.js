import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./AddBatchForm.css";
import { addBatch } from '../../actions/batchesactions';
import { fetchData } from '../../actions/useractions';
import { fetchTraining } from "../../actions/trainingActions";
import { useSelector, useDispatch } from "react-redux";

// Custom Option component to include checkboxes
const Option = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </div>
    </components.Option>
  );
};

// Custom MultiValue component to include the select all functionality
const MultiValue = (props) => {
  if (props.index === 0 && props.data.value === "selectAll") {
    return (
      <components.MultiValue {...props}>
        <span>Select All</span>
      </components.MultiValue>
    );
  }
  return <components.MultiValue {...props} />;
};

const AddBatchForm = () => {
  const [formData, setFormData] = useState({
    batch_name: "",
    trainings: "",
    username: [], // Change to an array for multi-select
  });
  const [trainingOptions, setTrainingOptions] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userdata);
  const loading = useSelector(state => state.userdata.loading);
  const trainings = useSelector((state) => state.trainingsdata) || {}; // Default to empty object if undefined

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchTraining());
  }, [dispatch]);

  useEffect(() => {
    if (trainings.trainings && Array.isArray(trainings.trainings.Trainings)) {
      const options = trainings.trainings.Trainings.map(training => ({
        value: training.trainings,
        label: training.trainings,
      }));
      setTrainingOptions(options);
    }
  }, [trainings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions.some(option => option.value === "selectAll")) {
      const allSelected = formData.username.length === users.users.allUsers.length;
      setFormData({
        ...formData,
        username: allSelected ? [] : users.users.allUsers.map(user => user.username),
      });

      setErrors((prevErrors) => ({
        ...prevErrors,
        username: allSelected ? "At least one User Name is required" : "",
      }));
    } else {
      setFormData({
        ...formData,
        username: selectedOptions ? selectedOptions.map(option => option.value) : [],
      });

      if (!selectedOptions || selectedOptions.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "At least one User Name is required",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.username;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.batch_name.trim()) {
      newErrors.batch_name = "Batch Name is required";
    }
    if (formData.username.length === 0) {
      newErrors.username = "At least one User Name is required";
    }
    if (formData.trainings.trim().length === 0) {
      newErrors.trainings = "Training is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(addBatch(formData));
      console.log("Form submitted:", formData);
      // Reset form and errors if needed
      setFormData({ batch_name: "", username: [], trainings: "" });
      setErrors({});
    }
  };

  const userOptions = Array.isArray(users.users.allUsers) ?
    users.users.allUsers.map(user => ({
      value: user.username,
      label: user.username,
    })) : [];

  const selectAllOption = {
    value: "selectAll",
    label: "Select All",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="batch_name">Batch Name <strong className="error-color">*</strong></label>
        <input
          type="text"
          id="batch_name"
          name="batch_name"
          value={formData.batch_name}
          onChange={handleChange}
          required
        />
        {errors.batch_name && <span className="error error-color">{errors.batch_name}</span>}
      </div>
      <div>
        <label htmlFor="username">User Names <strong className="error-color">*</strong></label>
        <Select
          id="username"
          name="username"
          value={userOptions.filter(option => formData.username.includes(option.value))}
          onChange={handleSelectChange}
          options={[selectAllOption, ...userOptions]}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option, MultiValue }}
        />
        {errors.username && <span className="error error-color">{errors.username}</span>}
      </div>
      <div>
        <label htmlFor="trainings">Training <strong className="error-color">*</strong></label>
        <Select
          id="trainings"
          name="trainings"
          value={trainingOptions.find(option => option.value === formData.trainings)}
          onChange={selectedOption => setFormData({ ...formData, trainings: selectedOption ? selectedOption.value : '' })}
          options={trainingOptions}
          placeholder="Select a training"
        />
        {errors.trainings && <span className="error error-color">{errors.trainings}</span>}
      </div>
      <button className="button-styles" type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default AddBatchForm;
