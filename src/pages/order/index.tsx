import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "../../components/orders/Item";
import Services from "../../components/orders/services";
import { getOrder, saveOrder, changeOrderDate } from "../../redux/actions/order";
import { btnClientEditClick } from "../../redux/actions/orders";
import { btnOrderOutClick } from "../../redux/actions/orderOut";
import { getCatalogs } from "../../redux/actions/catalogs";
import PropTypes from "prop-types";
import { ClientInfoButton } from "./parts/ClientInfo";
import { OrderDates } from "./parts/OrderDates";
import OrderOutDialog from "./parts/OrderOutDialog";
import Payments from "../../components/orders/Payments";
import Button from "../../components/layout/Button";
import Card from "../../components/layout/Card";

class OrderEdit extends Component {
    static propTypes = {
        catalogs: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired,
        getOrder: PropTypes.func.isRequired,
        saveOrder: PropTypes.func.isRequired,
    };

    url = "/sc/api/order/new/";

    componentDidMount() {
        if (this.props.catalogs.item_types.length === 0) this.props.getCatalogs();
        this.props.getOrder();
    }

    componentDidUpdate() {
        if (this.props.update) this.props.getOrder();
    }

    btnClientEditClick = (e) => {
        this.props.btnClientEditClick(e.target.value, this.url);
    };

    render() {
        return (
            <>
                <Card>
                    <Card.Header>
                        <ClientInfoButton
                            client={this.props.client}
                            onClick={this.btnClientEditClick}
                        />
                    </Card.Header>
                </Card>
                <OrderOutDialog />
                <OrderDates
                    order={this.props.order}
                    btnOrderOutClick={this.props.btnOrderOutClick}
                    onChange={this.props.changeOrderDate}
                />
                <Item />
                <Services disabled={this.props.item.id === null && "disable"} />
                <Payments disabled={this.props.item.id === null && "disable"} />
                <div className="oak-order-save-button">
                    <Button
                        //type="button"
                        className="oak-btn-primary oak-col-3 oak-mt-2"
                        name="save_order"
                        onClick={this.props.saveOrder.bind(this, this.props.item, this.props.order)}
                        disabled={this.props.item.id === null && "disable"}
                    >
                        Сохранить
                    </Button>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    catalogs: state.catalogs,
    item: state.order.item,
    order: state.order.order,
    client: state.order.client,
    showOutDialog: state.orderOut.show,
    update: state.update.update,
});

export default connect(mapStateToProps, {
    getOrder,
    saveOrder,
    btnClientEditClick,
    btnOrderOutClick,
    changeOrderDate,
    getCatalogs,
})(OrderEdit);
