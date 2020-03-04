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
import {Dropdown} from "openstack-uicore-foundation/lib/components";

class GroupingSelect extends Component {

    constructor(props) {
        super(props)
        this.changeView = this.changeView.bind(this)
    }

    changeView(ev, type, value) {
        if (ev) ev.preventDefault();
        this.props.changeView(type, value);
    }

    renderDays() {
        const { view, summit } = this.props;

        return (
            <nav className="navbar navbar-default navbar-days">
                <div>
                    <div className="navbar-header">
                        <button id="schedule-navbar-button" type="button" aria-expanded="false" data-toggle="collapse"
                                className="navbar-toggle collapsed" data-target="#day-navbar-colapse">
                            <span className="sr-only">
                                Toggle navigation
                            </span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="#" onClick={e => e.preventDefault()}
                           className="navbar-brand navbar-brand-month">
                            {summit.month}
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="day-navbar-colapse">
                        <ul className="nav navbar-nav">
                            {summit.dates.map(date =>
                                <li key={date.string} className={date.string === view.value ? 'active day-selected' : ''}>
                                    <a onClick={e => this.changeView(e, view.type, date.string)} href="#" className="day-label">
                                        {date.label}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    renderTracks() {
        const { view, summit } = this.props;
        let tracks_ddl = summit.tracks.filter(tr => tr.code).map(tr => ({value: tr.code.toLowerCase(), label: tr.name}));
        let trackValue = tracks_ddl.find(tr => tr.value === view.value);

        return (
            <div className="track-nav-container">
                <Dropdown
                    id="track"
                    value={trackValue}
                    onChange={e => this.props.changeView(view.type, e.target.value)}
                    options={tracks_ddl}
                />
            </div>
        );
    }

    renderLevels() {
        const { view, summit } = this.props;

        return (
            <nav className="navbar navbar-default navbar-days">
                <div>
                    <div className="navbar-header">
                        <button id="schedule-navbar-button" type="button" aria-expanded="false" data-toggle="collapse"
                                className="navbar-toggle collapsed" data-target="#level-navbar-colapse">
                            <span className="sr-only">
                            Toggle navigation
                            </span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="#" onClick={e => e.preventDefault()}
                           className="navbar-brand navbar-brand-month">
                            Levels
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="level-navbar-colapse">
                        <ul className="nav navbar-nav">
                            {summit.presentation_levels.map(level =>
                                <li key={`${level.value}-level`} className={level.value === view.value ? 'active level-selected' : ''}>
                                    <a onClick={e => this.changeView(e, view.type, level.value)} href="#" className="level-label">
                                        {level.label}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    render() {
        const { view } = this.props;

        if (!view || !view.type) return (<div />);

        return (
            <div className="row view-navbar">
                <div className="col-lg-3 col-md-2 col-sm-1 view-select-container">
                    <span className="view-filter-label">Filter</span>
                    <select className="view-select" value={view.type} onChange={e => this.changeView(e, e.target.value)}>
                        <option value="day">Day</option>
                        <option value="track">Track</option>
                        <option value="level">Level</option>
                    </select>
                </div>
                <div className="col-lg-9 col-md-10 col-sm-11 view-days-container">
                {view.type === 'day'   && this.renderDays()}
                {view.type === 'track' && this.renderTracks()}
                {view.type === 'level' && this.renderLevels()}
                </div>
            </div>
        );
    }

}

GroupingSelect.propTypes = {
    view: PropTypes.object.isRequired,
    changeView: PropTypes.func.isRequired,
    summit: PropTypes.object.isRequired
};

export default GroupingSelect
