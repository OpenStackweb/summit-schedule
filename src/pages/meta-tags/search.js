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

import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import {epochToMomentTimeZone} from "openstack-uicore-foundation/lib/methods";

const SearchMetaTags = ({summit, searchTerm, absoluteUrl}) => {

    const summitDesc = `
        Check out the sessions covering over 30+ open source projects with use cases like CI/CD,
        edge computing and OpenStack upgrades at the Open Infrastructure Summit in ${summit.name}.
        `;
    const summitStart = epochToMomentTimeZone(summit.start_date, summit.time_zone_id).format('MMM D');
    const summitEnd = epochToMomentTimeZone(summit.end_date, summit.time_zone_id).format('D');

    useEffect(() => {
        const iosapp = document.getElementById('iosapp');
        const droidapp = document.getElementById('droidapp');

        if (iosapp) iosapp.href = `ios-app://${summit.schedule_ios_app_store_id}/${summit.schedule_ios_app_custom_schema}/search/${searchTerm}`;
        if (droidapp) droidapp.href = `android-app://${summit.schedule_android_app_package}/${summit.schedule_android_custom_schema}/search/${searchTerm}`;
    });


    return (
        <MetaTags>
            <meta id="ogtitle" property="og:title" content={`Join us ${summitStart}-${summitEnd} for the Open Infrastructure Summit ${summit.name}!`} />
            <meta id="ogurl" property="og:url" content={absoluteUrl} />
            <meta id="ogimage" property="og:image" content={summit.schedule_og_image_url} />
            <meta id="ogimagesecure" property="og:image:secure_url" content={summit.schedule_og_image_secure_url} />
            <meta id="ogdesc" property="og:description" content={summitDesc} />
            <meta id="aliosurl" property="al:ios:url" content={`${summit.schedule_ios_app_custom_schema}://search/${searchTerm}`} />
            <meta id="aldroidurl" property="al:android:url" content={`${summit.schedule_android_custom_schema}://search/${searchTerm}`} />
        </MetaTags>
    );
}

export default SearchMetaTags;
