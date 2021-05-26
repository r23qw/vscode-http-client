import { v1 as uuidv1 } from "uuid";

export const getID = () => {
  return uuidv1();
};
