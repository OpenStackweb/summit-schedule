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

import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import CommentList from './comment-list';
import CommentForm from './comment-form';
import { postNewComment } from '../../actions';

class CommentsSection extends React.Component
{
    constructor(props){
        super(props);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onHandleSubmit(newComment){
        this.props.postNewComment({rate: newComment.rating, note: newComment.comment});
    }

    /**
     * @returns {boolean|*}
     */
    shouldShowCommentForm(){
        const { loggedUser } = this.props;
        return loggedUser != null && this.shouldShowComments() && !loggedUser.has_feedback;
    }

    shouldShowComments() {
        const { event } = this.props;
        return event.end_date < moment().unix() && event.allow_feedback;
    }

    render(){
        return(
            <div className="event-comments">
                {this.shouldShowComments() &&
                <>
                    {this.shouldShowCommentForm() &&
                    <CommentForm {...this.props} onHandleSubmit={this.onHandleSubmit}/>
                    }
                    <CommentList {...this.props} limit={5} />
                </>
                }
            </div>
        );

    }
}

function mapStateToProps(scheduleState) {
    return {
        ...scheduleState
    }
}

export default connect(mapStateToProps, {
    postNewComment,
})(CommentsSection)
