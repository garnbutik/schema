import React, {useContext} from 'react';
import ScheduleContext from "../context/schedule/scheduleContext";



const TransferForm = () => {
    const scheduleContext = useContext(ScheduleContext);
    let courseCode;
    return (
        <div>
            <form>
                Kurskod: 
                <input 
                    type="text" 
                    name="courseCode" 
                    onInput={(event) => courseCode = event.target.value}>
                </input><br></br>
                <button 
                    onClick={(event) => {
                        event.preventDefault();
                        scheduleContext.fetchLessons(courseCode)}
                    }>
                    Överföra schema
                </button>
            </form>
        </div>
    )
};

export default TransferForm;