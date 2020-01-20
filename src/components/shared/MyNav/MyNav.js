import './MyNav.scss';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    editMode: PropTypes.bool,
  }

  logoutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const navBuilder = () => {
      const { authed, editMode } = this.props;
      if (authed) {
        return (
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/stuff'>My Stuff</Link>
            </li>
            {
              (!editMode) && (
                <li className='nav-item'>
                  <Link className='nav-link hide' to='/stuff/new'>New</Link>
                </li>
              )
            }
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
          <Link className='navbar-brand' to='/'>Hoarder</Link>
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
