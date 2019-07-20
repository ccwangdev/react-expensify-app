import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import AppRouter from "./routes/AppRouter";
import configureStore from "./store/configureStore";
import selectExpenses from "./selectors/expenses";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./firebase/firebase";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));