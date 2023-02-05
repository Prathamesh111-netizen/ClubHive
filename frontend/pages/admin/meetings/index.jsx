import BreadCrumb from "@components/Navbar/BreadCrumb";
import { useEffect, useState } from "react";
import styles from "./meeting.module.scss";
import API from "@shared/API";
import moment from "moment/moment";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const getMeetings = async () => {
    try {
      const res = await API.get("/meetings");
      setMeetings(res.data.meetings);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    getMeetings();
  }, []);

  return (
    <div className={styles.Meeting + " m-10 text-2xl"}>
      <BreadCrumb />
      <table className="w-full border-collapse bg-white text-left text-3xl mt-8 text-gray-500">
        <thead className={styles.head_list}>
          <th scope="col" className={styles.list_item}>
            Meeting link
          </th>
          <th scope="col" className={styles.list_item}>
            Meeting ID
          </th>
          <th scope="col" className={styles.list_item}>
            Committee Name
          </th>
          <th scope="col" className={styles.list_item}>
            Created At
          </th>
        </thead>
        <tbody className={styles.row_list}>
          {meetings.map((meeting, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 text-1xl"
            >
              <td className={styles.list_item + " px-8 py-4"}>
                <a
                  className="hover:text-blue-600 hover:underline text-blue-600"
                  href={`http://localhost:5173/meeting/${meeting._id}`}
                >
                  Start Meeting
                </a>
              </td>
              <td className={styles.list_item}>{meeting.meetingId}</td>
              <td className={styles.list_item}>{meeting.committee}</td>
              <td className={styles.list_item}>
                {moment(meeting.createdAt).format("DD-MM-YY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
