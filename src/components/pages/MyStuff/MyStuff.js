import './MyStuff.scss';
import React from 'react';
import stuffData from '../../../helpers/data/stuffData';
import authData from '../../../helpers/data/authData';
import Items from '../../shared/Items/Items';

class MyStuff extends React.Component {
  state = {
    items: [],
  }

  getStuff = () => {
    const uid = authData.getUid();
    stuffData.getStuffByUid(uid)
      .then((stuff) => {
        this.setState({ items: stuff });
      }).catch((err) => console.error('error from MyStuff', err));
  }

  componentDidMount() {
    this.getStuff();
  }

  deleteStuff = (itemId) => {
    stuffData.removeStuff(itemId)
      .then(() => {
        this.getStuff();
      }).catch((err) => console.error('error from mystuff delete', err));
  }

  render() {
    const { items } = this.state;
    const buildItems = items.map((item) => <Items key={item.id} item={item} deleteStuff={this.deleteStuff} />);

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
