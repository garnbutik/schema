import React, {useReducer} from 'react';
import ScheduleReducer from './scheduleReducer';
import ScheduleContext from './scheduleContext';
import axios from 'axios';

import {
    FETCH_LESSONS
} from "../types";

const ScheduleState = (props) => {
  const initialState = {
      isTransferredToCanvas: false,
      lessons: [],
      coursedetails: '',
      lessons_old: [
          {
              "id": "457600",
              "startdate": "2018-04-05",
              "starttime": "13:00",
              "enddate": "2018-04-05",
              "endtime": "14:30",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457601",
              "startdate": "2018-04-05",
              "starttime": "14:45",
              "enddate": "2018-04-05",
              "endtime": "16:15",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457602",
              "startdate": "2018-04-09",
              "starttime": "13:00",
              "enddate": "2018-04-09",
              "endtime": "14:30",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457603",
              "startdate": "2018-04-09",
              "starttime": "14:45",
              "enddate": "2018-04-09",
              "endtime": "16:15",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457605",
              "startdate": "2018-04-11",
              "starttime": "08:15",
              "enddate": "2018-04-11",
              "endtime": "09:45",
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
              "id": "457606",
              "startdate": "2018-04-11",
              "starttime": "10:15",
              "enddate": "2018-04-11",
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
              "id": "457607",
              "startdate": "2018-04-18",
              "starttime": "08:15",
              "enddate": "2018-04-18",
              "endtime": "09:45",
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
          },
          {
              "id": "457611",
              "startdate": "2018-04-19",
              "starttime": "16:30",
              "enddate": "2018-04-19",
              "endtime": "18:00",
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
              "id": "457612",
              "startdate": "2018-04-23",
              "starttime": "13:00",
              "enddate": "2018-04-23",
              "endtime": "14:30",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457613",
              "startdate": "2018-04-23",
              "starttime": "14:45",
              "enddate": "2018-04-23",
              "endtime": "16:15",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457614",
              "startdate": "2018-05-17",
              "starttime": "13:00",
              "enddate": "2018-05-17",
              "endtime": "14:30",
              "columns": [
                  "",
                  "A3001",
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
              "id": "457615",
              "startdate": "2018-05-17",
              "starttime": "14:45",
              "enddate": "2018-05-17",
              "endtime": "16:15",
              "columns": [
                  "",
                  "A3001",
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

  const [state, dispatch] = useReducer(ScheduleReducer, initialState);

    //Fetch from Schemahantering Rest API
    const fetchLessons = async (courseCode) => {
        const res = await axios.get(`http://localhost:8100/lessons/${courseCode}`);
        dispatch({
            type: FETCH_LESSONS,
            payload: res.data
        });
    };

    return <ScheduleContext.Provider
        value={{
            lessons: state.lessons,
            coursedetails: state.coursedetails,
            fetchLessons
        }}
    >
        {props.children}
    </ScheduleContext.Provider>
};

export default ScheduleState;
