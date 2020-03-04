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

import '../styles/speaker-mini-box.scss';

const SpeakerMiniBox = ({
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
        <div className="col-xs-4 col-md-4 speaker-mini-box">
            <div className="row">
                <div className="col-md-4">
                    <a href="" onClick={handleSpeakerLink.bind(this, speaker.id)}>
                        <img src={speaker.pic} className="img-circle big-profile-pic" alt={getFullName()} />
                    </a>
                </div>
                <div className="col-md-8 result-speaker-name-div">
                    <div className="row speaker-name-row">
                        <div className="col-md-12">
                            <a href="" onClick={handleSpeakerLink.bind(this, speaker.id)}>{getFullName()}</a>
                        </div>
                    </div>
                    <div className="row speaker-position-row">
                        <div className="col-md-12">{speaker.title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

SpeakerMiniBox.propTypes = {
    speaker: PropTypes.object.isRequired,
};

export default SpeakerMiniBox
