import { RequestUrgency } from "@/__generated__/graphql";

export const URGENT_TYPE_TEXT = {
  [RequestUrgency.Urgent]: "Urgent",
  [RequestUrgency.None]: "Non Urgent",
  [RequestUrgency.Emergency]: "Emergency",
  [RequestUrgency.Less]: "Less Urgent",
};

export const REQUEST_STATUS = {
  OPEN: "OPEN",
  RESOLVED: "RESOLVED",
};

export const URGENT_TYPE_TEXT_COLOR = {
  [RequestUrgency.Urgent]: "text-spiced-orange",
  [RequestUrgency.None]: "text-emerald-green",
  [RequestUrgency.Emergency]: "text-crimson-blaze",
  [RequestUrgency.Less]: "text-royal-blue",
};
