import React from 'react';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import './CustomPopover.scss';
import { ReactComponent as Clear } from '../../Assets/CloseIcon24px.svg';

// Functional wrapper component for the reactstrap popover
function CustomPopover(props) {
  let closeButton = null;
  let popoverHeaderClassName = 'popover-header'
  if (props.isErrorPopover) {
    popoverHeaderClassName = 'popover-header popover-header-error'
  }
  if (props.hasCloseButton) {
    closeButton = <Button className="popover-close-button" onClick={props.handleClose}>
      <Clear />
    </Button>
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

export default CustomPopover;
