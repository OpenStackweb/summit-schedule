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
import {getEventSlug} from "../../tools/utils";
import Swal from 'sweetalert2';

class EventRSVPAction extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleUnRsvp = this.handleUnRsvp.bind(this)
        this.handleRsvp = this.handleRsvp.bind(this)
        this.getRSVPText = this.getRSVPText.bind(this)
        this.getRSVPIcon = this.getRSVPIcon.bind(this)
    }

    handleUnRsvp(ev) {
        let {onUnRsvp, event} = this.props;
        ev.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this RSVP?",
            type:"warning",
            showCloseButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete RSVP"
        }).then(function () {
            onUnRsvp(event);
        });
    }

    handleRsvp(ev) {
        let {event, loggedUser, history} = this.props;
        ev.preventDefault();

        if (!loggedUser) {
            Swal.fire({
                title: 'Login Required',
                text: "You need to log in to proceed with this action.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Log in'
            });
        } else {
            let eventSlug = getEventSlug(event);
            history.push(`/events/${event.id}/${eventSlug}/rsvp`);
        }

    }

    getRSVPText(){
        const { event } = this.props;
        if(!event.going && event.rsvp_seat_type === 'FULL') return 'RSVP FULL';
        if(!event.going && event.rsvp_seat_type === 'Regular') return 'RSVP';
        if(!event.going && event.rsvp_seat_type === 'WaitList') return 'RSVP (waitlist)';
        return (event.going) ? 'Delete RSVP' : 'RSVP';
    }

    getRSVPIcon(){
        const { event } = this.props;
        if(!event.going && event.rsvp_seat_type === 'FULL' ) return 'glyphicon-warning-sign';
        if(event.going) return 'glyphicon-remove-sign';
        // default (not going)
        return 'glyphicon-ok-circle';
    }

    render() {

        const { event, type } = this.props;
        let text = '';
        let icon = '';
        let className = '';
        const hasRsvp = event.rsvp_link || event.rsvp_template_id;
        const action = !event.going ? this.handleRsvp : this.handleUnRsvp;

        if (!hasRsvp || (!event.going && event.rsvp_external)) {
            return null;
        }

        if (type == 'button') {
            className = event.going ? 'btn-action-pressed': 'btn-action-normal';
            icon = this.getRSVPIcon();
            text = this.getRSVPText();
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
            className = (!event.going && event.rsvp_seat_type === 'FULL') ? 'disabled' : '';
            icon = !event.going ? 'fa-check-circle' : 'fa-times-circle';
            text = !event.going ? 'RSVP' : 'unRSVP';
            return (
                <MenuItem className={`event-action ${className}`} onClick={action}>
                    <i className={`fa ${icon}`} />&nbsp;{text}
                </MenuItem>
            );
        }


    }


}

EventRSVPAction.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventRSVPAction;
