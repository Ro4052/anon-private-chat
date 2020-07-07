import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Icon, Checkbox } from "semantic-ui-react";

import { toggleNotificationSetting } from "../redux/user-reducer";

export default function Settings() {
  return (
    <Dropdown simple icon={<Icon name="setting" color="black" />}>
      <Dropdown.Menu>
        <Dropdown.Header content="Push Notifications" />
        <Dropdown.Divider />
        <Checkboxes type="push" />
        <Dropdown.Header content="Audio Notifications" />
        <Dropdown.Divider />
        <Checkboxes type="audio" />
      </Dropdown.Menu>
    </Dropdown>
  );
}

function Checkboxes({ type }) {
  const dispatch = useDispatch();
  const notificationSettings = useSelector(
    state => state.user.notificationSettings
  )[type];

  return Object.entries(notificationSettings).map(([settingKey, setting]) => (
    <Dropdown.Item key={`${type}-${settingKey}`}>
      <Checkbox
        toggle
        label={setting.description}
        checked={setting.on}
        onChange={() => dispatch(toggleNotificationSetting(type, settingKey))}
      />
    </Dropdown.Item>
  ));
}
