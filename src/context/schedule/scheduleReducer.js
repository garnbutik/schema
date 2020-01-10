import {
    SET_LESSONS,
    SET_ADDITIONAL_PROPS,
    SET_IS_TRANSFERRED_TO_CANVAS,
    SET_USERS_FROM_CANVAS,
    SET_ALERT,
    REMOVE_ALERT,
    SET_MESSAGEBOX_STATE,
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
        case SET_IS_TRANSFERRED_TO_CANVAS: {
            return {
                ...state,
                isTransferredToCanvas: action.payload
            }
        }
        case SET_USERS_FROM_CANVAS: {
            return {
                ...state,
                canvasUsers: action.payload
            }
        }
        case SET_ALERT: {
            return {
                ...state,
                alertState: action.payload
            };
        }
        case REMOVE_ALERT: {
            return {
                ...state,
                alertState: null
            };
        }
        case SET_MESSAGEBOX_STATE: {
            return {
                ...state,
                messageBoxState: action.payload
            }
        }
        default: {
            return state
        }
    }
}