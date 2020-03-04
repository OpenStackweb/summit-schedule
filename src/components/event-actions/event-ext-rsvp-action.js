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
import { MenuItem } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {loginAlert} from "../../tools/utils";

class EventExtRSVPAction extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleUnRsvp = this.handleUnRsvp.bind(this);
        this.handleRsvp = this.handleRsvp.bind(this);
        this.getRSVPText = this.getRSVPText.bind(this);
        this.getRSVPIcon = this.getRSVPIcon.bind(this);
    }

    handleUnRsvp(ev) {
        let {onUnRsvp, event} = this.props;
        ev.preventDefault();

        onUnRsvp(event);
    }

    handleRsvp(ev) {
        let {event, loggedUser, onRsvp, loginUrl} = this.props;
        ev.preventDefault();

        if (!loggedUser) {
            loginAlert(loginUrl);
        } else {
            onRsvp(event);
            window.open(event.rsvp_link, '_blank');
        }

    }

    render() {

        const { event, type } = this.props;
        let text = event.going ? 'UnSchedule': 'RSVP';
        let icon = event.going ? 'glyphicon-remove-sign': 'glyphicon-ok-circle';
        let className = '';
        const action = !event.going ? this.handleRsvpExt : this.handleUnRsvpExt;

        if (type === 'button') {
            className = event.going ? 'btn-action-pressed': 'btn-action-normal';
            return (
                <button
                    title={text}
                    type="button"
                    onClick={action}
                    className={`btn btn-primary btn-md active btn-action ${className}`} >
                    <span className={`glyphicon ${icon}`}/>&nbsp;<span className="content">{text}</span>
                </button>
            );
        } else {
            icon = !event.going ? 'fa-check-circle' : 'fa-times-circle';
            return (
                <MenuItem className={`event-action`} onClick={action}>
                    <i className={`fa ${icon}`} />&nbsp;{text}
                </MenuItem>
            );
        }


    }


}

EventExtRSVPAction.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventExtRSVPAction;
