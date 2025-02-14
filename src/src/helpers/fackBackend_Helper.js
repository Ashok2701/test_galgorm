import axios from 'axios';

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
    const user = localStorage.getItem('authUser');
    if (user)
        return JSON.parse(user);
    return null;
}

//is user is logged in
const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
}

/*
const postLogin = (url, data) => {
const newUrl = 'http://localhost:8090/api/v1/user/login';
   console.log("T1 data inside postlogin- url",url);
   console.log("T1 data inside postlogin- data",data);
   console.log("T1 data inside postlogin- newURL",newUrl);
   let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Access-Control-Allow-Origin": "*",
     }
   };

 return axios.post('http://localhost:8090/api/v1/user/login', data, axiosConfig)
      .then(response => {
         console.log("T1 response",data);
        if (response.status === 400 || response.status === 500)
            throw response;
        return response;
    }).catch(err => {
        throw err[1];
    });
    }
*/

// Register Method
const postRegister = (url, data) => {

    return axios.post(url, data).then(response => {
        if (response.status >= 200 || response.status <= 299)
            return response.data;
        throw response.data;
    }).catch(err => {
        var message;
        if (err.response && err.response.status ) {
            switch (err.response.status) {
                case 404: message = "Sorry! the page you are looking for could not be found"; break;
                case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                case 401: message = "Invalid credentials"; break;
                default: message = err[1]; break;
            }
        }
        throw message;
    });

}


// Login Method
const postLogin = (url, data) => {
   console.log("T1 data inside postlogin- url",url);
   console.log("T1 data inside postlogin- data",data);


 const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

         return fetch('/api/v1/user/login', requestOptions)
                    .then((response) => {
                          // store user details and jwt token in local storage to keep user logged in between page refreshes

                      localStorage.setItem('user', JSON.stringify(response));
                      console.log("T1 userdetails ",response);
                      return response;
                    }).catch(error => {
                        this.setState({ errorFlag: true });
                    });

        }
/*
        return fetch('/api/v1/user/login', requestOptions)
            .then(handleResponse(response)
            .then(user=> {
                                              console.log("T1 response",response);
                                             if (response.status === 400 || response.status === 500){
                                                  throw response;
                                             }
                                             else{

                                                 console.log("T1 after fetch- response",response);
                                             return response;
                                             }
                                         }).catch(err => {
                                             throw err[1];
                                         })
                                         }





    return axios.post(url, data).then(response => {
         console.log("T1 response",response);
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
*/


// postForgetPwd 
const postForgetPwd = (url, data) => {
    return axios.post(url, data).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;
        return response.data;
    }).catch(err => {
        throw err[1];
    });
}


export { getLoggedInUser, isUserAuthenticated, postRegister, postLogin, postForgetPwd }