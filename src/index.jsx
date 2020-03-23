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
import ReactDOM from 'react-dom';
import ScheduleApp from './schedule-app';

class ScheduleWebComponent extends HTMLElement {
    mountPoint;
    componentAttributes = {};
    componentProperties = {};

    connectedCallback() {
        this.mountReactApp();
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }

    static get observedAttributes() {
        return ['summit_id', 'api_access_token', 'api_url', 'schedule_base', 'schedule_url', 'login_url', 'venues_page_link'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.componentAttributes[name] = newVal;
    }

    reactProps() {
        return {...this.componentAttributes, ...this.componentProperties };
    }

    mountReactApp() {
        if (!this.mountPoint) {
            this.mountPoint = document.createElement('div');
            this.appendChild(this.mountPoint);
        }

        ReactDOM.render(<ScheduleApp { ...this.reactProps() } />, this.mountPoint);
    }
}

window.customElements.define('summit-schedule', ScheduleWebComponent);
