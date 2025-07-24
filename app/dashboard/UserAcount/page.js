"use client";
import DashboardLayout from "../DashboardLayout/page";// Adjust path as needed

import { useState, useEffect } from "react";

const UserAccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedIn"));
    if (storedUser) setUser(storedUser);
    
  }, []);

  const userContent = (
    <>
      <h2 className="text-2xl font-bold text-blue-700">👤 User Account</h2>
      <p className="mt-4">This is where user account info will be displayed.</p>

      {user && user.userType === "student" && (
        <ul className="mt-4 space-y-2 text-gray-700">
          <li><strong>Full Name:</strong> {user.fullname}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Password:</strong> {user.password}</li>
          <li><strong>Phone:</strong> {user.phone}</li>
          <li><strong>Date of Birth:</strong> {user.dateOfBirth}</li>
          <li><strong>Student ID:</strong> {user.studentID}</li>
          <li><strong>Grade:</strong> {user.grade}</li>
          <li><strong>Class:</strong> {user.class}</li>
          <li><strong>Gender:</strong> {user.gender}</li>
          <li><strong>Parent Contact:</strong> {user.parentContact}</li>
          <li><strong>Address:</strong> {user.address}</li>
          <li><strong>User Type:</strong> {user.userType}</li>
          {user.profileImage && (
            <li>
              <strong>Profile Image:</strong>
              <div className="mt-2">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border shadow"
                />
              </div>
            </li>
          )}
        </ul>
      )}

      {user && user.userType === "teacher" && (
        <ul className="mt-4 space-y-2 text-gray-700">
          <li><strong>Full Name:</strong> {user.fullname}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Password:</strong> {user.password}</li>
          <li><strong>Phone:</strong> {user.phone}</li>
          <li><strong>User Type:</strong> {user.userType}</li>
        </ul>
      )}

      {user && user.userType === "parent" && (
        <ul className="mt-4 space-y-2 text-gray-700">
          <li><strong>Full Name:</strong> {user.fullname}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Password:</strong> {user.password}</li>
          <li><strong>Phone:</strong> {user.phone}</li>
          <li><strong>User Type:</strong> {user.userType}</li>
                    <li><strong>Your child:</strong> {user.StudentID
}</li>

        </ul>
      )}
    </>
  );

  return <DashboardLayout content={userContent} />;
};

export default UserAccount;
