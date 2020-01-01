import React, {useContext, Fragment} from 'react';
import Lesson from "./Lesson";
import ScheduleContext from "../context/schedule/scheduleContext";


const buttonClick = (e) => {
    e.preventDefault();
    console.log(e.target);
};
const Lessons = () => {
    const scheduleContext = useContext(ScheduleContext);
    const {lessons} = scheduleContext;

    return (
        <Fragment>
            <form>
                <button onClick={buttonClick}>Överför till Canvas</button>
                {lessons.map(lesson => (
                    <Lesson key={lesson.id} lesson={lesson} />
                ))}
            </form>

        </Fragment>
    )
};

export default Lessons;