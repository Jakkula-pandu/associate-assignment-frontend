import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './UserBatch.css';
import 'swiper/css/effect-cube';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { fetchUsersBatch } from '../../../actions/userBatchesActions';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAssessment } from '../../../actions/userAssessmentsActions';


const UserBatches = ({ onSelectBatch }) => {
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.userBatches.userBatches.Batches);
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);
    

    useEffect(() => {
        dispatch(fetchUsersBatch());
      },[] );
    
      useEffect(() => {
        if (dataState && dataState.length > 0) {
            const initialBatchId = dataState.length > 1 ? dataState[1].batch_id : dataState[0].batch_id;
            setSelectedBatchId(initialBatchId);
            dispatch(fetchUsersAssessment(initialBatchId));
        }
    }, [dataState, dispatch]);

    const handleBatchClick = (batchId) => {
        setSelectedBatchId(batchId);
        dispatch(fetchUsersAssessment(batchId)); 
    };

    return (
        <div>
            <Swiper
             effect={'coverflow'}
             grabCursor={true}
             centeredSlides={true}
             slidesPerView={'auto'}
             initialSlide={1}
             coverflowEffect={{
                 rotate: 50,
                 stretch: 0,
                 depth: 100,
                 modifier: 1,
                 slideShadows: true,
             }}
            
             pagination={{
                clickable: true,
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
             modules={[EffectCoverflow, Pagination]}
             className="mySwiper swiper-container"
            >
                {dataState && dataState.map((batch, index) => (
                       <SwiperSlide key={index} className={`swiper-cards ${index === activeIndex ? 'active' : 'inactive'}`} onClick={() => index === activeIndex && handleBatchClick(batch.batch_id)}>
                        {/* <SwiperSlide key={index} className='swiper-cards' onClick={() => index === activeIndex && handleBatchClick(batch.batch_id)}></SwiperSlide> */}
                        <div>
                            <h1 className='batch-heading batch-bold batch-details-styling'>{batch.batch_name}</h1>
                            {/* <h5 className='batch-details-styling'>Batch Id:{batch.batch_id}</h5>
                            <h5 className='batch-details-styling'>No of Users:{batch.users.length}</h5> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default UserBatches;
