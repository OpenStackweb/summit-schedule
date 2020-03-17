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
        if (term.trim()) {
            history.push(`/search/${term}`);
        } else {
            history.push(`/`);
        }
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
