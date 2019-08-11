import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const config = {
    cartApi: 'http://localhost:4567/cart'
};

const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(config))
);

export default store;
