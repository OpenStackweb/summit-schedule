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
import { connect } from 'react-redux';
import {
    setFilters,
    clearFilters,
    toggleFilters,
    createCalendarShareableLink,
    deleteCalendarShareableLink
} from '../actions';

import EventFilters from './event-filters';
import ViewFilters from './view-filters';
import ShareableLinkModal from './shareable_link_modal';

const CALENDAR_NO_EVENTS_MSG = 'You must select at least one event!';


const RSVP_NOTE_TEXT = `Please note that adding an item to "My Schedule"
    does not guarantee a seat in the presentation. Rooms fill up fast,
    so get there early. Some events require an RSVP and, in those cases,
    you will see a link to RSVP to the event.`;

class Filters extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSyncModal: false,
            showShareLinkModal: false,
            shareableLink: null,
        }

        this.hideSyncModal = this.hideSyncModal.bind(this);
        this.getShareableLink = this.getShareableLink.bind(this);
        this.hideShareLinkModal = this.hideShareLinkModal.bind(this);
    }

    getShareableLink(e) {
        e.preventDefault();

        this.props.createCalendarShareableLink().then((payload) => {
            this.setState({ ...this.state,
                showShareLinkModal: true,
                shareableLink: payload.response.link
            });
        });

    }

    hideSyncModal(e) {
        this.setState({ ...this.state,
            showSyncModal: false
        });
    }

    hideShareLinkModal(e) {
        this.setState({
            ...this.state,
            showShareLinkModal: false
        });
    }

    render() {
        const {
            filters,
            showFilters,
            setFilters,
            clearFilters,
            toggleFilters,
            summit,
            loggedUser,
            base_url,
            calendarInstructionsUrl,
            history
        } = this.props;

        return (
            <div>
                <ViewFilters
                    history={history}
                    filters={filters}
                    showFilters={showFilters}
                    setFilters={setFilters}
                    toggleFilters={toggleFilters}
                    getShareableLink={this.getShareableLink}
                    summit={summit}
                    loggedUser={loggedUser}
               />

                {loggedUser &&
                <div className="rsvp-note">{RSVP_NOTE_TEXT}</div>
                }

                <EventFilters
                    summit={summit}
                    filters={filters}
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                    showFilters={showFilters}
                />

                <ShareableLinkModal
                    showModal={this.state.showShareLinkModal}
                    shareableLink={this.state.shareableLink}
                    hideModal={this.hideShareLinkModal}
                />
            </div>
        )
    }
}

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    setFilters,
    clearFilters,
    toggleFilters,
    createCalendarShareableLink,
    deleteCalendarShareableLink
})(Filters)
