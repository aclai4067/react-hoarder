import './MyStuff.scss';
import React from 'react';
import { Link } from 'react-router-dom';

class MyStuff extends React.Component {
  render() {
    const stuffId = 12345;

    return (
      <div className='MyStuff'>
        <h1>My Stuff</h1>
        <Link className='btn btn-light' to={`/stuff/${stuffId}`}>Single Item</Link>
        <Link className='btn btn-dark' to={`/stuff/${stuffId}/edit`}>Edit Item</Link>
      </div>
    );
  }
}

export default MyStuff;
