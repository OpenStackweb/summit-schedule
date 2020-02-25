import React from 'react';
import PropTypes from 'prop-types';
import {FreeTextSearch} from "openstack-uicore-foundation/lib/components";

const PageHeader = ({
    title,
    searchTerm,
    showGoBack,
    history,
    showSearch
}) => {

    const goBack = (ev) => {
        ev.preventDefault();
        history.goBack();
    };

    const search = (term) => {
        history.push(`/search/${term}`);
    };

    return (
        <div className="row page-title">
            <div className="col-md-6">
                <h1>{title}</h1>
                {showGoBack &&
                <div>
                    <a href="#" onClick={goBack}>Go Back</a>
                </div>
                }
            </div>
            {showSearch &&
            <div className="col-md-6">
                <FreeTextSearch
                    value={searchTerm}
                    placeholder={"Search by Track, Event, Speaker, Company"}
                    onSearch={search}
                />
            </div>
            }
        </div>
    )
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

export default PageHeader
