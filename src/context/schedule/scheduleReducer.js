import {
    FETCH_LESSONS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case FETCH_LESSONS: {
            return {
                ...state,
                lessons: action.payload
            }
        }
        default: {
            return state
        }
    }
}