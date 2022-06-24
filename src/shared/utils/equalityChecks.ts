// Other Node Modules
import deepEqual from "deep-equal";
import isMatch from "lodash/isMatch";

//We won't know what the object typings are.  Unknown type which is the type-safe counterpart of the any type.
export const areEqual = (objectOne: unknown, objectTwo: unknown) =>
  deepEqual(objectOne, objectTwo, { strict: true });

export const areEqualNotStrict = (objectOne: unknown, objectTwo: object) =>
  deepEqual(objectOne, objectTwo);

// This will do a deep check of the two objects and determine if they are equal
export const areEqualShallow = (obj1: unknown, obj2: unknown) =>
  isMatch(obj1, obj2);
