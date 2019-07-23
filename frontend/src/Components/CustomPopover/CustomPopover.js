import React from 'react';
import PropTypes from 'prop-types';
import {Button, Popover, PopoverBody, PopoverHeader} from 'reactstrap';
import './CustomPopover.scss';
import {ReactComponent as Clear} from '../../Assets/CloseIcon24px.svg';

// Functional wrapper component for the reactstrap popover
function CustomPopover(props) {
  let closeButton = null;
  let popoverHeaderClassName = 'popover-header';
  if (props.isErrorPopover) {
    popoverHeaderClassName += ' popover-header-error';
  }
  if (props.hasCloseButton) {
    closeButton = <Button className="popover-close-button" onClick={props.handleClose}>
      <Clear/>
    </Button>;
  }
  return (
    <Popover placement={props.placement} target={props.target} className={props.className} isOpen={props.isOpen}>
      <PopoverHeader className={popoverHeaderClassName}>
        {props.headerMessage}
        {/* TODO: (MINOR) fix close button spacing in the header, it's a few pixels off */}
        {closeButton}
      </PopoverHeader>
      <PopoverBody>
        {props.bodyMessage}
      </PopoverBody>
    </Popover>
  );
}

CustomPopover.propTypes = {
  isErrorPopover: PropTypes.bool,
  isOpen: PropTypes.bool,
  hasCloseButton: PropTypes.bool,
  placement: PropTypes.string,
  target: PropTypes.string,
  className: PropTypes.string,
  headerMessage: PropTypes.string,
  bodyMessage: PropTypes.string,
  handleClose: PropTypes.func
};

export default CustomPopover;
