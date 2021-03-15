import React, { Component } from 'react';
import Table from './Table'

export class FetchData extends Component {

    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { events: [], loading: true };
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
        this.populateEventsData();
    }

    handleSort(orderby, order) {
        this.setState({ orderby: orderby, order: order });
        this.populateEventsData();
    }

    handleFilter(title, date, status, category) {
        this.setState({ title: title, date: date, status: status, category: category });
        this.populateEventsData();
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <Table data={this.state.events} onSort={this.handleSort} onFilter={this.handleFilter} />;

        return (
            <div>
            <h1 id="tabelLabel" >EONET Events</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            </div>
        );
    }

    async populateEventsData() {
        const response = await fetch('events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PageNumber: 1,
                OrderBy: this.state.orderby,
                Order: this.state.order,
                Title: this.state.title,
                Date: this.state.date,
                Status: this.state.status,
                Category: this.state.category
            })
        });

        const data = await response.json();
        this.setState({ events: data, loading: false });
    }
}
