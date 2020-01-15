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

export default { getStuffByUid };
