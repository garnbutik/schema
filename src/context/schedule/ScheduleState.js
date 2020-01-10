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
    REMOVE_ALERT,
    SET_MESSAGEBOX_STATE,
} from "../types";

const ScheduleState = (props) => {
    const initialState = {
        isTransferredToCanvas: false,
        lessons: [],
        coursedetails: '',
        canvasUsers: [],
        alertState: null,
        messageBoxState: null
    };

    const baseUrl = 'http://localhost:8100';

    const resetLessons = {
        course: "",
        lessons: []
    };
    const messageSearchCourses = {
        text: 'Sök ovan för att visa kurser.',
        type: 'light'
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

    const setMessageBoxState = (data) => {
        dispatch({
            type: SET_MESSAGEBOX_STATE,
            payload: data
        })
    };


    //Fetch from Schemahantering Rest API
    const fetchLessons = async (courseCode, startdate, enddate) => {
        //clears lessons when searching
        setLessons(resetLessons);
        setMessageBoxState(null);

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
            if (e.response === undefined) {
                setAlert("Nätverksfel, pröva senare", 'danger');

            }
            else if (e.response.status === 404) {
                setAlert("Kunde inte hitta någon kurs", 'danger');
            } else {
                setAlert(e.toString(), 'danger');
            }

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
            setMessageBoxState(messageSearchCourses)
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
        setMessageBoxState({
            text: 'Sök ovan för att visa kurser.',
            type: 'light'
        })
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
            });
        //setAlert("All information är överförd till Canvas", 'success');
        setMessageBoxState({
            text: 'Alla lektioner är överförda till Canvas',
            type: 'light'
        })
        } else if (res.status === 207) {
            setMessageBoxState({
                text: res.data,
                type: 'danger',
            })
        }
        console.log(res.status);
    };

    const fetchUsersFromCanvas = async (searchString) => {
        dispatch({
            type: SET_USERS_FROM_CANVAS,
            payload: []
        })
        try {
            const res = await axios.get(`${baseUrl}/context-codes/${searchString}`);
            dispatch({
                type: SET_USERS_FROM_CANVAS,
                payload: res.data
            })
        } catch (e) {
            setAlert('Kunde inte hitta någon kalender', 'danger');
        }

    };

    return <ScheduleContext.Provider
        value={{
            lessons: state.lessons,
            isTransferredToCanvas: state.isTransferredToCanvas,
            coursedetails: state.coursedetails,
            canvasUsers: state.canvasUsers,
            alertState: state.alertState,
            messageBoxState: state.messageBoxState,
            fetchLessons,
            postToCanvas,
            fetchUsersFromCanvas,
            fetchFromLS,
            clearTable,
            setAlert,
            setLessons,
            setMessageBoxState,
        }}
    >
        {props.children}
    </ScheduleContext.Provider>
};

export default ScheduleState;
