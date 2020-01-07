import React, {useContext, Fragment} from 'react';
import Lesson from "./Lesson";
import ScheduleContext from "../context/schedule/scheduleContext";

const Lessons = () => {
    const scheduleContext = useContext(ScheduleContext);
    const {lessons, coursedetails} = scheduleContext;

    const buttonClick = (e) => {
        e.preventDefault();
        const courseCode = document.getElementById('courseCode').value;
        scheduleContext.fetchLessons(courseCode);
    };
    return (
        <Fragment>
            <form>
                <div className={'button-bar'}>
                    <h3>Hej</h3>
                    <input id={'courseCode'}/>
                    <button onClick={buttonClick}>Hämt lektioner</button>
                </div>
                <div className={'grid'}>{lessons.map(lesson => (
                    <Lesson key={lesson.id} lesson={lesson} coursedetails={coursedetails}/>
                ))}</div>
            </form>
        </Fragment>
    )
};

export default Lessons;