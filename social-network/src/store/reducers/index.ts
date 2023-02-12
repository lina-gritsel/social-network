import { combineReducers } from "redux";

import users from "./reducers";

const rootReducer = combineReducers({ users });

export default rootReducer;
