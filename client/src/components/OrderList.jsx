import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';
import OrderDataService from './OrderDataService'
import AuthenticationService from './AuthenticationService'
import axios from 'axios'

class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {orders: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    if (AuthenticationService.isUserLoggedIn()) {
    OrderDataService.retrieveOrders().then(response => {this.setState({orders: response.data, isLoading: false})})
    }
  }
 
  async remove(id) {
     axios(`/api/deleteOrder/${id}`, {
     method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'

     }}
     )
    .then(() => {
      let updatedOrders = [...this.state.orders].filter(i => i.id !== id);
      this.setState({orders: updatedOrders});
    });
  }
  
  render() {
    const {orders, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const ordersList = orders.map(order => {

      return <tr key={order.id}>
        <td style={{whiteSpace: 'nowrap'}}>{order.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{order.price}</td>
        <td style={{whiteSpace: 'nowrap'}}>{order.code}</td>
        <td style={{whiteSpace: 'nowrap'}}>{order.expdate}</td>
        <td style={{whiteSpace: 'nowrap'}}>{order.avadate}</td>

        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/orders/" + order.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(order.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/orders/new">  Add Order </Button>
          </div>
      
          <h3 className="text-info">Orders </h3>
          <Table className="mt-4">
            <thead className="text-primary">
            <tr>
              <th >Name</th>
              <th >Price</th>
              <th>Code</th>
              <th >Expiration date</th>
              <th>Available date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody className="text-danger">
            {ordersList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default OrderList;