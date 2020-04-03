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

const SpeakerMetaTags = ({speaker, summit}) => (
    <MetaTags>
        <meta property="og:title" content={`${speaker.first_name} ${speaker.last_name}`} />
        <meta property="og:url" content="https://devbranch.openstack.org/summit/shanghai-2019/summit-schedule/" />
        <meta property="og:image" content={speaker.pic} />
        <meta property="og:image:secure_url" content={speaker.pic} />
        <meta property="og:description" content={speaker.description} />
        <meta property="al:ios:url" content={`${summit.schedule_ios_app_custom_schema}://speakers/${event.id}`} />
        <link rel="alternate" href={`ios-app://${summit.schedule_ios_app_store_id}/${summit.schedule_ios_app_custom_schema}/speakers/${event.id}`} />
        <meta property="al:android:url" content={`${summit.schedule_android_custom_schema}://speakers/${event.id}`} />
        <link rel="alternate" href={`android-app://${summit.schedule_android_app_package}/${summit.schedule_android_custom_schema}/speakers/${event.id}`} />
    </MetaTags>
);

export default SpeakerMetaTags;
