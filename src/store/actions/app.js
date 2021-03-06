import * as Actions from '../actions';

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

export function addEmployeeSalary(values) {
	return { type: Actions.AddEmployeeSalary, values }
}

export function getNewItem(values) {
	return { type: Actions.GetNewItem, values }
}

export function getEmployeeSalaryList(values) {
	return { type: Actions.GetEmployeeSalaryList, values }
}

export function getEmployeeList(values) {
	return { type: Actions.GetEmployeeList, values }
}

export function getSalaryList(values) {
	return { type: Actions.GetSalaryList, values }
}

export function saveEmployeeList(values) {
	return { type: Actions.SaveEmployeeList, values }
}

export function saveSalaryList(values) {
	return { type: Actions.SaveSalaryList, values }
}

export function resetApp() {
	return { type: Actions.ResetApp };
}

export function updateSalary(values) {
	return { type: Actions.UpdateSalary, values }
}

export function addNewEmployeeList(values) {
	return { type: Actions.AddNewEmployeeList, values }
}

export function removeEmployeeSalary(values) {
	return { type: Actions.RemoveEmployeeSalary, values }
}

export function getExpenseItem(values) {
	return { type: Actions.GetExpenseItem, values }
}

export function addExpenseItem(values) {
	return { type: Actions.AddExpenseItem, values }
}

export function addIncomeItem(values) {
	return { type: Actions.AddIncomeItem, values }
}

export function addDrinkItem(values) {
	return { type: Actions.AddDrinkItem, values }
}

export function getDrinkItem() {
	return { type: Actions.GetDrinkItem }
}

export function getIncomeList() {
	return { type: Actions.GetIncomeList }
}

export function getEmployeeSalary() {
	return { type: Actions.GetEmployeeSalary }
}

export function saveDrinkItem(values) {
	return { type: Actions.SaveDrinkItem, values }
}

export function saveIncomeList(values) {
	return { type: Actions.SaveIncomeList, values }
}

export function saveEmployeeSalary(values) {
	return { type: Actions.SaveEmployeeSalary, values }
}

export function updateDrink(values) {
	return { type: Actions.UpdateDrink, values }
}

export function updateIncome(values) {
	return { type: Actions.UpdateIncome, values }
}

export function updateEmployeeSalary(values) {
	return { type: Actions.UpdateEmployeeSalary, values }
}