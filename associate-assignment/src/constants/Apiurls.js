const BASE_URL = 'http://localhost:1090/v0.1';

export const API_URLS = {
    user: {
        FETCH_USER: `${BASE_URL}/users/fetch-users`,
    },
    BATCH: {
        FETCH_BATCH: `${BASE_URL}/batches/fetch-batches`,
        ADD_BATCH: `${BASE_URL}/batches/add-batch`,
    },
    TRAINING: {
        FETCH_TRAINING: `${BASE_URL}/batches/fetch-trainings`,
    },
    QUESTIONS : {
        ADD_QUESTION : 'http://localhost:1090/v0.1/questions/add-questions'

    },
    ASSESSMENT: {
        FETCH_ASSESSMENT: `${BASE_URL}/assessment/fetch-assessment`,
        ADD_ASSESSMENT: `${BASE_URL}/assessment/add-assessment`,
    },
    USER_BATCHES: {
        FETCH_USER_BATCH: `${BASE_URL}/batches/fetch-batches`,
    },
    USER_ASSESSMENT: {
        FETCH_USER_ASSESSMENT: `${BASE_URL}/assessment/fetch-assessment`,
    },
    USER_EXAM_QUESTIONS : {     
        FETCH_USER_EXAM_QUESTIONS : `${BASE_URL}/questions/fetch-questions`
    }
};
