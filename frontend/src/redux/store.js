import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { jobsReducer } from "./reducers/jobsReducer";
import { usersReducer } from "./reducers/usersReducer";



const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  usersReducer: usersReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
