import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/Header';
import { Route, Switch } from 'react-router-dom';
import Clients from './clients/Clients';
import ClientEdit from './clients/ClientEdit';
import Orders from './orders/Orders';
import OrderEdit from './orders/OrderEdit';
import Login from './login/Login';
//import Dashboard from "./clients/Dashboard";
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from '../store';
import Alerts from './layout/Alerts';
import './css/oak-styles.scss';

const alertOptions = {
  timeout: 5000,
  position: 'top center',
};

class App extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container-fluid">
                <Switch>
                  <Route path="/sc/login" component={Login} />
                  <Route path="/sc/clients" component={Clients} />
                  <Route path="/sc/client/new" component={ClientEdit} />
                  <Route path="/sc/orders" component={Orders} />
                  <Route path="/sc/order/new" component={OrderEdit} />
                </Switch>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertProvider>
      </ReduxProvider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
