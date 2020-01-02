import {
    FETCH_LESSONS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case FETCH_LESSONS: {
            return {
                ...state,
                lessons: action.payload.lessons,
                coursedetails: action.payload.course,
            }
        }
        default: {
            return state
        }
    }
}