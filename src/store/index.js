import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import sagaMiddleware, { runSagas } from './sagas';
import allReducers from './reducers/index';
import { loadState } from '../localStorage';
const peristedState = loadState();

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const enhancers = composerEnhancers(
//     applyMiddleware(logger)
// );

// const store = createStore(
//     allReducers,
//     enhancers
// );

// export default store;

export default function configureStore(initialState) {
	const enhancers = composeEnhancers(
		applyMiddleware(
			//logger,
			sagaMiddleware,
		),
	);

	//const store = createStore(allReducers, enhancers);
	const store = initialState
		? createStore(allReducers, initialState, enhancers)
		: createStore(allReducers, enhancers);

	runSagas();
	return store;
}

export const appStore = configureStore(peristedState);