import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AlertReducer from "./reducers/alert.reducer";
import Auth from "./reducers/auth.reducer";
import thunk from "redux-thunk";
import { loadUser } from "./actions/auth.action";
import ProfileReducer from "./reducers/profile.reducer";
import PostReducer from "./reducers/post.reducer";

const rootReducer = combineReducers({
  alert: AlertReducer,
  auth: Auth,
  profile: ProfileReducer,
  post: PostReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

store.dispatch(loadUser());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
