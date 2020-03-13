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
import {Route, Router} from "react-router-dom";
import { createBrowserHistory } from 'history';

export default class ScheduleApp extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(ScheduleReducer, applyMiddleware(thunk));
        this.history = createBrowserHistory({basename: props.schedule_base});
    }

    render() {
        const scheduleProps = {
            summitId: parseInt(this.props.summit_id),
            apiAccessToken: this.props.api_access_token,
            apiUrl: this.props.api_url,
            scheduleBase: this.props.schedule_base,
            scheduleUrl: this.props.schedule_url,
            loginRedirectUrl: this.props.login_url,
            calendarInstructionsLink: this.props.calendar_instructions_link,
            venuesPageLink: this.props.venues_page_link,
        };

        return (
            <Provider store={this.store}>
                <Router history={this.history}>
                    <Route path="/" render={ props => <Schedule {...scheduleProps} {...props} />} />
                </Router>
            </Provider>
        )
    }
}
