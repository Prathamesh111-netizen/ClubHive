import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import Logo from "@assets/images/logo-transparent.png";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [showNav, setShowNav] = useState(true);
  const menu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Events",
      link: "/events",
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  const handleNavScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 80) {
        // if scroll down hide the navbar
        setShowNav(false);
      } else {
        // if scroll up show the navbar
        setShowNav(true);
      }
    }
  };

  return (
    <div
      className={
        styles.Navbar + ` ${!showNav ? styles.scrolled : ""} Container`
      }
    >
      <Link href="/">
        <div className={styles.logo}>
          <img src={Logo.src} alt="" />
        </div>
      </Link>

      <div className={styles.menu_list}>
        {menu.map((item, index) => {
          return (
            <Link href={item.link} key={index}>
              <div
                className={
                  styles.menu_item +
                  ` ${router.pathname === item.link ? styles.active : ""}`
                }
              >
                {item.name}
              </div>
            </Link>
          );
        })}
        {token ? (
          <>
            <Link href={"/calendar"}>
              <div
                className={
                  styles.menu_item +
                  ` ${router.pathname === "/calendar" ? styles.active : ""}`
                }
              >
                Calendar
              </div>
            </Link>
            <Link href={"/admin"}>
              <div
                className={
                  styles.menu_item +
                  ` ${router.pathname === "/profile" ? styles.active : ""}`
                }
              >
                Profile
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <div
                className={
                  styles.btn_secondary +
                  ` ${router.pathname === menu.link ? styles.active : ""}`
                }
              >
                Login
              </div>
            </Link>
            <Link href={"/signup"}>
              <div
                className={
                  styles.btn_primary +
                  ` ${router.pathname === menu.link ? styles.active : ""}`
                }
              >
                Register
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
