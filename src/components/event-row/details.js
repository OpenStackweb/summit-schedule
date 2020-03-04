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
import {RawHTML} from "openstack-uicore-foundation/lib/components";
import {getEventSlug} from "../../tools/utils";

const EventDetails = ({
    event,
    history
}) => {

    const handleEventClick = (ev) => {
        ev.preventDefault();
        let eventSlug = getEventSlug(event);
        history.push(`/events/${event.id}/${eventSlug}`);
    };

    const handleSpeakerLink = (speaker, ev) => {
        ev.preventDefault();
        history.push(`/speakers/${speaker.id}`);
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-8">
                    <div className="bio-row">
                        <RawHTML>{event.description}</RawHTML>
                    </div>
                </div>
                <div className="col-sm-4">
                    {event.moderator &&
                        <div key={`moderator-${event.moderator.id}`} className="row speaker-row">
                            <div className="speaker-name-row">
                                <div className="col-sm-12">
                                    <div className="speaker-photo-left">
                                        <a href="" onClick={handleSpeakerLink.bind(this, event.moderator)} className="profile-pic-wrapper" style={{backgroundImage: `url(${event.moderator.pic})`}} />
                                    </div>
                                    <div className="speaker-name-right">
                                        <a href="" onClick={handleSpeakerLink.bind(this, event.moderator)}>{event.moderator.first_name} {event.moderator.last_name}</a>
                                        &nbsp;
                                        <span className="label label-info">Moderator</span>
                                        <div className="speaker-company">
                                            {event.moderator.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {event.speakers && event.speakers.filter(s => s.id).map(speaker =>
                        <div key={`speaker-${speaker.id}`} className="row speaker-row">
                            <div className="speaker-name-row">
                                <div className="col-sm-12">
                                    <div className="speaker-photo-left">
                                        <a href="" onClick={handleSpeakerLink.bind(this, speaker)} className="profile-pic-wrapper" style={{backgroundImage: `url(${speaker.pic})`}} />
                                    </div>
                                    <div className="speaker-name-right">
                                        <a href="" onClick={handleSpeakerLink.bind(this, speaker)}>{speaker.first_name} {speaker.last_name}</a>
                                        &nbsp;
                                        <div className="speaker-company">
                                            {speaker.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row space-row">
                        &nbsp;
                    </div>
                    {event.type && event.type.name === 'Presentation' &&
                    <div className="row level-row">
                        <div className="col-sm-12 col-level-content">
                            <i className="fa fa-signal level-icon" />
                            <span>Difficulty Level:</span>&nbsp;
                            <span className="presentation-level">
                                <a className="search-link" title="Search Presentation Level" href={`global-search?t=${event.level}`}>
                                    {event.level}
                                </a>
                            </span>
                        </div>
                    </div>
                    }
                    {event.tags.length > 0 &&
                    <div className="row tags-row">
                        <div className="col-sm-12 col-tags-content">
                            <div className="tags-label">
                                <i className="fa fa-tags"/>
                                <span>Tags:</span>
                            </div>
                            {event.tags.map(tag =>
                                <div key={`tag-${tag.id}`} title="Search Tag" className="tag">
                                    <a className="search-link" href={`global-search?t=${tag.tag}`}>{tag.tag}</a>
                                </div>
                            )}
                        </div>
                    </div>
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="event-btn">
                        <a
                            href=""
                            onClick={handleEventClick}
                            className="btn btn-primary btn-md btn-go-event" role="button"
                        >
                            EVENT DETAILS
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

EventDetails.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventDetails
