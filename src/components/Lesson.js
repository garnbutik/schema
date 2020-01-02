import React, {Fragment} from 'react';

const Lesson = (props) => {

    return (
        <Fragment>

            <div className='lesson-container-grid'>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-id' + props.lesson.id}>ID</label>
                    <textarea value={props.lesson.id} id={'lesson-id' + props.lesson.id} readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-start-time' + props.lesson.id}>Start</label>
                    <textarea value={props.lesson.starttime} id={'lesson-start-time' + props.lesson.id} readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-end-time' + props.lesson.id}>Slut</label>
                    <textarea value={props.lesson.endtime} id={'lesson-end-time' + props.lesson.id} readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-start-date' + props.lesson.id}>Datum</label>
                    <textarea value={props.lesson.startdate} id={'lesson-start-date' + props.lesson.id} readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-course-details' + props.lesson.id}>Kurs</label>
                    <textarea id={'lesson-course-details' + props.lesson.id} defaultValue={props.coursedetails}></textarea>
                </div>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-location' + props.lesson.id}>Sal</label>
                    <textarea value={props.lesson.location} id={'lesson-location' + props.lesson.id} readOnly/>
                </div>
                <div className='lesson-item'>
                    <label htmlFor={'lesson-description' + props.lesson.id}>Övrig info</label>
                    <textarea id={'lesson-description' + props.lesson.id} contentEditable></textarea>
                </div>
            </div>

        </Fragment>


    )
}

export default Lesson;