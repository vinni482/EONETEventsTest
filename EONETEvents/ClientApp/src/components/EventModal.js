import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class EventModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        let closed, description, categories, geometries;
        if (data.closed != null && data.closed != "")
            closed = <div><span className="font-weight-bold">Closed Date: </span>{new Date(data.closed).toLocaleString()}</div>;
        if (data.description != null && data.description != "")
            description = <div><span className="font-weight-bold">Description: </span>{data.description}</div>;
        if (data.categories != null)
            categories = <div><span className="font-weight-bold">Categories: </span>{data.categories.map(c => (<span className="badge badge-primary" key={c.id} style={{ margin: '5px' }}>{c.title}</span>))}</div>;
        if (data.geometries != null) geometries = data.geometries.map(g => (
            <div key={g.date}>
                <span>
                    <span className="font-weight-bold">Date: </span>
                    {new Date(g.date).toLocaleString()}
                </span>
                <span>
                    <span className="font-weight-bold"> Coordinates: </span>
                    <span style={{ margin: '5px' }}>{g.coordinates.map(c => <span key={c}>{c};</span>)}</span>
                </span>
            </div>));

        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader>{data.title}</ModalHeader>
                    <ModalBody>
                        {description}
                        {categories}
                        {geometries}
                        {closed}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}