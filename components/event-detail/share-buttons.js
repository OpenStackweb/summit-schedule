/**
 * Copyright 2017 OpenStack Foundation
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
import {FacebookShareButton, TwitterShareButton} from "react-share";
import ShareEmailAction from "../event-actions/share-email-action";

export class ShareButtons extends React.Component {

    render() {
        const {event, baseUrl, summit} = this.props;
        const twitterText = event.social_summary ? event.social_summary : summit.schedule_twitter_text;

        return (
            <div className="shared-buttons">
                <FacebookShareButton className="facebook share_icon" url={window.location.href}>
                    <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x" />
                        <i className="fa fa-facebook fa-stack-1x fa-inverse" />
                    </span>
                </FacebookShareButton>

                <TwitterShareButton className="twitter share_icon" url={window.location.href} text={twitterText}>
                    <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x" />
                        <i className="fa fa-twitter fa-stack-1x fa-inverse" />
                    </span>
                </TwitterShareButton>

                <ShareEmailAction event={event} onShare={this.props.shareByEmail} />

            </div>
        );
    }
}
