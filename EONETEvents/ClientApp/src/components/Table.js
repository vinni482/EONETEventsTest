import React, { Component } from 'react';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state = { order: "desc" };
    }
    
    handleOrder(orderBy) {
        this.state.order = this.state.order == "asc" ? "desc" : "asc";
        this.props.onSort(orderBy, this.state.order);    
    }

    render() {
        const { data } = this.props;

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th onClick={() => this.handleOrder('Title')}>Title</th>
                        <th onClick={() => this.handleOrder('Date')}>Date</th>
                        <th onClick={() => this.handleOrder('Status')}>Status</th>
                        <th onClick={() => this.handleOrder('Category')}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(event =>
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{event.geometries[0].date}</td>
                            <td>{event.closed != null ? "closed" : "open"}</td>
                            <td>{event.categories[0].title}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
