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

const SpeakerMetaTags = ({speaker, summit, absoluteUrl}) => {

    useEffect(() => {
        const iosapp = document.getElementById('iosapp');
        const droidapp = document.getElementById('droidapp');

        if (iosapp) iosapp.href = `ios-app://${summit.schedule_ios_app_store_id}/${summit.schedule_ios_app_custom_schema}/speakers/${speaker.id}`;
        if (droidapp) droidapp.href = `android-app://${summit.schedule_android_app_package}/${summit.schedule_android_custom_schema}/speakers/${speaker.id}`;
    });

    return (
        <MetaTags>
            <meta id="ogtitle" property="og:title" content={`${speaker.first_name} ${speaker.last_name}`} />
            <meta id="ogurl" property="og:url" content={`${absoluteUrl}/speakers/${speaker.id}`}  />
            <meta id="ogimage" property="og:image" content={speaker.pic} />
            <meta id="ogimagesecure" property="og:image:secure_url" content={speaker.pic} />
            <meta id="ogdesc" property="og:description" content={speaker.description} />
            <meta id="aliosurl" property="al:ios:url" content={`${summit.schedule_ios_app_custom_schema}://speakers/${speaker.id}`} />
            <meta id="aldroidurl" property="al:android:url" content={`${summit.schedule_android_custom_schema}://speakers/${speaker.id}`} />
        </MetaTags>
    );
};

export default SpeakerMetaTags;
