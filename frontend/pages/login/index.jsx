import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import * as actions from "@actions/index";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const JWT = useSelector((state) => state.auth.JWT);
  const user = useSelector((state) => state.auth.user);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const Login = () => {
    dispatch(
      actions.login({
        email: loginData.email,
        password: loginData.password,
      })
    );
  };

  useEffect(() => {
    if (JWT) {
      if ((user.type && user.type !== "member") || user.type !== "User") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [JWT]);

  const loginInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <div className={styles.Login + " Container padding_top_nav"}>
      <div className={styles.login_container}>
        <h1>Welcome back to ClubHive</h1>
        <div className={styles.sub_util}>
          {!router.pathname.includes("admin") && (
            <>
              Dont have an account?{" "}
              <Link href="/signup">
                <span>Signup</span>
              </Link>
            </>
          )}
        </div>
        <div className={styles.form_container}>
          <div className={styles.input_container}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={loginData.email}
              onChange={loginInputHandler}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={loginInputHandler}
            />
          </div>
        </div>

        <div className={styles.login_btn} name="login_submit" onClick={Login}>
          Login
        </div>
      </div>

      {/* <div className={styles.login_image">
				<img src="/public/assets/images/loginImage.svg" alt="" />
			{/* <div className={styles.login_image">
				<img src="@assets/images/loginImage.svg" alt="" />
			</div> */}
    </div>
  );
};

export default Login;
