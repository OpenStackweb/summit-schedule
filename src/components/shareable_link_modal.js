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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';


import { deleteCalendarShareableLink } from '../actions';

class ShareableLinkModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal  : false,
            copied: false
        };

        this.unShare = this.unShare.bind(this);
        this.copyLink = this.copyLink.bind(this);
    }

    copyLink(e){
        this.shareLinkRef.select();
        document.execCommand('copy');
        this.setState({copied: true});
        setTimeout(() => {this.setState({copied: false})}, 2000);
    }

    unShare(e){
        this.props.hideModal();
        this.props.deleteCalendarShareableLink();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.showModal != nextProps.showModal) {
            this.setState({
                showModal: nextProps.showModal
            });
        }
    }

    render() {
        const {hideModal, shareableLink} = this.props;
        const {copied} = this.state;

        if (!shareableLink) return null;

        const breakPos = shareableLink.indexOf('schedule');
        const breakLink = [shareableLink.slice(0, breakPos), '\n', shareableLink.slice(breakPos)].join('');

        return (
            <div className="sync_modal">
                <Modal show={this.state.showModal} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>Shareable link to your calendar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>With this link, anyone will be able to see any of your events.</p>
                        <p>
                            <a href={shareableLink}>
                                {breakLink}
                            </a>
                        </p>
                        <p>Learn more about <a href="#">sharing your calendar</a>.</p>
                        <textarea
                            className="copy-link-textarea"
                            defaultValue={shareableLink}
                            ref={node => this.shareLinkRef = node}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-default' onClick={hideModal}> Close </button>
                        <button disabled={copied} className='btn btn-primary' onClick={this.copyLink}> {copied ? 'Copied!' : 'Copy Link'} </button>
                        <button className='btn btn-danger' onClick={this.unShare}> Delete it </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(
    null,
    {
        deleteCalendarShareableLink
    }
)(ShareableLinkModal);
