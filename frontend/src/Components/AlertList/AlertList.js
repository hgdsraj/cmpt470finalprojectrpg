import React from 'react';
import PropTypes from 'prop-types';
import './AlertList.scss';
import {
  ReactComponent as AlertListStyle
} from '../../Assets/CloseIcon24px.svg';

// functional component for a list of alerts, possibly errors
function AlertList(props) {
  let alertListClassName = 'alert-list';
  let alertListTextClassName = 'alert-list-text';
  let alertListStyle = null;
  if (props.isErrorAlertList) {
    alertListStyle = <AlertListStyle className="alert-list-error-list-style" fill="red"/>;
    alertListClassName += ' alert-list-error';
    alertListTextClassName += ' alert-list-error-text';
  }
  return (
    <div className="alert-list-container">
      <ul className={alertListClassName}>
        {
          props.messages.map((message, i) => {
            return <li key={i} className="alert-list-li">
              <div className="alert-list-li-div">
                {alertListStyle}
                <p className={alertListTextClassName}>
                  {message}
                </p>
              </div>
            </li>
          })
        }
      </ul>
    </div>
  );
}

AlertList.propTypes = {
  messages: PropTypes.array,
  isErrorAlertList: PropTypes.bool
};

export default AlertList;