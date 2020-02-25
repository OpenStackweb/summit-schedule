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

const EventMetaTags = ({event}) => (
    <MetaTags>
        <meta property="og:title" content={event.title} />
        <meta property="og:url" content="https://devbranch.openstack.org/summit/shanghai-2019/summit-schedule/" />
        <meta property="og:description" content={event.social_description} />
    </MetaTags>
);

export default EventMetaTags;
