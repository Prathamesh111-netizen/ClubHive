import React from "react";
import styles from "./AdminSidebar.module.scss";
import Logo from "@assets/images/logo_white.png";
import { AiFillHome } from "react-icons/ai";
import { SiGooglemeet } from "react-icons/si";
import { MdMeetingRoom } from 'react-icons/md'
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdEvent } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { BsSuitClubFill } from 'react-icons/bs'
import { useRouter } from "next/router";
import Link from "next/link";
import avatar from "@assets/images/avatar.jpg";

const AdminSidebar = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = [
    {
      name: "Dashboard",
      icon: <AiFillHome />,
      link: "/admin",
    },
    {
      name: "Committee",
      icon: <BsSuitClubFill />,
      link: "/admin/committee",
    },
    {
      name: "Approve",
      icon: <TiTick />,
      link: "/admin/approve",
    },
    {
      name: "Members",
      icon: <BsFillPersonPlusFill />,
      link: "/admin/user",
    },
    {
      name: "Events",
      icon: <MdEvent />,
      link: "/admin/events",
    },
    {
      name: "Rooms",
      icon: <MdMeetingRoom />,
      link: "/admin/rooms",
    },
    {
      name: "Meeting",
      icon: <SiGooglemeet />,
      link: "/admin/meetings",
    }
    // {

    // }
  ];

  return (
    <div className={styles.Admin_sidebar + " sticky_top"}>
      <div className={styles.logo}>
        <img src={Logo.src} alt="" />
      </div>
      <div className={styles.menu}>
        {menu.map((item, index) => (
          <Link href={item.link}>
            <div
              className={
                styles.menu_item +
                ` ${router.pathname === item.link ? styles.active : ""}`
              }
              key={index}
            >
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.name}>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.user}>
          <img src={user.profilePic || avatar.src} alt="" />
          <div className={styles.info}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.type}>{user.type}</div>
          </div>
        </div>
        <div className={styles.logout} onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login')
        }}>
          <BiLogOut />
        </div>
      </div>

    </div>
  );
};

export default AdminSidebar;
