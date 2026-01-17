import { useState, useEffect } from "react";
import "../../../stylesheets/Shared/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../Images/AlumniLogo.png";
import { Button } from "antd";
import HeaderNav from "./HeaderNav";
import { useAuth } from "../../../store/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLogged] = useState(false);  
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setData(JSON.parse(storedUserData));
    }
  }, []);
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    setIsLogged(false);
    navigate("/login");
  };

  const content =
    role === "admin" ? (
      <div className="nav-popover">
        <div className="my-2">
          <h5 className="text-capitalize">
            {userData?.username || data?.username}
          </h5>
          <p className="my-0">{userData?.email || data?.email}</p>
          <Link   to={"/admin"}>Dashboard</Link>
        </div>
        <Button
          variant="outline-danger"
          className="w-100 logout-btn"
          size="sm"
          onClick={logout}
        >
          Logged Out
        </Button>
      </div>
    ) : role === "alumni" ? (
      <div className="nav-popover">
        <div className="my-2">
          <h5 className="text-capitalize">{userData?.name || data?.name}</h5>
          <p className="my-0">{userData?.email || data?.email}</p>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <Button
          variant="outline-danger"
          className="w-100 logout-btn"
          size="sm"
          onClick={logout}
        >
          Logged Out
        </Button>
      </div>
    ) : (
      <div className="nav-popover">
        <div className="my-2">
          <h5 className="text-capitalize">{userData?.name || data?.name}</h5>
          <p>{userData?.roll || data?.roll}</p>
          <p className="my-0">{userData?.email || data?.email}</p>
          <Link to="/student">Dashboard</Link>
        </div>
        <Button
          variant="outline-danger"
          className="w-100 logout-btn"
          size="sm"
          onClick={logout}
        >
          Logged Out
        </Button>
      </div>
    );

  return (
    <>
      <header id="header" className="fixed-top stickyHeader">
        <div className="container d-flex align-items-center">
        <Link to={"/"} className="logo me-auto">
            <img src={img} alt="" className="img-fluid" />
          </Link>
          <HeaderNav 
            isLoggedIn={isLoggedIn}
          content={content} 
          open={open} 
          setOpen={setOpen} />
        </div>
      </header>
    </>
  );
};

export default Header;
