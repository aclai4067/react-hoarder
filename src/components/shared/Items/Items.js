import './Items.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import itemShape from '../../../helpers/propz/itemShape';

class Items extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
  }

  render() {
    const { item } = this.props;

    return (
      <div className='Items card col-3 m-2 p-0'>
        <button className='deleteBtn btn btn-danger close'>X</button>
        <img className='card-img' src={item.itemImage} alt={item.itemName} />
        <div className='card-body'>
          <h5 className='card-title'>{item.itemName}</h5>
        </div>
        <div>
          <Link className='btn btn-light col-5 m-1' to={`/stuff/${item.id}`}>View Details</Link>
          <Link className='btn btn-dark col-5 m-1' to={`/stuff/${item.id}/edit`}>Edit Item</Link>
        </div>
      </div>
    );
  }
}

export default Items;
