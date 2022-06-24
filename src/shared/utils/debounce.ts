import debouncer from "lodash/debounce";

export const debounce = (fn: Function, wait = 300) => debouncer(fn, wait);
