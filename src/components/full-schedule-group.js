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
import {RawHTML} from "openstack-uicore-foundation/lib/components";

const FullScheduleGroup = ({
    group,
    showDesc,
    onEventDetail
}) => {

    const handleEventClick = (ev, summitEvent) => {
        ev.preventDefault();
        onEventDetail(summitEvent);
    };

    return (
        <div className="panel panel-default">
            <div className="panel-heading">{group.label}</div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Event</th>
                        <th>Room</th>
                        <th>RSVP</th>
                    </tr>
                </thead>
                <tbody>
                {group.events.map(ev =>
                    <tr key={`ev-${ev.id}`}>
                        <td>{`${ev.start_time} - ${ev.end_time}`}</td>
                        <td>
                            <a href="" onClick={(mouseEvent) => {handleEventClick(mouseEvent, ev)}}>
                                {ev.title}
                            </a><br />
                            {showDesc &&
                            <div className="event_description">
                                <RawHTML>{ev.description}</RawHTML>
                            </div>
                            }
                        </td>
                        <td>{ev.location_nice}</td>
                        <td>
                            {ev.rsvp &&
                            <a href="rsvp-link">RSVP</a>
                            }
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
};

FullScheduleGroup.propTypes = {
    group: PropTypes.object.isRequired,
};

export default FullScheduleGroup
