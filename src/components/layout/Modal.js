import React, { Component } from 'react';

export const ModalHeader = ({ id, className, children }) => {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

export const ModalTitle = ({ id, className, children }) => {
  return (
    <div className={className} id={id}>
      <h4>{children}</h4>
    </div>
  );
};

export const ModalBody = ({ id, className, children }) => {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ id, className, children }) => {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

class Modal extends Component {
  changeShowStatus = () => {
    const $body = document.querySelector('body');
    const $modal = document.querySelector('#oak-modal');
    const $modalBackdrop = document.querySelector('#oak-modal-backdrop');
    if (this.props.show) {
      $body.className = 'oak-modal-open';
      $body.style.overflow = 'hidden';
      $body.style.paddingRight = '15px';
      $modalBackdrop.style.display = 'block';
      $modal.style.display = 'block';
    } else {
      $body.className = '';
      $body.style = '';
      $modal.style.display = 'none';
      $modalBackdrop.style.display = 'none';
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props.show != prevProps.show) {
      this.changeShowStatus();
    }
  }
  render() {
    return (
      <>
        <div id="oak-modal-backdrop" className="oak-modal-backdrop oak-show"></div>
        <div id="oak-modal" className="oak-modal oak-show">
          <div className="oak-modal-dialog">
            <div id={this.props.id} className={this.props.className}>
              {this.props.children}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Modal.defaultProps = {
  show: false,
  id: 'oak-modal-content',
  className: 'oak-modal-content',
};
ModalHeader.defaultProps = {
  id: 'modal-header',
  className: 'oak-modal-header',
};
ModalTitle.defaultProps = {
  id: 'modal-title',
  className: 'oak-modal-title',
};
ModalBody.defaultProps = {
  id: 'modal-body',
  className: 'oak-modal-body',
};
ModalFooter.defaultProps = {
  id: 'modal-footer',
  className: 'oak-modal-footer',
};

export default Modal;
