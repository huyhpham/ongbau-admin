import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import * as actions from '../actions';
import * as appActions from '../actions/app';
import axios from 'axios';
import { api } from '../../utils/configs';
import { take } from 'lodash';

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

function removeEmployeeSalary(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/salary/delete`, values,
        { headers: { Authorization: token } }
    );
}

function addNewItem(values) {
    return axios.post(`${api.live}/item/create-item`, values);
}

function addEmployeeSalary(values) {
    return axios.post(`${api.live}/salary/create-salary`, values);
}

function updateSalaryToApi(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.patch(`${api.live}/setting/update-salary`, values,
        { headers: { Authorization: token } }
    );
}

function updateDrink(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/drink/update`, values,
        { headers: { Authorization: token } }
    );
}

function updateIncome(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/income/update`, values,
        { headers: { Authorization: token } }
    );
}

function updateEmployeeSalary(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/salary/update`, values,
        { headers: { Authorization: token } }
    );
}

function getSalaryListFromApi(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/setting/category-salary`, values,
        { headers: { Authorization: token } }
    );
}

function addExpenseItem(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/interest/create`, values,
        { headers: { Authorization: token } }
    );
}

function addIncomeItem(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/income/create`, values,
        { headers: { Authorization: token } }
    );
}

function addDrinkItem(values) {
    const token = localStorage.getItem('silverBullet');
    return axios.post(`${api.live}/drink/create`, values,
        { headers: { Authorization: token } }
    );
}

function getDrinkItem() {
    const token = localStorage.getItem('silverBullet');
    return axios.get(`${api.live}/drink/`,
        { headers: { Authorization: token } }
    );
}

function getIncomeList() {
    const token = localStorage.getItem('silverBullet');
    return axios.get(`${api.live}/income/`,
        { headers: { Authorization: token } }
    );
}

function getEmployeeSalary() {
    const token = localStorage.getItem('silverBullet');
    return axios.get(`${api.live}/salary/`,
        { headers: { Authorization: token } }
    );
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
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
    }
}

export function* addEmployeeSalarySaga(action) {
    try {
        const response = yield call(addEmployeeSalary, action.values);
        if (response.status === 200) {
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
    }
}

export function* addExpenseItemSaga(action) {
    try {
        const response = yield call(addExpenseItem, action.values);
        if (response.status === 200) {
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
    }
}

export function* addIncomeItemSaga(action) {
    try {
        const response = yield call(addIncomeItem, action.values);
        if (response.status === 200) {
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
    }
}

export function* addDrinkItemSaga(action) {
    try {
        const response = yield call(addDrinkItem, action.values);
        if (response.status === 200) {
            yield put(appActions.getSuccess(true));
            yield put(appActions.getError(false));
        }
    } catch (err) {
        yield put(appActions.getSuccess(false));
        yield put(appActions.getError(true));
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

export function* getSalaryListSaga(action) {
    try {
        const response = yield call(getSalaryListFromApi, action.values);
        if(response.status === 200) {
            yield put(appActions.saveSalaryList(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getDrinkItemSaga() {
    try {
        const response = yield call(getDrinkItem);
        if(response.status === 200) {
            yield put(appActions.saveDrinkItem(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getIncomeListSaga() {
    try {
        const response = yield call(getIncomeList);
        if(response.status === 200) {
            yield put(appActions.saveIncomeList(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getEmployeeSalarySaga() {
    try {
        const response = yield call(getEmployeeSalary);
        if(response.status === 200) {
            yield put(appActions.saveEmployeeSalary(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* updateSalarySaga(action) {
    try {
        const response = yield call(updateSalaryToApi, action.values);
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

export function* updateDrinkSaga(action) {
    try {
        const response = yield call(updateDrink, action.values);
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

export function* updateEmployeeSalarySaga(action) {
    try {
        const response = yield call(updateEmployeeSalary, action.values);
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

export function* updateIncomeSaga(action) {
    try {
        const response = yield call(updateIncome, action.values);
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

export function* removeEmployeeSalarySaga(action) {
    try {
        const response = yield call(removeEmployeeSalary, action.values);
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

export default function* userSagas() {
    yield all([
       takeEvery(actions.Login, loginSaga),
       takeEvery(actions.GetCustomerList, getCustomerListSaga),
       takeEvery(actions.UpdatePatientId, updatePatientIdSaga),
       takeEvery(actions.UpdateUserPassword, updateUserPasswordSaga),
       takeEvery(actions.GetCustomerListByMonth, getCustomerListByMonthSaga),
       takeEvery(actions.AddNewItem, addNewItemSaga),
       takeEvery(actions.GetEmployeeList, getEmployeeListSaga),
       takeEvery(actions.UpdateSalary, updateSalarySaga),
       takeEvery(actions.GetSalaryList, getSalaryListSaga),
       takeEvery(actions.AddEmployeeSalary, addEmployeeSalarySaga),
       takeEvery(actions.RemoveEmployeeSalary, removeEmployeeSalarySaga),
       takeEvery(actions.AddExpenseItem, addExpenseItemSaga),
       takeEvery(actions.GetDrinkItem, getDrinkItemSaga),
       takeEvery(actions.UpdateDrink, updateDrinkSaga),
       takeEvery(actions.UpdateIncome, updateIncomeSaga),
       takeEvery(actions.AddIncomeItem, addIncomeItemSaga),
       takeEvery(actions.AddDrinkItem, addDrinkItemSaga),
       takeEvery(actions.GetIncomeList, getIncomeListSaga),
       takeEvery(actions.GetEmployeeSalary, getEmployeeSalarySaga),
       takeEvery(actions.UpdateEmployeeSalary, updateEmployeeSalarySaga)
    ]);
}