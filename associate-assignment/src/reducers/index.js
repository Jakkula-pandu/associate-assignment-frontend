import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import userReducer from './apireducers';
import batchReducer from './batchReducer';
import trainingReducer from './trainingReducer';
import assessmentReducer from './assessmentReducer';
import userBatchReducer from './userBatchesReducer';
import userAssessmentReducer from './userAssessmentsReducer';
import userExamQuestionsReducer from './userExamQuestionsReducer';
const rootReducer = combineReducers({
    tab: tabReducer,
    userdata: userReducer,
    batchdata: batchReducer,
    addbatchdata: batchReducer,
    trainingsdata: trainingReducer,
    assessmentData: assessmentReducer,
    userBatches: userBatchReducer,
    userAssessments: userAssessmentReducer,
    userExamQuestions: userExamQuestionsReducer
});

export default rootReducer;