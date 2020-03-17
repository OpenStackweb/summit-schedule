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

class EventScheduleAction extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleUnSchedule = this.handleUnSchedule.bind(this);
        this.handleSchedule = this.handleSchedule.bind(this);
    }

    handleUnSchedule(ev) {
        let {onUnSchedule, event} = this.props;
        ev.preventDefault();
        onUnSchedule(event);
    }

    handleSchedule(ev) {
        let {onSchedule, event, loggedUser, loginUrl} = this.props;
        ev.preventDefault();

        if (!loggedUser) {
            loginAlert(loginUrl);
        } else {
            onSchedule(event);
        }

    }

    render() {

        const { event, type, loggedUser } = this.props;
        const isScheduled = loggedUser && loggedUser.schedule_summit_events.find(f => f.id === event.id);
        const icon = !isScheduled ? 'fa-check-circle' : 'fa-times-circle';
        const title = !isScheduled ? 'Schedule' : 'UnSchedule';
        const action = !isScheduled ? this.handleSchedule : this.handleUnSchedule;

        if (event.has_rsvp && !event.rsvp_external) {
            return null;
        }

        if (type == 'button') {
            let className = isScheduled ? 'btn-action-pressed': 'btn-action-normal';
            return (
                <button
                    title={title}
                    type="button"
                    onClick={ action }
                    className={`btn btn-primary btn-md btn-action ${className}`}>
                    <i className={`fa ${icon}`} />&nbsp;{title}
                </button>
            );
        } else {
            return (
                <MenuItem className="event-action" onClick={action}>
                    <i className={`fa ${icon}`} />&nbsp;{title}
                </MenuItem>
            );
        }

    }


}

EventScheduleAction.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventScheduleAction;
