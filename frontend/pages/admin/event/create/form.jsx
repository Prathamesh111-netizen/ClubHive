import InputField from "@components/UI/InputField";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import('@components/UI/RichTextEditor'), { ssr: false });
import { LoaderContext } from "pages/_app";

import { useContext, useRef, useState, useEffect } from "react";
import API from "@shared/API";
import styles from './create.module.scss';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import BreadCrumb from '@components/Navbar/BreadCrumb';
import { uploadImage } from '@shared/utility';

export default function CreateEvent() {
    const { loading, setLoading } = useContext(LoaderContext);
    const router = useRouter();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        committee: "",
        category: "",
        img: "",
        startTime: "",
        endTime: "",
        budget: "",
        startDate: "",
        endDate: "",
        rooms: {
            labs: 0,
            classRoom: 0,
            hall: 0,
        },
    });

    const fileRef = useRef();
    const dragRef = useRef(null);
    const [prevImg, setPrevImg] = useState();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        updateNewUserData();
    }, [prevImg]);

    const updateNewUserData = async () => {
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
                        console.log(data.url);
                        setEvent({ ...event, img: data.url });
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

    const createEvent = async () => {
        try {
            setLoading(true);
            const res = await API.post("/event", event, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            router.replace("/admin/events");
        }
        catch (err) {

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full text-xl">
            <h1 className="text-4xl font-bold my-5 mb-7">{`Create Event`}</h1>
            <div className="w-full h-1/2 rounded-md">
                <div className="flex gap-10">
                    <InputField
                        type="text"
                        placeholder="EPiC"
                        value={event.title}
                        key="event_name"
                        id={"title"}
                        handleChange={() => (e) => { setEvent({ ...event, title: e.target.value }) }}
                        disable={false}
                        label="Event Name"
                    />
                    <InputField
                        type="text"
                        placeholder="Enactus"
                        key="event_committee"
                        id="committee"
                        handleChange={() => (e) => { setEvent({ ...event, committee: e.target.value }) }}
                        label="Committee Name"
                        value={event.commitee}
                    />
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Category
                        </label>
                        <select className={"border rounded w-full py-2 px-3 text-gray-700 "} name="type" id="category" onChange={(e) => { setEvent({ ...event, category: e.target.value }) }}>
                            <option value="Member">Technical</option>
                            <option value="President">Cultural</option>
                            <option value="Dean Academics">Esports</option>
                            <option value="Mentor">Sports</option>
                            <option value="Mentor">Business</option>
                        </select>
                    </div>
                </div>

                <div className={styles.file_upload}>
                    <h3>Add banner</h3>
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

                <div className="flex gap-10">
                    <InputField
                        type="date"
                        placeholder="2021-12-31 23:59:59"
                        key={"event_start_date"}
                        label="Start Date"
                        value={event.startDate}
                        className="w-full px-4"
                        handleChange={() => (e) => { setEvent({ ...event, startDate: e.target.value }) }}
                    />
                    <InputField
                        type="time"
                        label="Start Time"
                        key={"event_start_time"}
                        value={event.startTime}
                        className="w-full px-4"
                        handleChange={() => (e) => { setEvent({ ...event, startTime: e.target.value }) }}
                    />
                </div>
                <div className="flex gap-10">
                    <InputField
                        type="date"
                        placeholder="2021-12-31 23:59:59"
                        key={"event_end_date"}
                        label="End Date"
                        value={event.endDate}
                        className="w-full px-4"
                        handleChange={() => (e) => { setEvent({ ...event, endDate: e.target.value }) }}
                    />
                    <InputField
                        type="time"
                        label="End Time"
                        key={"event_start_time"}
                        value={event.endTime}
                        className="w-full px-4"
                        handleChange={() => (e) => { setEvent({ ...event, endTime: e.target.value }) }}
                    />
                </div>
            </div>
            <RichTextEditor
                richText={event.description}
                setRichText={(text) => { setEvent({ ...event, description: text }) }}
            />
            <div className="flex my-5 gap-10">
                <InputField
                    type="number"
                    placeholder="1000"
                    label="Number of labs required"
                    value={event.rooms.labs}
                    handleChange={() => (e) => { setEvent({ ...event, rooms: { ...event.rooms, labs: e.target.value } }) }}
                    min={0}
                />
                <InputField
                    type="number"
                    placeholder={"100"}
                    label="Number of rooms required"
                    value={event.rooms.classRoom}
                    handleChange={() => (e) => { setEvent({ ...event, rooms: { ...event.rooms, classRoom: e.target.value } }) }}
                    min={0}
                />
                <InputField
                    type="number"
                    placeholder={"100"}
                    label="Number of halls required"
                    value={event.rooms.hall}
                    min={0}
                    handleChange={() => (e) => { setEvent({ ...event, rooms: { ...event.rooms, hall: e.target.value } }) }}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={createEvent}
            >
                Create Event
            </button>
        </div>
    )
}