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
import {connect} from "react-redux";
import NoMatchPage from './no-match-page';
import {RawHTML, RsvpForm} from 'openstack-uicore-foundation/lib/components';
import T from "i18n-react";
import {getEvent, rsvpEvent} from "../actions";

import "../styles/event-rsvp.scss";

class EventRsvpPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.goBack           = this.goBack.bind(this);
        this.handleRsvpSubmit = this.handleRsvpSubmit.bind(this);
    }

    componentDidMount() {
        const {getEvent, match} = this.props;
        getEvent(match.params.event_id);
    }

    goBack(ev) {
        ev.preventDefault();
        this.props.history.goBack();
    }

    handleRsvpSubmit(answers) {
        const {eventDetail, rsvpEvent, history} = this.props;
        rsvpEvent(eventDetail, answers, history);
    }

    render() {
        const {eventDetail: event, onRsvp, match} = this.props;

        if (!event || !match.params.event_id) return <NoMatchPage />;

        let sortedQuestions = [...event.rsvp_template.questions];
        sortedQuestions.sort(
            (a, b) => (a.order > b.order ? 1 : (a.order < b.order ? -1 : 0))
        );

        return (
            <div id="event-rsvp-page">
                <div className="row">
                    <div className="col-md-12 text-left">
                        <a href="#" onClick={this.goBack}>Go Back</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <div className="title">{event.title}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <RawHTML>{event.description}</RawHTML>
                    </div>
                </div>
                <hr/>

                <RsvpForm questions={sortedQuestions} onSubmit={this.handleRsvpSubmit} errors={[]} />

            </div>
        )
    }
}

EventRsvpPage.propTypes = {
    getEvent: PropTypes.func.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    getEvent,
    rsvpEvent
})(EventRsvpPage)
