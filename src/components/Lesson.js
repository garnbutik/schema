import React, {Fragment, useContext} from 'react';
import ScheduleContext from '../context/schedule/scheduleContext';
import ScheduleState from "../context/schedule/ScheduleState";

const Lesson = (props) => {
    /*
    TODO: att göra klart, använder props så länge.
     */
    const scheduleContext = useContext(ScheduleContext);
    const {lesson} = scheduleContext;

    return (
        <Fragment>

            <div className='lesson-container-grid'>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-id-' + props.lesson.id}>ID</label>
                    <textarea value={props.lesson.id} id='lesson-id' readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor='lesson-start-time'>Start</label>
                    <textarea value={props.lesson.starttime} id='lesson-start-time' readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor='lesson-end-time'>Slut</label>
                    <textarea value={props.lesson.endtime} id='lesson-end-time' readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor='lesson-start-date'>Datum</label>
                    <textarea value={props.lesson.startdate} id='lesson-start-date' readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor='lesson-course-details'>Kurs</label>
                    <textarea id='lesson-course-details' defaultValue={props.lesson.columns[5]}></textarea>
                </div>
                <div className='lesson-item'>
                    <label htmlFor='lesson-location'>Sal</label>
                    <textarea value={props.lesson.columns[1]} id='lesson-location' readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor='lesson-description'>Övrig info</label>
                    <textarea id='lesson-description' contentEditable></textarea>
                </div>
            </div>

        </Fragment>


    )
}

export default Lesson;