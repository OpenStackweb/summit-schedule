import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';
import {getEventSlug} from "../../tools/utils";

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
        let {event, loggedUser, onRsvp} = this.props;
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
