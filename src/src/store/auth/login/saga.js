import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER } from './actionTypes';
import { apiError, loginUserSuccessful, logoutUserSuccess } from './actions';

// AUTH related methods
import { postLogin } from '../../../helpers/fackBackend_Helper';
import sampleAxios from '../../../helpers/axios_helper';
import { getFirebaseBackend } from '../../../helpers/firebase_helper';



//login methods



//Initilize firebase
const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { user, history } }) {
       console.log("T1 inside saga - loginuser-user",user);
        console.log("T1 inside saga - loginuser-history",history);
        try {
           console.log("T1 inside saga - loginuser",user);
            if(process.env.REACT_APP_DEFAULTAUTH === "firebase") {

                const response = yield call(sampleAxios.getuser());
                yield put(loginUserSuccessful(response));
            }
            else {
                //const userinfo = yield call(postLogin, 'http://localhost:8090http://locjjjalhost:3001/api/fms/user/login', {username: user.username, password: user.password});
                 const response = yield fetch('http://tmsx3.tema-systems.com:8050/api/fms/user/login', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                         'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                           username : user.username,
                          password: user.password
                        }),
                      })

                console.log("T1 inside saga -after call- respone",response)
                if(response.status == 200) {

              //   localStorage.setItem("authUser", JSON.stringify(response));
           //   this.handleResponse(response);
                const data = yield response.json()
                  console.log("T1 inside saga -after call- data",data)
                localStorage.setItem("authUser", JSON.stringify(data));
                yield put(loginUserSuccessful(response));
                }
                else if(response.status == 400){
                   console.log("bad response");
                  //  yield put(apiError(error));
                   window.alert("Login failed - Username & Password is incorrect");
                    history.push('/login');
                }else {
                 console.log("bad response");
                                  //  yield put(apiError(error));
                                   window.alert("something went wrong - please contact team");
                                    history.push('/login');
                }
            }
            history.push('/Scheduler2');
        } catch (error) {
            yield put(apiError(error));
            console.log("inside else loginfaield");
             history.push('/login');
        }
}

  const  handleResponse = (response)  => {
            console.log("T1 inside handleResponse",response)
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                      // logout();
                      //  location.reload(true);
                    }
                    const error = (data && data.message) || response.statusText;

                    return Promise.reject(error);
                }
                 console.log("T1 inside handleRespobse-after",data);
                return data;
            });
        }

function* logoutUser({ payload: { history } }) {
        console.log("logout - inside saga -after call- data",history);
    try {
        localStorage.removeItem("authUser");
         console.log("logout - inside saga -after call- data inside try");
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            console.log("logout- inside login saga - logoutUser function if",process.env.REACT_APP_DEFAULTAUTH);
            const response = yield call(fireBaseBackend.logout);
            yield put(logoutUserSuccess(response));
        }

        history.push('/login');

    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default loginSaga;




export function runLogoutTimer(dispatch , timer) {
   setTimeout(() => {
      logoutUser();
   },timer)
}