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

const store = configureStore();
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleExpense = selectExpenses(state.expenses, state.filters);
    console.log(visibleExpense);
});

store.dispatch(addExpense({ description: "Water bill", amount: 4500 }));
store.dispatch(addExpense({ description: "Gas bill", createdAt: 1000 }));
store.dispatch(addExpense({ description: "Rent", amount: 109500 }));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));