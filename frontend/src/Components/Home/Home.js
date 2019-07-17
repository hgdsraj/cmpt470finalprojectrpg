import React from 'react';
import './Home.scss';
import CustomNavbar from "../CustomNavbar/CustomNavbar";

class Home extends React.Component {
  render () {
    return (
      <div className="home-page">
        <CustomNavbar />
        <div className="home-page-content">
          <div className="centered-content home-page-centered-content">
            <h1>Hello, *Character Name*!</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;