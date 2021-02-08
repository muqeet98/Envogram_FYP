import axios from 'axios';
const baseUrl = 'https://envogram.softgear.site/';

export async function login(data){
  axios({
    method: 'post',
    url: baseUrl + 'login',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: data
  })
    .then(res => {
      let temp='';
      temp=JSON.stringify(res.data);
      return res.data;
    })
    .catch(err => {

    })
}

export const loginUser=(data => {

  axios({
    method: 'post',
    url: baseUrl + 'login',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: data
  })
    .then(res => {
      if(res.data.includes('Account not Activated')){
        console.warn('Account not Activated');
      }
      else{
        console.warn('Account Activated');
      }
    })
    .catch(err => {

    })

});


