import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Questions.css";

const CreateFormService = () => {
  let selectedQuestions = [];
  const setOption = (options) => {
    selectedQuestions = options;
  };

  const getOption = () => {
    return selectedQuestions;
  };

  return {
    setOption,
    getOption,
  };
};

const MyForm = () => {
  const [expand, setExpand] = useState(false);
  const [user, setUser] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useNavigate();
  const dataService = CreateFormService();

  const submit = () => {
    const selectedQuestions = user;
    dataService.setOption(selectedQuestions);
    history.push("/formAnswers");
  };

  const addText = () => {
    setUser([
      ...user,
      {
        questions: [{ question: "", answer: "", type: "text" }],
        options: [],
      },
    ]);
  };

  const addSelect = () => {
    setUser([
      ...user,
      {
        questions: [{ question: "", type: "radio", answer: "" }],
        options: [
          { type: "radio", option: "", isSelected: false },
          { type: "radio", option: "", isSelected: false },
        ],
      },
    ]);
  };

  const addOptions = (index) => {
    const newUser = [...user];
    newUser[index].options.push({
      type: "radio",
      option: "",
      isSelected: false,
    });
    setUser(newUser);
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleChange = (e) => {
    setSelectedOption(parseInt(e.target.value));
  };

  const getNumberArray = (selectedOption) => {
    let numberArray = [];
    for (let i = 1; i <= selectedOption; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };

  const handleInputChange = (index, questionIndex, event) => {
    const { name, value } = event.target;
    const newUser = [...user];
    newUser[index].questions[questionIndex][name] = value;
    setUser(newUser);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    const newUser = [...user];
    newUser[index].options[optionIndex].option = value;
    setUser(newUser);
  };

  const handleRadioChange = (index, optionIndex) => {
    const newUser = [...user];
    newUser[index].options.forEach((option, i) => {
      option.isSelected = i === optionIndex;
    });
    setUser(newUser);
  };
  return (
    <form onSubmit={submit} className="total_container">
      <div className="card first_card_container">
        {user.map((key, index) => (
          <div key={index} className="card each_card">
            <br />
            {key.questions[0].type === "text" && (
              <div className="d-flex">
                <span>{index + 1}.</span>
                <span className="flex-grow-1 ps-2">
                  <input
                    id={key.questions[0].question + index}
                    type="text"
                    className="form-control custom-outline-bottom"
                    required
                    name="question"
                    placeholder="Enter the question"
                    value={key.questions[0].question}
                    onChange={(e) => handleInputChange(index, 0, e)}
                  />
                  {!key.questions[0].question && (
                    <p className="text-danger mb-2">Question is required.</p>
                  )}
                  <input
                    id={key}
                    type={key.questions[0].type}
                    required
                    className="form-control custom-outline-input"
                    placeholder="Enter Your Answer"
                    name="answer"
                    value={key.questions[0].answer}
                    onChange={(e) => handleInputChange(index, 0, e)}
                  />
                </span>
              </div>
            )}
            {key.questions[0].type === "radio" && (
              <div className="d-flex">
                <span>{index + 1}.</span>
                <span className="flex-grow-1 ps-2">
                  <input
                    id={key.questions[0].question + index}
                    type="text"
                    className="form-control custom-outline-bottom "
                    required
                    name="question"
                    placeholder="Enter the question"
                    value={key.questions[0].question}
                    onChange={(e) => handleInputChange(index, 0, e)}
                  />
                  {!key.questions[0].question && (
                    <p className="text-danger mb-2">Question is required.</p>
                  )}
                  {key.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        id={key}
                        type="text"
                        required
                        className="custom-outline-bottom"
                        name="option"
                        value={option.option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e)
                        }
                      />
                      <input
                        id={key}
                        type={option.type}
                        required
                        name="optionGroup"
                        value={option.option}
                        checked={option.isSelected}
                        className="form-check-input radio-button-style ms-2"
                        onChange={() => handleRadioChange(index, optionIndex)}
                      />
                    </div>
                  ))}
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
        <div onClick={toggleExpand} className="button-modify">
          <button type="button" className="toggle-button">
            +<span className="ms-2">{!expand && "Add New"}</span>
          </button>
          {expand && (
            <>
              <button
                type="button"
                className="btn btn-light each-button"
                onClick={addText}
              >
                Text
              </button>
              <button
                type="button"
                className="btn btn-light each-button ms-2"
                onClick={addSelect}
              >
                Choice
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

export default MyForm;
