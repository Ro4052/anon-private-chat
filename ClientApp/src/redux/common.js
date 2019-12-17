export function getActionSteps(action) {
  return {
    request: `${action}_REQUEST`,
    success: `${action}_SUCCESS`,
    failure: `${action}_FAILURE`
  };
}
