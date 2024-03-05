import { parse } from "date-fns";

export const getExpirationDateFormat = (date: string): Date => {
  return parse(date, "dd.MM.yyyy HH:mm", new Date());
};
