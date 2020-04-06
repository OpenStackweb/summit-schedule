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
import EventList from "../components/event-list";
import PageHeader from "../components/page-header";
import {connect} from "react-redux";
import {setSearch} from "../actions";
import SpeakerMiniBox from "../components/speaker-mini-box";
import SearchMetaTags from "./meta-tags/search";

import "../styles/search-results.scss";

class SearchResultsPage extends React.Component {

    componentDidMount() {
        let {match, setSearch} = this.props;
        setSearch(match.params.term);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.term !== this.props.match.params.term) {
            this.props.setSearch(this.props.match.params.term);
        }
    }

    render() {
        let {summit, loggedUser, events, speakerResults, filtered, searchTerm, history, absoluteUrl} = this.props;

        return (
            <div className="search-results-page">
                <SearchMetaTags summit={summit} searchTerm={searchTerm} absoluteUrl={absoluteUrl} />
                <PageHeader
                    title="Schedule Results"
                    searchTerm={searchTerm}
                    history={history}
                    showGoBack={true}
                    showSearch={true}
                />

                <h2 className="subtitle">Schedule Matches</h2>

                <div className="event-list-wrapper">
                    <EventList
                        events={events}
                        filtered={filtered}
                        summit={summit}
                        history={history}
                        loggedUser={loggedUser}
                    />
                    {events.length === 0 &&
                    <p className="no-results">No events found for that search criteria.</p>
                    }
                </div>

                <h2 className="subtitle">Speaker Matches</h2>

                <div className="speaker-list-wrapper">
                    <div className="container">
                        <div className="row">
                            {speakerResults && speakerResults.map(speaker =>
                                <SpeakerMiniBox speaker={speaker} history={history} key={`speaker-${speaker.id}`} />
                            )}
                            {speakerResults.length === 0 &&
                            <p className="no-results">No speakers found for that search criteria.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

SearchResultsPage.propTypes = {
    summit: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
};

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    setSearch
})(SearchResultsPage)
