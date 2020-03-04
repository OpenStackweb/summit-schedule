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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    addEventToSchedule,
    addEventToFavorites,
    unRsvpEvent,
    removeEventFromSchedule,
    removeEventFromFavorites
} from '../../actions'

import EventHeader from './header';
import EventMenu from './menu';
import EventDetails from './details';

class Event extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    render() {

        const {
            event,
            filters,
            summit,
            loginUrl,
            absoluteUrl,
            loggedUser,
            addEventToSchedule,
            addEventToFavorites,
            unRsvpEvent,
            removeEventFromSchedule,
            removeEventFromFavorites,
            history
        } = this.props;

        const { expanded } = this.state;
        const going = loggedUser && event.going;

        return (
            <div className="col-sm-12" id={`event_${event.id}`} ref="container">
                <div
                    className="row main-event-content row-eq-height"
                    onClick={() => {this.setState({expanded: !expanded})}}
                    style={this.getEventStyle()}
                >
                    <EventHeader
                        event={event}
                        summit={summit}
                    />
                    <div className="event-state col-sm-1 col-xs-1">
                        {going && !filters.favorites &&
                            <i className="fa fa-check-circle going-status event-status" />
                        }
                        {event.favorite && ( !going || filters.favorites) &&
                            <i className="fa fa-bookmark favorite-status event-status" />
                        }
                    </div>
                    <EventMenu
                        history={history}
                        event={event}
                        summit={summit}
                        absoluteUrl={absoluteUrl}
                        loginUrl={loginUrl}
                        loggedUser={loggedUser}
                        addEventToSchedule={addEventToSchedule}
                        addEventToFavorites={addEventToFavorites}
                        unRsvpEvent={unRsvpEvent}
                        removeEventFromSchedule={removeEventFromSchedule}
                        removeEventFromFavorites={removeEventFromFavorites}
                    />
                </div>
                <div className={`event-details ${!expanded && 'hidden'}`}>
                    <EventDetails event={event} history={history} />
                </div>
            </div>
        )
    }

    getEventStyle() {
        const { event, summit } = this.props

        const type = event.track && event.track.track_groups.length
            ? summit.track_groups.find(tgrp => tgrp.id === event.track.track_groups[0])
            : event.type;

        const color = type && type.color || '#fff';

        return { borderLeft: `3px solid ${color}` }
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    addEventToSchedule,
    addEventToFavorites,
    unRsvpEvent,
    removeEventFromSchedule,
    removeEventFromFavorites,
})(Event)
