import React, { useState } from 'react';
import './UserExam.css';
import Countdown from '../ExamTimer/ExamTimer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestForm = () => {
    const initialQuestions = [
        {
            questions: [{ question: "What is your favorite color?", type: "text", userAnswer: "" }],
            options: []
        },
        {
            questions: [{ question: "What is the capital of France?", type: "radio", userAnswer: "" }],
            options: [
                { type: "radio", option: "Paris", isSelected: false, userAnswer: false },
                { type: "radio", option: "London", isSelected: false, userAnswer: false },
                { type: "radio", option: "Rome", isSelected: false, userAnswer: false }
            ]
        },
        {
            questions: [{ question: "Which of the following are fruits?", type: "checkbox", userAnswer: "" }],
            options: [
                { type: "checkbox", option: "Apple", isSelected: false, userAnswer: false },
                { type: "checkbox", option: "Carrot", isSelected: false, userAnswer: false },
                { type: "checkbox", option: "Banana", isSelected: false, userAnswer: false }
            ]
        }
    ];

    const [questions, setQuestions] = useState(initialQuestions);
    const navigate = useNavigate();

    const handleCountdownComplete = () => {
        Swal.fire({
            title: 'Time\'s up!',
            text: 'Your answers are auto submitted',
            icon: 'info',
            confirmButtonText: 'Okay'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/UserDashboard');
            }
        });
    };

    const handleOptionChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[questionIndex].questions[0].type === 'radio') {
            updatedQuestions[questionIndex].options.forEach((option, idx) => {
                option.userAnswer = idx === optionIndex;
            });
        } else if (updatedQuestions[questionIndex].questions[0].type === 'checkbox') {
            updatedQuestions[questionIndex].options[optionIndex].userAnswer = !updatedQuestions[questionIndex].options[optionIndex].userAnswer;
        }
        setQuestions(updatedQuestions);
    };

    const handleTextChange = (questionIndex, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].questions[0].userAnswer = event.target.value;
        setQuestions(updatedQuestions);
    };

    const submitExam = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Submit',
            text: 'Are you sure you want to submit the exam?',
            icon: 'success',
            confirmButtonText: 'Okay',
            cancelButtonText: 'Cancel',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/UserDashboard');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                navigate('/test');
            }
        });
    };

    return (
        <div className='main-exam-container'>
            <form onSubmit={submitExam} className="exam-container">
                <div className='exam-header'>
                    <div className='timer-card'>
                        <p>Assessment Name</p>
                        <Countdown onComplete={handleCountdownComplete} />
                    </div>
                    <div>
                        <h1>Instructions</h1>
                        <ol className='list-container'>
                            <li>The exam timer is running. Please keep track of the remaining time.</li>
                            <li>If you experience any issues, contact [support/contact person] immediately with details of the problem.</li>
                            <li>Ensure that you submit your exam before the timer runs out. The exam will end automatically when the time is up.</li>
                            <li>Please remember to adhere to exam integrity policies. Any suspicious behavior will be reviewed.</li>
                        </ol>
                    </div>
                </div>
                <div className="exam-card">
                    {questions.map((key, index) => (
                        <div key={index} className="card each_card">
                            <br />
                            {(key.questions[0].type === 'text') && (
                                <div className="d-flex">
                                    <span>{index + 1}.</span>
                                    <span className="flex-grow-1 ps-2">
                                        <input
                                            type="text"
                                            className="form-control custom-outline-bottom"
                                            required
                                            name="question"
                                            placeholder="Enter the question"
                                            value={key.questions[0].question}
                                            readOnly
                                        />
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Answer"
                                            name="answer"
                                            value={key.questions[0].userAnswer}
                                            onChange={(e) => handleTextChange(index, e)}
                                        > </textarea>
                                    </span>
                                </div>
                            )}
                            {key.questions[0].type === 'radio' && (
                                <div className="d-flex">
                                    <span>{index + 1}.</span>
                                    <span className="flex-grow-1 ps-2">
                                        <input
                                            type="text"
                                            className="form-control custom-outline-bottom"
                                            required
                                            name="question"
                                            placeholder="Enter the question"
                                            value={key.questions[0].question}
                                            readOnly
                                        />
                                        {key.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option.option}
                                                    checked={option.userAnswer}
                                                    className="form-check-input radio-button-style ms-2"
                                                    onChange={() => handleOptionChange(index, optionIndex)}
                                                />
                                                <label className="ms-2 options-styling">{option.option}</label>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {key.questions[0].type === 'checkbox' && (
                                <div className="d-flex">
                                    <span>{index + 1}.</span>
                                    <span className="flex-grow-1 ps-2">
                                        <input
                                            type="text"
                                            className="form-control custom-outline-bottom"
                                            required
                                            name="question"
                                            placeholder="Enter the question"
                                            value={key.questions[0].question}
                                            readOnly
                                        />
                                        {key.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    name={`question-${index}`}
                                                    value={option.option}
                                                    checked={option.userAnswer}
                                                    className="form-check-input checkbox-button-style ms-2"
                                                    onChange={() => handleOptionChange(index, optionIndex)}
                                                />
                                                <label className="ms-2 options-styling">{option.option}</label>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                    <div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default TestForm;

