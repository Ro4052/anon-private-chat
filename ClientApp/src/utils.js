export const isValidGuid = id =>
  id.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );

export function formatKeys(obj) {
  const formattedObj = {};
  Object.entries(obj).forEach(([key, value]) => {
    formattedObj[key.charAt(0).toLowerCase() + key.slice(1)] = value;
  });

  return formattedObj;
}
