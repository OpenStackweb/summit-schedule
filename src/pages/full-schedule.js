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
import {Dropdown} from "openstack-uicore-foundation/lib/components";
import {epochToMomentTimeZone} from "openstack-uicore-foundation/lib/methods";
import FullScheduleGroup from "../components/full-schedule-group";
import T from "i18n-react";
import {connect} from "react-redux";
import {getAllEvents} from "../actions";

class FullSchedulePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDesc: false,
            groupBy: 'day'
        };

        this.groupEventsByDay   = this.groupEventsByDay.bind(this);
        this.groupEventsByTrack = this.groupEventsByTrack.bind(this);
        this.groupEventsByType  = this.groupEventsByType.bind(this);
        this.goBack             = this.goBack.bind(this);
    }

    componentDidMount() {
        const {getAllEvents} = this.props;

        getAllEvents();
    }

    groupEventsByDay() {
        const {allEvents, summit} = this.props;
        const timeZone = summit.time_zone_id;
        let groupedEvents = [];

        allEvents.forEach(ev => {
            let eventDate = epochToMomentTimeZone(ev.start_date, timeZone).format('Y-M-D');
            let group = groupedEvents.find(gr => gr.value === eventDate);
            if (!group) {
                let eventDateNice = epochToMomentTimeZone(ev.start_date, timeZone).format('dddd Do');
                groupedEvents.push({ value: eventDate, label: eventDateNice, events: [ev]})
            } else {
                group.events.push(ev);
            }
        });
        return groupedEvents;
    }

    groupEventsByTrack() {
        const {allEvents} = this.props;
        let groupedEvents = [];

        allEvents.forEach(ev => {
            let group = groupedEvents.find(gr => gr.value === ev.track.id);
            if (!group) {
                groupedEvents.push({ value: ev.track.id, label: ev.track.name, events: [ev]})
            } else {
                group.events.push(ev);
            }
        });
        return groupedEvents;
    }

    groupEventsByType() {
        const {allEvents} = this.props;
        let groupedEvents = [];

        allEvents.forEach(ev => {
            let group = groupedEvents.find(gr => gr.value === ev.type.id);
            if (!group) {
                groupedEvents.push({ value: ev.type.id, label: ev.type.name, events: [ev]})
            } else {
                group.events.push(ev);
            }
        });
        return groupedEvents;
    }

    goBack(ev) {
        ev.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const {groupBy, showDesc} = this.state;
        const {allEvents, timeZone} = this.props;

        let group_by_ddl = [
            {label: 'Sort by Day', value: 'day'},
            {label: 'Sort by Track', value: 'track'},
            {label: 'Sort by Event Type', value: 'type'}
        ];

        return (
            <div className="full-schedule-page">
                <div className="row page-title">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Full Schedule</h2>
                            </div>
                            <div className="col-md-12">
                                <a href="#" onClick={this.goBack}>Go Back</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-3 pull-right">
                            <button className="btn btn-primary">Export PDF</button>
                        </div>
                        <div className="col-md-4 pull-right">
                            <Dropdown
                                id="group_by"
                                value={groupBy}
                                options={group_by_ddl}
                                onChange={(ev) => this.setState({groupBy: ev.target.value})}
                            />
                        </div>
                        <div className="col-md-5 pull-right">
                            <div className="form-check abc-checkbox">
                                <input
                                    type="checkbox"
                                    id="show_desc"
                                    checked={showDesc}
                                    onChange={(ev) => this.setState({showDesc: ev.target.checked})}
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="show_desc">
                                    show description
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {allEvents && allEvents.length > 0 &&
                <div className="event-list-wrapper">
                    {groupBy === 'day' && this.groupEventsByDay().map(group => (
                        <FullScheduleGroup
                            key={`group-${group.value}`}
                            group={group}
                            timeZone={timeZone}
                            showDesc={showDesc}
                        />
                    ))}
                    {groupBy === 'track' && this.groupEventsByTrack().map(group => (
                        <FullScheduleGroup
                            key={`group-${group.value}`}
                            group={group}
                            timeZone={timeZone}
                            showDesc={showDesc}
                        />
                    ))}
                    {groupBy === 'type' && this.groupEventsByType().map(group => (
                        <FullScheduleGroup
                            key={`group-${group.value}`}
                            group={group}
                            timeZone={timeZone}
                            showDesc={showDesc}
                        />
                    ))}
                </div>
                }
            </div>
        )
    }
}

FullSchedulePage.propTypes = {
    summit: PropTypes.object.isRequired,
    allEvents: PropTypes.array.isRequired,
    getAllEvents: PropTypes.func.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    getAllEvents
})(FullSchedulePage)
