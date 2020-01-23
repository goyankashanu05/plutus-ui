import { FILTER_TODAY, FILTER_THIS_YEAR, FILTER_6_MONTH_AGO, FILTER_3_MONTH_AGO, FILTER_THIS_MONTH, FILTER_THIS_WEEK } from "./constants";

export const getStartEndDates = (dateFilterRange) => {
    let date =new Date()
    date.setHours(0, 0, 0,0);
    const start = parseInt(date.getTime() / 1000);
    date.setHours(23,59,59,999);
    const currentDate = parseInt(date.getTime() / 1000);
    return new Map()
        .set(FILTER_TODAY, { startDate: start, endDate: currentDate })
        .set(FILTER_THIS_WEEK, { startDate: getPastweekDate(), endDate: currentDate })
        .set(FILTER_THIS_MONTH, { startDate: getPastMonthsDate(1), endDate: currentDate })
        .set(FILTER_3_MONTH_AGO, { startDate: getPastMonthsDate(3), endDate: currentDate })
        .set(FILTER_6_MONTH_AGO, { startDate: getPastMonthsDate(6), endDate: currentDate })
        .set(FILTER_THIS_YEAR, { startDate: getPastMonthsDate(12), endDate: currentDate })
        .get(dateFilterRange);
};

export const getPastweekDate = () => {
    var curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const firstday = new Date(curr.setDate(first)).toUTCString();
    return parseInt(new Date(firstday).getTime() / 1000);
}
export const getPastMonthsDate = (month) => {
    var curr = new Date();
    curr.setMonth(curr.getMonth() - month);
    return parseInt(new Date(curr).getTime() / 1000);
}