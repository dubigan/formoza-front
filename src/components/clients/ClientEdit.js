import React, { Component } from 'react';
//import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Phones } from './phones';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getClient,
  saveClient,
  changeClient,
  delPhone,
  addPhone,
  changePhone,
  newOrderBtn,
} from '../../actions/clients';
import Orders from '../orders/Orders';
import { Col, Form, Row } from 'react-bootstrap';

class ClientEdit extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    getClient: PropTypes.func.isRequired,
    saveClient: PropTypes.func.isRequired,
    changeClient: PropTypes.func.isRequired,
    changePhone: PropTypes.func.isRequired,
    delPhone: PropTypes.func.isRequired,
    addPhone: PropTypes.func.isRequired,
    newOrderBtn: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getClient();
  }

  verifyValue = value => {
    return value ? value : '';
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Title>Клиент</Card.Title>
          <Card.Body>
            <Phones
              phones={this.props.client.phones ? this.props.client.phones : []}
              delBtnClick={this.props.delPhone}
              addBtnClick={this.props.addPhone}
              changePhone={this.props.changePhone}
            />
            <div className="row">
              <div className="col-5">
                <div className="row">
                  {/* <label className="form-control-label col-4">Имя</label> */}
                  <input
                    placeholder="Имя"
                    className="form-control col-6"
                    name="first_name"
                    type="text"
                    value={this.verifyValue(this.props.client.first_name)}
                    onChange={this.props.changeClient}
                  />
                  {/* <label className="form-control-label col-4">Фамилия</label> */}
                  <input
                    className="form-control col-6"
                    placeholder="Фамилия"
                    name="last_name"
                    type="text"
                    value={this.verifyValue(this.props.client.last_name)}
                    onChange={this.props.changeClient}
                  />
                  {/* <label className="form-control-label col-4" name="email">
                    Email
                  </label> */}
                  <input
                    placeholder="Email"
                    className="form-control col-6"
                    name="email"
                    type="text"
                    value={this.verifyValue(this.props.client.email)}
                    onChange={this.props.changeClient}
                  />
                </div>
              </div>
              <div className="col-7">
                {/* <label className="form-control-label col-4">Комментарий</label> */}
                <Form.Control
                  placeholder="Комментарий"
                  as="textarea"
                  rows="5"
                  value={this.verifyValue(this.props.client.comment)}
                  name="comment"
                  onChange={this.props.changeClient}
                />
              </div>
            </div>
            <div className="row spacer">
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary col-3"
                  onClick={this.props.saveClient.bind(this, this.props.client)}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Заказы</Card.Title>
          <Card.Header>
            <div className="row spacer">
              <Col xs={12}>
                <button
                  type="button"
                  className="btn btn-primary col-3"
                  name="add_order"
                  onClick={this.props.newOrderBtn}
                  disabled={!this.props.client.id && 'disabled'}
                >
                  Новый заказ
                </button>
              </Col>
            </div>
          </Card.Header>
          <div className="row spacer">
            <div className="col-12">
              <Orders
                clientId={+this.props.client.id}
                options={{
                  withButtons: true,
                  withClientInfo: false,
                  withSearch: false,
                  withFilter: false,
                  withTableHeader: false,
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  client: state.clients.client,
});

export default connect(mapStateToProps, {
  getClient,
  saveClient,
  changeClient,
  changePhone,
  delPhone,
  addPhone,
  newOrderBtn,
})(ClientEdit);
