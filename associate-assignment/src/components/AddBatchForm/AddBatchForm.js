import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./AddBatchForm.css";
import { addBatch } from "../../actions/batchesActions";
import { fetchData } from "../../actions/apiactions";
import { fetchTraining } from "../../actions/trainingActions";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ADD_BATCH_ERROR_MESSAGES } from "../../constants/errorMessages";

// Custom Option component to include checkboxes
const Option = (props) => {
  const dataState = useSelector((state) => state.addedBatch);
  return (
    <components.Option {...props}>
      <div className="custom-option">
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
    username: [], // Change to an array for multi-select
  });
  const [trainingOptions, setTrainingOptions] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userdata);
  const loading = useSelector((state) => state.userdata.loading);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchTraining());
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
    if (selectedOptions.some((option) => option.value === "selectAll")) {
      const allSelected =
        formData.username.length === users.users.allUsers.length;
      setFormData({
        ...formData,
        username: allSelected
          ? []
          : users.users.allUsers.map((user) => user.username),
      });

      setErrors((prevErrors) => ({
        ...prevErrors,
        username: allSelected ? "At least one User Name is required" : "",
      }));
    } else {
      setFormData({
        ...formData,
        username: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
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

    if (formData.batch_name.length === 0) {
      newErrors.batch_name = ADD_BATCH_ERROR_MESSAGES.BATCH_NAME_REQUIRED;
    }
    if (formData.username.length === 0) {
      newErrors.username = ADD_BATCH_ERROR_MESSAGES.USER_REQUIRED;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(addBatch(formData))
        // .then((response) => {
        //   // You can handle additional success logic here if needed
        // })
        // .catch((error) => {
        //   console.error("Failed to add batch:", error);
        //   // You can handle additional error logic here if needed
        // });

      // Show SweetAlert on successful form submission
      if (addBatch.statusCode === 200) {
        Swal.fire({
          title: "Success!",
          text: addBatch.response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      // Reset form and errors
      setFormData({ batch_name: "", username: [] });
      setErrors({});
    }
  };
  const userOptions = Array.isArray(users.users.allUsers)
    ? users.users.allUsers.map((user) => ({
        value: user.username,
        label: user.username,
      }))
    : [];

  const selectAllOption = {
    value: "selectAll",
    label: "Select All",
  };

  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="batch_name">
          Batch Name <strong className="error-color">*</strong>
        </label>
        <input
          type="text"
          id="batch_name"
          name="batch_name"
          value={formData.batch_name}
          onChange={handleChange}
        />
        {errors.batch_name && (
          <span className="error error-color">{errors.batch_name}</span>
        )}
      </div>
      <div>
        <label htmlFor="username">
          User Names <strong className="error-color">*</strong>
        </label>

        <Select
          id="username"
          name="username"
          value={userOptions.filter((option) =>
            formData.username.includes(option.value)
          )}
          onChange={handleSelectChange}
          options={[selectAllOption, ...userOptions]}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option, MultiValue }}
          styles={{
            option: (provided) => ({
              ...provided,
              display: "flex",
              justifyContent:'space-between'
            }),
          }}
        />
        {errors.username && (
          <span className="error error-color">{errors.username}</span>
        )}
      </div>

      <button className="button-styles" type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default AddBatchForm;
