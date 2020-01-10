import React, {useContext} from 'react';
import ScheduleContext from '../context/schedule/scheduleContext';

const MessageBox = (props) => {
    const schedulecontext = useContext(ScheduleContext);
    const {messageBoxState} = schedulecontext;

    const onClickHandler = (e) => {
        e.preventDefault();
        schedulecontext.setMessageBoxState(null)
    };

    //const {data} = props.messageBoxState;
    return (
        messageBoxState != null && (
            <div className={`alert alert-${messageBoxState.type}`}>
                <i className={'fas fa-info-circle'}/>
                {messageBoxState.text}
                <br/>
                <button onClick={onClickHandler} className={`btn-sm btn-primary ${messageBoxState.showButton}`}>OK</button>
            </div>
        )
    )

};

export default MessageBox;