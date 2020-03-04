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
import {epochToMomentTimeZone} from 'openstack-uicore-foundation/lib/methods';

const EventHeader = ({
    event,
    summit,
}) => {

    const getSearchLink = term => {
        term = term.replace(/\s+/g, '+')
        return `insert-search-url?t=${encodeURIComponent(term)}`
    };

    const getLocationName = location => {
        let locationName = '';

        if (!location) return 'TBA';

        if (location.venue && location.venue.name)
            locationName = location.venue.name;
        if (location.floor && location.floor.name)
            locationName = `${locationName} - ${location.floor.name}`;
        if (location.name)
            locationName = `${locationName} - ${location.name}`;

        return locationName || 'TBA';
    };

    const eventDate = epochToMomentTimeZone(event.start_date, summit.time_zone_id).format('ddd D');
    const eventStartTime = epochToMomentTimeZone(event.start_date, summit.time_zone_id).format('h:mma');
    const eventEndTime = epochToMomentTimeZone(event.end_date, summit.time_zone_id).format('h:mma');
    const locationName = getLocationName(event.location);
    const venueSearchLink = event.location ? event.location.link : `${summit.link}venues`;
    const trackSearchLink = event.track ? getSearchLink(event.track.name) : '#';
    const eventTypeSearchLink = event.type ? getSearchLink(event.type.name) : '#';
    const shouldShowVenues = (summit.start_showing_venues_date * 1000) < Date.now();

    return (
        <div className="event-content col-sm-10 col-xs-10">
            <div className="row row_location">
                <div className="col-sm-4 col-md-3 col-time">
                    <i className="fa fa-clock-o icon-clock" />
                    <span className="event-date">{eventDate}</span>
                    ,&nbsp;
                    <span className="start-time">{eventStartTime}</span>
                    &nbsp;-&nbsp;
                    <span className="end-time">{eventEndTime}</span>
                </div>
                <div className="col-sm-8 col-md-9 col-location">
                    {shouldShowVenues &&
                    <div>
                        <i className="fa fa-map-marker icon-map"></i>&nbsp;
                        <a onClick={e => e.stopPropagation()} href={venueSearchLink}
                        className="search-link venue-search-link">
                            {locationName}
                        </a>
                    </div>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-10">
                    <span className="event-title">{event.title}</span>
                    {event.attachment_url &&
                    <a onClick={e => e.stopPropagation()} href={event.attachment_url}
                    className="search-link attachment-link">
                        <i className="search-link fa fa-download" />
                    </a>
                    }
                    {event.to_record &&
                    <span className="record-icon">
                        <i className="fa fa-video-camera" />
                    </span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-xs-8 col-track">
                    {event.class_name !== 'SummitEvent' && event.track &&
                    <span className="track">
                        <a onClick={e => e.stopPropagation()} href={trackSearchLink}
                        className="search-link track-search-link" title="Search Track">
                            {event.track ? event.track.name : 'N/A'}
                        </a>
                    </span>
                    }
                </div>
                <div className="col-xs-4 event-type-col">
                    <a
                        onClick={e => e.stopPropagation()}
                        href={eventTypeSearchLink}
                        className="search-link event-type-search-link"
                        title="Search Event Type"
                    >
                        {event.type ? event.type.name : 'N/A'}
                    </a>
                </div>
            </div>
        </div>
    );
};

EventHeader.propTypes = {
    event: PropTypes.object.isRequired,
    summit: PropTypes.object.isRequired
};

export default EventHeader;
