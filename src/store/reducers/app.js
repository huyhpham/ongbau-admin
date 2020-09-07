  import * as Actions from '../actions';

const initialState = {
	user: {},
	customerList: [],
	currMonthCustomer: 0,
	lastMonthCustomer: 0,
	newItem: {},
	employeeSalaryList: [],
	employeeList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
	case Actions.GetUser:
		return { ...state, user: action.user };
	case Actions.SaveCustomerList:
		return { ...state, customerList: action.customerList};
	case Actions.GetCurrMonthCustomer: 
		 return { ...state, currMonthCustomer: action.values };
	case Actions.GetLastMonthCustomer: 
		 return { ...state, lastMonthCustomer: action.values };
	case Actions.GetNewItem:
		return { ...state, newItem: action.values };
	case Actions.GetEmployeeSalaryList:
		return { ...state, employeeSalaryList: state.employeeSalaryList.concat(action.values) };
	case Actions.SaveEmployeeList:
		return { ...state, employeeList: action.values };
	default:
		return state;
	}
};