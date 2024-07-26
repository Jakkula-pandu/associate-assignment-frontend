import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./AddBatchForm.css";
import { addBatch } from '../../actions/batchesactions';
import { fetchData } from '../../actions/useractions';
import { useSelector, useDispatch } from "react-redux";

const AddBatchForm = () => {
  const [formData, setFormData] = useState({
    batch_name: "",
    username: [], // Change to an array for multi-select
  });
  const dispatch = useDispatch();
  const users = useSelector(state => state.userdata.users);
  const loading = useSelector(state => state.userdata.loading);
  const error = useSelector(state => state.userdata.error);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
    setFormData({
      ...formData,
      username: selectedOptions.map(option => option.value),
    });

    if (selectedOptions.length === 0) {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(addBatch(formData));
      console.log("Form submitted:", formData);
      // Reset form and errors if needed
      setFormData({ batch_name: "", username: [] });
      setErrors({});
    }
  };

  const userOptions = users.map(user => ({
    value: user.username,
    label: user.username,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="batchName">Batch Name <strong className="error-color">*</strong></label>
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
          options={userOptions}
          isMulti
        />
        {errors.username && <span className="error error-color">{errors.username}</span>}
      </div>
      <button className="button-styles" type="submit" disabled={loading}>
        Submit
      </button>
      {error && <p className="error error-color">{error}</p>}
    </form>
  );
};

export default AddBatchForm;
