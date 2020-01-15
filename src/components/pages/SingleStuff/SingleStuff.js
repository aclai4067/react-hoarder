import './SingleStuff.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import stuffData from '../../../helpers/data/stuffData';

class SingleStuff extends React.Component {
  state = {
    item: {},
  }

  componentDidMount() {
    const { stuffId } = this.props.match.params;
    stuffData.getStuffById(stuffId)
      .then((response) => {
        const item = response.data;
        this.setState({ item });
      }).catch((err) => console.error('error from singleStuff', err));
  }

  render() {
    const { item } = this.state;
    const { stuffId } = this.props.match.params;

    return (
      <div className='SingleStuff'>
        <h1>{item.itemName}</h1>
        <div>
          <Link className='btn btn-light m-2' to={`/stuff/${stuffId}/edit`}>Edit</Link>
          <button className='btn btn-dark m-2'>Delete</button>
        </div>
        <img className='itemImg' src={item.itemImage} alt={item.itemName} />
        <p className='pt-4'>{item.itemDescription}</p>
      </div>
    );
  }
}

export default SingleStuff;
