import React, { useReducer} from 'react';
import ScheduleReducer from './scheduleReducer';
import ScheduleContext from './scheduleContext';
import axios from 'axios';

import {
    SET_LESSONS,
    SET_ADDITIONAL_PROPS,
    SET_IS_TRANSFERRED_TO_CANVAS,
    SET_USERS_FROM_CANVAS,
    SET_ALERT,
    REMOVE_ALERT
} from "../types";

const ScheduleState = (props) => {
    const initialState = {
        isTransferredToCanvas: false,
        lessons: [],
        coursedetails: '',
        canvasUsers: [],
        alertState: null
    };

    const baseUrl = 'http://localhost:8100';

    const resetLessons = {
        course: "",
        lessons: []
    };

    const [state, dispatch] = useReducer(ScheduleReducer, initialState);

    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg, type}
        });
        setTimeout(() =>  dispatch({type: REMOVE_ALERT}), 5000);
    };

    const setLessons = (newState) => {
        dispatch({
            type: SET_LESSONS,
            payload: newState
        })
    };


    //Fetch from Schemahantering Rest API
    //TODO add alert for no response from api
    const fetchLessons = async (courseCode, startdate, enddate) => {
        //clears lessons when searching
        setLessons(resetLessons);

        try {
            const res = await axios.get(`${baseUrl}/lessons/${courseCode}`, {
                params: {
                    startDate: startdate,
                    endDate: enddate
                }

            });
            setLessons(res.data);

            //saves to LS to keep state when page is refreshed
            sessionStorage.setItem("lessons", JSON.stringify(res.data));
        } catch (e) {
            setAlert("Kunde inte hitta någon kurs", 'danger')
        }
    };



    /*
    Helper method to check if state is persisted to LS
     */
    const fetchFromLS = () => {
        const lessonsFromLS = JSON.parse(sessionStorage.getItem("lessons"));

        //If no lessons in LS set to empty array
        if (lessonsFromLS === undefined || lessonsFromLS === null || lessonsFromLS.length < 1) {
            setLessons(resetLessons);
        } else {
            setLessons(lessonsFromLS);

        }
    };

    /*
    clear-table-button click handler
     */
    const clearTable = () => {
        setLessons(resetLessons);
        sessionStorage.clear();
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
        const res = await axios.get(`${baseUrl}/context-codes/${searchString}`);
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
            alertState: state.alertState,
            fetchLessons,
            postToCanvas,
            fetchUsersFromCanvas,
            fetchFromLS,
            clearTable,
            setAlert,
            setLessons
        }}
    >
        {props.children}
    </ScheduleContext.Provider>
};

export default ScheduleState;
