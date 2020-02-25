import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';

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

        Swal.fire({
            title: "Are you sure you want to delete this RSVP?",
            type:"warning",
            showCloseButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete RSVP"
        }).then(function () {
            onUnSchedule(event);
        });
    }

    handleSchedule(ev) {
        let {onSchedule, event, loggedUser} = this.props;
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
