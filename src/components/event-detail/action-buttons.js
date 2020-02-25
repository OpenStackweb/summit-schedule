/**
 * Copyright 2017 OpenStack Foundation
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
import { connect } from 'react-redux';
import {
    unRsvpEvent,
    addEventToSchedule,
    addEventToFavorites,
    removeEventFromSchedule,
    removeEventFromFavorites
} from '../../actions';

import EventRSVPAction from "../event-actions/event-rsvp-action";
import EventScheduleAction from "../event-actions/event-schedule-action";
import EventWatchAction from "../event-actions/event-watch-action";
import EventExtRSVPAction from "../event-actions/event-ext-rsvp-action";


class ActionButtons extends React.Component {

    render() {
        const {
            history,
            eventDetail: event,
            loggedUser,
            removeEventFromSchedule,
            addEventToSchedule,
            unRsvpEvent,
            addEventToFavorites,
            removeEventFromFavorites
        } = this.props;

        return (
            <div className="event-actions">
                { event.has_rsvp && event.rsvp_external &&
                <EventExtRSVPAction
                    event={event}
                    loggedUser={loggedUser}
                    type="button"
                    onUnRsvp={removeEventFromSchedule}
                    onRsvp={addEventToSchedule}
                />
                }
                { event.has_rsvp && !event.rsvp_external &&
                <EventRSVPAction
                    event={event}
                    history={history}
                    loggedUser={loggedUser}
                    type="button"
                    onUnRsvp={unRsvpEvent}
                />
                }
                { !event.has_rsvp &&
                <EventScheduleAction
                    event={event}
                    loggedUser={loggedUser}
                    type="button"
                    onSchedule={addEventToSchedule}
                    onUnSchedule={removeEventFromSchedule}
                />
                }
                { event.to_record &&
                <EventWatchAction
                    event={event}
                    loggedUser={loggedUser}
                    type="button"
                    onWatch={addEventToFavorites}
                    onUnWatch={removeEventFromFavorites}
                />
                }
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
    addEventToSchedule,
    addEventToFavorites,
    unRsvpEvent,
    removeEventFromSchedule,
    removeEventFromFavorites,
})(ActionButtons)
