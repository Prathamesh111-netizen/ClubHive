import axios from "axios";
import * as actionTypes from "../constants/actionTypes";
import { toast } from "react-toastify";
import API from "@shared/API";
// import jwt from 'jsonwebtoken';
// import cookieCutter from 'cookie-cutter';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  localStorage.setItem("token", token);
  // localStorage.setItem("expiresIn", expiresIn);
  localStorage.setItem("user", JSON.stringify(user));

  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("user");

  return {
    type: actionTypes.AUTH_LOGOUT,
    token: null,
    user: null,
  };
};

export const authFail = (error, message) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    message: message,
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(authStart());
    try {
      API.post(`/user/login`, {
        email: email,
        password: password,
      })
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          const user = res.data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/";
          // const expiresIn = new Date(decoded.exp * 1000);

          dispatch(authSuccess(token, user));
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const signup = ({ email, password, name, profilePic }) => {
  return (dispatch) => {
    dispatch(authStart());
    try {
      API.post(`/user/register`, {
        email: email,
        password: password,
        name: name,
        profilePic: profilePic,
      })
        .then((res) => {
          let user = res.data.user;
          console.log(res.data.user);
          dispatch(authSuccess(null, user));
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    // const expiresIn = localStorage.getItem("expiresIn");

    // if (new Date().getTime() > +expiresIn) {
    // 	dispatch(logout(token));
    // } else {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      dispatch(authSuccess(token, parsedUser));
    }
    // }
  };
};
