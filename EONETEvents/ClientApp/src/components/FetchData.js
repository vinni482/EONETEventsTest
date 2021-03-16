import React, { Component } from 'react';
import Table from './Table'
import EventModal from './EventModal'

export class FetchData extends Component {

    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { showModal: false, events: [], event: [], loading: true, order: "desc", orderby: "Date" };
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleTableRowClick = this.handleTableRowClick.bind(this);
        this.toggleEventModal = this.toggleEventModal.bind(this);
    }

    componentDidMount() {
        this.populateEventsData();
    }

    async handleSort(orderby, order) {
        await this.setState({ orderby: orderby, order: order });
        this.populateEventsData();
    }

    async handleFilter(title, date, status, category) {
        await this.setState({ title: title, date: date, status: status, category: category });
        this.populateEventsData();
    }

    async handleTableRowClick(eventId) {
        await this.populateEventData(eventId);
        await this.toggleEventModal();
    }

    async toggleEventModal() {
        await this.setState({ showModal: !this.state.showModal });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <Table data={this.state.events} onSort={this.handleSort} onFilter={this.handleFilter} onRowClick={this.handleTableRowClick} />;

        return (
            <div>
            <h1 id="tabelLabel" >EONET Events</h1>
            <p>This component demonstrates fetching data from the server.</p>
                {contents}
                <EventModal data={this.state.event} modal={this.state.showModal} toggle={this.toggleEventModal} />
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

    async populateEventData(eventId) {
        const response = await fetch('events/' + eventId, { method: 'GET' });
        const data = await response.json();
        this.setState({ event: data });
    }
}
