import * as Actions from '../actions';

const initialState = {
	error: false,
	success: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case Actions.GetError:
		return { ...state, error: action.error }
	case Actions.GetSuccess:
		return { ...state, success: action.success }
	default:
		return state;
	}
};