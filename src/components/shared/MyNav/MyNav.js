import './MyNav.scss';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logoutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const navBuilder = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='/'>Home</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>My Stuff</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>New</a>
            </li>
            <li className='nav-item'>
              <button className='btn btn-outline-dark' onClick={this.logoutEvent}>Log Out</button>
            </li>
          </ul>
        );
      }
      return (<ul className='navbar-nav ml-auto'></ul>);
    };

    return (
      <div className='MyNav'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='/'>Hoarder</a>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            { navBuilder() }
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNav;
