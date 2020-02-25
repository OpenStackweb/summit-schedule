/**
 * Copyright 2020 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import ScheduleReducer from './reducer';
import Schedule from './schedule';
import './styles/schedule.less';
import {Route, Router} from "react-router-dom";
import { createBrowserHistory } from 'history';


export default class ScheduleApp extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(ScheduleReducer, applyMiddleware(thunk));
        this.history = createBrowserHistory({basename: props.scheduleBase});
    }

    render() {
        const scheduleProps = this.props;

        return (
            <Provider store={this.store}>
                <Router history={this.history}>
                    <Route path="/" render={ props => <Schedule {...scheduleProps} {...props} />} />
                </Router>
            </Provider>
        )
    }
}
