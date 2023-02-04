import Modal from '@components/UI/Modal/Modal';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './committee.module.scss';
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import BreadCrumb from '@components/Navbar/BreadCrumb';
import { uploadImage } from '@shared/utility';

const index = () => {
  const [show, setShow] = React.useState(false);
  const [committees, setCommittees] = useState([
    {
      name: 'johndoe',
      presidentEmail: "noman.khan@gmail.com",
      type: "admin",
      created: '',
    }
  ])
  const [newCommittee, setNewCommittee] = useState({
    name: '',
    presidentEmail: '',
    type: '',
    profilePic: ''
  })
  const fileRef = useRef();
  const dragRef = useRef(null);
  const [prevImg, setPrevImg] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    updateNewCommitteeData();
  }, [prevImg]);

  const updateNewCommitteeData = async () => {
    try {
      if (files.length > 0) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "itlab_image_store_preset");
        data.append("cloud_name", "dl8hmamey");
        fetch("https://api.cloudinary.com/v1_1/dl8hmamey/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            setNewCommittee({ ...newCommittee, profilePic: data.url });
          })
          .catch((err) => console.log(err));

      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }

  }

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


  const addCommittee = (e) => {
    e.preventDefault();
    console.log(newCommittee);
  }

  const deleteCommittee = (id) => {

  }

  const onChange = (e) => {
    setNewCommittee({ ...newCommittee, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.Committee}>
      <Modal show={show} hideBackdrop={() => setShow(false)} name="add-user">
        <div className={styles.User_form}>
          <h1 className="text-2xl font-bold">Add User</h1>
          <form className="flex flex-col gap-5 mt-5">
            <div className={styles.form_item}>
              <label htmlFor="name">Committee Name</label>
              <input type="text" onChange={onChange} name="name" placeholder='Committee Name' id="username" />
            </div>
            <div className={styles.form_item}>
              <label htmlFor="presidentEmail">President Email</label>
              <input type="email" onChange={onChange} name="presidentEmail" id="email" placeholder='Presidents Email' />
            </div>
            <div className={styles.form_item}>
              <label htmlFor="type">Type</label>
              <select name="type" id="type" onChange={onChange}>
                <option value="admin">Technical</option>
                <option value="faculty">Cultural</option>
                <option value="student">Esports</option>
                <option value="student">Sports</option>
              </select>
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
                    <div className={styles.browse_btn} onClick={handleFileBtnClick}>
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
            <button onClick={addCommittee} className={styles.btn_primary}>Add Committee</button>
          </form>
        </div>
      </Modal>
      <BreadCrumb />
      <div className="flex flex-row justify-between my-5">
        <h1>Faculty Instructor Accounts</h1>
        <button onClick={() => {
          setShow(true);
        }} className={styles.btn_primary}>Add Committee</button>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className={styles.head_list}>
          <th scope="col" className={styles.list_item}>Committee</th>
          <th scope="col" className={styles.list_item}>Name</th>
          <th scope="col" className={styles.list_item}>President</th>
          <th scope="col" className={styles.list_item}>Type Of Work</th>
          <th scope="col" className={styles.list_item}>Delete</th>
        </thead>
        <tbody className={styles.row_list}>
          {
            committees.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className={styles.list_item}>
                  <img src={"https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"} alt="" />
                </td>
                <td className={styles.list_item}>{user?.name}</td>
                <td className={styles.list_item}>{user?.presidentEmail}</td>
                <td className={styles.list_item}>{user?.type}</td>
                <td onClick={deleteCommittee} className={styles.del}>
                  <AiFillDelete />
                  Delete
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default index