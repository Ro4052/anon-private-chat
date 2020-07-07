import { getDefaultedUserName, getStatusMessageText } from "./utils";
import { getAllNotificationSettings } from "./localStore";

import notificationSound from "./assets/clearly.mp3";

const notificationAudio = new Audio(notificationSound);

export function sendMessageNotification({ msg }) {
  /***
   * 3 notification reasons:
   * - Message received (default on)
   * - User joins/leaves (default off)
   * - User changes name (default off)
   *
   * 2 types of notifications:
   * - Desktop (default on)
   * -- Only when app is not focused
   * - Audio (default on)
   */

  const notificationSettings = getAllNotificationSettings();

  createAudioNotification(msg, notificationSettings.audio);
  createPushNotification(msg, notificationSettings.push);
}

function createAudioNotification(msg, notificationSettings) {
  switch (msg.type) {
    case "MSG": {
      if (!notificationSettings.NEW_MESSAGE.on) return;
      break;
    }
    case "JOIN":
    case "LEAVE": {
      if (!notificationSettings.USER_JOIN_LEAVE.on) return;
      break;
    }
    case "UPDATE_USERNAME": {
      if (!notificationSettings.USER_NAME_CHANGE.on) return;
      break;
    }
    default: {
      return;
    }
  }
  notificationAudio.play();
}

function createPushNotification(msg, notificationSettings) {
  if (document.hasFocus()) return;

  if (!("Notification" in window)) {
    alert("This browser does not support push notification");
    return;
  }
  Notification.requestPermission(permission => {
    if (permission === "granted") {
      let title;
      const defaultedUsername = getDefaultedUserName(msg.user, false);
      const options = {
        silent: true,
        renotify: false,
        requireInteraction: false,
      };

      switch (msg.type) {
        case "MSG": {
          if (!notificationSettings.NEW_MESSAGE.on) return;
          title = defaultedUsername;
          options.body = msg.msg;
          break;
        }
        case "JOIN":
        case "LEAVE": {
          if (!notificationSettings.USER_JOIN_LEAVE.on) return;
          title = defaultedUsername;
          options.body = getStatusMessageText(msg, defaultedUsername);
          break;
        }
        case "UPDATE_USERNAME": {
          if (!notificationSettings.USER_NAME_CHANGE.on) return;
          title = msg.user;
          options.body = getStatusMessageText(msg);
          break;
        }
        default: {
          return;
        }
      }

      new Notification(title, options);
    }
  });
}
