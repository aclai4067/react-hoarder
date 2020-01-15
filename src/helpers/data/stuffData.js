import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStuffByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const myStuff = response.data;
      const stuffArr = [];
      if (myStuff != null) {
        Object.keys(myStuff).forEach((fbId) => {
          myStuff[fbId].id = fbId;
          stuffArr.push(myStuff[fbId]);
        });
      }
      resolve(stuffArr);
    }).catch((err) => reject(err));
});

const getStuffById = (itemId) => axios.get(`${baseUrl}/items/${itemId}.json`);

export default { getStuffByUid, getStuffById };
