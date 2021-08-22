import { store, ReactNotificationOptions } from "react-notifications-component";

const defaultOptions: ReactNotificationOptions = {
  insert: "top",
  container: "top-center",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 2000,
    onScreen: true,
  },
};

const useNotification = () => {
  const setErrorNotification = (message: string) => {
    store.addNotification({
      ...defaultOptions,
      type: "danger",
      title: "Error",
      message,
      dismiss: { ...defaultOptions.dismiss, duration: 4000 },
    });
  };

  const setSucceedNotification = (message: string) => {
    store.addNotification({
      ...defaultOptions,
      type: "success",
      title: "Success",
      message,
      dismiss: { ...defaultOptions.dismiss, duration: 2000 },
    });
  };

  return { setErrorNotification, setSucceedNotification };
};

export default useNotification;
