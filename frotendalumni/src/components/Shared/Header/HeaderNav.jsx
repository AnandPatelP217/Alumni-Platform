import React from "react";
import { Popover, Drawer, Button } from "antd";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import user from "../../../Images/user.png";
import { useAuth } from "../../../store/auth";

import {
  FaHome,
  FaPhoneAlt,
  FaRss,
  FaAddressBook,
  FaSignInAlt,
} from "react-icons/fa";

const HeaderNav = ({ open, setOpen, content }) => {
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const {isLoggedIn } = useAuth();



  return (
    <>
      {/* Desktop Navbar */}
      <nav
        id="navbar"
        className={"navbar order-last order-lg-0"}
      >
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/news-feed"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              News Feed
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/contact-us"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              Contact Us
            </NavLink>
          </li>

          {!isLoggedIn && (
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? "nav-link scrollto active" : ""
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
        {isLoggedIn && (
          <div>
            <Popover content={content}>
              <div className="profileImage">
                <img
                  src={user}
                  alt=""
                  className="profileImage shadow img-fluid"
                />
              </div>
            </Popover>
          </div>
        )}
        <FaBars className="mobile-nav-toggle" onClick={showDrawer} />
      </nav>

      {/* Mobile drawer */}
      <Drawer
        placement={"right"}
        onClose={onClose}
        open={open}
        size={"default"}
        extra={
          <Button
            type="primary"
            onClick={onClose}
            style={{
              background: "var(--primaryColor)",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Close
          </Button>
        }
      >
        <ul className="mobile-menu-nav">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaHome className="icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaAddressBook className="icon" />
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/news-feed"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaRss className="icon" />
              News Feed
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/contact-us"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaPhoneAlt className="icon" />
              Contact Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaSignInAlt className="icon" />
              Login
            </NavLink>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default HeaderNav;
