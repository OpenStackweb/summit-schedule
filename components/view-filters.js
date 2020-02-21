import React from 'react';
import PropTypes from 'prop-types';

const ViewFilters = ({
    filters,
    showFilters,
    setFilters,
    toggleFilters,
    getShareableLink,
    summit,
    loggedUser,
    history
}) => {
    const { going, calsync, favorites } = filters;
    const shouldShowVenues = (summit.start_showing_venues_date * 1000) < Date.now();

    const handleFullView = () => {
        history.push('/full');
    };

    return (
    <div className="row all-events-filter-row">
        <div className="col-md-3 col-xs-12 all-events-filter-link">
            <div className="col-filter-btn">
                <i title="" id="toggle-all-events-filters" className={`fa fa-filter ${showFilters ? 'active' : ''}`}
                onClick={e => { e.preventDefault(); toggleFilters() }} />
            </div>
            <div className="col-filter-title">
                <span>Schedule&nbsp;Filters</span>
            </div>
        </div>
        <div className="col-md-7 col-xs-12">
            <div className="row">
                {loggedUser && !favorites &&
                <div className="col-md-3 col-xs-12 col-button">
                    <button type="button" className="btn btn-primary calendar_button switch_schedule"
                            onClick={() => setFilters({ going: !going })}>
                        <span className="glyphicon glyphicon-calendar"></span>
                        &nbsp;
                        <span className="content">
                                {going ? 'Full Schedule' : 'My Schedule' }
                            </span>
                    </button>
                </div>
                }
                {loggedUser && !going &&
                <div className="col-md-3 col-xs-12 col-button">
                    <button type="button" className="btn btn-primary calendar_button switch_favorites"
                            onClick={() => setFilters({ favorites: !favorites })}>
                        <span className="glyphicon glyphicon-bookmark"></span>
                        &nbsp;
                        <span className="content">
                                {favorites ? 'Full Schedule' : 'Watch Later'}
                            </span>
                    </button>
                </div>
                }
                <div className="col-md-3 col-xs-12 col-button">
                    <button onClick={handleFullView} className="btn btn-default view-all-schedule calendar_button">
                        Full&nbsp;/&nbsp;Print&nbsp;View
                    </button>
                </div>
                {shouldShowVenues && loggedUser &&
                <div className="col-md-3 col-xs-12 col-button">
                    <button onClick={getShareableLink} className="btn btn-default calendar_button">
                        Calendar&nbsp;Link
                    </button>
                </div>
                }
            </div>
        </div>
    </div>
)}

ViewFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    toggleFilters: PropTypes.func.isRequired,
    summit: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
}

export default ViewFilters
