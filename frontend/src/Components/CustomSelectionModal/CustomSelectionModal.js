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

function CustomSelectionModal(props) {
  const className = 'custom-selection-modal ' + props.className;
  return (
    <Modal isOpen={props.isOpen} className={className}>
      <ModalHeader>
        <div className="custom-selection-modal-modal-header">
          {props.modalHeader}
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="custom-selection-modal-modal-body">
          {props.modalBody}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={props.selectButtonDisabled} onClick={props.onSelect}>{props.selectionButtonText}</Button>
      </ModalFooter>
    </Modal>
  );
}

CustomSelectionModal.propTypes = {
  modalHeader: PropTypes.element,
  modalBody: PropTypes.element,
  isOpen: PropTypes.bool,
  selectButtonDisabled: PropTypes.bool,
  onSelect: PropTypes.func,
  selectionButtonText: PropTypes.string,
  className: PropTypes.string
};

export default CustomSelectionModal;