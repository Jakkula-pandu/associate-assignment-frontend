import React, {useEffect, useState} from 'react';
import './UserExam.css';
import Countdown from '../ExamTimer/ExamTimer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserExamQuestions } from '../../../actions/userExamQuestionsAction';
import { useLocation } from 'react-router-dom';


const TestForm = () => {
    const location = useLocation();
    const { assessmentId } = location.state || {};

    const dispatch = useDispatch() ;
    const dataState = useSelector((state) => state.userExamQuestions);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
            dispatch(fetchUserExamQuestions(assessmentId));   
            console.log("dataState>>", dataState);
                
    },[dispatch]);

    useEffect(() => {
        if (dataState?.userExamQuestions?.Assessments) {
            setQuestions(dataState.userExamQuestions.Assessments);
        }
    }, [dataState]);

    const navigate = useNavigate();

    const handleCountdownComplete = () => {
        Swal.fire({
            title: "Time's up!",
            text: "Your answers are auto-submitted",
            icon: 'info',
            confirmButtonText: 'Okay'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/UserDashboard');
            }
        });
    };

    const onBack = () => {
        navigate('/UserDashboard');
    };

    const handleOptionChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[questionIndex].question_type === 'multiple_choice') {
            updatedQuestions[questionIndex].options[optionIndex].userAnswer = !updatedQuestions[questionIndex].options[optionIndex].userAnswer;
        }
        setQuestions(updatedQuestions);
    };

    const handleTextChange = (questionIndex, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].userAnswer = event.target.value;
        setQuestions(updatedQuestions);
    };

    const submitExam = (event) => {
        event.preventDefault();
        console.log("questions>>>>>", questions);
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
                    {questions.map((question, index) => (
                        <div key={index} className="card each_card">
                            <br />
                            {(question.question_type === 'text') && (
                                <div className="d-flex">
                                    <span>{index + 1}.</span>
                                    <span className="flex-grow-1 ps-2">
                                        <input
                                            type="text"
                                            className="form-control custom-outline-bottom"
                                            required
                                            name="question"
                                            placeholder="Enter the question"
                                            value={question.question_text}
                                            readOnly
                                        />
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Answer"
                                            name="answer"
                                            value={question.userAnswer || ''}
                                            onChange={(e) => handleTextChange(index, e)}
                                        />
                                    </span>
                                </div>
                            )}
                            {question.question_type === 'multiple_choice' && (
                                <div className="d-flex">
                                    <span>{index + 1}.</span>
                                    <span className="flex-grow-1 ps-2">
                                        <input
                                            type="text"
                                            className="form-control custom-outline-bottom"
                                            required
                                            name="question"
                                            placeholder="Enter the question"
                                            value={question.question_text}
                                            readOnly
                                        />
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    name={`question-${index}`}
                                                    value={option.option}
                                                    checked={option.userAnswer || false}
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
