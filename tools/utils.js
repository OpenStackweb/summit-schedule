import moment from "moment-timezone";
import { epochToMomentTimeZone, epochToMoment } from "openstack-uicore-foundation/lib/methods";
//import { FragmentParser } from "openstack-uicore-foundation/lib/components";
import FragmentParser from "../../../utils/fragmen-parser";

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
}

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
}
