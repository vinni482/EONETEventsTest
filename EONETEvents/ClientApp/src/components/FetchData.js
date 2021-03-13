import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true, order: "desc" };
  }

  componentDidMount() {
    this.populateEventsData();
  }

    handleOrder(orderBy) {
        this.state.order = this.state.order == "asc" ? "desc" : "asc";
        this.populateEventsData(orderBy, this.state.order);
    }
  
  renderTable(events) {
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
          {events.map(event =>
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

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : this.renderTable(this.state.events);

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
