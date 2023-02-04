import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Signup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "@actions/index";
import { uploadImage } from "@shared/utility";
import API from "@shared/API";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    profilePic: null,
  });
  const fileRef = useRef();
  const dragRef = useRef(null);
  const [prevImg, setPrevImg] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    updateSignupData();
  }, [prevImg]);

  useEffect(() => {
    if (user) {
      toast.success("Signup Successful");
      window.location.href = "/login";
    }
  }, [user]);

  const updateSignupData = async () => {
    try {
      if (files.length > 0) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "itlab_image_store_preset");
        data.append("cloud_name", "dl8hmamey");
        fetch("  https://api.cloudinary.com/v1_1/dl8hmamey/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            setSignupData({ ...signupData, profilePic: data.url });
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const Signup = async () => {
    if (
      signupData.email === "" ||
      signupData.userName === "" ||
      signupData.password === "" ||
      signupData.image === null
    ) {
      toast.warn("Please fill all the fields");
      return;
    } else {
      dispatch(
        actions.signup({
          email: signupData.email,
          password: signupData.password,
          name: signupData.name,
          profilePic: signupData.profilePic,
        })
      );
    }
  };

  const signupInputHandler = (event) => {
    const { name, value } = event.target;
    setSignupData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleFileBtnClick = () => {
    fileRef.current.click();
  };

  const process = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;

        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
        setPrevImg(srcEncoded);
      };
    };
  };

  const handleFile = async (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      setFiles((prevFiles) => {
        return [...prevFiles, e.target.files[i]];
      });
    }
    await process(e.target.files[0]);
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "dragOver") dragRef.current.classList.add("active");
    else if (type === "dragLeave") dragRef.current.classList.remove("active");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.classList.remove("active");
    const uploadedFiles = e.dataTransfer.files;
    dragRef.current.classList.add("uploading");
    for (let i = 0; i < uploadedFiles.length; i++) {
      setFiles((prevFiles) => {
        return [...prevFiles, uploadedFiles[i]];
      });
    }
    await process(uploadedFiles[0]);
    dragRef.current.classList.remove("uploading");
  };

  return (
    <div className={styles.Signup + " Container padding_top_nav"}>
      {/* 
			<div className={styles.signup_image">
				<img src="@assets/images/signup.svg" alt="" />
			</div> */}
      <div className={styles.signup_container}>
        {/* <div className={styles.stamp"></div> */}

        <h1>Welcome back to ClubHive</h1>
        <div className={styles.sub_util}>
          Already have an account?{" "}
          <Link href="/login">
            <span>Login</span>
          </Link>
        </div>
        <div className={styles.form_container}>
          <div className={styles.input_container}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={signupInputHandler}
              value={signupData.email}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="name"
              onChange={signupInputHandler}
              value={signupData.username}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={signupInputHandler}
              value={signupData.password}
            />
          </div>

          <div className={styles.file_upload}>
            {files.length === 0 ? (
              <div className={styles.upload_img}>
                <div
                  ref={dragRef}
                  className={styles.drop_area}
                  onDragOver={(e) => handleDrag(e, "dragOver")}
                  onDragLeave={(e) => handleDrag(e, "dragLeave")}
                  onDrop={handleDrop}
                >
                  <h2>Drag & Drop your profile photo here</h2>
                  <span>OR</span>
                  <div
                    className={styles.browse_btn}
                    onClick={handleFileBtnClick}
                  >
                    Browse Files
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    onChange={handleFile}
                    multiple
                    hidden
                    id="myFile"
                    name="filename"
                  />
                </div>
              </div>
            ) : (
              <div className={styles.image_preview}>
                <img id="prev-img" src={prevImg} alt="" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.signup_btn} onClick={Signup}>
          Create Account
        </div>
      </div>
    </div>
  );
};

export default Signup;
