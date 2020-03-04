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

import { epochToMomentTimeZone, epochToMoment } from "openstack-uicore-foundation/lib/methods";
import { FragmentParser } from "openstack-uicore-foundation/lib/components";
import Swal from "sweetalert2";

const fragmentParser = new FragmentParser();

export const getSummitDates = (summit) => {
    let {start_date, end_date, time_zone_id} = summit;
    let startDate = epochToMomentTimeZone(start_date, time_zone_id);
    let endDate = epochToMomentTimeZone(end_date, time_zone_id);
    let dates = [];

    // Add all additional days
    while(startDate.diff(endDate) < 0) {
        dates.push({
            string: startDate.clone().format('YYYY-MM-D'),
            label: startDate.clone().format('dddd Do'),
            date: startDate.clone(),
            has_events: true,
            selected: false,
            is_weekday: true
        });

        startDate.add(1, 'days');
    }
    return dates
};

// Helper functions.
export const getUrlParam = param => {
    return fragmentParser.getParam(param);
};

export const setUrlParam = (name, value) => {
    fragmentParser.setParam(name, value);
    window.location.hash = fragmentParser.serialize();
};

export const getUrlParams = () => {
    return fragmentParser.getParams();
};

export const setUrlParams = (params, exclude = []) => {
    Object.keys(params).forEach(param => {
        if (exclude.indexOf(param) < 0) {
            fragmentParser.setParam(param, params[param]);
        }
    });

    window.location.hash = fragmentParser.serialize();
};

export const clearUrlParams = (params = null) => {
    if (!params) {
        fragmentParser.clearParams();
        window.location.hash = '';
    } else {
        fragmentParser.deleteParams(params);
        window.location.hash = fragmentParser.serialize();
    }
};

export const getEventSlug = (event) => {
    return event.title.replace(/[^A-Z0-9]+/ig, "_");
};

export const loginAlert = (loginUrl) => {
    Swal.fire({
        title: 'Login Required',
        text: "You need to log in to proceed with this action.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log in'
    }).then(() => {
        window.location = `${loginUrl}?BackURL=${window.location.href}`;
    });
};
