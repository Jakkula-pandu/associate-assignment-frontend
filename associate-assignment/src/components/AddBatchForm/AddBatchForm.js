import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./AddBatchForm.css";
import { addBatch, fetchBatch } from "../../actions/batchesActions";
import { fetchData } from "../../actions/apiactions";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ADD_BATCH_ERROR_MESSAGES } from "../../constants/errorMessages";
import { ALERT_TEXT } from "../../constants/uiTextSamples";
import OffcanvasComponent from '../FormModal/FormModal';

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className="custom-option">
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
   <span>{props.label}</span>
      </div>
    </components.Option>
  );
};

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

const AddBatchForm = ({ handleCloseOffcanvas }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [offcanvasProps, setOffcanvasProps] = useState({ activeTab: 'tab1' });
  const dataState = useSelector((state) => state.addbatchdata);
  const [formData, setFormData] = useState({
    batch_name: "",
    users: [],
  });

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userdata);
  const loading = useSelector((state) => state.userdata.loading);
  const [errors, setErrors] = useState({
    batch_name: "",
    users: []
  });

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
    if (selectedOptions.some((option) => option.value === "selectAll")) {
      const allSelected =
        formData.users.length === users.users.allUsers.length;
      setFormData({
        ...formData,
        users: allSelected
          ? []
          : users.users.allUsers.map((user) => user.username),
      });

      setErrors((prevErrors) => ({
        ...prevErrors,
        users: allSelected ? "" : "At least one User Name is required",
      }));
    } else {
      setFormData({
        ...formData,
        users: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
      });

      setErrors((prevErrors) => ({
        ...prevErrors,
        users: selectedOptions.length === 0 ? "At least one User is required" : "",
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (formData.batch_name.length === 0) {
      newErrors.batch_name = ADD_BATCH_ERROR_MESSAGES.BATCH_NAME_REQUIRED;
    }
    if (formData.users.length === 0) {
      newErrors.users = ADD_BATCH_ERROR_MESSAGES.USER_REQUIRED;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(addBatch(formData))
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: ALERT_TEXT.SUCCESS,
              text: response.data.message,
              icon: "success",
              confirmButtonText: ALERT_TEXT.OK,
            }).then(() => {
              dispatch(fetchBatch());
              setFormData({ batch_name: "", users: [] });
              setErrors({});
              setOffcanvasProps({ activeTab: "tab1" });
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
    <div>
      <form className="form-styles" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="batch_name">
            Batch Name <strong className="error-color">*</strong>
          </label>
          <input
            type="text"
            id="batch_name"
            placeholder="Enter batch name"
            name="batch_name"
            value={formData.batch_name}
            onChange={handleChange}
          />
          {errors.batch_name && (
            <span className="error error-color">{errors.batch_name}</span>
          )}
        </div>
        <div>
          <label htmlFor="users">
            Users <strong className="error-color">*</strong>
          </label>
          <Select
            id="users"
            name="users"
            placeholder="Select users"
            value={userOptions.filter((option) =>
              formData.users.includes(option.value)
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
                justifyContent: "space-between",
              }),
            }}
          />
          {errors.users && (
            <span className="error error-color">{errors.users}</span>
          )}
        </div>

        <button className="button-styles" type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBatchForm;
