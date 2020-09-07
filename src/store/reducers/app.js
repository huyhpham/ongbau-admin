  import * as Actions from '../actions';

const initialState = {
	counter: 0,
	user: {},
	customerList: [],
	currMonthCustomer: 0,
	lastMonthCustomer: 0,
	newItem: {},
	employeeSalaryList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
	case Actions.IncreaseCounter:
		return { ...state, counter: state.counter + action.volume };
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
		return { ...state, employeeSalaryList: action.values };
	default:
		return state;
	}
};