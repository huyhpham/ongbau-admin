import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import * as actions from '../actions';
import * as appActions from '../actions/app';
import axios from 'axios';
import { api } from '../../utils/configs';

function loginApi(authParams) {
    return axios.post(`${api.live}/auth/login`, authParams);
}

function getCustomerList() {
    const token = localStorage.getItem('silverBullet');
    return axios.get(`${api.live}/item/`, 
        { headers: { Authorization: token } }
    );
}

function updatePatient(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.put(`${api.live}/update-patientid`, values, {
        headers: { Authorization: token }
    });
}

function updateUserPassword(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.put(`${api.live}/change-user-password`, values, {
      headers: { Authorization: token }
    });
}

function getCustomerListByMonth(values) {
    console.log(values);
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/total-customer`, values, {
        headers: { Authorization: token }
    });
}

function getEmployeeList() {
    const token = localStorage.getItem('silverBullet');
    return axios.get(`${api.live}/employee/`, 
        { headers: { Authorization: token } }
    );
}

function addNewItem(values) {
    return axios.post(`${api.live}/item/create-item`, values);
}

export function* loginSaga(action) {
    try {
        const history = action.payload.history,
            credentials = action.payload.credentials;
        
        const response = yield call(loginApi, credentials);
        if (response.status === 200) {
            yield put(appActions.getError(false));
            localStorage.setItem('silverBullet', response.data.token);
            yield put(appActions.getUser(response.data));
            if (response.data.roleId === 1) {
                history.push('/dashboard');
            } else {
                history.push('/patient');
            }
            
        }
    } catch (err) {
        console.log(err);
        yield put(appActions.getError(true));
    }
}

export function* getCustomerListSaga() {
    try {
        const response = yield call(getCustomerList);
        if(response.status === 200) {
            yield put(appActions.saveCustomerList(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* updatePatientIdSaga(action) {
    try {
        const response = yield call(updatePatient, action.updateValues);
        if (response.status === 200) {
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        console.log(err);
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
    }
}

export function* updateUserPasswordSaga(action) {
    try {
        const response = yield call(updateUserPassword, action.updateValues);
        if (response.status === 200) {
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        console.log(err);
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
    }
}

export function* getCustomerListByMonthSaga(action) {
    try {
        const response = yield call(getCustomerListByMonth, action.payload.values);
        if (response.status === 200) {
            console.log(response);
            //yield put(appActions.getCustomerListByMonth(response.data));
            if (action.payload.current) {
                yield put(appActions.getCurrMonthCustomer(response.data.total));
            } else {
                yield put(appActions.getLastMonthCustomer(response.data.total));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export function* addNewItemSaga(action) {
    try {
        const response = yield call(addNewItem, action.values);
        if (response.status === 200) {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getEmployeeListSaga() {
    try {
        const response = yield call(getEmployeeList);
        if(response.status === 200) {
            yield put(appActions.saveEmployeeList(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}

export default function* userSagas() {
    yield all([
       takeEvery(actions.Login, loginSaga),
       takeEvery(actions.GetCustomerList, getCustomerListSaga),
       takeEvery(actions.UpdatePatientId, updatePatientIdSaga),
       takeEvery(actions.UpdateUserPassword, updateUserPasswordSaga),
       takeEvery(actions.GetCustomerListByMonth, getCustomerListByMonthSaga),
       takeEvery(actions.AddNewItem, addNewItemSaga),
       takeEvery(actions.GetEmployeeList, getEmployeeListSaga),
    ]);
}