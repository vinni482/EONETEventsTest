import React, { Component } from 'react';
import { debounce } from "lodash";
import * as Icon from 'react-bootstrap-icons';
import './Table.css';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state = { order: "desc", orderby: "", title: "", date: "", status: "", category: "" };
    }
    
    async handleOrder(orderby) {
        await this.setState({ order: this.state.order === "asc" ? "desc" : "asc", orderby: orderby });
        this.props.onSort(this.state.orderby, this.state.order);    
    }

    handleFilter = debounce(() => { this.props.onFilter(this.state.title, this.state.date, this.state.status, this.state.category); }, 1000);

    render() {
        const { data } = this.props;

        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th onClick={() => this.handleOrder("Title")}>
                            {this.state.order === "asc" && this.state.orderby === "Title" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order === "desc" && this.state.orderby === "Title" && (
                                <Icon.ArrowDown />
                            )}
                            Title
                        </th>
                        <th onClick={() => this.handleOrder("Date")}>
                            {this.state.order === "asc" && this.state.orderby === "Date" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order === "desc" && this.state.orderby === "Date" && (
                                <Icon.ArrowDown />
                            )}
                            Date
                        </th>
                        <th onClick={() => this.handleOrder("Status")}>
                            {this.state.order === "asc" && this.state.orderby === "Status" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order === "desc" && this.state.orderby === "Status" && (
                                <Icon.ArrowDown />
                            )}
                            Status
                        </th>
                        <th onClick={() => this.handleOrder("Category")}>
                            {this.state.order === "asc" && this.state.orderby === "Category" && (
                                <Icon.ArrowUp />
                            )}
                            {this.state.order === "desc" && this.state.orderby === "Category" && (
                                <Icon.ArrowDown />
                            )}
                            Category
                        </th>
                    </tr>
                    <tr className="filters">
                        <th><input type="text" className="form-control" placeholder="Title" onChange={(e) => { this.setState({ title: e.target.value }); this.handleFilter(); }} value={this.state.title} /></th>
                        <th><input type="text" className="form-control" placeholder="Date" onChange={(e) => { this.setState({ date: e.target.value }); this.handleFilter(); }} value={this.state.date} disabled /></th>
                        <th><input type="text" className="form-control" placeholder="Status" onChange={(e) => { this.setState({ status: e.target.value }); this.handleFilter(); }} value={this.state.status} disabled /></th>
                        <th><input type="text" className="form-control" placeholder="Category" onChange={e => { this.setState({ category: e.target.value }); this.handleFilter(); }} value={this.state.category} /></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(event =>
                        <tr key={event.id} className={event.closed != null ? "table-secondary" : ""}>
                            <td>{event.title}</td>
                            <td>{new Date(event.geometries[0].date).toLocaleString()}</td>
                            <td>{event.closed != null ? "closed" : "open"}</td>
                            <td>
                                {event.categories.map(c => (<span className="badge badge-primary" key={c.id}>{c.title}</span>))} 
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
