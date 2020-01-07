import React, {useContext} from 'react';
import ScheduleContext from '../context/schedule/scheduleContext';

const Alert = () => {
    const schedulecontext = useContext(ScheduleContext);

    const {alertState} = schedulecontext;

    return (
        alertState != null && (
            <div className={`alert alert-${alertState.type}`}>
                <i className={'fas fa-info-circle'}/> {alertState.msg}
            </div>
        )
    );
};


export default Alert;