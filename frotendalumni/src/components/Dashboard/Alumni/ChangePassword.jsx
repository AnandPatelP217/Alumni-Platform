import React, { useState } from "react";
import { message, Button } from "antd";
import DashboardLayout from "../DashboardLayout";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { API_URL } from "../../../store/apiurl";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password state
  let userDataString = localStorage.getItem("userData");
  
  let userId = "";
  if (userDataString) {
    try {
      let userData = JSON.parse(userDataString);
      userId = userData._id || "";
    } catch (error) {
      // Error parsing user data
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/${userId}/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.ok) {
        message.success("Password updated successfully");
        setOldPassword(""); // Reset fields after success
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        message.error(data.msg || "Old Password is Incorrect ");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      message.error("An error occurred while updating password");
    }
  };

  return (
    <DashboardLayout>
      <div className="change-password">
        <h5 className="text-title mt-3 text-center">Change Your Password</h5>

        <form className="container row form-row px-3 mx-auto my-5 text-center" onSubmit={handlePasswordChange}>
          <div className="col-md-12">
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="Old Password"
                className="text-input-field"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="New Password"
                className="text-input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="Confirm Password"
                className="text-input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <Button htmlType="submit" type="primary" size="large">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
