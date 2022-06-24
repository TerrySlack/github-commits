//Find the max number of pages containing commits

export const getSubstring = (str: string, start: string, end?: string) => {
  //This will return the lastIndexOf for the string.  We need to increment by the length of start in order to slice correctly.
  const startIndex = str.lastIndexOf(start) + start.length;
  if (end) {
    const endIndex = str.lastIndexOf(end);
    return str.slice(startIndex, endIndex);
  }

  return str.slice(startIndex);
};
