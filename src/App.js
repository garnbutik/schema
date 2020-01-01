import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Lessons from './components/Lessons';
import Navbar from './components/NavBar';
import Home from './components/Home';
import ScheduleState from "./context/schedule/ScheduleState";

class App extends Component {
    render() {
        return (
            <ScheduleState>
                <Router>
                    <Fragment>
                        <div className='App'>
                            <Navbar/>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/hantera-schema' component={Lessons}/>
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </ScheduleState>
        );
    }
}

export default App;
