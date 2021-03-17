import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Table from './Table'
import EventModal from './EventModal'

export class FetchData extends Component {

    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { showModal: false, events: [], event: [], loading: true, order: "desc", orderby: "Date", pageSize: 10, pageNumber: 1 };
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleTableRowClick = this.handleTableRowClick.bind(this);
        this.toggleEventModal = this.toggleEventModal.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        this.populateEventsData();
    }

    async handleSort(orderby, order) {
        await this.setState({ orderby: orderby, order: order });
        this.populateEventsData();
    }

    async handleFilter(title, date, status, category) {
        await this.setState({ pageNumber: 1, title: title, date: date, status: status, category: category });
        this.populateEventsData();
    }

    async handleTableRowClick(eventId) {
        await this.populateEventData(eventId);
        await this.toggleEventModal();
    }

    async toggleEventModal() {
        await this.setState({ showModal: !this.state.showModal });
    }

    async handleChangePage(event, newPage) {
        await this.setState({ pageNumber: newPage+1 });
        this.populateEventsData();
    };

    async handleChangeRowsPerPage(event) {
        await this.setState({ pageNumber: 1, pageSize: event.target.value });
        this.populateEventsData();
    };

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <div>
                <Table data={this.state.events} onSort={this.handleSort} onFilter={this.handleFilter} onRowClick={this.handleTableRowClick} />
                <TablePagination
                    component="div"
                    count={this.state.eventsCount}
                    page={this.state.pageNumber-1}
                    onChangePage={this.handleChangePage}
                    rowsPerPage={this.state.pageSize}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                <EventModal data={this.state.event} modal={this.state.showModal} toggle={this.toggleEventModal} />
              </div>;

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
                PageNumber: this.state.pageNumber,
                PageSize: this.state.pageSize,
                OrderBy: this.state.orderby,
                Order: this.state.order,
                Title: this.state.title,
                Date: this.state.date,
                Status: this.state.status,
                Category: this.state.category
            })
        });

        const data = await response.json();
        this.setState({ events: data.items, eventsCount: data.totalCount, loading: false });
    }

    async populateEventData(eventId) {
        const response = await fetch('events/' + eventId, { method: 'GET' });
        const data = await response.json();
        this.setState({ event: data });
    }
}
