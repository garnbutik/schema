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
        lessons_old: [
            {
                "id": "457608",
                "startdate": "2018-04-18",
                "starttime": "10:15",
                "enddate": "2018-04-18",
                "endtime": "11:45",
                "columns": [
                    "",
                    "A2029",
                    "Helena Brännström",
                    "Lektion",
                    "",
                    "M0010N. Försäljning och etik",
                    "Luleå",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            },
            {
                "id": "457609",
                "startdate": "2018-04-19",
                "starttime": "13:00",
                "enddate": "2018-04-19",
                "endtime": "14:30",
                "columns": [
                    "",
                    "A2011",
                    "Helena Brännström",
                    "Lektion",
                    "",
                    "M0010N. Försäljning och etik",
                    "Luleå",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            },
            {
                "id": "457610",
                "startdate": "2018-04-19",
                "starttime": "14:45",
                "enddate": "2018-04-19",
                "endtime": "16:15",
                "columns": [
                    "",
                    "A2011",
                    "Helena Brännström",
                    "Lektion",
                    "",
                    "M0010N. Försäljning och etik",
                    "Luleå",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            }
        ],
    };

    const baseUrl = 'http://localhost:8100';

    const [state, dispatch] = useReducer(ScheduleReducer, initialState);

    //Fetch from Schemahantering Rest API
    const fetchLessons = async (courseCode) => {
        const res = await axios.get(`${baseUrl}/lessons/${courseCode}`);
        dispatch({
            type: SET_LESSONS,
            payload: res.data
        });
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
            fetchUsersFromCanvas
        }}
    >
        {props.children}
    </ScheduleContext.Provider>
};

export default ScheduleState;
