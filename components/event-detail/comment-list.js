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
import React from 'react'
import Comment from './comment';
import StarRatingComponent from 'react-star-rating-component';

class CommentList extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            limit: props.limit,
        };
    }

    showMoreComments(e){
        this.setState({
            limit: this.state.limit + 5
        });
    }

    render(){
        const {event}  = this.props;
        const feedbackCount = event.feedback.length;
        const avgRate = event.feedback.map(f => f.rate).reduce((a, b) => a + b, 0) / (feedbackCount || 1);

        return(
            <div id="feedbackContainer">
                <div className="col1 comment_section">
                    <div className="comment_title"> Comments </div>
                    <div className="comment last">
                        <div><span id="feedbackCount">{ feedbackCount }</span> Reviews</div>
                        <div style={{display:'inline'}}>
                            <div style={{float:'left', fontSize: 24}}>
                                <StarRatingComponent
                                    name="avgRate"
                                    value={ avgRate }
                                    editing={false}
                                    starCount={5}
                                    starColor="#fde16d"
                                    emptyStarColor="#e3e3e3"
                                    renderStarIcon={(index, value) => {
                                        return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />

                    { event.feedback.slice(0, this.state.limit).map((comment, index) => (
                        <Comment key={index.toString()} comment={comment}/>
                    ))}

                    {(event.feedback.length > this.state.limit) &&
                    <a className="more_comments" onClick={(e) => this.showMoreComments(e)}>Show more comments</a>
                    }
                </div>
            </div>
        );
    }
}

export default CommentList;
