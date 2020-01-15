import './MyStuff.scss';
import React from 'react';
import stuffData from '../../../helpers/data/stuffData';
import authData from '../../../helpers/data/authData';
import Items from '../../shared/Items/Items';

class MyStuff extends React.Component {
  state = {
    items: [],
  }

  componentDidMount() {
    const uid = authData.getUid();
    stuffData.getStuffByUid(uid)
      .then((stuff) => {
        this.setState({ items: stuff });
      }).catch((err) => console.error('error from MyStuff', err));
  }

  render() {
    const { items } = this.state;
    const buildItems = items.map((item) => <Items key={item.id} item={item} />);

    return (
      <div className='MyStuff'>
        <h1>My Stuff</h1>
        <div className='d-flex flex-wrap justify-content-around'>
          { buildItems }
        </div>
      </div>
    );
  }
}

export default MyStuff;
