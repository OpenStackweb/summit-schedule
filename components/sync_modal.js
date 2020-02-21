import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unSyncCalendar } from '../actions';
import { Modal } from 'react-bootstrap';


class SyncModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal  : false,
        }
    }

    unSyncCalendar(e){
        this.props.hideModal();
        this.props.unSyncCalendar();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.showModal != nextProps.showModal) {
            this.setState({
                showModal: nextProps.showModal
            });
        }
    }


    render() {
        const {hideModal} = this.props

        return (
            <div className="sync_modal">
                <Modal show={this.state.showModal} onHide={hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Un Sync Schedule</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to un-sync your schedule with your calendar?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-default' onClick={hideModal}> Close </button>
                        <button className='btn btn-primary' onClick={(e)=> this.unSyncCalendar(e)}> Un Sync </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(null,{ unSyncCalendar })(SyncModal);
