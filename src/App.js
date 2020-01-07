import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import LessonNew from "./components/LessonNews";
import Home from './components/Home';
import ScheduleState from "./context/schedule/ScheduleState";
import CreateSchedule from "./components/CreateSchedule";

class App extends Component {
    render() {
        return (
            <ScheduleState>
                    <Router>
                        <Fragment>
                            <div className='App'>
                                <Navbar/>
                                <div className={'width-75-margin-0-auto'}>
                                    <Switch>
                                        <Route exact path='/' component={Home}/>
                                        <Route exact path='/skapa-schema' component={CreateSchedule}/>
                                        <Route exact path='/hantera-schema' component={LessonNew}/>
                                    </Switch></div>
                            </div>
                        </Fragment>
                    </Router>
            </ScheduleState>
        );
    }
}

export default App;
