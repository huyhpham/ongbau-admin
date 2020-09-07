import * as Actions from '../actions';

export function increaseCounter(volume = 1) {
	return { type: Actions.IncreaseCounter, volume };
}

export function getUser(user) {
	return { type: Actions.GetUser, user };
}

export function login(credentials, history) {
	return { type: Actions.Login, payload: {credentials, history} };
}

export function getError(error) {
	return { type: Actions.GetError, error }
}

export function getSuccess(success) {
	return { type: Actions.GetSuccess, success }
}

export function getCustomerList() {
	return { type: Actions.GetCustomerList }
}

export function saveCustomerList(customerList) {
	return { type: Actions.SaveCustomerList, customerList }
}

export function updatePatientId(updateValues) {
	return { type: Actions.UpdatePatientId, updateValues }
}

export function updateUserPassword(updateValues) {
	return { type: Actions.UpdateUserPassword, updateValues }
}

export function getCustomerListByMonth(values, current) {
	return { type: Actions.GetCustomerListByMonth, payload: {values, current} }
}

export function getCurrMonthCustomer(values) {
	return { type: Actions.GetCurrMonthCustomer, values }
}

export function getLastMonthCustomer(values) {
	return { type: Actions.GetLastMonthCustomer, values }
}

export function addNewItem(values) {
	return { type: Actions.AddNewItem, values }
}

export function getNewItem(values) {
	return { type: Actions.GetNewItem, values }
}

export function getEmployeeSalaryList(values) {
	return { type: Actions.GetEmployeeSalaryList, values }
}