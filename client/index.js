import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from './redux/auth'
import theCamera from './redux/image'
import spotifySongs from './redux/spotify'

const reducer = combineReducers({
    auth,
    theCamera,
    spotifySongs
});

export const store = createStore(reducer,
    applyMiddleware(
        thunkMiddleware, createLogger()));
 



