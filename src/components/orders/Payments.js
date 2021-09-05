import React from 'react';
import { connect } from 'react-redux';
import { MultiForm } from '../common/MultiForm';
import { formatCurrency, calcTotal } from '../common/common.tsx';
import { addPayment, delPayment, changePayment } from '../../actions/payments';
import { OrderDate } from './parts/OrderDates';

class Payments extends MultiForm {
  state = { total: 0 };

  componentDidUpdate(prevProps, prevSate) {
    const total = calcTotal(this.getEntities(), 'value');
    //console.log('Payments.ComponentDidUpdate', total);

    if (total != prevSate.total) this.setState({ total });
  }

  getTitle = () => {
    return 'Оплаты';
  };

  getTitleInfo = () => {
    return <div className="col-1 text-danger text-end">{formatCurrency(this.state.total)}</div>;
  };

  getEntities = () => {
    return this.props.order.payments;
  };

  getForm = (pay, index) => {
    return (
      <>
        <label>Дата</label>
        <OrderDate
          name={this.getNameWithPrefix('date-') + index}
          date={pay.date}
          onChange={this.props.change}
        />
        <input
          as="input"
          className="border-1 border-light col-1 rounded-2 pb-1 col-1 text-end"
          // aria-describedby="phone-prefix"
          name={this.getNameWithPrefix('value-') + index}
          type="text"
          value={pay.value}
          onChange={this.props.change}
          // onKeyPress={this.digitsOnly}
        />
      </>
    );
  };
}

const mapStateToProps = state => ({
  order: state.order.order,
});

const mapDispatchToProps = {
  add: addPayment,
  delete: delPayment,
  change: changePayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
