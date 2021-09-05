import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
//import 'react-phone-input-2/lib/style.css';
import '../css/phone-input/bootstrap.css';

export class Phones extends Component {
  static propTypes = {
    phones: PropTypes.array.isRequired,
    delBtnClick: PropTypes.func.isRequired,
    addBtnClick: PropTypes.func.isRequired,
    changePhone: PropTypes.func.isRequired,
  };

  // digitsOnly = e => {
  //   let charCode = e.charCode;
  //   //console.log(charCode);
  //   if (charCode < 48 || charCode > 57) {
  //     // digits only
  //     e.preventDefault();
  //   }
  // };

  render() {
    return (
      <Card>
        <button
          className="btn btn-primary col-3"
          name="btnPhoneAdd"
          onClick={this.props.addBtnClick}
        >
          +
        </button>
        <Card.Body>
          {this.props.phones.map((phone, index) => (
            <Row key={index}>
              <div className="col-3">
                <PhoneInput
                  className="col-1"
                  country={'ru'}
                  onlyCountries={['ru']}
                  value={phone}
                  inputProps={{
                    name: 'phone-' + index,
                    //required: true,
                    autoFocus: true,
                  }}
                  disableCountryCode={true}
                  disableCountryGuess={true}
                  placeholder={'Телефон'}
                  onChange={this.props.changePhone}
                />
              </div>
              <div className="col-1">
                {this.props.phones.length > 1 && (
                  <button
                    className="btn btn-danger ps-6 pe-6"
                    name={'btnPhoneDel-' + index}
                    onClick={this.props.delBtnClick}
                  >
                    -
                  </button>
                )}
              </div>
            </Row>
          ))}
        </Card.Body>
      </Card>
    );
  }
}
