import React, { useState } from 'react';
import './Questions.css'

const QuestionsForm = () => {
    const [expand, setExpand] = useState(false);
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        user.forEach((q, qIndex) => {
            if (!q.questions[0].question) {
                newErrors[`question-${qIndex}`] = 'Question is required.';
            }

            if (q.questions[0].type === 'text' && !q.questions[0].answer) {
                newErrors[`answer-${qIndex}`] = 'Answer is required.';
            }

            if (q.questions[0].type === 'radio') {
                if (q.options.some(option => !option.option)) {
                    newErrors[`options-${qIndex}`] = 'All options must be filled.';
                }
                if (!q.options.some(option => option.isSelected)) {
                    newErrors[`selection-${qIndex}`] = 'One option must be selected.';
                }
            }

            if (q.questions[0].type === 'checkbox') {
                if (q.options.some(option => !option.option)) {
                    newErrors[`options-${qIndex}`] = 'All options must be filled.';
                }
                if (!q.options.some(option => option.isSelected)) {
                    newErrors[`selection-${qIndex}`] = 'At least one option must be selected.';
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = (event) => {
        event.preventDefault();
        if (validate()) {
            const selectedQuestions = user;
            console.log("selectedQuestions>>>", selectedQuestions);
            // dataService.setOption(selectedQuestions);
            // history.push('/formAnswers');
        }
    };

    const addText = () => {
        setUser([...user, {
            questions: [{ question: '', answer: '', type: 'text' }],
        }]);
    };

    const addSelect = () => {
        setUser([...user, {
            questions: [{ question: '', type: 'radio', answer: '' }],
            options: [
                { type: 'radio', option: '', isSelected: false },
                { type: 'radio', option: '', isSelected: false },
            ],
        }]);
    };

    const addMultiSelect = () => {
        setUser([...user, {
            questions: [{ question: '', type: 'checkbox', answer: '' }],
            options: [
                { type: 'checkbox', option: '', isSelected: false },
                { type: 'checkbox', option: '', isSelected: false },
            ],
        }]);
    };

    const addOptions = (index) => {
        const newUser = [...user];
        newUser[index].options.push({ type: user[index].questions[0].type, option: '', isSelected: false });
        setUser(newUser);
    };

    const toggleExpand = () => {
        setExpand(!expand);
    };

    const handleInputChange = (index, questionIndex, event) => {
        const { name, value } = event.target;
        const newUser = [...user];
        newUser[index].questions[questionIndex][name] = value;
        setUser(newUser);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (value) {
                delete newErrors[`question-${index}`];
                if (name === 'answer') {
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

    const handleRadioChange = (index, optionIndex) => {
        const newUser = [...user];
        newUser[index].options.forEach((option, i) => {
            option.isSelected = i === optionIndex;
        });
        setUser(newUser);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[`selection-${index}`];
            return newErrors;
        });
    };

    const handleCheckboxChange = (index, optionIndex) => {
        const newUser = [...user];
        newUser[index].options[optionIndex].isSelected = !newUser[index].options[optionIndex].isSelected;
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

    return (
        <form onSubmit={submit} className="total_container">
            <div className="card first_card_container">
                {user.map((key, index) => (
                    <div key={index} className="card each_card">
                           <i onClick={() => removeQuestion(index)} className="bi bi-x-circle-fill delete-icon"></i>
                        {(key.questions[0].type === 'text') && (
                            <div className="d-flex">
                                <span>{index + 1}.</span>
                                <span className="flex-grow-1 ps-2">
                                    <input
                                        id={key.questions[0].question + index}
                                        type="text"
                                        className="form-control custom-outline-bottom"
                                        
                                        name="question"
                                        placeholder="Enter the question"
                                        value={key.questions[0].question}
                                        onChange={(e) => handleInputChange(index, 0, e)}
                                    />
                                    {errors[`question-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`question-${index}`]}</p>
                                    )}
                                    <input
                                        id={key}
                                        type={key.questions[0].type}
                                        
                                        className="form-control custom-outline-input"
                                        placeholder="Enter Your Answer"
                                        name="answer"
                                        value={key.questions[0].answer}
                                        onChange={(e) => handleInputChange(index, 0, e)}
                                    />
                                    {errors[`answer-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`answer-${index}`]}</p>
                                    )}
                                </span>
                            </div>
                        )}
                        {key.questions[0].type === 'radio' && (
                            <div className="d-flex">
                                <span>{index + 1}.</span>
                                <span className="flex-grow-1 ps-2">
                                    <input
                                        id={key.questions[0].question + index}
                                        type="text"
                                        className="form-control custom-outline-bottom "
                                        
                                        name="question"
                                        placeholder="Enter the question"
                                        value={key.questions[0].question}
                                        onChange={(e) => handleInputChange(index, 0, e)}
                                    />
                                    {errors[`question-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`question-${index}`]}</p>
                                    )}
                                    {key.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            <input
                                                id={key}
                                                type="text"
                                                
                                                placeholder='Add Option'
                                                className="custom-outline-bottom ms-2"
                                                name="option"
                                                value={option.option}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                            />
                                            <input
                                                id={key}
                                                type={option.type}
                                                name={`optionGroup-${optionIndex}`}
                                                value={option.option}
                                                checked={option.isSelected}
                                                className="form-check-input radio-button-style ms-2"
                                                onChange={() => handleRadioChange(index, optionIndex)}
                                            />
                                        </div>
                                    ))}
                                    {errors[`options-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`options-${index}`]}</p>
                                    )}
                                    {errors[`selection-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`selection-${index}`]}</p>
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
                        {key.questions[0].type === 'checkbox' && (
                            <div className="d-flex">
                                <span>{index + 1}.</span>
                                <span className="flex-grow-1 ps-2">
                                    <input
                                        id={key.questions[0].question + index}
                                        type="text"
                                        className="form-control custom-outline-bottom"
                                        
                                        name="question"
                                        placeholder="Enter the question"
                                        value={key.questions[0].question}
                                        onChange={(e) => handleInputChange(index, 0, e)}
                                    />
                                    {errors[`question-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`question-${index}`]}</p>
                                    )}
                                    {key.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                             <input
                                                id={key}
                                                type={option.type}
                                                name={`optionGroup-${optionIndex}`}
                                                value={option.option}
                                                checked={option.isSelected}
                                                className="form-check-input checkbox-button-style ms-2"
                                                onChange={() => handleCheckboxChange(index, optionIndex)}
                                            />
                                            <input
                                                id={key}
                                                type="text"
                                            
                                                placeholder='Add Option'
                                                className="custom-outline-bottom ms-2"
                                                name="option"
                                                value={option.option}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                            />
                                           
                                        </div>
                                    ))}
                                    {errors[`options-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`options-${index}`]}</p>
                                    )}
                                    {errors[`selection-${index}`] && (
                                        <p className="text-danger mb-2">{errors[`selection-${index}`]}</p>
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
                <div onClick={toggleExpand} className="button-modify">
                    <button type="button" className="toggle-button">
                        +<span className="ms-2">{!expand && 'Add New'}</span>
                    </button>
                    {expand && (
                        <>
                            <button type="button" className="btn btn-light each-button" onClick={addText}>
                                Text
                            </button>
                            <button type="button" className="btn btn-light each-button ms-2" onClick={addSelect}>
                                Choice
                            </button>
                            <button type="button" className="btn btn-light each-button ms-2" onClick={addMultiSelect}>
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

