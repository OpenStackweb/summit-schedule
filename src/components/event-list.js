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
import Event from './event-row/event';

const NO_EVENTS_MSG = `* The combination of filters you have selected
    resulted in no matching events. Please adjust the filters or try
    different search parameters.`;

const EventList = ({
    events,
    filtered,
    history
}) => {

    const noResults = filtered.length && filtered.length === events.length;

    const getHiddenClass = event => {
        return filtered.indexOf(event.id) >= 0 ? 'hide' : ''
    }

    return (
        <div className="row event-list">
            <div className={`col-md-12 col-xs-12 ${noResults ? 'hide' : ''}`}>
                {events.map(event => (
                    <div key={`event-${event.id}`} className={`row event-row ${getHiddenClass(event)}`}>
                        <Event event={event} history={history} />
                    </div>
                ))}
            </div>
            <div className={`col-md-12 col-xs-12 ${noResults ? '' : 'hide'}`}>
                <p>{NO_EVENTS_MSG}</p>
            </div>
        </div>
    )
}

EventList.propTypes = {
    events: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
    summit: PropTypes.object.isRequired,
};

export default EventList
