import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import './CustomSelectionModal.scss';

class CustomSelectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    }
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render () {
    const className = 'custom-selection-modal ' + this.props.className;
    return (
      <Modal isOpen={this.state.isOpen} toggle={this.handleClose} className={className}>
        <ModalHeader>
          <div className="custom-selection-modal-modal-header">
            {this.props.modalHeader}
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="custom-selection-modal-modal-body">
            {this.props.modalBody}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleClose}>{this.props.selectionButtonText}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CustomSelectionModal.propTypes = {
  modalHeader: PropTypes.element,
  modalBody: PropTypes.element,
  selectionButtonText: PropTypes.string,
  className: PropTypes.string
};

export default CustomSelectionModal;