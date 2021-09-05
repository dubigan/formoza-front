import React, { Component, Fragment, useContext, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getClientsList,
  editClientBtn,
  createClientBtn,
  searchClientsInputChange,
} from '../../actions/clients';
import Orders from '../orders/Orders';
import Accordion from 'react-bootstrap/Accordion';
//import AccordionContext from 'react-bootstrap/AccordionContext';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
//import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
//import classNames from 'classnames';
import Loader from '../layout/Loader';
import getClientInfo from '../common/clientInfo';

class Clients extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired,
    searchClients: PropTypes.string.isRequired,
    getClientsList: PropTypes.func.isRequired,
    searchClientsInputChange: PropTypes.func.isRequired,
    editClientBtn: PropTypes.func.isRequired,
    createClientBtn: PropTypes.func.isRequired,
  };

  state = {
    clientId: -1,
  };

  componentDidMount() {
    //console.log("Clients did mount");
    this.props.getClientsList();
  }

  createOrderList(clientId, eventKey) {
    //console.log(clientId);
    if (clientId === undefined || clientId <= 0 || clientId != eventKey) {
      return <div />;
    }
    return (
      <Orders
        clientId={+clientId}
        options={{
          withButtons: false,
          withClientInfo: false,
          withSearch: false,
          withFilter: false,
          withTableHeader: false,
        }}
      />
    );
  }

  toggleAccordion(e) {
    const state = {
      clientId: e.target.value,
    };
    this.setState(state);
    //console.log(this.state);
  }

  render() {
    //console.log(this.props);
    return (
      <>
        <div className="row m-0 r-0 border-light rounded-2">
          <input
            className="border-1 border-light col-11 rounded-2 pb-1"
            //className="form-control"
            name="searchClients"
            value={this.props.searchClients}
            type="search"
            placeholder="Телефон или имя..."
            maxLength="10"
            aria-label="Search"
            onChange={this.props.searchClientsInputChange}
          />
          <button
            disabled={this.props.clients.length > 0 && 'disable'}
            className="btn btn-primary col"
            value=""
            id="id_btn_client_create"
            name="btn-client-create"
            onClick={this.props.createClientBtn.bind(this, this.props.searchClients)}
          >
            &#8594;
          </button>
        </div>
        {this.props.loading && <Loader />}
        <Accordion>
          {this.props.clients.map(client => (
            <Card key={client.id}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={client.id}
                  value={client.id}
                  className="mb-0 ms-auto text-start col-11"
                  onClick={this.toggleAccordion.bind(this)}
                >
                  {getClientInfo(client)}
                </Accordion.Toggle>
                <button
                  type="button"
                  className="btn btn-primary"
                  value={client.id}
                  onClick={this.props.editClientBtn.bind(this, client.id)}
                >
                  &#8594;
                </button>
              </Card.Header>
              <Accordion.Collapse eventKey={client.id}>
                {this.createOrderList(this.state.clientId, client.id)}
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    clients: state.clients.clients,
    searchClients: state.clients.searchClients,
    loading: state.clients.loading,
  };
};

export default connect(mapStateToProps, {
  getClientsList,
  editClientBtn,
  createClientBtn,
  searchClientsInputChange,
})(Clients);
