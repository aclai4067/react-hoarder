import './StuffForm.scss';
import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../../helpers/data/authData';
import stuffData from '../../../helpers/data/stuffData';

class StuffForm extends React.Component {
  state= {
    myItemName: '',
    myItemImage: '',
    myItemDescription: '',
  }

  static propTypes = {
    toggleEditMode: PropTypes.func,
  }

  componentDidMount() {
    const { stuffId } = this.props.match.params;
    const { toggleEditMode } = this.props;
    if (stuffId) {
      toggleEditMode();
      stuffData.getStuffById(stuffId)
        .then((response) => {
          const stuff = response.data;
          this.setState({ myItemName: stuff.itemName, myItemImage: stuff.itemImage, myItemDescription: stuff.itemDescription });
        }).catch((err) => console.error('error from stuffForm componentDidMount', err));
    }
  }

  componentWillUnmount() {
    const { stuffId } = this.props.match.params;
    if (stuffId) {
      const { toggleEditMode } = this.props;
      toggleEditMode();
    }
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

  updateItem = (e) => {
    e.preventDefault();
    const uid = authData.getUid();
    const { stuffId } = this.props.match.params;
    const updatedItem = {
      itemName: this.state.myItemName,
      itemImage: this.state.myItemImage,
      itemDescription: this.state.myItemDescription,
      uid,
    };
    stuffData.editStuff(stuffId, updatedItem)
      .then(() => {
        this.props.history.push('/stuff');
      }).catch((err) => console.error('error from updateItem', err));
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
    const { stuffId } = this.props.match.params;

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
          {
            (stuffId) ? (<button className='btn btn-dark' onClick={this.updateItem}>Update</button>) : (<button className='btn btn-dark' onClick={this.saveNewItem}>Save</button>)
          }
        </form>
      </div>
    );
  }
}

export default StuffForm;
