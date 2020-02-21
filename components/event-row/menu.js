import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import { MenuItem, Dropdown } from 'react-bootstrap';
import {FacebookShareButton, TwitterShareButton} from 'react-share';
import EventRSVPAction from "../event-actions/event-rsvp-action";
import EventWatchAction from "../event-actions/event-watch-action";
import EventScheduleAction from "../event-actions/event-schedule-action";


class EventMenu extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
    }

    toggle(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    render() {
        const { history, event, summit, baseUrl, loggedUser, unRsvpEvent, addEventToFavorites, removeEventFromFavorites, addEventToSchedule, removeEventFromSchedule } = this.props;
        const twitterText = event.social_summary ? event.social_summary : summit.schedule_twitter_text;

        return (
            <div onClick={this.toggle} className="event-actions-container col-sm-1 col-xs-1">
                <Dropdown title="actions" id="event-actions-menu">
                    <Dropdown.Toggle bsRole="toggle" noCaret className="event-actions-menu">
                        <span className="caret caret-event-actions" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-event-actions">
                        <EventRSVPAction event={event} history={history} loggedUser={loggedUser} type="menuitem" onUnRsvp={unRsvpEvent}/>
                        <EventWatchAction event={event} loggedUser={loggedUser} type="menuitem" onWatch={addEventToFavorites} onUnWatch={removeEventFromFavorites}/>
                        <EventScheduleAction event={event} loggedUser={loggedUser} type="menuitem" onSchedule={addEventToSchedule} onUnSchedule={removeEventFromSchedule}/>
                        <MenuItem>
                            <FacebookShareButton url={`${baseUrl}/#event=${event.id}`}>
                                <><i className="fa fa-facebook-official" />&nbsp;Share on Facebook</>
                            </FacebookShareButton>
                        </MenuItem>
                        <MenuItem>
                            <TwitterShareButton url={`${baseUrl}/#event=${event.id}`} text={twitterText}>
                                <><i className="fa fa-twitter-square" />&nbsp;Share on Twitter</>
                            </TwitterShareButton>
                        </MenuItem>
                        <li role="separator" className="divider" />
                        <MenuItem className="event-action"> Close </MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

EventMenu.propTypes = {
    event: PropTypes.object.isRequired,
    summit: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    addEventToSchedule: PropTypes.func.isRequired,
    addEventToFavorites: PropTypes.func.isRequired,
    unRsvpEvent: PropTypes.func.isRequired,
    removeEventFromSchedule: PropTypes.func.isRequired,
    removeEventFromFavorites: PropTypes.func.isRequired,
};

export default EventMenu
