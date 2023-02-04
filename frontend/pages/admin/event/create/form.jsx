import BreadCrumb from "@components/Navbar/BreadCrumb";
import InputField from "@components/UI/InputField";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import('@components/UI/RichTextEditor'), { ssr: false });
import { AiOutlineSearch } from "react-icons/ai";

import { useState } from "react";

export default function CreateEvent() {

    const [event, setEvent] = useState({
        title: "",
        description: "",
        commitee: "",
        img: "",
        startTime: "",
        endTime: "",
        budget: "",
        startDate: "",
        prize: "",
        endDate: "",
        rooms: {
            labs: 0,
            classRoom: 0,
            hall: 0,
        },
    });

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold my-5 mb-7">Create Event</h1>
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
                        handleChange={() => (e) => {
                            console.log(e.target.value)
                            setEvent({ ...event, commitee: e.target.value })
                        }}
                        label="Committee Name"
                        value={event.commitee}
                    />
                </div>
                <InputField
                    type={"file"}
                    label="Event Image"
                    key="event_image"
                    value={event.img}
                />
                <div className="flex gap-10">
                    <InputField
                        type="date"
                        placeholder="2021-12-31 23:59:59"
                        key={"event_start_time"}
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
        </div>
    )
}