import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/DateTimePicker.css';
import '../../css/Calendar.css';
import { btnOrderOutClick, handleOrderOut, changeDate } from '../../../actions/orderOut';
import { OrderDate } from './OrderDates';
import Modal, { ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../layout/Modal';
import Button from '../../layout/Button';

class OrderOutDialog extends Component {
  handleClose = e => {
    if (e) {
      this.props.handleOrderOut(e.target.value === 'true', this.props.order.id, this.props.date);
    }
    return this.props.handleOrderOut(false);
  };

  getOrderInfo = () => {
    if (this.props.order && this.props.order.item) {
      //console.log(this.props.params.orderOut);
      const item_type = this.props.catalogs.item_types.find(
        type => +type.id === +this.props.order.item.item_type
      );
      const manufacturer = this.props.catalogs.manufacturers.find(
        type => +type.id === +this.props.order.item.manufacturer
      );
      return [
        item_type ? item_type.name : '',
        manufacturer ? manufacturer.name : '',
        this.props.order.item.name,
        this.props.order.item.ser_num,
      ].join(' ');
    }
    return '';
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <ModalHeader closeLabel="">
          <ModalTitle>Выдать заказ</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="oak-row dates-container">
            <div className="oak-col oak-fs5">{this.getOrderInfo()}</div>
            <OrderDate
              name="date_out"
              date={this.props.date ? this.props.date : new Date()}
              onChange={this.props.changeDate}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="oak-btn-secondary" value={false} onClick={this.handleClose}>
            Отмена
          </Button>
          <Button
            className="oak-btn-primary"
            value={true}
            onClick={this.handleClose}
            // disabled={this.props.params.orderOut.id && "disable"}
          >
            Выдать
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  catalogs: state.catalogs,
  order: state.orderOut.order,
  show: state.orderOut.show,
  date: state.orderOut.date,
  update: state.update.update,
});

export default connect(mapStateToProps, {
  btnOrderOutClick,
  handleOrderOut,
  changeDate,
})(OrderOutDialog);
