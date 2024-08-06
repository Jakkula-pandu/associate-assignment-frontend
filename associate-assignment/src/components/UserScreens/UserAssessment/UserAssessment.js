import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './UserAssessment.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const UserAssessment = ({ selectedBatch }) => {
    const navigate = useNavigate();
    const userAssessmentsDetails  = useSelector((state) => state.userAssessments);
    console.log("user", userAssessmentsDetails);

    const handleTest = (assessmentId) => {
        navigate('/test', { state: { assessmentId } });
    };
    
    if (userAssessmentsDetails.userAssessments.message) return <div className='user-swiper'>{userAssessmentsDetails.userAssessments.message}</div>;

    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={false}
                navigation={true}
                // loop={true}
                // autoplay={{ delay: 4000, disableOnInteraction: false }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper user-swiper"
            >
                {userAssessmentsDetails.userAssessments.Assessments && userAssessmentsDetails.userAssessments.Assessments.map(assessment => (
                    <SwiperSlide key={assessment.assessment_id}>
                        <div className="slide-content">
                            <h1 className='batch-heading batch-bold batch-details-styling'>{assessment.assessment_name}</h1>
                            <div className='result-attempt-buttons'>
                                <button  className='btn btn-primary attempt-button'  disabled={!assessment.is_questions}  onClick={() => handleTest(assessment.assessment_id)}>Attempt Test</button>
                                <button className='btn btn-success view-result-button'>View Result</button>
                                
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default UserAssessment;
