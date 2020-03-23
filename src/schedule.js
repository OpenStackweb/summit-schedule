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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Switch} from "react-router-dom";
import {AjaxLoader} from "openstack-uicore-foundation/lib/components";
import T from "i18n-react";

import {
    getSummitById,
    getUserProfile,
    loadSession,
    getEvents,
    getAllEvents,
    changeView,
    loadFilters,
    getEvent
} from './actions'

import SchedulePage from './pages/schedule'
import SearchResultsPage from "./pages/search-results";
import FullSchedulePage from "./pages/full-schedule";
import EventDetailPage from "./pages/event-detail";
import EventRsvpPage from "./pages/event-rsvp";
import SpeakerProfilePage from "./pages/speaker-profile";
import NoMatchPage from "./pages/no-match-page";
import GeneralMetaTags from "./pages/meta-tags/general";


class Schedule extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { apiAccessToken, apiUrl, scheduleBase, scheduleUrl, loginRedirectUrl, venuesPageLink } = this.props;
        this.props.loadSession(apiAccessToken, apiUrl, scheduleBase, scheduleUrl, loginRedirectUrl, venuesPageLink);
    }

    componentDidUpdate(prevProps, prevState) {
        const { summitId, apiBaseUrl, scheduleLoading, summit } = this.props;

        if ((apiBaseUrl && summitId && (!summit || summit.id !== summitId) && !scheduleLoading)) {
            this.props.getSummitById(summitId);
        }

    }

    render() {
        const {summit, scheduleLoading, match } = this.props;

        if (!summit) return(<div />);

        return (
            <div id="schedule-app-wrapper">
                <AjaxLoader show={ scheduleLoading } size={ 120 } />
                <GeneralMetaTags summit={summit} />
                <Switch>
                    <Route exact strict path={match.url} component={SchedulePage}/>
                    <Route exact strict path={`/full`} component={FullSchedulePage}/>
                    <Route exact strict path={`/search/:term`} component={SearchResultsPage}/>
                    <Route exact strict path={`/events/:event_id(\\d+)/:event_slug`} component={EventDetailPage}/>
                    <Route exact strict path={`/events/:event_id(\\d+)/:event_slug/rsvp`} component={EventRsvpPage}/>
                    <Route exact strict path={`/speakers/:speaker_id(\\d+)`} component={SpeakerProfilePage}/>
                    <Route component={NoMatchPage} />
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    getSummitById,
    getUserProfile,
    loadSession,
    getEvents,
    getAllEvents,
    getEvent,
    changeView,
    loadFilters
})(Schedule)
