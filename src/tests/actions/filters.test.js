import moment from "moment";
import {
    setStartDate,
    setEndDate,
    setTextFilter,
    sortByAmount,
    sortByDate
} from "../../actions/filters";

test("Should generate set start data action object", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    });
});

test("Should generate set end data action object", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    });
});

test("Shold generate set text filter object with text value", () => {
    const text = "Something in";
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: "Something in"
    });
});

test("Shold generate set text filter object with default value", () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    });
});

test("Shold generate action object for sort by date", () => {
    expect(sortByDate()).toEqual({
        type: "SORT_BY_DATE"
    })
});

test("Shold generate action object for sort by amount", () => {
    expect(sortByAmount()).toEqual({
        type: "SORT_BY_AMOUNT"
    })
});