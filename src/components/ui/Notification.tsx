import { useAppDispatch, useAppSelector } from "@hooks";
import { setNotificationTitle } from "@store";
import { ReactNode, memo, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (): ReactNode => {
  const { title, delay, type } = useAppSelector(state => state.notificationReducer);
  const dispatch = useAppDispatch();

  const notify = (): ReactNode =>
    toast[type](title, {
      onClose: () => {
        dispatch(setNotificationTitle(""));
      },
    });

  useEffect(() => {
    if (title) {
      notify();
    }
  }, [title]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={delay}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ color: "green" }}
      theme="dark"
    />
  );
};

export default memo(Notification);
