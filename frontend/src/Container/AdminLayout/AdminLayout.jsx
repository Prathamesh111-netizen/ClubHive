import React, { useCallback, useEffect } from "react";
import styles from "./AdminLayout.module.scss";
import AdminSidebar from "@components/AdminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "@actions/index";
import Login from "pages/login";

const AdminLayout = ({ children }) => {
  let user = useSelector((state) => state.auth.user);
  try {
    if (!user) user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.log(err);
  }
  const dispatch = useDispatch();

  const onTryAutoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  );

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const Direct = () => {
    if (!user) {
      return (
        <>
          <Login />
        </>
      );
    }
    if (user.type === "User") {
      window.location.href = "/";
    } else {
      return (
        <>
          <AdminSidebar />
          <div className={styles.outlet_wrapper}>{children}</div>
        </>
      );
    }
  };

  return <div className={styles.Admin_layout}>{<Direct />}</div>;
};

export default AdminLayout;
