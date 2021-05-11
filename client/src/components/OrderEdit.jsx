import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';

class OrderEdit extends Component {
  
  emptyItem = {
    name: '',
    price: '',
    code: '',
    expdate: '',
    avadate: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    
    if (this.props.match.params.id !== 'new') {
      const order = await (await fetch(`/api/getOrderById/${this.props.match.params.id}`, {
        method: 'GET',
         headers: {
                   'Content-Type': 'application/json',
           authorization: 'Bearer ' + sessionStorage.getItem('token')
        }}
        )
      ).json()
      this.setState({item: order});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    
     await fetch('/api/editOrder/', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify(item)
    });
    this.props.history.push('/orders');
  }

  render() {
    const {item} = this.state;
    const title = <h2 className="text-primary">{item.id ? 'Edit Order' : 'Add Order'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
            
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="text" name="price" id="price" value={item.price || ''}
                   onChange={this.handleChange} autoComplete="price"/>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input type="text" name="code" id="code" value={item.code || ''}
                   onChange={this.handleChange} autoComplete="code"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="expdate">Expiration date</Label>
              <Input type="text" name="expdate" id="expdate" value={item.expdate || ''}
                     onChange={this.handleChange} autoComplete="expdate"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="avadate">Available date</Label>
              <Input type="text" name="avadate" id="avadate" value={item.avadate || ''}
                     onChange={this.handleChange} autoComplete="avadate"/>
            </FormGroup>
            
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/orders">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}


export default withRouter(OrderEdit);