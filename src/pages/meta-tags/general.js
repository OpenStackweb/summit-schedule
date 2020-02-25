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
import MetaTags from 'react-meta-tags';

const GeneralMetaTags = ({summit}) => {
    const summitDesc = `
        Check out the sessions covering over 30+ open source projects with use cases like CI/CD,
        edge computing and OpenStack upgrades at the Open Infrastructure Summit in ${summit.name}.
    `;

    return (
        <MetaTags>
            <title>Open Infrastructure Summit | Summit Schedule</title>
            <meta name="description" content={summitDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:height" content={summit.schedule_og_image_height} />
            <meta property="og:image:width" content={summit.schedule_og_image_width} />
            <meta property="og:site_name" content={summit.schedule_og_site_name} />
            <meta property="og:locale" content="en_US" />
            <meta property="fb:app_id" content={summit.schedule_facebook_app_id} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:site" content="@openstack" />
            <meta property="al:ios:app_store_id" content={summit.schedule_ios_app_store_id} />
            <meta property="al:ios:app_name" content={summit.schedule_ios_app_name} />
            <meta property="al:ios:url" content={summit.schedule_ios_app_custom_schema} />
            <link rel="alternate" href={`ios-app://${summit.schedule_ios_app_store_id}/${summit.schedule_ios_app_custom_schema}/schedule`} />
            <meta property="al:android:package" content={summit.schedule_android_app_package} />
            <meta property="al:android:app_name" content={summit.schedule_android_app_name} />
            <meta property="al:android:url" content={summit.schedule_android_custom_schema} />
            <link rel="alternate" href={`android-app://${summit.schedule_android_app_package}/${summit.schedule_android_custom_schema}/schedule`} />
        </MetaTags>
    );
}

export default GeneralMetaTags;
