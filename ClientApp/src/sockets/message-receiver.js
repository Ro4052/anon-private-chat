export default function handleMessage(msg) {
  console.log(formatMessageKeys(msg));
}

function formatMessageKeys(msg) {
  const formattedMsg = {};
  Object.entries(msg).forEach(([key, value]) => {
    formattedMsg[key.charAt(0).toLowerCase() + key.slice(1)] = value;
  });

  return formattedMsg;
}
