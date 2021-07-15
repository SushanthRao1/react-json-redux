import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reduer";

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === "dvelopment") {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;