import React, { Component } from 'react';
import Table from './Table'

export class FetchData extends Component {

    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { events: [], loading: true };
        this.handleSort = this.handleSort.bind(this);
    }

    componentDidMount() {
        this.populateEventsData();
    }

    handleSort(orderBy, order) {
        this.populateEventsData(orderBy, order);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <Table data={this.state.events} onSort={this.handleSort} />;

        return (
            <div>
            <h1 id="tabelLabel" >EONET Events</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            </div>
        );
    }

    async populateEventsData(orderBy, order) {
        const response = await fetch('events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ PageNumber: 1, OrderBy: orderBy, Order: order })
        });

        const data = await response.json();
        this.setState({ events: data, loading: false });
    }
}
