import React, {useReducer} from 'react';
import ScheduleReducer from './scheduleReducer';
import ScheduleContext from './scheduleContext';
import axios from 'axios';

import {
    SET_LESSONS,
    SET_ADDITIONAL_PROPS,
    SET_IS_TRANSFERRED_TO_CANVAS,
    SET_USERS_FROM_CANVAS
} from "../types";

const ScheduleState = (props) => {
    const initialState = {
        isTransferredToCanvas: false,
        lessons: [],
        coursedetails: '',
        canvasUsers: [],
    };

    const baseUrl = 'http://localhost:8100';

    const resetLessons = {
        course: "",
        lessons: []
    };

    const [state, dispatch] = useReducer(ScheduleReducer, initialState);

    //Fetch from Schemahantering Rest API
    const fetchLessons = async (courseCode, startdate, enddate) => {
        //resets lessons when searching
        dispatch({
            type: SET_LESSONS,
            payload: resetLessons
        });
        const res = await axios.get(`${baseUrl}/lessons/${courseCode}`, {
            params: {
                startDate: startdate,
                endDate: enddate
            }
        });
        dispatch({
            type: SET_LESSONS,
            payload: res.data
        });

        //saves to LS to keep state when page is refreshed
        localStorage.setItem("lessons", JSON.stringify(res.data));
    };

    /*
    Helper method to check if state is persisted to LS
     */
    const fetchFromLS = () => {
        const lessonsFromLS = JSON.parse(localStorage.getItem("lessons"));

        //If no lessons in LS set to empty array
        if (lessonsFromLS === undefined || lessonsFromLS === null || lessonsFromLS.length < 1) {
            const lessons = {
                course: "",
                lessons: []
            };
            dispatch({
                type: SET_LESSONS,
                payload: lessons
            })
        } else {
            dispatch({
                type: SET_LESSONS,
                payload: lessonsFromLS
            })
        }
    };

    /*
    clear-table-button click handler
     */
    const clearTable = () => {
        const lessons = {
            course: "",
            lessons: []
        };
        dispatch({
            type: SET_LESSONS,
            payload: lessons
        });
        localStorage.clear();
    };

    const postToCanvas = async (newState, userID) => {
        dispatch({
            type: SET_ADDITIONAL_PROPS,
            payload: newState
        });
        const requestBody = {
            course: state.coursedetails,
            user: userID,
            lessons: state.lessons
        };
        const res = await axios.post(`${baseUrl}/canvas/`, requestBody);
        if (res.status === 201) {
            dispatch({
                type: SET_IS_TRANSFERRED_TO_CANVAS,
                payload: true
            })
        }
        console.log(res.status);
    };

    const fetchUsersFromCanvas = async (searchString) => {
        const res = await axios.get(`${baseUrl}/users/${searchString}`);
        dispatch({
            type: SET_USERS_FROM_CANVAS,
            payload: res.data
        })
    };

    return <ScheduleContext.Provider
        value={{
            lessons: state.lessons,
            coursedetails: state.coursedetails,
            canvasUsers: state.canvasUsers,
            fetchLessons,
            postToCanvas,
            fetchUsersFromCanvas,
            fetchFromLS,
            clearTable
        }}
    >
        {props.children}
    </ScheduleContext.Provider>
};

export default ScheduleState;
