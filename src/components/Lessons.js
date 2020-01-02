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
                <button onClick={buttonClick}>Hämta lektioner</button>
                <input id={'courseCode'}/>
                {lessons.map(lesson => (
                    <Lesson key={lesson.id} lesson={lesson} coursedetails={coursedetails} />
                ))}
            </form>
        </Fragment>
    )
};

export default Lessons;