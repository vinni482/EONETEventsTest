import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class EventModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;

        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader>{data.title}</ModalHeader>
                    <ModalBody>
                        <div>id: {data.id}</div>
                        <div>link: {data.link}</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}