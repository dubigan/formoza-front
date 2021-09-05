import React from 'react';
import { connect } from 'react-redux';
import { addService, delService, changeService } from '../../actions/services';
import PropTypes from 'prop-types';
import { MultiForm } from '../common/MultiForm';
import { changeDiscount } from '../../actions/order';
import { formatCurrency, calcTotal } from '../common/common.tsx';

class Services extends MultiForm {
  static propTypes = {
    catalogs: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    add: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  };

  state = { total: 0 };

  getTitle = () => {
    return <div className="oakService__headerTitle oakService__headerTitle-mods">Работы</div>;
  };

  getFooterTitle = () => {
    return <div className="oakService__footerTitle oakService__footerTitle-mods">Скидка</div>;
  };

  componentDidUpdate(prevProps, prevSate) {
    const total = calcTotal(this.getEntities(), 'summa', this.props.discount);
    //console.log('Payments.ComponentDidUpdate', total);

    if (total != prevSate.total) this.setState({ total });
  }

  getTitleInfo = () => {
    return (
      <div className="oakService__headerInfo oakService__headerInfo-mods">
        {formatCurrency(this.state.total)}
      </div>
    );
  };

  getFooterInfo = () => {
    return (
      <div className="oakService__footerInfo">
        <input
          placeholder="Скидка"
          as="input"
          className="oakService__discount oakService__discount-mods" // oak-col-1 oak-text-right"
          name="discount"
          value={this.props.order.discount}
          onChange={this.props.changeDiscount}
        />
      </div>
    );
  };

  getEntities = () => {
    return this.props.order.mnts;
  };

  getForm = (service, index) => {
    return (
      <>
        <select
          as="select"
          className="oakService__select oakService__select-mods"
          // aria-describedby="phone-prefix"
          name={this.getNameWithPrefix('service-') + index}
          type="text"
          value={+service.mnt_type}
          onChange={this.props.change}
        >
          {this.updateServiceSelectList()}
        </select>
        <input
          as="input"
          className="oakService__summa oakService__summa-mods"
          // aria-describedby="phone-prefix"
          name={this.getNameWithPrefix('summa-') + index}
          type="text"
          value={service.summa}
          onChange={this.props.change}
          // onKeyPress={this.digitsOnly}
        />
      </>
    );
  };

  getMntTypeName = id => {
    const mnt = this.props.catalogs.mnt_types.find(mnt => {
      //console.log('getMntTypeName', mnt, id);
      return +mnt.id === +id;
    });
    return mnt ? mnt.name : '';
  };

  updateServiceSelectList = () => {
    if (this.props.item.id > -1) {
      const item_type = this.props.catalogs.item_types.find(type => {
        // console.log(
        //   'updateServiceSelectList',
        //   type.id,
        //   this.props.item.item_type
        // );

        return +type.id === +this.props.item.item_type;
      });
      //console.log('updateServiceSelectList item_type', item_type);

      if (item_type !== undefined) {
        let out = [
          <option value={-1} key={-10}>
            ----------------
          </option>,
        ];

        item_type.mnt_type.map((type, index) => {
          //console.log('updServSelList mnt_type', type);

          out.push(
            <option value={+type} key={index}>
              {this.getMntTypeName(type)}
            </option>
          );
        });
        return out;
      }
    }
    return null;
  };
}

const mapStateToProps = state => ({
  catalogs: state.catalogs,
  item: state.order.item,
  order: state.order.order,
  discount: state.order.order.discount,
});

const mapDispatchToProps = {
  add: addService,
  delete: delService,
  change: changeService,
  changeDiscount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
