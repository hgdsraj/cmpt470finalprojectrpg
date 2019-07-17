import React from 'react';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import './AppContainer.scss';

class AppContainer extends React.Component {
  render () {
    return (
      <div className="app-container">
        <header className="app-header">
          <CustomNavbar />
        </header>
      </div>
    )
  }
}

export default AppContainer;