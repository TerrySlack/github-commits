import { format } from "date-fns";

export const dateFormat = "MMMM d, yyyy 'at' hh:mm a";

export const formatDate = (dateString: string, dateFormat: string) =>
  format(new Date(dateString), dateFormat);
