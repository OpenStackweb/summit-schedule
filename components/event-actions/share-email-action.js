import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import T from "i18n-react";

class ShareEmailAction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.onShare = this.onShare.bind(this);
        this.handleShareClick = this.handleShareClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    handleShareClick(ev) {
        ev.preventDefault();
        this.setState({showModal: true});
    }

    onCloseModal(ev) {
        ev.preventDefault();
        this.setState({showModal: false});
    }

    onShare(ev) {
        const { event } = this.props;

        ev.preventDefault();
        this.setState({showModal: false});

        this.props.onShare(event, this.emailFrom.value, this.emailTo.value);
    }

    render() {
        const { showModal } = this.state;

        return (
            <>
                <div className="email share_icon" onClick={(e) => this.handleShareClick(e)}>
                    <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x" />
                        <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                    </span>
                </div>
                {showModal &&
                <Modal show={showModal} onHide={this.onCloseModal} dialogClassName="refund-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Share by Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="email-from">From:</label>
                            <input
                                type="email"
                                className="form-control"
                                ref={(node) => { this.emailFrom = node; }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-to">To:</label>
                            <input
                                type="email"
                                className="form-control"
                                ref={(node) => { this.emailTo = node; }}
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.onShare}>
                            Send
                        </button>
                    </Modal.Footer>
                </Modal>
                }
            </>
        );


    }


}

ShareEmailAction.propTypes = {
    event: PropTypes.object.isRequired,
    onShare: PropTypes.func.isRequired,
};

export default ShareEmailAction;
