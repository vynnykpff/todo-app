export const isValidField = (item: string): string => {
  return item.replace(/[@#№$%^&*()\\[\]_+={}<>/|]/g, "");
};
