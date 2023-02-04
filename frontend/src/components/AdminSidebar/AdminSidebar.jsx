import React from "react";
import styles from "./AdminSidebar.module.scss";
import Logo from "@assets/images/logo_white.png";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import avatar from "@assets/images/avatar.jpg";

const AdminSidebar = () => {
  const router = useRouter();
  const menu = [
    {
      name: "Dashboard",
      icon: <AiFillHome />,
      link: "/admin",
    },
    {
      name: "Committee",
      icon: <AiFillHome />,
      link: "/admin/committee",
    },
    {
      name: "Approve",
      icon: <AiFillHome />,
      link: "/admin/approve",
    },
    {
      name: "Members",
      icon: <AiFillHome />,
      link: "/admin/user",
    },
    {
      name: "Events",
      icon: <AiFillHome />,
      link: "/admin/events",
    },
    {
      name: "Rooms",
      icon: <AiFillHome />,
      link: "/admin/rooms",
    },
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
          <img src={avatar.src} alt="" />
          <div className={styles.name}>Noman</div>
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
