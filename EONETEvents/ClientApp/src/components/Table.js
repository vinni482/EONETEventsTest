import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';
import './Table.css';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state = { order: "desc" };
    }
    
    handleOrder(orderBy) {
        this.state.order = this.state.order == "asc" ? "desc" : "asc";
        this.state.orderby = orderBy;
        this.props.onSort(orderBy, this.state.order);    
    }

    render() {
        const { data } = this.props;

        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th onClick={() => this.handleOrder('Title')}>
                            {this.state.order == "asc" && this.state.orderby == "Title" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order == "desc" && this.state.orderby == "Title" && (
                                <Icon.ArrowDown />
                            )}
                            Title
                        </th>
                        <th onClick={() => this.handleOrder('Date')}>
                            {this.state.order == "asc" && this.state.orderby == "Date" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order == "desc" && this.state.orderby == "Date" && (
                                <Icon.ArrowDown />
                            )}
                            Date
                        </th>
                        <th onClick={() => this.handleOrder('Status')}>
                            {this.state.order == "asc" && this.state.orderby == "Status" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order == "desc" && this.state.orderby == "Status" && (
                                <Icon.ArrowDown />
                            )}
                            Status
                        </th>
                        <th onClick={() => this.handleOrder('Category')}>
                            {this.state.order == "asc" && this.state.orderby == "Category" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order == "desc" && this.state.orderby == "Category" && (
                                <Icon.ArrowDown />
                            )}
                            Category
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(event =>
                        <tr key={event.id} className={event.closed != null ? "table-secondary" : ""}>
                            <td>{event.title}</td>
                            <td>{new Date(event.geometries[0].date).toLocaleString()}</td>
                            <td>{event.closed != null ? "closed" : "open"}</td>
                            <td>{event.categories[0].title}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
