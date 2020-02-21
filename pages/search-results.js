import React from 'react';
import PropTypes from 'prop-types';
import EventList from "../components/event-list";
import PageHeader from "../components/page-header";
import {connect} from "react-redux";
import {setSearch} from "../actions";
import "../styles/search-results.less";


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
        let {summit, loggedUser, events, filtered, searchTerm, setSearch, history} = this.props;

        return (
            <div className="search-results-page">
                <PageHeader
                    title="Schedule Results"
                    searchTerm={searchTerm}
                    history={history}
                    showGoBack={true}
                    showSearch={true}
                />
                <div className="event-list-wrapper">
                    <EventList
                        events={events}
                        filtered={filtered}
                        summit={summit}
                        loggedUser={loggedUser}
                    />
                    {events.length === 0 &&
                    <p className="no-results">No events found for that search criteria.</p>
                    }
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
