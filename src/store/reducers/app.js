  import * as Actions from '../actions';

const initialState = {
	user: {},
	customerList: [],
	currMonthCustomer: 0,
	lastMonthCustomer: 0,
	newItem: {},
	expenseItem: {},
	employeeSalaryList: [],
	employeeList: [],
	salaryList: [],
	drinkList: [],
	incomeList: [],
	employeeSalary: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case Actions.GetUser:
		return { ...state, user: action.user };
	case Actions.AddNewEmployeeList:
		return { ...state, employeeSalaryList: action.values };
	case Actions.GetCurrMonthCustomer: 
		 return { ...state, currMonthCustomer: action.values };
	case Actions.GetLastMonthCustomer: 
		 return { ...state, lastMonthCustomer: action.values };
	case Actions.GetNewItem:
		return { ...state, newItem: action.values };
	case Actions.GetExpenseItem:
		return { ...state, expenseItem: action.values };
	case Actions.GetEmployeeSalaryList:
		return { ...state, employeeSalaryList: state.employeeSalaryList.concat(action.values) };
	case Actions.SaveCustomerList:
		return { ...state, customerList: action.customerList};
	case Actions.SaveEmployeeList:
		return { ...state, employeeList: action.values };
	case Actions.SaveSalaryList:
		return { ...state, salaryList: action.values };
	case Actions.SaveDrinkItem:
		return { ...state, drinkList: action.values };
	case Actions.SaveIncomeList:
		return { ...state, incomeList: action.values };
	case Actions.SaveEmployeeSalary:
		return { ...state, employeeSalary: action.values };
	case Actions.ResetApp:
		return initialState;
	default:
		return state;
	}
};