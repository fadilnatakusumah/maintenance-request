import { RequestUrgency } from "@/__generated__/graphql";
import Emoji from "react-emojis";

export const URGENT_EMOJI = {
  [RequestUrgency.Urgent]: <Emoji emoji="high-voltage" />,
  [RequestUrgency.None]: <Emoji emoji="slightly-smiling-face" />,
  [RequestUrgency.Emergency]: <Emoji emoji="fire" />,
  [RequestUrgency.Less]: <Emoji emoji="hammer" />,
};
