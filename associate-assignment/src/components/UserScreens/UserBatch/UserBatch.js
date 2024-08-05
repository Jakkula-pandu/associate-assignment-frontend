import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './UserBatch.css';
import 'swiper/css/effect-cube';
import { EffectCube, Pagination } from 'swiper/modules';

const UserBatches = ({ onSelectBatch }) => {
    const batches = [
        {
            name: 'Batch 1', code: 'B001', assessments: [
                { id: 1, name: "Assessment 1" },
                { id: 2, name: "Assessment 2" },
                { id: 3, name: "Assessment 3" },
                { id: 4, name: "Assessment 4" },
                { id: 5, name: "Assessment 5" },
                { id: 6, name: "Assessment 6" },
                { id: 7, name: "Assessment 7" }
            ]
        },
        {
            name: 'Batch 2', code: 'B002', assessments: [
                { id: 8, name: "Projects 1" },
                { id: 9, name: "Projects 2" },
                { id: 10, name: "Projects 3" },
                { id: 11, name: "Projects 4" },
                { id: 12, name: "Projects 5" },
                { id: 13, name: "Projects 6" },
                { id: 14, name: "Projects 7" },
                { id: 55, name: "Projects 8" },
                { id: 56, name: "Projects 9" },
            ]
        },
        {
            name: 'Batch 3', code: 'B003', assessments: [
                { id: 15, name: "Testing 1" },
                { id: 16, name: "Testing 2" },
                { id: 17, name: "Testing 3" },
                { id: 18, name: "Testing 4" },
                { id: 20, name: "Testing 6" },
                { id: 21, name: "Testing 7" }
            ]
        },
        {
            name: 'Batch 4', code: 'B004', assessments: [
                { id: 22, name: "Traveling 1" },
                { id: 23, name: "Traveling 2" },
                { id: 24, name: "Traveling 3" },
                { id: 25, name: "Traveling 4" },
                { id: 26, name: "Traveling 5" },
                { id: 27, name: "Traveling 6" },
                { id: 28, name: "Traveling 7" }
            ]
        },
        {
            name: 'Batch 5', code: 'B005', assessments: [
                { id: 29, name: "data Science 1" },
                { id: 30, name: "data Science 2" },
                { id: 31, name: "data Science 3" },
                { id: 32, name: "data Science 4" },
                { id: 33, name: "data Science 5" },
                { id: 34, name: "data Science 6" },
                { id: 35, name: "data Science 7" }
            ]
        },
        {
            name: 'Batch 6', code: 'B006', assessments: [
                { id: 36, name: "Mean 1" },
                { id: 37, name: "Mean 2" },
                { id: 38, name: "Mean 3" },
                { id: 39, name: "Mean 4" },
                { id: 40, name: "Mean 5" },
                { id: 41, name: "Mean 6" },

            ]
        },
        {
            name: 'Batch 7', code: 'B007', assessments: [
                { id: 43, name: "Java 1" },
                { id: 44, name: "Java 2" },
                { id: 45, name: "Java 3" },
                { id: 46, name: "Java 4" },
                { id: 47, name: "Java 5" },

            ]
        },
        {
            name: 'Batch 8', code: 'B008', assessments: [
                { id: 50, name: "Vision Plus 1" },
                { id: 51, name: "Vision Plus 2" },

            ]
        }
    ];


    const handleBatchClick = (batch) => {
        onSelectBatch(batch);
    }

    return (
        <div>
            <Swiper
             effect={'cube'}
             grabCursor={true}
             cubeEffect={{
               shadow: true,
               slideShadows: true,
               shadowOffset: 20,
               shadowScale: 0.94,
             }}
             pagination={true}
             modules={[EffectCube, Pagination]}

                // centeredSlides={true}
                // slidesPerView={'auto'}
                // initialSlide={1}
           
              
                className="mySwiper swiper-container"
            >
                {batches.map((batch, index) => (
                    <SwiperSlide key={index} className='swiper-cards' onClick={() => handleBatchClick(batch)}>
                        <div>
                            <h1>{batch.name}</h1>
                            <h2>{batch.code}</h2>
                            <h3>{batch.assessments.length}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default UserBatches;
