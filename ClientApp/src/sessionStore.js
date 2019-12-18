export function getUserId() {
  return sessionStorage.getItem("user-id");
}

export function setUserId(id) {
  sessionStorage.setItem("user-id", id);
}
