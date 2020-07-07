import { deepObjectCopy } from "./utils";

const notificationSettings = {
  push: {
    NEW_MESSAGE: { description: "New message", on: true },
    USER_JOIN_LEAVE: { description: "User joins/leaves", on: false },
    USER_NAME_CHANGE: { description: "User changes name", on: false },
  },
  audio: {
    NEW_MESSAGE: { description: "New message", on: true },
    USER_JOIN_LEAVE: { description: "User joins/leaves", on: false },
    USER_NAME_CHANGE: { description: "User changes name", on: false },
  },
};

function storeInitialSettings(type) {
  const initialSettings = {};
  Object.entries(notificationSettings[type]).forEach(
    ([key, value]) => (initialSettings[key] = value.on)
  );

  localStorage.setItem(
    `${type}-notifications`,
    JSON.stringify(initialSettings)
  );
}

function loadStoredSettings(type) {
  Object.entries(
    JSON.parse(localStorage.getItem(`${type}-notifications`))
  ).forEach(([key, value]) => (notificationSettings[type][key].on = value));
}

if (!localStorage.getItem("push-notifications")) {
  storeInitialSettings("push");
} else {
  loadStoredSettings("push");
}

if (!localStorage.getItem("audio-notifications")) {
  storeInitialSettings("audio");
} else {
  loadStoredSettings("audio");
}

export function getAllNotificationSettings() {
  return deepObjectCopy(notificationSettings);
}

export function getNotificationSettings(type) {
  return deepObjectCopy(notificationSettings[type]);
}

export function toggleNotificationSetting(type, key) {
  const oldSettings = JSON.parse(localStorage.getItem(`${type}-notifications`));

  notificationSettings[type][key].on = !notificationSettings[type][key].on;
  oldSettings[key] = notificationSettings[type][key].on;

  localStorage.setItem(`${type}-notifications`, JSON.stringify(oldSettings));

  return notificationSettings[type][key].on;
}
