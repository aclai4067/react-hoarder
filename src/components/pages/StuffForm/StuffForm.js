import './StuffForm.scss';
import React from 'react';
import authData from '../../../helpers/data/authData';
import stuffData from '../../../helpers/data/stuffData';

class StuffForm extends React.Component {
  state= {
    myItemName: '',
    myItemImage: '',
    myItemDescription: '',
  }

  saveNewItem = (e) => {
    e.preventDefault();
    const uid = authData.getUid();
    const itemObj = {
      itemName: this.state.myItemName,
      itemImage: this.state.myItemImage,
      itemDescription: this.state.myItemDescription,
      uid,
    };
    stuffData.saveStuff(itemObj)
      .then(() => {
        this.props.history.push('/stuff');
      }).catch((err) => console.error('error from saveNewItem', err));
  }

  changeName = (e) => {
    e.preventDefault();
    this.setState({ myItemName: e.target.value });
  }

  changeImg = (e) => {
    e.preventDefault();
    this.setState({ myItemImage: e.target.value });
  }

  changeDescription = (e) => {
    e.preventDefault();
    this.setState({ myItemDescription: e.target.value });
  }

  render() {
    return (
      <div className='StuffForm'>
        <h1>My Stuff</h1>
        <form className='col-6 offset-3'>
          <div className='form-group'>
            <label htmlFor='nameInput'>Name</label>
            <input type='text' className='form-control' id='nameInput' value={this.state.myItemName} onChange={this.changeName} placeholder='Enter the name of your item' />
          </div>
          <div className='form-group'>
            <label htmlFor='imageInput'>Image Url</label>
            <input type='text' className='form-control' id='imageInput' value={this.state.myItemImage} onChange={this.changeImg} placeholder='Enter an image url (ending in .jpg, .png, .gif, etc.)' />
          </div>
          <div className='form-group'>
            <label htmlFor='descriptionInput'>Description</label>
            <input type='text' className='form-control' id='descriptionInput' value={this.state.myItemDescription} onChange={this.changeDescription} placeholder='Enter a description of your item' />
          </div>
          <button className='btn btn-dark' onClick={this.saveNewItem}>Save</button>
        </form>
      </div>
    );
  }
}

export default StuffForm;
