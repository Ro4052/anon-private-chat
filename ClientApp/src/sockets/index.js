import handleMessage from "./message-receiver";

let socket = null;

export function connect(userId) {
  const wsProtocol = window.location.protocol === "http:" ? "ws" : "wss";
  const socketUrl =
    process.env.REACT_APP_SOCKET_URL ||
    `${wsProtocol}://${window.location.host}/ws`;
  socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log("Socket opened");
    socket.send(userId);
  };

  socket.onclose = () => {
    console.log("Socket closed");
  };

  socket.onerror = () => {
    console.log("Socket errored");
  };

  socket.onmessage = ({ data: msg }) => {
    handleMessage(JSON.parse(msg));
  };
}

export function disconnect() {
  if (socket?.readyState === 1) {
    socket.close();
    socket = null;
  }
}
