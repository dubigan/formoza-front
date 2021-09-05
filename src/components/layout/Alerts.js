import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
  static propTypes = {
    error: PropTypes.any.isRequired,
    message: PropTypes.any.isRequired,
  };

  errKeys = {
    first_name: 'Имя',
    last_name: 'Фамилия',
    email: 'email',
    phones: 'Телефон',
  };

  componentDidUpdate(prevProp) {
    const { error, alert, message } = this.props;
    if (error !== prevProp.error) {
      if (error.status >= 400 && error.status < 500 && error.msg) {
        console.log('Alerts error.status', error.status);
        const errKeys = Object.keys(error.msg);
        if (typeof error.msg !== 'string' && errKeys.length > 0) {
          errKeys.map(key => {
            console.log('Alerts error key', key);

            try {
              switch (key) {
                case 'phones':
                  error.msg[key].map((phone, index) => {
                    if (phone.phone) {
                      alert.error(`${this.errKeys[key]}: ${phone.phone.join(', ')}`);
                    }
                    if ('non_field_errors' in phone) {
                      alert.error(`${this.errKeys[key]}: ${phone.non_field_errors.join(', ')}`);
                    }
                  });
                default:
                  if (typeof error.msg[key].join === 'function')
                    alert.error(`${this.errKeys[key]}: ${error.msg[key].join(', ')}`);
                  else alert.error(`${this.errKeys[key]}: ${JSON.stringify(error.msg)}`);
              }
            } catch (e) {
              console.log('Alerts', e.message);

              alert.error(`${this.errKeys[key]}: ${JSON.stringify(error.msg)}`);
            }
          });
        } else {
          alert.error(error.msg);
        }
      }
    }

    //if (error.status >= 500 && error.msg) alert.error(JSON.stringify(error.msg));

    if (message !== prevProp.message) {
      if (message.msg) alert.success(message.msg);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
