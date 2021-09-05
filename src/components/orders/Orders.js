import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getOrdersList,
  setInitialFilter,
  btnOrdersFilterClick,
  btnOrderClick,
  btnOrdersSortClick,
  searchOrders,
  btnClientEditClick,
} from '../../actions/orders';
import { getCatalogs } from '../../actions/catalogs';
import { setUpdate } from '../../actions/update';
import { btnOrderOutClick } from '../../actions/orderOut';
//import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from '../layout/Loader';
import OrderOutDialog from './parts/OrderOutDialog';
import { getNameById, getOrderSum, getOrderPayments } from './ordersFunctions';
//import './orders.scss';
import { FilterControl } from './parts/filtrerControl';
import { TdWithOverlay } from './parts/TdWithOverlay';
import SearchControl from './parts/searchControl';
import { TableHeader } from './parts/TableHeader';
import { TdWithOrderButtons } from './parts/orderButtons';
import { TdWithClientInfo } from './parts/ClientInfo';
import { formatDate } from '../common/common.tsx';

class Orders extends Component {
  static propTypes = {
    catalogs: PropTypes.object.isRequired,
    clientId: PropTypes.number,
    options: PropTypes.object,
    search: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    orders: PropTypes.array.isRequired,
    sorted_by: PropTypes.object.isRequired,
    getOrdersList: PropTypes.func.isRequired,
    setInitialFilter: PropTypes.func.isRequired,
    btnOrderOutClick: PropTypes.func.isRequired,
    btnOrdersFilterClick: PropTypes.func.isRequired,
    btnOrderClick: PropTypes.func.isRequired,
    btnOrdersSortClick: PropTypes.func.isRequired,
    searchOrders: PropTypes.func.isRequired,
    btnClientEditClick: PropTypes.func.isRequired,
    getCatalogs: PropTypes.func.isRequired,
  };

  locale = 'ru';
  url = '/sc/api/orders/';

  getQueryForOrdersList = () => {
    return {
      client_pk: this.props.clientId,
      ser_num: this.props.search,
      filter: this.props.filter,
      sorted_by: this.props.sorted_by,
    };
  };

  componentDidMount() {
    if (this.props.catalogs.item_types.length === 0) this.props.getCatalogs();
    this.props.getOrdersList(this.url, this.getQueryForOrdersList());
    this.props.setInitialFilter(this.props.options);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.clientId !== prevProps.clientId ||
      prevProps.search !== this.props.search ||
      prevProps.filter !== this.props.filter ||
      prevProps.orders.length !== this.props.orders.length ||
      this.props.update
    ) {
      this.props.getOrdersList(this.url, this.getQueryForOrdersList());
    }
  }

  btnOrderEdit = e => {
    this.props.btnOrderClick(this.url, 'btn_order_edit', e.target.value);
  };

  btnOrderRepeat = e => {
    //console.log('btnOrderRepeat', e.target.name);
    this.props.btnOrderClick(this.url, 'btn_order_repeat', e.target.value);
  };

  btnOrderOut = e => {
    const order = this.props.orders.filter(ord => +ord.id === +e.target.value)[0];
    this.props.btnOrderOutClick(order);
  };

  btnClientEditClick = e => {
    this.props.btnClientEditClick(e.target.value, this.url);
  };

  render() {
    return (
      <>
        <OrderOutDialog />
        <SearchControl
          value={this.props.search}
          callback={this.props.searchOrders}
          options={this.props.options}
        />
        <FilterControl
          value={this.props.filter}
          callback={this.props.btnOrdersFilterClick}
          options={this.props.options}
        />
        {this.props.loading ? (
          <Loader />
        ) : (
          <table className="table table-striped table-bordered">
            <TableHeader
              options={this.props.options}
              sorted_by={this.props.sorted_by}
              onClick={this.props.btnOrdersSortClick}
            />
            <tbody>
              {this.props.orders.map((order, index) => (
                <tr key={index}>
                  <TdWithOverlay
                    catalog={this.props.catalogs.mnt_types}
                    overlay={order.mnts}
                    value={formatDate(new Date(order.date_in), this.locale)}
                  />
                  <TdWithOverlay
                    catalog={this.props.catalogs.mnt_types}
                    overlay={order.mnts}
                    value={getNameById(this.props.catalogs.item_types, order.item.item_type)}
                  />
                  <TdWithOverlay
                    catalog={this.props.catalogs.mnt_types}
                    overlay={order.mnts}
                    value={getNameById(this.props.catalogs.manufacturers, order.item.manufacturer)}
                  />
                  <TdWithOverlay
                    catalog={this.props.catalogs.mnt_types}
                    overlay={order.mnts}
                    value={order.item.name}
                  />
                  <TdWithOverlay
                    catalog={this.props.catalogs.mnt_types}
                    overlay={order.mnts}
                    value={order.item.ser_num}
                  />
                  <td>{order.date_out ? formatDate(new Date(order.date_out), this.locale) : ''}</td>
                  <td>{getOrderSum(order)}</td>
                  <td>{getOrderPayments(order)}</td>
                  <TdWithClientInfo
                    client={order.client}
                    options={this.props.options}
                    onClick={this.btnClientEditClick}
                  />
                  <TdWithOrderButtons
                    order={order}
                    options={this.props.options}
                    callbacks={{
                      btnOrderEdit: this.btnOrderEdit,
                      btnOrderOut: this.btnOrderOut,
                      btnOrderRepeat: this.btnOrderRepeat,
                    }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
}

Orders.defaultProps = {
  options: {
    withButtons: true,
    withClientInfo: true,
    withSearch: true,
    withFilter: true,
    withTableHeader: true,
  },
};

const mapStateToProps = state => {
  return {
    search: state.orders.search,
    filter: state.orders.filter,
    loading: state.orders.loading,
    orders: state.orders.orders,
    catalogs: state.catalogs,
    sorted_by: state.orders.sorted_by,
    update: state.update.update,
  };
};

export default connect(mapStateToProps, {
  getOrdersList,
  setInitialFilter,
  btnOrderOutClick,
  btnOrdersFilterClick,
  btnOrderClick,
  btnOrdersSortClick,
  searchOrders,
  btnClientEditClick,
  getCatalogs,
  setUpdate,
})(Orders);
