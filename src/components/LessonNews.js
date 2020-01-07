import React, {useContext, Fragment, useEffect} from 'react';
import ScheduleContext from "../context/schedule/scheduleContext";
import '../table.css';
import {terms} from "../listOfTerms";
import Alert from "./Alert";

const LessonNew = () => {
    const scheduleContext = useContext(ScheduleContext);
    const {lessons, coursedetails, canvasUsers, alertState} = scheduleContext;

    useEffect(() => {
        scheduleContext.fetchFromLS();
        // eslint-disable-next-line
    }, []);

    const handleFetchLessonsOnClick = (e) => {
        e.preventDefault();
        const courseCode = document.getElementById('courseCode').value;
        const selectedOption = document.getElementById('select-term');
        const termFromDate = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-from');
        const termEndDate = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-to');
        scheduleContext.fetchLessons(courseCode, termFromDate, termEndDate);
    };

    const handlePostToCanvasOnClick = (e) => {
        e.preventDefault();
        let newState = [...lessons];
        for (let lesson of newState){
            const textArea = document.getElementById(`add-props-${lesson.id}`);
            const newAddProps = textArea.value;
            lesson.additionalProps = newAddProps;
        }
        const userID = document.getElementById("canvas-context-code").value;
        scheduleContext.postToCanvas(newState, userID);
    };

    const handleFetchFromCanvas = (e) => {
        e.preventDefault();
      const textInput = document.getElementById('canvas-search').value;
      scheduleContext.fetchUsersFromCanvas(textInput);
    };

    const disablePostButton = () => {
        return lessons.length < 1 || canvasUsers.length < 1;
    };

    return (
        <Fragment>
            <div className={'margin-1rem'}>
                <div className={'button-bar'}>
                    <div className={'button-bar-item'}>
                        <input id={'courseCode'}/>
                        <select id={'select-term'}>
                            {terms.map(term => (
                                <option data-from={term.from} data-to={term.to}>{term.name}</option>
                                ))
                            }
                        </select>
                        <button className={'btn-primary'} onClick={handleFetchLessonsOnClick}>Hämta lektioner</button>
                    </div>
                    <div className="button-bar-item">
                        <input type={'text'} id={'canvas-search'} />
                        <select name="" id="canvas-context-code">
                            {canvasUsers.length < 1 ? (
                                <option value="placeholder">  -- Sök i rutan ovan för att få alternativ --  </option>
                            ) :
                                (
                                    canvasUsers.map(user => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                )
                            }
                        </select>
                        <button onClick={handleFetchFromCanvas} className={'btn-primary'}>Sök i Canvas</button>
                    </div>
                    <div className={'button-bar-item'}>
                        {disablePostButton() ? (
                            <button disabled={true} className={'btn-primary'}>Skicka lektioner till Canvas</button>
                        ) :
                            (
                                <button className={'btn-primary'} onClick={handlePostToCanvasOnClick}>Skicka lektioner till Canvas</button>
                            )
                        }
                    </div>
                </div>
                <Alert/>
                {(lessons.length < 1) ? <h3>Hämta kurser för att visa dem här</h3> :
                    <>
                    <h2>{`Kurs: ${coursedetails}`}</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Datum</th>
                            <th>Tid</th>
                            <th>Sal</th>
                            <th>Lärare</th>
                            <th>Aktivitet</th>
                            <th>Stad</th>
                            <th>Övrig info</th>
                        </tr>
                        {lessons.map(lesson => (
                            <tr key={lesson.id}>
                                <td>{lesson.id}</td>
                                <td>{lesson.startdate}</td>
                                <td>{`${lesson.starttime} ${lesson.endtime}`}</td>
                                <td>{lesson.location}</td>
                                <td>{lesson.teacher}</td>
                                <td>{lesson.activity}</td>
                                <td>{lesson.city}</td>
                                <td className={'td-no-padding'}>
                                    <textarea
                                        id={'add-props-' + lesson.id}
                                        className={'textarea-fullsize'}
                                        defaultValue={lesson.additionalProps}>
                                    </textarea>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                        <div>
                            <button onClick={scheduleContext.clearTable}>Rensa tabellen</button>
                        </div>
                    </>
                }
            </div>
        </Fragment>
    )
};

export default LessonNew;