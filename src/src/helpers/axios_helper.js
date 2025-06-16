import axios from "axios";

class sampleAxios {

executeuserwithID(){
return axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    
  })
  .catch(function (error) {
    // handle error
    
  })
  .then(function () {
    // always executed
  });
}
// Optionally the request above could also be done as
executeuser(){
return axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    
  })
  .catch(function (error) {
    
  })
  .then(function () {
    // always executed
  });
}
// Want to use async/await? Add the `async` keyword to your outer function/method.

loginuser(data){

const newUrl = 'http://localhost:8090/api/v1/user/login';
   
   
   
   let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Access-Control-Allow-Origin": "*",
     }
   };

 return axios.post('http://localhost:8090/api/v1/user/login', data, axiosConfig)
      .then(response => {
         
        if (response.status === 400 || response.status === 500)
            throw response;
        return response;
    }).catch(err => {
        throw err[1];
    });
}



 }


export default new sampleAxios();