import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './UserAssessment.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const UserAssessment = ({ selectedBatch }) => {
    if (!selectedBatch) return <div className='user-swiper'>Select a batch to see assessments.</div>;

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
                {selectedBatch.assessments.map(assessment => (
                    <SwiperSlide key={assessment.id}>
                        <div className="slide-content">
                            <h3>{assessment.name}</h3>
                            <div className='result-attempt-buttons'>
                                <button className='btn btn-primary attempt-button'>Attempt Test</button>
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
