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

const SpeakerBox = ({
    speaker,
    type,
    history
}) => {


    const handleSpeakerLink = (speakerId, ev) => {
        ev.preventDefault();
        history.push(`/speakers/${speakerId}`);
    };

    const getFullName = () => {
        return `${speaker.first_name} ${speaker.last_name}`
    };

    return (
        <div className="row speaker_profile">
            <div className="col-sm-2 col-xs-12 speaker-photo-left">
                <a
                    className="profile-pic-wrapper"
                    href=""
                    onClick={handleSpeakerLink.bind(this, speaker.id)}
                    style={{backgroundImage: `url(${speaker.pic})`}}
                />
            </div>
            <div className="col-sm-10 col-xs-12 speaker_info">
                <div className="speaker_name">
                    <a href="" onClick={handleSpeakerLink.bind(this, speaker.id)}
                       title={getFullName()}> {getFullName()} </a>
                    {type && <span className="label label-info">{type}</span>}
                </div>
                <div className="speaker_job_title"> {speaker.title} </div>
                <div className="speaker_bio">
                    <RawHTML>{`${speaker.bio.substring(0, 400)}...`}</RawHTML>
                    <a href="" onClick={handleSpeakerLink.bind(this, speaker.id)}>
                        FULL PROFILE
                    </a>
                </div>
            </div>
        </div>
    )
}

SpeakerBox.propTypes = {
    speaker: PropTypes.object.isRequired,
};

export default SpeakerBox
