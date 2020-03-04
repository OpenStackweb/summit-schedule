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

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import GroupingSelect from "../components/grouping-select";
import Filters from "../components/filters";
import EventList from "../components/event-list";
import PageHeader from "../components/page-header";
import { changeView, getEvents, loadView, loadFilters } from "../actions";
import ScheduleMetaTags from './meta-tags/schedule';

import "../styles/schedule.scss";

class SchedulePage extends React.Component {

    componentDidMount() {
        const {getEvents, loadView, loadFilters} = this.props;

        loadView();
        loadFilters();
        getEvents();
    }

    render() {
        const {summit, history, loggedUser, view, events, filtered, searchTerm, changeView} = this.props;

        return (
            <div className="schedule-page">
                <ScheduleMetaTags summit={summit} />
                <PageHeader
                    title="Schedule"
                    searchTerm={searchTerm}
                    history={history}
                    showSearch={true}
                    showGoBack={true}
                />
                <GroupingSelect view={view} changeView={changeView} summit={summit}/>
                <div className="event-list-wrapper">
                    <Filters history={history} />
                    <EventList
                        events={events}
                        filtered={filtered}
                        summit={summit}
                        loggedUser={loggedUser}
                        history={history}
                    />
                </div>
            </div>
        );
    }
}

SchedulePage.propTypes = {
    summit: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    view: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
    changeView: PropTypes.func.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    getEvents,
    loadView,
    loadFilters,
    changeView
})(SchedulePage)

