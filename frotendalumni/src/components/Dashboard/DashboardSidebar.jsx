import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../stylesheets/Dashboard/DashboardSidebar.css";
import { Button, Drawer } from "antd";
import { useAuth } from "../../store/auth";

import { FaTable, FaUserCog, FaSignOutAlt } from "react-icons/fa";

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { LogoutUser } = useAuth();

  const handleLogout = () => {
    LogoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  let userRole = localStorage.getItem("userRole");
  let userDataString = localStorage.getItem("userData");

  let userData;
  let userName;
  let profilePicture;

  try {
    userData = JSON.parse(userDataString);
    userName = userData?.name || userData?.username || null;
    profilePicture = userData?.profilePicture || userData?.userprofilePicture || null;
    userRole = userData?.role || userData?.userRole || null;
  } catch (error) {
    userData = null;
    userName = null;
    profilePicture = null;
  }
  return (
    <>
    <div className="profile-sidebar p-3 rounded">
      {/* Show Drawer Button in Small Devices */}
      <Button
        type="primary"
        shape="circle"
        icon={<i className="fa-solid fa-user" />}
        size="large"
        className="dashboard-drawer-btn"
        onClick={showDrawer}
      />

      <div className="p-2 text-center border-bottom dashboard-menu-sidebar">
        <div className="profile-info text-center">
        <Link to={"/dashboard/profile-setting"}>
  <img 
    src={profilePicture || "../../Images/user.png"} 
    alt="Profile" 
    style={{ width: "100px", height: "100px", objectFit: "cover" }} 
  />
</Link>
<div className="profile-details">
            <h5 className="mb-0">{userName}</h5>
            <div>
              <p className="mb-0">{userRole}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="dashboard-menu dashboard-menu-sidebar">
        {userRole === "alumni" ? (
          <ul>
            <li>
              <NavLink to={"/dashboard"} activeClassName="active" end>
                <FaTable className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/add-vacancy"} activeClassName="active" end>
                <i className="fa-solid fa-display icon"></i>
                <span>Post a Job</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/add-meeting"}
                activeClassName="active"
              >
                <i className="fa-solid fa-handshake icon"></i>
                <span>Schedule Meeting</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/posted-vacancies"}
                activeClassName="active"
              >
                <FaUserCog className="icon" />
                <span>Posted Vacancies</span>
              </NavLink>

            </li>
            <li>
              <NavLink
                to={"/dashboard/posted-meetings"}
                activeClassName="active"
              >
                <FaUserCog className="icon" />
                <span>Posted Meetings</span>
              </NavLink>
              
            </li>
            <li>
              <NavLink
                to={"/dashboard/profile-setting"}
                activeClassName="active"
              >
                <FaUserCog className="icon" />
                <span>Profile Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/change-password"}
                activeClassName="active"
              >
                <FaUserCog className="icon" />
                <span> Change Password</span>
              </NavLink>
            </li>
         
            <li>
              <Button
                icon={<FaSignOutAlt className="icon" />}
                onClick={handleLogout}
                className="logout-btn"
              >
                Sign Out
              </Button>
            </li>
          </ul>
        ) : userRole === "student" ? (
          <ul>
            <li>
              <NavLink to={"/student"} activeClassName="active" end>
                <FaTable className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/student/meetings"} activeClassName="active">
                <i className="fa-solid fa-handshake icon"></i>
                <span>Check Meeting</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/student/profile-setting"} activeClassName="active">
                <FaUserCog className="icon" />
                <span>Profile Settings</span>
              </NavLink>
            </li>

            <li>
              <Button
                icon={<FaSignOutAlt className="icon" />}
                onClick={handleLogout}
                className="logout-btn"
              >
                Sign Out
              </Button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to={"/admin"} activeClassName="active" end>
                <FaTable className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/add-alumni"} activeClassName="active" end>
                <i className="fa-solid fa-user-tie"></i> <span>Add Alumni</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/add-student"} activeClassName="active">
                <i className="fa-solid fa-graduation-cap"></i>{" "}
                <span>Add Student</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/vacancies"} activeClassName="active">
                <i className="fa-solid fa-display icon"></i>
                <span>View Vacancies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/meetings"} activeClassName="active">
                <i className="fa-solid fa-display icon"></i>
                <span>View Meetings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/ViewStudents"} activeClassName="active" end>
                <i className="fa-solid fa-graduation-cap"></i> <span>All Students</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/ViewAlumnis"} activeClassName="active" end>
              <i className="fa-solid fa-user-tie"></i> <span>All Alumnis</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/DeleteAlumni"} activeClassName="active" end>
                <i className="fa-solid fa-user-tie"></i> <span>Delete Alumni</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/DeleteStudent"} activeClassName="active" end>
                <i className="fa-solid fa-graduation-cap"></i> <span>Delete Student</span>
              </NavLink>
            </li>
            <li>
              <Button
                icon={<FaSignOutAlt className="icon" />}
                onClick={handleLogout}
                className="logout-btn"
              >
                Sign Out
              </Button>
            </li>
          </ul>
        )}
      </nav>

      <Drawer title="Dashboard" onClose={onClose} open={open}>
        <div className="p-2 text-center border-bottom">
          <div className="profile-info text-center">
            <Link to={"/dashboard/profile-setting"}>
              {/* <img src={"./images/user.png"} alt="Profile Picture" /> */}
            </Link>
            <div className="profile-details">
              <h5 className="mb-0">{userName}</h5>
              <div>
                <p className="mb-0">{"About user"}</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="dashboard-menu">
          {userRole === "alumni" ? (
            <ul>
              <li>
                <NavLink to={"/dashboard"} activeClassName="active" end>
                  <FaTable className="icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/add-vacancy"}
                  activeClassName="active"
                  end
                >
                  <i className="fa-solid fa-display icon"></i>
                  <span>Post a Job</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/add-meeting"}
                  activeClassName="active"
                >
                  <i className="fa-solid fa-handshake icon"></i>
                  <span>Schedule Meeting</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/posted-vacancies"}
                  activeClassName="active"
                >
                  <i className="fa-solid fa-handshake icon"></i>
                  <span>Posted Vacancies</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/posted-meetings"}
                  activeClassName="active"
                >
                  <i className="fa-solid fa-handshake icon"></i>
                  <span>Posted Meetings</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/profile-setting"}
                  activeClassName="active"
                >
                  <FaUserCog className="icon" />
                  <span>Profile Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/change-password"}
                  activeClassName="active"
                >
                  <FaUserCog className="icon" />
                  <span>Change Password</span>
                </NavLink>
              </li>

              <li>
              <Button
                icon={<FaSignOutAlt className="icon" />}
                onClick={handleLogout}
                className="logout-btn"
              >
                Sign Out
              </Button>
            </li>
            </ul>
          ) : userRole === "student" ? (
            <ul>
              <li>
                <NavLink to={"/student"} activeClassName="active" end>
                  <FaTable className="icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/meetings"} activeClassName="active">
                  <i className="fa-solid fa-handshake icon"></i>
                  <span>Check Meeting</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/student/profile-setting"}
                  activeClassName="active"
                >
                  <FaUserCog className="icon" />
                  <span>Profile Settings</span>
                </NavLink>
              </li>

              <li>
              <Button
                icon={<FaSignOutAlt className="icon" />}
                onClick={handleLogout}
                className="logout-btn"
              >
                Sign Out
              </Button>
            </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to={"/admin"} activeClassName="active" end>
                  <FaTable className="icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/add-alumni"} activeClassName="active" end>
                  <i className="fa-solid fa-user-tie"></i> <span>Add Alumni</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/add-student"} activeClassName="active">
                  <i className="fa-solid fa-graduation-cap"></i>{" "}
                  <span>Add Student</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/vacancies"} activeClassName="active">
                  <i className="fa-solid fa-display icon"></i>
                  <span>View Vacancies</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/meetings"} activeClassName="active">
                  <i className="fa-solid fa-display icon"></i>
                  <span>View Meetings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/ViewAlumnis"} activeClassName="active">
                  <i className="fa-solid fa-display icon"></i>
                  <span>All Alumni</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/ViewStudents"} activeClassName="active">
                  <i className="fa-solid fa-display icon"></i>
                  <span>All Student</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/DeleteAlumni"} activeClassName="active">
                  <i className="fa-solid fa-display icon"></i>
                  <span>Delete Alumni</span>
                </NavLink></li>
               <li> <NavLink to={"/admin/DeleteStudent"} activeClassName="active">
                  <i className="fa-solid fa-display icon"></i>
                  <span>Delete Student</span>
                </NavLink>
              </li>

              <li>
              <Button
                icon={<FaSignOutAlt className="icon" />}
                onClick={handleLogout}
                className="logout-btn"
              >
                Sign Out
              </Button>
            </li>
            </ul>
          )}
        </nav>
      </Drawer>
    </div>
    </>
  );
};
export default DashboardSidebar;
