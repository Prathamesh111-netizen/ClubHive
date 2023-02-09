import BreadCrumb from "@components/Navbar/BreadCrumb";
import InputField from "@components/UI/InputField";
import Modal from "@components/UI/Modal/Modal";
import API from "@shared/API";
import { LoaderContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./user.module.scss";

export default function Users() {
  const [members, setMembers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const { loading, setLoading } = useContext(LoaderContext);

  const getMembers = async () => {
    try {
      setLoading(true);
      API.get("/comm_members", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          committeName: user.committee,
        },
      }).then((res) => {
        setLoading(false);
        setMembers(res.data.members);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const [show, setShow] = useState(false);

  const activeTag = () => {
    return (
      <span className="inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800 py-2 px-4">
        Active
      </span>
    );
  };

  const deactiveTag = () => {
    return (
      <span className="inline-flex text-lg leading-5 font-semibold rounded-full bg-red-100 text-red-800 py-2 px-4">
        Deactive
      </span>
    );
  };

  const [member, setMember] = useState({
    email: "",
    committeeName: user?.committee,
    role: "",
  });

  const addMember = async () => {
    try {
      setLoading(true);
      const response = await API.post("/comm_members", member, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getMembers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShow(false);
      setMember({
        email: "",
        committeeName: user.committee,
        role: "",
      });
    }
  };

  return (
    <div className={styles.User + " m-10 text-lg "}>
      <BreadCrumb />
      <div className="flex flex-row justify-between my-7">
        <h1 className="text-4xl font-extrabold">Committee Member</h1>
        <button
          onClick={() => {
            setShow(true);
          }}
          className={styles.btn_primary + " py-2"}
        >
          Add Member
        </button>
      </div>
      <Modal
        show={show}
        hideBackdrop={() => setShow(false)}
        style={{ width: "40rem" }}
      >
        <div className="text-2xl w-full flex flex-col gap-4">
          <InputField
            label="Email"
            placeholder="noman@gmail.com"
            value={member.email}
            handleChange={() => (e) =>
              setMember({ ...member, email: e.target.value })}
            className=" w-full"
          />
          <InputField
            label={"Committee Name"}
            placeholder="CSI"
            value={member.committeName}
            className=" w-full"
            handleChange={() => (e) =>
              setMember({ ...member, committeName: e.target.value })}
          />
          <InputField
            label={"Role"}
            placeholder="Tech Head"
            value={member.role}
            handleChange={() => (e) =>
              setMember({ ...member, role: e.target.value })}
          />
          <button
            className={styles.btn_primary + " py-2 mx-auto"}
            onClick={addMember}
          >
            Add Member
          </button>
        </div>
      </Modal>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className={styles.head_list}>
          <th scope="col" className={styles.list_item}>
            Email
          </th>
          <th scope="col" className={styles.list_item}>
            Committee Name
          </th>
          <th scope="col" className={styles.list_item}>
            Role
          </th>
          <th scope="col" className={styles.list_item}>
            Status
          </th>
          <th scope="col" className={styles.list_item}>
            Created Date
          </th>
          <th scope="col" className={styles.list_item}>
            Updated Date
          </th>
        </thead>
        <tbody className={styles.row_list}>
          {members.map((user, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className={styles.list_item}>{user?.email}</td>
              <td className={styles.list_item}>{user?.committeName}</td>
              <td className={styles.list_item}>{user?.role}</td>
              <td className={styles.list_item}>
                {user?.status.toLocaleLowerCase() == "active"
                  ? activeTag()
                  : deactiveTag()}
              </td>
              <td className={styles.list_item}>{user?.createdDate}</td>
              <td className={styles.list_item}>{user?.updatedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
