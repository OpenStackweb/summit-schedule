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
import {RawHTML} from 'openstack-uicore-foundation/lib/components';
import {getSpeaker} from "../actions";
import EventList from "../components/event-list";
import PageHeader from "../components/page-header";
import SpeakerMetaTags from "./meta-tags/speaker";

import "../styles/speaker-profile.scss";


class SpeakerProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.goBack       = this.goBack.bind(this);
    }

    componentDidMount() {
        const {getSpeaker, match} = this.props;
        getSpeaker(match.params.speaker_id);
    }

    goBack(ev) {
        ev.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const {history, speakerDetail: speaker, summit, loggedUser, searchTerm} = this.props;

        if (!speaker) return(<div/>);

        return (
            <div className="speaker-profile-page">
                <SpeakerMetaTags speaker={speaker} />
                <PageHeader
                    title="Speaker Details"
                    history={history}
                    searchTerm={searchTerm}
                    showGoBack={true}
                    showSearch={false}
                />
                <hr />
                <div className="row">
                    <div className="col-sm-2 col-xs-12 speaker-photo-left">
                        <div className="profile-pic-wrapper big-pic" style={{backgroundImage: `url(${speaker.pic})`}} />
                    </div>
                    <div className="col-sm-10 col-xs-12 speaker-info">
                        <div className="speaker_name row">{speaker.first_name} {speaker.last_name}</div>
                        <div className="speaker_job_title row"> {speaker.title}</div>
                    </div>
                </div>

                <div className="row section1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10">
                                <div className="row speaker_bio">
                                    <RawHTML>{speaker.bio}</RawHTML>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-2">
                                <div className="row social-row">
                                    <div className="col-md-2 col-xs-1 social_icon">
                                            <span className="info_item_icon">
                                                <i className="fa fa-2x fa-map-marker" />
                                            </span>
                                    </div>
                                    <div className="col-md-10 col-xs-10 social-item">
                                        <span className="info_item_text">{speaker.country}</span>
                                    </div>
                                </div>
                                {speaker.irc &&
                                <div className="row social-row">
                                    <div className="col-md-2 col-xs-1 social_icon">
                                        <span className="irc_icon">IRC</span>
                                    </div>
                                    <div className="col-md-10 col-xs-10 social-item">
                                        <span className="info_item_text">{speaker.irc}</span>
                                    </div>
                                </div>
                                }
                                {speaker.twitter &&
                                <div className="row social-row">
                                    <div className="col-md-2 col-xs-1 social_icon">
                                            <span className="info_item_icon">
                                                <i className="fa fa-2x fa-twitter" />
                                            </span>
                                    </div>
                                    <div className="col-md-10 col-xs-10 social-item">
                                            <span className="info_item_text">
                                                <a href={`https://twitter.com/${speaker.twitter}`} target="_blank">
                                                    @{speaker.twitter}
                                                </a>
                                            </span>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row sessions">
                    <div className="col-md-12 col-xs-12 sessions_title">
                        Sessions
                    </div>
                </div>
                <EventList
                    events={speaker.presentations.filter(p => p.summit_id === summit.id)}
                    filtered={[]}
                    summit={summit}
                    loggedUser={loggedUser}
                    history={history}
                />
            </div>
        );
    }
}

SpeakerProfilePage.propTypes = {
    getSpeaker: PropTypes.func.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    getSpeaker
})(SpeakerProfilePage)
