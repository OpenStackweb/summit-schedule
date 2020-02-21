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
import StarRatingComponent from 'react-star-rating-component';

class CommentForm extends React.Component {

    constructor(props){
        super(props);
        const {event, loggedUser} = this.props;
        this.onStarClick           = this.onStarClick.bind(this);
        this.onSubmitForm          = this.onSubmitForm.bind(this)
        this.handleChangeComment   = this.handleChangeComment.bind(this);

        this.state = {
            rating    : 0,
            comment   : '',
            showValidationError : false,
            validationErrorMessage: null,
        };
    }

    handleChangeComment(e){
        this.setState({...this.state, comment: e.target.value});
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({...this.state, rating: nextValue,showValidationError:false, validationErrorMessage:null});
    }

    onSubmitForm(e){
        e.preventDefault();
        if(this.state.rate == 0){
            this.setState({...this.state, showValidationError:true, validationErrorMessage:'* Rating is mandatory.'});
            return false;
        }

        this.props.onHandleSubmit({
            rating: this.state.rating,
            comment: this.state.comment,
        });
    }

    render(){
        const { rating, comment, showValidationError,validationErrorMessage  } = this.state;
        return (
            <div className="feedback_box">
                <div>Rating</div>
                <div style={{fontSize: 24}}>
                    <StarRatingComponent
                        name="rating"
                        value={rating}
                        starColor="#fde16d"
                        emptyStarColor="#e3e3e3"
                        onStarClick={this.onStarClick}
                        renderStarIcon={(index, value) => {
                            return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
                        }}
                    />
                </div>
                {showValidationError &&
                <label className="error">{validationErrorMessage}</label>
                }
                <div>Comment</div>
                <textarea value={comment} onChange={this.handleChangeComment} id="comment"></textarea>
                <div>
                    <button type="button"
                            onClick={this.onSubmitForm}
                            className="btn btn-primary btn-md active btn-warning save">Submit</button>
                </div>
            </div>

        );
    }
}

export default CommentForm;
