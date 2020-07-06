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
}

function createAudioNotification() {
  notificationAudio.play();
}
