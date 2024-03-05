import { getExpirationDateFormat } from "@/utils/getExpirationDateFormat.ts";
import { isBefore } from "date-fns";

export const checkOnCurrentExpirationDate = (expirationDate: string): boolean => {
  return isBefore(new Date(), getExpirationDateFormat(expirationDate));
};
