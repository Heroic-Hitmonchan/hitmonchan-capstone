import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from './redux/auth'
import theCamera from './redux/image'

const reducer = combineReducers({
    auth,
    theCamera
});

export const store = createStore(reducer,
    applyMiddleware(
        thunkMiddleware, createLogger()));
 



