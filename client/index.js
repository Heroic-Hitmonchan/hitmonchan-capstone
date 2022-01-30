import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from './redux/auth'

const reducer = combineReducers({
    auth
});

export const store = createStore(reducer,
    applyMiddleware(
        thunkMiddleware, createLogger()));
 



