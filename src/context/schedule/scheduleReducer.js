import {
    SET_LESSONS,
    SET_ADDITIONAL_PROPS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case SET_LESSONS: {
            return {
                ...state,
                lessons: action.payload.lessons,
                coursedetails: action.payload.course,
            }
        }
        case SET_ADDITIONAL_PROPS: {
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