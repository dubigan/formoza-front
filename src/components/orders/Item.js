import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import { editItem, saveItem } from '../../actions/item';
import { getCatalogs } from '../../actions/catalogs';
import Card from '../layout/Card';

class Item extends Component {
  static propTypes = {
    catalogs: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    editItem: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired,
    getCatalogs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.catalogs.item_types.length === 0) this.props.getCatalogs();
  }

  get_select = (name, placeholder) => {
    let out = [
      <option value={-1} key={-1}>
        {placeholder}
      </option>,
    ];
    name.map((type, index) => {
      out.push(
        <option value={type.id} key={index}>
          {type.name}
        </option>
      );
    });
    //console.log("get_select", out);
    return out;
  };

  get_select_val = id => {
    //console.log("get_select_val", name);
    return id ? id : -1;
  };

  render() {
    return (
      <Card>
        <Card.Header>Оборудование</Card.Header>
        <Card.Body>
          <Row>
            <Col xs={5}>
              <Row>
                {/* <Form.Label className="col-4">Вид</Form.Label> */}
                <Form.Control
                  placeholder="Вид"
                  as="select"
                  className="col-7"
                  name="item_type"
                  value={this.get_select_val(this.props.item.item_type)}
                  onChange={this.props.editItem}
                  disabled={this.props.item.id !== null && 'disable'}
                >
                  {this.get_select(this.props.catalogs.item_types, 'Вид')}
                </Form.Control>

                {/* <Form.Label className="col-4">Производитель</Form.Label> */}
                <Form.Control
                  as="select"
                  className="col-7"
                  name="manufacturer"
                  value={this.get_select_val(this.props.item.manufacturer)}
                  onChange={this.props.editItem}
                >
                  {this.get_select(this.props.catalogs.manufacturers, 'Производитель')}
                </Form.Control>
                {/* <Form.Label className="col-4">S/N</Form.Label> */}
                <Form.Control
                  placeholder="Серийный номер"
                  as="input"
                  className="col-7"
                  name="ser_num"
                  value={this.props.item.ser_num}
                  onChange={this.props.editItem}
                />
                {/* <Form.Label className="col-4">Модель</Form.Label> */}
                <Form.Control
                  placeholder="Модель"
                  as="input"
                  className="col-7"
                  name="name"
                  value={this.props.item.name}
                  onChange={this.props.editItem}
                />
              </Row>
            </Col>
            <Col xs={7}>
              {/* <Form.Label className="col-4">Комментарий</Form.Label> */}
              <Form.Control
                placeholder="Комментарий"
                as="textarea"
                rows="5"
                name="comment"
                value={this.props.item.comment}
                onChange={this.props.editItem}
              />
            </Col>
          </Row>
          <Row className="spacer">
            <button
              type="button"
              className="btn btn-primary col-3"
              name="save_item"
              onClick={this.props.saveItem.bind(this, this.props.item)}
              // disabled={this.props.item.id === null && "disable"}
            >
              Сохранить
            </button>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  catalogs: state.catalogs,
  item: state.order.item,
  order: state.order.order,
});

export default connect(mapStateToProps, {
  editItem,
  saveItem,
  getCatalogs,
})(Item);
