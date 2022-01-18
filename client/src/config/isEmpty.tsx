//* Check for empty values
export const  isEmpty = (obj: Object) => Object.values(obj).some((v) => {
  if (v === "") {
    return true;
  }
  return false;
});