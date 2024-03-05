import { NotificationConstants, NotificationType } from "@/common/constants/NotificationConstants.ts";
import { NotificationActionTypes } from "@/common/types/Notification.ts";

const DEFAULT_NOTIFICATION_DELAY = 2000;

const initialState: NotificationState = {
  title: "",
  delay: DEFAULT_NOTIFICATION_DELAY,
  type: NotificationType.INFO,
};

export type NotificationState = {
  title: string;
  delay: number;
  type: NotificationType;
};

export const notificationReducer = (state = initialState, action: NotificationActionTypes): NotificationState => {
  switch (action.type) {
    case NotificationConstants.SET_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
      };
    case NotificationConstants.SET_NOTIFICATION_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};
