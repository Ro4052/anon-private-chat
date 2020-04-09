import React from "react";
import { useSelector } from "react-redux";
import { Loader, Icon } from "semantic-ui-react";

export default function useLabelIcon() {
  const isUsernameLoading = useSelector(state => state.user.isUsernameLoading);
  const showUsernameUpdateSuccess = useSelector(
    state => state.user.showUsernameUpdateSuccess
  );
  const showUsernameUpdateFailure = useSelector(
    state => state.user.showUsernameUpdateFailure
  );

  if (isUsernameLoading) return <Loader inline inverted active size="mini" />;
  if (showUsernameUpdateSuccess)
    return <Icon name="check circle" color="green" />;
  if (showUsernameUpdateFailure)
    return <Icon name="times circle" color="red" />;

  return null;
}
