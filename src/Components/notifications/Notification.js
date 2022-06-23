import {notification } from "antd";

const openNotificationWithIcon = (type,message,description) => {
    notification[type]({message,description});
  };


  export const successNotification = (message,description) =>
    openNotificationWithIcon('success',message,description,6);

  export const errorNotification = (message,description) =>
  openNotificationWithIcon('error',message,description);

  export const warningNotification = (message,description) =>
  openNotificationWithIcon('erwarningror',message,description);

  export const infoNotification = (message,description) =>
  openNotificationWithIcon('info',message,description);