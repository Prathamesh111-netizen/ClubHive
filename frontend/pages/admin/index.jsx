import Modal from '@components/UI/Modal/Modal';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './admin.module.scss';
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import BreadCrumb from '@components/Navbar/BreadCrumb';

const index = () => {
    const [show, setShow] = React.useState(true);
    const [users, setUsers] = useState([
        {

            username: 'johndoe',
            email: "noman.khan@gmail.com",
            type: "admin",
        }
    ]);

    const addUser = () => {


    }

    const deleteUser = (id) => {

    }

    return (
        <div className={styles.Admin}>
            <Modal show={show} hideBackdrop={() => setShow(false)} name="add-user">
                <div className={styles.User_form}>
                    <h1 className="text-2xl font-bold">Add User</h1>
                    <form className="flex flex-col gap-5 mt-5">
                        <div className={styles.form_item}>
                            <label htmlFor="username" placeholder='Username'>Username</label>
                            <input type="text" name="username" id="username" />
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="email" placeholder='User Email'>Email</label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="type">Type</label>
                            <select name="type" id="type">
                                <option value="admin">Admin</option>
                                <option value="faculty">Faculty</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                        <button onClick={addUser} className={styles.btn_primary}>Add User</button>
                    </form>
                </div>
            </Modal>
            <BreadCrumb />
            <div className="flex flex-row justify-between my-5">
                <h1>Faculty Instructor Accounts</h1>
                <button onClick={() => {
                    setShow(true);
                }} className={styles.btn_primary}>Add user</button>
            </div>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className={styles.head_list}>
                    <th scope="col" className={styles.list_item}>Profile</th>
                    <th scope="col" className={styles.list_item}>Username</th>
                    <th scope="col" className={styles.list_item}>Email</th>
                    <th scope="col" className={styles.list_item}>Type</th>
                    <th scope="col" className={styles.list_item}>Delete</th>
                </thead>
                <tbody className={styles.row_list}>
                    {
                        users.map((user, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className={styles.list_item}>
                                    <img src={"https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"} alt="" />
                                </td>
                                <td className={styles.list_item}>{user?.username}</td>
                                <td className={styles.list_item}>{user?.email}</td>
                                <td className={styles.list_item}>{user?.type}</td>
                                <td className={styles.del}>
                                    <AiFillDelete />
                                    Delete
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default index