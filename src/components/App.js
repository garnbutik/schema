import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import TransferForm from './TransferForm';
import './App.css';
import ScheduleState from "../context/schedule/ScheduleState";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Lessons from "./Lessons";
import Home from "./Home";
import CreateSchedule from "./CreateSchedule";

const App = () => {
    return (

        <ScheduleState>
            <Router>
                <Fragment>
                    <div className='App'>
                        <NavBar />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/skapa-schema' component={CreateSchedule} />
                            <Route exact path='/hantera-schema' component={Lessons} />
                        </Switch>
                    </div>
                </Fragment>
            </Router >
        </ScheduleState>
    )
};

export default App;
