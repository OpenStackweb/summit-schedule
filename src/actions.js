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

import {
    getRequest,
    createAction,
    deleteRequest,
    postRequest,
    authErrorHandler,
    showMessage,
    showSuccessMessage,
} from "openstack-uicore-foundation/lib/methods";

import { getUrlParam, getUrlParams, setUrlParam, setUrlParams, clearUrlParams, getEventSlug } from "./tools/utils";

import moment from 'moment-timezone';

export const START_SCHED_LOADING            = 'START_SCHED_LOADING';
export const STOP_SCHED_LOADING             = 'STOP_SCHED_LOADING';
export const LOAD_SESSION                   = 'LOAD_SESSION';
export const REQUEST_USER_PROFILE           = 'REQUEST_USER_PROFILE';
export const RECEIVE_USER_PROFILE           = 'RECEIVE_USER_PROFILE';
export const REQUEST_SCHED_SUMMIT           = 'REQUEST_SCHED_SUMMIT';
export const RECEIVE_SCHED_SUMMIT           = 'RECEIVE_SCHED_SUMMIT';
export const REQUEST_SCHED_EVENTS           = 'REQUEST_SCHED_EVENTS';
export const RECEIVE_SCHED_EVENTS           = 'RECEIVE_SCHED_EVENTS';
export const REQUEST_ALL_EVENTS             = 'REQUEST_ALL_EVENTS';
export const RECEIVE_ALL_EVENTS             = 'RECEIVE_ALL_EVENTS';
export const REQUEST_SPEAKERS               = 'REQUEST_SPEAKERS';
export const RECEIVE_SPEAKERS               = 'RECEIVE_SPEAKERS';
export const RECEIVE_EVENT_DETAIL           = 'RECEIVE_EVENT_DETAIL';
export const RECEIVE_SPEAKER_DETAIL         = 'RECEIVE_SPEAKER_DETAIL';
export const SET_VIEW                       = 'SET_VIEW';
export const TOGGLE_FILTERS                 = 'TOGGLE_FILTERS';
export const RESET_FILTERS                  = 'RESET_FILTERS';
export const SET_FILTERS                    = 'SET_FILTERS';
export const SET_SEARCH                     = 'SET_SEARCH';
export const ADDED_TO_SCHEDULE              = 'ADDED_TO_SCHEDULE';
export const REMOVED_FROM_SCHEDULE          = 'REMOVED_FROM_SCHEDULE';
export const ADDED_TO_FAVORITES             = 'ADDED_TO_FAVORITES';
export const REMOVED_FROM_FAVORITES         = 'REMOVED_FROM_FAVORITES';
export const RSVP_SCHED_EVENT               = 'RSVP_SCHED_EVENT';
export const UN_RSVP_SCHED_EVENT            = 'UN_RSVP_SCHED_EVENT';
export const SUBMITTED_NEW_COMMENT          = 'SUBMITTED_NEW_COMMENT';
export const SHARE_EVENT_EMAIL              = 'SHARE_EVENT_EMAIL';
export const CALENDAR_SHARE_LINK_CREATED    = 'CALENDAR_SHARE_LINK_CREATED';


const startSchedLoading = () => (dispatch) => {
    dispatch(createAction(START_SCHED_LOADING)({}));
};

const stopSchedLoading = () => (dispatch) => {
    dispatch(createAction(STOP_SCHED_LOADING)({}));
};


export const loadSession = (accessToken, apiBaseUrl, baseUrl, absoluteUrl, loginUrl) => (dispatch) => {
    dispatch(createAction(LOAD_SESSION)({ accessToken, apiBaseUrl, baseUrl, absoluteUrl, loginUrl }));
};

export const getUserProfile = (summitId) => (dispatch, getState) => {
    let { accessToken, apiBaseUrl } = getState();
    if (!accessToken) return;

    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
        expand: 'favorite_summit_events, feedback, schedule_summit_events, rsvp, rsvp.answers'
    };

    return getRequest(
        createAction(REQUEST_USER_PROFILE),
        createAction(RECEIVE_USER_PROFILE),
        `${apiBaseUrl}/api/v1/summits/${summitId}/members/me`,
        defaultErrorHandler
    )(params)(dispatch)
        .then(() => dispatch(stopSchedLoading()));
};

export const getSummitById = (summitId) => (dispatch, getState) => {
    let { accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        expand: 'event_types, tracks, track_groups, presentation_levels, locations.rooms, locations.floors'
    };

    return getRequest(
        createAction(REQUEST_SCHED_SUMMIT),
        createAction(RECEIVE_SCHED_SUMMIT),
        `${apiBaseUrl}/api/public/v1/summits/${summitId}`,
        defaultErrorHandler
    )(params)(dispatch)
        .then(() => dispatch(getUserProfile(summitId)))
        .then(() => dispatch(stopSchedLoading()));
};

export const loadView = () => (dispatch, getState) => {
    let urlParams = getUrlParams();

    if (urlParams.hasOwnProperty('track')) {
        dispatch(setView('track', urlParams.track));
    } else if (urlParams.hasOwnProperty('day')) {
        dispatch(setView('day', urlParams.day));
    } else if (urlParams.hasOwnProperty('level')) {
        dispatch(setView('level', urlParams.level));
    } else {
        dispatch(setDefaultView());
    }
};

export const loadFilters = () => (dispatch, getState) => {
    const {loggedUser} = getState;
    let filters = getUrlParams();

    if (loggedUser && loggedUser.cal_sync) {
        filters.calsync = true;
    }

    dispatch(setFilters(filters));
};


/*********************************************************************************/
/*                               VIEWS                                           */
/*********************************************************************************/

const setDefaultView = () => (dispatch, getState) => {
    let { summit, schedule_view_defaults } = getState();
    let filterDay = getUrlParam('day');
    if(filterDay == null ) filterDay = moment().format('YYYY-M-D');

    if (!summit.dates.find(d => d.label === filterDay)) {
        filterDay = schedule_view_defaults.day;
    }
    dispatch(setView('day', filterDay));
};

export const setView = (type, value) => (dispatch) => {
    //clearUrlParams(['day', 'track', 'level']);
    setUrlParam(type, value, ['day', 'track', 'level']);
    dispatch(createAction(SET_VIEW)({ type, value }));
};

export const changeView = (type, value) => (dispatch, getState) => {
    const { schedule_view_defaults } = getState();
    value = value || schedule_view_defaults[type];
    dispatch(setView(type, value ));
    dispatch(getEvents());
};


/*********************************************************************************/
/*                               FILTERS                                         */
/*********************************************************************************/

export const setFilters = (filters) => (dispatch) => {
    setUrlParams(filters);
    dispatch(createAction(SET_FILTERS)({ filters }));
};

export const clearFilters = () => (dispatch, getState) => {
    const { summit, loggedUser, filters } = getState();
    //let cal_sync = (loggedUser) ? loggedUser.cal_sync : false;

    dispatch(createAction(RESET_FILTERS)({}));
    clearUrlParams(Object.keys(filters));
};

export const toggleFilters = () => {
    return { type: TOGGLE_FILTERS }
};

export const setSearch = (searchTerm) => (dispatch, getState) => {
    dispatch(createAction(SET_SEARCH)({ searchTerm }));
    dispatch(getEvents());
    dispatch(getSpeakers());
};

export const createCalendarShareableLink = () => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();

    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return postRequest(
        null,
        createAction(CALENDAR_SHARE_LINK_CREATED),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/schedule/shareable-link`,
        null,
        defaultErrorHandler,
    )(params)(dispatch).then((payload) => {
            dispatch(stopSchedLoading());
            return payload;
        }
    );
};

export const deleteCalendarShareableLink = () => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();

    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return deleteRequest(
        null,
        createAction(CALENDAR_SHARE_LINK_DELETED),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/schedule/shareable-link`,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};


/*********************************************************************************/
/*                               EVENTS                                          */
/*********************************************************************************/


export const getEvents = () => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl, view, searchTerm } = getState();
    let filter = [];
    dispatch(startSchedLoading());

    if (searchTerm) {
        filter= [`title=@${searchTerm},abstract=@${searchTerm},tags=@${searchTerm},speaker=@${searchTerm}`];
    } else {
        switch (view.type) {
            case 'day':
                let date = summit.dates.find(d => d.string === view.value).date;
                let startDate = ( date.clone().hours(0).minutes(0).seconds(0).valueOf()) / 1000;
                let endDate = ( date.clone().hours(23).minutes(59).seconds(59).valueOf()) /1000;
                filter = [`start_date>=${startDate}`, `end_date<=${endDate}`];
                break;
            case 'track':
                const track = summit.tracks.find(t => t.code && t.code.toLowerCase() === view.value.toLowerCase());
                if (track) filter = [`track_id==${track.id}`];
                break;
            case 'level':
                filter = [`level==${view.value}`];
                break;
        }
    }

    let params = {
        expand       : 'speakers, moderator, type, track, location, location.venue, location.floor',
        page         : 1,
        per_page     : 100,
        'filter[]'   : filter,
        order        : '+start_date'
    };

    return getRequest(
        createAction(REQUEST_SCHED_EVENTS),
        createAction(RECEIVE_SCHED_EVENTS),
        `${apiBaseUrl}/api/public/v1/summits/${summit.id}/events/published`,
        defaultErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};

export const getAllEvents = () => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();

    let params = {
        expand       : 'type, track, location, location.venue, location.floor',
        page         : 1,
        per_page     : 100,
        order        : '+start_date'
    };

    dispatch(startSchedLoading());

    getRequest(
        createAction(REQUEST_ALL_EVENTS),
        createAction(RECEIVE_ALL_EVENTS),
        `${apiBaseUrl}/api/public/v1/summits/${summit.id}/events/published`,
        defaultErrorHandler
    )(params)(dispatch).then((payload) => {
        const {last_page} = payload.response;

        while(params.page < last_page) {
            params.page = params.page + 1;

            getRequest(
                createAction(REQUEST_ALL_EVENTS),
                createAction(RECEIVE_ALL_EVENTS),
                `${apiBaseUrl}/api/public/v1/summits/${summit.id}/events/published`,
                defaultErrorHandler
            )(params)(dispatch)
        }

    }).then(() => { dispatch(stopSchedLoading()) });

};

export const getEvent = (eventId) => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();

    if (!summit.id) return;

    let params = {
        expand       : 'rsvp_template, type, track, location, location.venue, location.floor, speakers, moderator, sponsors, groups, feedback',
    };

    dispatch(startSchedLoading());

    return getRequest(
        null,
        createAction(RECEIVE_EVENT_DETAIL),
        `${apiBaseUrl}/api/public/v1/summits/${summit.id}/events/${eventId}/published`,
        eventErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};

/*********************************************************************************/
/*                               SPEAKERS                                        */
/*********************************************************************************/


export const getSpeakers = () => (dispatch, getState) => {
    let { summit, apiBaseUrl, searchTerm } = getState();
    let filter = [];
    dispatch(startSchedLoading());

    if (searchTerm) {
        filter= [`first_name=@${searchTerm},last_name=@${searchTerm}`];
    }

    let params = {
        expand       : 'member, presentations, presentation.type',
        page         : 1,
        per_page     : 100,
        'filter[]'   : filter,
        order        : '+last_name'
    };

    return getRequest(
        createAction(REQUEST_SPEAKERS),
        createAction(RECEIVE_SPEAKERS),
        `${apiBaseUrl}/api/public/v1/summits/${summit.id}/speakers`,
        defaultErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};


export const getSpeaker = (speakerId) => (dispatch, getState) => {
    let { apiBaseUrl, summit } = getState();
    dispatch(startSchedLoading());

    let params = {
        expand: 'member, presentations, presentation.type'
    };

    return getRequest(
        null,
        createAction(RECEIVE_SPEAKER_DETAIL),
        `${apiBaseUrl}/api/public/v1/summits/${summit.id}/speakers/${speakerId}`,
        defaultErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};


/*********************************************************************************/
/*                               USER ACTIONS                                    */
/*********************************************************************************/


export const addEventToSchedule = (event) => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return postRequest(
        null,
        createAction(ADDED_TO_SCHEDULE)({event}),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/schedule/${event.id}`,
        null,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );


    /*.then(
        () => {
            console.log(`calling then action for ${event.id}`);
            if (event.has_rsvp && event.rsvp_external){
                const url = new URI(event.rsvp_link);
                url.addQuery('BackURL', window.location);
                window.location = url.toString();
            }
        }
    );*/
};

export const removeEventFromSchedule = (event) => (dispatch, getState) =>  {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return deleteRequest(
        null,
        createAction(REMOVED_FROM_SCHEDULE)({eventId: event.id}),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/schedule/${event.id}`,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};

export const addEventToFavorites = (event) => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return postRequest(
        null,
        createAction(ADDED_TO_FAVORITES)({event}),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/favorites/${event.id}`,
        null,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};

export const removeEventFromFavorites = event => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return deleteRequest(
        null,
        createAction(REMOVED_FROM_FAVORITES)({eventId: event.id}),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/favorites/${event.id}`,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};

export const rsvpEvent = (event, answers, history) => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    let normalizedAnswers = normalizeRsvpAnswers(answers);

    return postRequest(
        null,
        createAction(RSVP_SCHED_EVENT)({event}),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/schedule/${event.id}/rsvp`,
        {answers: normalizedAnswers},
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
        dispatch(stopSchedLoading());
        dispatch(showMessage( "RSVP Successful !", () => {
            let eventSlug = getEventSlug(event);
            history.push(`/events/${event.id}/${eventSlug}`);
        }));
    });
};

export const unRsvpEvent = event => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return deleteRequest(
        null,
        createAction(UN_RSVP_SCHED_EVENT)({eventId: event.id}),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/members/me/schedule/${event.id}/rsvp`,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
            dispatch(stopSchedLoading());
        }
    );
};

export const postNewComment = (comment) => (dispatch, getState) =>  {
    let { summit, accessToken, apiBaseUrl, eventDetail } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    return postRequest(
        null,
        createAction(SUBMITTED_NEW_COMMENT)(comment),
        `${apiBaseUrl}/api/v2/summits/${summit.id}/events/${eventDetail.id}/feedback`,
        comment,
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
        dispatch(stopSchedLoading());
    });
}

const normalizeRsvpAnswers = (answers) => {
    let normalizedAnswers = answers.filter(a => a.value);
    return normalizedAnswers;
};


export const shareByEmail = (event, fromEmail, toEmail) => (dispatch, getState) => {
    let { summit, accessToken, apiBaseUrl } = getState();
    dispatch(startSchedLoading());

    let params = {
        access_token : accessToken,
    };

    postRequest(
        null,
        createAction(SHARE_EVENT_EMAIL),
        `${apiBaseUrl}/api/v1/summits/${summit.id}/events/${event.id}/published/mail`,
        {from: fromEmail, to: toEmail, event_uri: window.location.href},
        defaultErrorHandler,
    )(params)(dispatch).then(() => {
        dispatch(stopSchedLoading());
        dispatch(showSuccessMessage("Email sent !"));
    });
};

/*********************************************************************************/
/*                               ERROR HANDLERS                                  */
/*********************************************************************************/


const defaultErrorHandler = (err, res) => (dispatch, state) => {
    let code = err.status;
    let msg = '';

    dispatch(stopSchedLoading());
    //dispatch(authErrorHandler(err, res));
};

const eventErrorHandler = (err, res) => (dispatch, state) => {
    let code = err.status;
    let msg = '';

    dispatch(stopSchedLoading());

    if (code === 404) {
        let error_message = {
            title: 'ERROR',
            html: "Event not found, please check eventId",
            type: 'error'
        };

        dispatch(showMessage( error_message, () => dispatch(setDefaultView())));
    } else {
        //dispatch(authErrorHandler(err, res));
    }
};

