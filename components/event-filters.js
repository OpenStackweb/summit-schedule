import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from "i18n-react";
import {Dropdown} from "openstack-uicore-foundation/lib/components";

class EventFilters extends Component {

    componentDidMount() {
        const { setFilters } = this.props

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange(ev) {
        let value = ev.target.value;
        if (ev.target.type == 'checkbox') {
            value = ev.target.checked;
        }
        this.props.setFilters({[ev.target.id]: value});
    };

    render() {
        const { summit, filters, showFilters, clearFilters } = this.props;
        const { trackgroups, tracks, eventtypes, levels, tags, room, recorded } = filters;
        const shouldShowVenues = (summit.start_showing_venues_date * 1000) < Date.now();

        let rooms_ddl = [];
        summit.locations.filter(v => (v.class_name == 'SummitVenue')).forEach(venue => {
            let floorOpts = venue.floors.map(f => {
                let rooms = f.rooms ? venue.rooms.filter(room => f.rooms.includes(room.id)) : [];
                let options = rooms.map(r => ({label: r.name, value: r.id}));
                return {label: f.name, value: f.id, options: options};
            });
            rooms_ddl = [...rooms_ddl, ...floorOpts];
        });

        let tracks_groups_ddl = summit.track_groups.map(tg => ({value: tg.id, label: tg.name}));
        let tracks_ddl = summit.tracks.map(tr => ({value: tr.id, label: tr.name}));
        let event_types_ddl = summit.event_types.map(et => ({value: et.id, label: et.name}));

        return (
        <div className="all-events-filter-wrapper" className={`${showFilters ? '' : 'hide'}`}>
            <div className="row">
                <div className="col-sm-12">
                    <a href={summit.track_list_link} target="_blank">
                        Learn more about the {summit.title} Summit Categories and Tracks.
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-xs-12 single-filter-wrapper">
                    <label className="filter-label">Summit Categories</label>
                    <Dropdown
                        id="trackgroups"
                        isMulti={true}
                        value={trackgroups || []}
                        onChange={this.handleFilterChange}
                        placeholder="All Categories"
                        options={tracks_groups_ddl}
                    />
                </div>
                <div className="col-sm-4 col-xs-12 single-filter-wrapper">
                    <label className="filter-label">Tracks</label>
                    <Dropdown
                        id="tracks"
                        isMulti={true}
                        value={tracks || []}
                        onChange={this.handleFilterChange}
                        placeholder="All Tracks"
                        options={tracks_ddl}
                    />
                </div>
                <div className="col-sm-4 col-xs-12 single-filter-wrapper">
                    <label className="filter-label">Presentation Level</label>
                    <Dropdown
                        id="levels"
                        isMulti={true}
                        value={levels || []}
                        onChange={this.handleFilterChange}
                        placeholder="All Levels"
                        options={summit.presentation_levels}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-xs-12 single-filter-wrapper">
                    <label className="filter-label">Tags</label>
                    <Dropdown
                        id="tags"
                        value={tags || []}
                        onChange={this.handleFilterChange}
                        placeholder="All Tags"
                        options={[]}
                    />
                </div>
                {shouldShowVenues &&
                <div className="col-sm-4 col-xs-12 single-filter-wrapper">
                    <label className="filter-label">Room</label>
                    <Dropdown
                        id="room"
                        value={room || ''}
                        options={rooms_ddl}
                        placeholder="All Rooms"
                        onChange={this.handleFilterChange}
                        clearable
                    />
                </div>
                }
                <div className="col-sm-4 col-xs-12 single-filter-wrapper">
                    <div className="form-check abc-checkbox">
                        <input className="form-check-input" id="recorded" type="checkbox" checked={recorded} onChange={this.handleFilterChange} />
                        <label className="form-check-label" htmlFor="recorded">Show only recorded sessions</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-xs-12 single-filter-wrapper text-right">
                    <button className="btn btn-default" onClick={clearFilters} style={{display: 'initial'}}>
                        CLEAR&nbsp;FILTERS
                    </button>
                </div>
            </div>
            {/*<div className="col-sm-4 col-xs-12 single-filter-wrapper hide">
                    <label className="filter-label">Event Types</label>
                    <Dropdown
                        id="eventtypes"
                        isMulti={true}
                        value={eventtypes || []}
                        onChange={this.handleFilterChange}
                        placeholder="All Types"
                        options={event_types_ddl}
                    />
                </div>*/}
        </div>
    )}
}

EventFilters.propTypes = {
    summit: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
};

export default EventFilters
