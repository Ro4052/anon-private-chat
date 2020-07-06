import { getDefaultedUserName, getStatusMessageText } from "./utils";

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

  createAudioNotification();
  createDesktopNotification(msg);
}

function createAudioNotification() {
  notificationAudio.play();
}

function createDesktopNotification(msg) {
  if (document.hasFocus()) return;

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
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
          title = defaultedUsername;
          options.body = msg.msg;
          break;
        }
        case "JOIN":
        case "LEAVE": {
          title = defaultedUsername;
          options.body = getStatusMessageText(msg, defaultedUsername);
          break;
        }
        case "UPDATE_USERNAME": {
          title = msg.user;
          options.body = getStatusMessageText(msg);
          break;
        }
      }

      new Notification(title, options);
    }
  });
}
