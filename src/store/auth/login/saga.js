import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER } from './actionTypes';
import { apiError, loginUserSuccessful, logoutUserSuccess } from './actions';

// AUTH related methods
import { postLogin } from '../../../helpers/fackBackend_Helper';
import sampleAxios from '../../../helpers/axios_helper';
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

//backend url from .env
const apiUrl = process.env.REACT_APP_API_URL;

//login methods



//Initilize firebase
const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { user, history } }) {
    console.log("T1 inside saga - loginuser-user", user);
    console.log("T1 inside saga - loginuser-history", history);
    try {
        console.log("T1 inside saga - loginuser", user);
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {

            const response = yield call(sampleAxios.getuser());
            yield put(loginUserSuccessful(response));
        }
        else {
            //const userinfo = yield call(postLogin, 'http://localhost:8090/api/v1/user/login', {username: user.username, password: user.password});
            const response = yield fetch(`${apiUrl}/api/v1/user/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                }),
            })

            //  console.log("T1 inside saga -after call- respone",response)
            //   localStorage.setItem("authUser", JSON.stringify(response));
            if (response.status == 200) {
                const data = yield response.json()
                console.log("T1 inside saga -after call- data", data)
                localStorage.setItem("authUser", JSON.stringify(data));
                yield put(loginUserSuccessful(response));
            }
            else if (response.status == 400) {
                console.log("bad response");
                //  yield put(apiError(error));
                window.alert("Login failed - Username & Password is incorrect");
                history.push('/login');
            } else {
                console.log("bad response");
                //  yield put(apiError(error));
                window.alert("something went wrong - please contact team");
                history.push('/login');
            }
        }
        history.push('/dashboard');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
    console.log("logout - inside saga -after call- data", history);
    try {
        localStorage.removeItem("authUser");
        console.log("logout - inside saga -after call- data inside try");
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            console.log("logout- inside login saga - logoutUser function if", process.env.REACT_APP_DEFAULTAUTH);
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