"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaHome,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const DashboardLayout = ({ content }) => {
  const [userTypeCheck, setUserTypeCheck] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedIn"));
    if (storedUser) {
      setUserTypeCheck(storedUser);
    }
  }, []);

  useEffect(() => {
    const checkFun = () => {
      const check = localStorage.getItem("loggedIn");
    };

    checkFun();
    window.addEventListener("storage", checkFun);
    return () => {
      window.removeEventListener("storage", checkFun);
    };
  }, []);

  const SignOut = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("storage"));
  };

  if (!userTypeCheck) return <p className="text-center p-8">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center bg-white shadow p-4">
        <h2 className="text-xl font-bold text-blue-600">School System</h2>
        <button
          className="text-gray-700 text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white md:static md:translate-x-0 shadow-lg w-64 p-5 transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed h-full md:h-auto md:flex md:flex-col`}
      >
        {userTypeCheck?.profileImage && (
          <img
            src={userTypeCheck.profileImage}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />
        )}
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">School System</h2>
        <nav className="space-y-4">
          <Link
            href="/dashboard/SideDash"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            href="/dashboard/UserAcount"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
          >
            👤 User Account
          </Link>

          {userTypeCheck.userType === "student" && (
            <>
              <Link
                href="/dashboard/Student/MyAssignments"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                <FaUserGraduate /> My Assignments
              </Link>
              <Link
                href="/dashboard/Student/Progress"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                📊 Progress
              </Link>
            </>
          )}

          {userTypeCheck.userType === "parent" && (
            <>
              <Link
                href="/dashboard/Parent/MyChildren"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                🧒 My Children
              </Link>
              <Link
                href="/dashboard/Parent/Grades"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                📚 Grades
              </Link>
            </>
          )}

          {userTypeCheck.userType === "teacher" && (
            <>
              <Link
                href="/dashboard/Teacher/MyStudents"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                <FaChalkboardTeacher /> My Students
              </Link>
              <Link
                href="/dashboard/Teacher/Assignment"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                📝Assignment
              </Link>
            </>
          )}

          <Link
            href="/"
            onClick={SignOut}
            className="flex items-center gap-2 text-red-600 hover:underline"
          >
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-gray-50">{content}</main>
    </div>
  );
};

export default DashboardLayout;
