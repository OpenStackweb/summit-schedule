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
import T from "i18n-react";

import {epochToMomentTimeZone} from "openstack-uicore-foundation/lib/methods";
import NoMatchPage from './no-match-page';
import {RawHTML} from 'openstack-uicore-foundation/lib/components';
import CommentsSection from "../components/event-detail/comments-section";
import ActionButtons from "../components/event-detail/action-buttons";
import {getEvent, shareByEmail} from "../actions";
import {ShareButtons} from "../components/event-detail/share-buttons";
import PageHeader from "../components/page-header";
import EventMetaTags from "./meta-tags/event";
import SpeakerBox from "../components/speaker-box";

import "../styles/event-detail.scss";
import SpeakerMetaTags from "./meta-tags/speaker";

class EventDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };


        this.goBack       = this.goBack.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSpeakerLink = this.handleSpeakerLink.bind(this);
    }

    componentDidMount() {
        const {getEvent, match} = this.props;
        getEvent(match.params.event_id);
    }

    handleSpeakerLink(speaker, ev) {
        ev.preventDefault();
        this.props.history.push(`/speakers/${speaker.id}`);
    }

    goBack(ev) {
        ev.preventDefault();
        this.props.history.goBack();
    }

    handleSearch(term, ev) {
        ev.preventDefault();
        this.props.history.push(`/search/${term}`);
    }

    render() {
        const {eventDetail: event, summit, match, history, searchTerm, venuesUrl} = this.props;
        const shouldShowVenues = (summit.start_showing_venues_date * 1000) < Date.now();
        const timeZone = summit.time_zone_id;

        if (!event || !match.params.event_id) return <NoMatchPage />;

        let locationNice = 'N/A';
        const date = epochToMomentTimeZone(event.start_date, timeZone).format('dddd, MMMM D')
        const startTime = epochToMomentTimeZone(event.start_date, timeZone).format('h:mm a');
        const endTime = epochToMomentTimeZone(event.end_date, timeZone).format('h:mm a');
        const dateNice = `${date}, ${startTime} - ${endTime}`;
        const moderatorName = event.moderator ? `${event.moderator.first_name} ${event.moderator.last_name}` : '';

        if (event.location) {
            locationNice = event.location.name;
            if (event.location.floor) {
                locationNice = `${event.location.floor.name} - ${locationNice}`;
            }
            if (event.location.venue) {
                locationNice = `${event.location.venue.name} - ${locationNice}`;
            }
        }

        return (
            <div className="event-detail-page">
                <EventMetaTags event={event} summit={summit} />
                <PageHeader
                    title="Event Detail"
                    searchTerm={searchTerm}
                    history={history}
                    showGoBack={true}
                    showSearch={true}
                />
                <hr/>
                <div className="event-detail-body">
                    <div className="row">
                        <div className="col-md-12 col-xs-12">
                            <div className="title">{event.title}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-xs-12">
                            <div className="track">
                                <a href=""
                                   onClick={this.handleSearch.bind(this, event.track.name)}>{event.track.name}</a>
                            </div>
                            <RawHTML>{event.description}</RawHTML>
                            {event.attendees_expected_learnt &&
                            <>
                                <br/>
                                <div className="expected-learnt">
                                    <div>What can I expect to learn?</div>
                                    <RawHTML>{event.attendees_expected_learnt}</RawHTML>
                                </div>
                            </>
                            }
                        </div>
                        <div className="col-md-6 col-xs-12 info">
                            <div className="row info_item">
                                <div className="col-md-12">
                                    <ActionButtons history={history}/>
                                </div>
                            </div>

                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-clock-o icon-clock"/>
                                </div>
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    {dateNice}
                                </div>
                            </div>

                            {shouldShowVenues && event.location &&
                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-map-marker icon-map"/>
                                </div>
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    <a href={`${venuesUrl}/#room=${event.location.id}`}> {locationNice} </a>
                                </div>
                            </div>
                            }

                            {event.attachment &&
                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-download icon-attachment"/>
                                </div>
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    <a href={event.attachment.link} target="_blank"> Attachment </a>
                                </div>
                            </div>
                            }

                            {(event.links && event.links.length > 0) || (event.slides && event.slides.length > 0) &&
                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-2x fa-book icon-record"/>
                                </div>
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    {event.slides.length > 0 &&
                                    <>
                                        Slides:
                                        {event.slides.map(slide => (
                                            <>
                                                <a href={slide.link} target="_blank">{slide.name}</a> |
                                            </>
                                        ))}
                                        <br/>
                                    </>
                                    }
                                    {event.links.length > 0 &&
                                    <>
                                        Links:
                                        {event.links.map((link, i) => (
                                            <>
                                                <a href={link.link} target="_blank">Link {i}</a> |
                                            </>
                                        ))}
                                        <br/>
                                    </>
                                    }
                                </div>
                            </div>
                            }

                            {event.to_record && event.videos && event.videos.length > 0 &&
                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-2x fa-video-camera icon-record"/>
                                </div>
                                {event.videos.length > 0 &&
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    <a href={event.videos[0].link} target="_blank">View video</a>
                                </div>
                                }
                                {event.videos.length === 0 &&
                                <div className="col-md-10 col-xs-10 info_item_text">Will be recorded</div>
                                }
                            </div>
                            }

                            {event.level &&
                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-2x fa-signal icon-level"/>
                                </div>
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    Difficulty Level: {event.level}
                                </div>
                            </div>
                            }

                            {event.tags && event.tags.length > 0 &&
                            <div className="row info_item">
                                <div className="col-md-2 col-xs-2 info_item_icon">
                                    <i className="fa fa-tags"/>
                                </div>
                                <div className="col-md-10 col-xs-10 info_item_text">
                                    Tags:
                                    {event.tags.map(tag =>
                                        <a
                                            href=""
                                            key={`tag-${tag.id}`}
                                            onClick={this.handleSearch.bind(this, tag.tag)}
                                            className="event-tag"
                                        >
                                            {tag.tag}
                                        </a>
                                    )}
                                </div>
                            </div>
                            }

                            <div className="clearfix"/>

                            <div className="share">
                                <div id="share-buttons-container">
                                    <ShareButtons summit={summit} event={event} shareByEmail={this.props.shareByEmail}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {event.speakers && event.speakers.length > 0 &&
                    <div className="speaker_box">
                        {event.moderator &&
                            <SpeakerBox speaker={event.moderator} type="Moderator" history={history} />
                        }
                        {event.speakers.map(speaker =>
                            <SpeakerBox speaker={speaker} history={history} key={`speaker-${speaker.id}`} />
                        )}
                    </div>
                    }
                    <hr/>
                    <CommentsSection event={event}/>
                </div>
            </div>
        )
    }
}

EventDetailPage.propTypes = {
    getEvent: PropTypes.func.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    getEvent,
    shareByEmail
})(EventDetailPage)
