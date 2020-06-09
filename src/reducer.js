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

import moment from 'moment';
import Filter from './tools/filter';
import {getSummitDates} from './tools/utils';
import {epochToMomentTimeZone} from "openstack-uicore-foundation/lib/methods";

import {
    START_SCHED_LOADING,
    STOP_SCHED_LOADING,
    RECEIVE_USER_PROFILE,
    RECEIVE_SCHED_SUMMIT,
    RECEIVE_SPEAKERS,
    LOAD_SESSION,
    SET_VIEW,
    RECEIVE_SCHED_EVENTS,
    RECEIVE_ALL_EVENTS,
    RECEIVE_EVENT_DETAIL,
    RECEIVE_SPEAKER_DETAIL,
    SET_FILTERS,
    RESET_FILTERS,
    SET_SEARCH,
    ADDED_TO_SCHEDULE,
    REMOVED_FROM_SCHEDULE,
    ADDED_TO_FAVORITES,
    REMOVED_FROM_FAVORITES,
    SUBMITTED_NEW_COMMENT,
    TOGGLE_FILTERS,
    CALENDAR_SHARE_LINK_CREATED
} from './actions';

const DEFAULT_FILTERS = {
    going: false,
    favorites: false,
    recorded: false,
    calsync: false,
    tracks: [],
    trackgroups: [],
    eventtypes: [],
    tags: [],
    levels: [],
    room: null,
};

const DEFAULT_STATE = {
    summit: null,
    loggedUser: null,
    accessToken: null,
    apiBaseUrl: null,
    baseUrl: null,
    absoluteUrl: null,
    loginUrl: null,
    venuesUrl: null,
    view: { type: null, value: null },
    schedule_view_defaults: {day: null, track: null, level: null},
    showFilters: false,
    filters: DEFAULT_FILTERS,
    bulk: [],
    events: [],
    allEvents: [],
    filtered: [],
    speakerResults: [],
    scheduleLoading: 0,
    searchTerm: '',
    fullView: false,
    eventDetail: null,
    speakerDetail: null
};

const ScheduleReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case START_SCHED_LOADING: {
            let scheduleLoading = state.scheduleLoading + 1;
            return {...state, scheduleLoading};
        }
        break;
        case STOP_SCHED_LOADING: {
            let scheduleLoading = state.scheduleLoading < 2 ? 0 : (state.scheduleLoading - 1);
            return {...state, scheduleLoading};
        }
        break;
        case LOAD_SESSION:
            const { accessToken, apiBaseUrl, baseUrl, absoluteUrl, loginUrl, venuesUrl } = payload;
            return { ...state, accessToken, apiBaseUrl, baseUrl, absoluteUrl, loginUrl, venuesUrl };
        break;
        case RECEIVE_USER_PROFILE: {
            let loggedUser = {...payload.response};
            return {...state, loggedUser};
        }
        break;
        case RECEIVE_SCHED_SUMMIT: {
            let summit = {...payload.response};

            summit.dates = getSummitDates(summit);
            summit.presentation_levels = [
                {value: 'beginner', label: 'Beginner'},
                {value: 'intermediate', label: 'Intermediate'},
                {value: 'advanced', label: 'Advanced'},
            ];
            summit.month = epochToMomentTimeZone(summit.schedule_start_date, summit.time_zone_id).format('MMMM');

            const schedule_view_defaults = {};
            const schedule_start = summit.schedule_start_date ? epochToMomentTimeZone(summit.schedule_start_date, summit.time_zone_id).format('YYYY-M-D') : null;
            const summit_start = epochToMomentTimeZone(summit.start_date, summit.time_zone_id).format('YYYY-M-D');
            schedule_view_defaults.day = summit.schedule_start_date ? schedule_start : summit_start;
            schedule_view_defaults.track = summit.tracks[0].code;
            schedule_view_defaults.level = 'beginner';
            return {...state, summit, schedule_view_defaults};
        }
        break;
        case SET_VIEW: {
            let {type, value} = payload;
            return {...state, view: {type, value}, fullView: false, eventDetail: null, searchTerm: ''};
        }
        break;
        case SET_SEARCH: {
            let {searchTerm} = payload;
            return {...state, searchTerm, fullView: false, eventDetail: null};
        }
        break;
        case TOGGLE_FILTERS: {
            return {...state, showFilters: !state.showFilters}
        }
        break;
        case RESET_FILTERS: {
            return {...state, filters: DEFAULT_STATE.filters, filtered: [], showFilters: false};
        }
        break;
        case SET_FILTERS: {
            let {filters} = payload;
            let stateFilters = {...state.filters};
            let showFilters = false;

            Object.keys(filters).forEach(f => {
                if (stateFilters.hasOwnProperty(f)) {
                    stateFilters[f] = filters[f];
                    showFilters = true;
                }
            });

            if (filters.track_groups && filters.track_groups.length > 0) {
                let tracks = [];
                filters.track_groups.forEach(tg => {
                    let tracksTmp = state.summit.track_groups.find(tgg => tgg.name === tg.name).tracks;
                    tracks = tracks.concat(tracksTmp);
                });

                stateFilters.tracks = tracks;
            }

            // Get the new list of filtered events.
            var filtered = Filter.events(stateFilters, state.events, state.loggedUser);

            return {...state, filters: stateFilters, filtered, showFilters};
        }
        break;
        case RECEIVE_EVENT_DETAIL: {
            const event = payload.response;
            return {...state, eventDetail: event};
        }
        break;
        case RECEIVE_SPEAKER_DETAIL: {
            const speaker = payload.response;
            return {...state, speakerDetail: speaker};
        }
        break;
        case RECEIVE_SCHED_EVENTS: {
            const events = payload.response.data;

            // Get the new list of filtered events.
            var filtered = Filter.events(state.filters, events, state.loggedUser);

            return {...state, events, filtered};
        }
        break;
        case RECEIVE_SPEAKERS: {
            const speakers = payload.response.data;
            return {...state, speakerResults: speakers};
        }
        break;
        case RECEIVE_ALL_EVENTS: {
            const events = payload.response.data
                .map(ev => {
                    const start_time = epochToMomentTimeZone(ev.start_date, state.summit.time_zone_id).format('h:mm a');
                    const end_time = epochToMomentTimeZone(ev.end_date, state.summit.time_zone_id).format('h:mm a');
                    let location_nice = 'N/A';

                    if (ev.location) {
                        location_nice = ev.location.name;
                        if (ev.location.floor) {
                            location_nice = `${ev.location.floor.name} - ${location_nice}`;
                        }
                        if (ev.location.venue) {
                            location_nice = `${ev.location.venue.name} - ${location_nice}`;
                        }
                    }

                    return ({ ...ev, start_time, end_time, location_nice });
                });

            return {...state, allEvents: [...state.allEvents, ...events]};
        }
        break;
        case ADDED_TO_SCHEDULE: {
            const {event} = payload;
            let {schedule_summit_events} = state.loggedUser;
            schedule_summit_events.push(event);
            return {...state, loggedUser: {...state.loggedUser, schedule_summit_events}};
        }
        break;
        case REMOVED_FROM_SCHEDULE: {
            const {eventId} = payload;
            const schedule_summit_events = state.loggedUser.schedule_summit_events.filter( ev => ev.id !== eventId);
            return {...state, loggedUser: {...state.loggedUser, schedule_summit_events}};
        }
        break;
        case ADDED_TO_FAVORITES: {
            const {event} = payload;
            let {favorite_summit_events} = state.loggedUser;
            favorite_summit_events.push(event);
            return {...state, loggedUser: {...state.loggedUser, favorite_summit_events}};
        }
        break;
        case REMOVED_FROM_FAVORITES: {
            const {eventId} = payload;
            const favorite_summit_events = state.loggedUser.favorite_summit_events.filter( ev => ev.id !== eventId);
            return {...state, loggedUser: {...state.loggedUser, favorite_summit_events}};
        }
        break;
        case SUBMITTED_NEW_COMMENT: {
            const {note, rate} = payload;
            let {public_comments} = state.eventDetail;
            public_comments.push({note, rate, id: moment().unix(), date: moment().unix()});
            return {...state, eventDetail: {...state.eventDetail, public_comments}};
        }
        break;
    }

    return state
}

export default ScheduleReducer
