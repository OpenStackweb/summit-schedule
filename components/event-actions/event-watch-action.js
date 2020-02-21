import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';

class EventWatchAction extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleUnWatch = this.handleUnWatch.bind(this)
        this.handleWatch = this.handleWatch.bind(this)
    }

    handleUnWatch(ev) {
        let {onUnWatch, event} = this.props;
        ev.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this RSVP?",
            type:"warning",
            showCloseButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete RSVP"
        }).then(function () {
            onUnWatch(event);
        });
    }

    handleWatch(ev) {
        let {onWatch, event, loggedUser} = this.props;
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
            onWatch(event);
        }

    }

    render() {

        const { event, type, loggedUser } = this.props;
        const isFavorite = loggedUser && loggedUser.favorite_summit_events.find(f => f.id === event.id);
        const icon = !isFavorite ? 'fa-bookmark' : 'fa-bookmark-o';
        let className = '';
        const title = !isFavorite ? 'Watch Later' : 'Do not Watch Later';
        const action = !isFavorite ? this.handleWatch : this.handleUnWatch;

        if (!event.to_record) {
            return null;
        }

        if (type === 'button') {
            className = isFavorite ? 'btn-action-pressed': 'btn-action-normal';
            return (
                <button
                    title={title}
                    type="button"
                    onClick={action}
                    className={`btn btn-primary btn-md btn-action ${className}`}>
                    <span>
                        <i className={`fa ${icon}`} aria-hidden="true"/>
                    </span>
                    &nbsp;
                    <span className="content">{title}</span>
                </button>
            );
        } else {
            return (
                <MenuItem className={`event-action ${className}`} onClick={action}>
                    <i className={`fa ${icon}`} />&nbsp;{title}
                </MenuItem>
            );
        }


    }


}

EventWatchAction.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventWatchAction;
