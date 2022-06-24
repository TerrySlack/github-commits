import orderBy from "lodash/orderBy";

// Sort the arr (array) by the columnName and direction, returning a newly sorted array
const customSort = (
  columnName: string,
  direction: boolean,
  arr: Array<unknown>
) => orderBy(arr, [columnName], [direction]);

export default customSort;
