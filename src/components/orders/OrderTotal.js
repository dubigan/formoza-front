import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDiscount } from '../../actions/order';
import PropTypes from 'prop-types';

class OrderTotal extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  render() {
    return (
      <>
        <div className="row mt-1">
          <label className="col-3 ms-4 pe-0">Скидка</label>
          <input
            placeholder="Скидка"
            as="input"
            className="col-1 text-end"
            name="discount"
            value={this.props.order.discount}
            onChange={this.props.changeDiscount}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order.order,
});

export default connect(mapStateToProps, { changeDiscount })(OrderTotal);
