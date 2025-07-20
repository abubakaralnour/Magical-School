"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Profile from "../Profile/page";

const RootHome = () => {
  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkFun = () => {
      const check = localStorage.getItem("loggedIn");
      setIsOpen(!!check);
    };

    checkFun();
    window.addEventListener("storage", checkFun);

    return () => {
      window.removeEventListener("storage", checkFun);
    };
  }, []);

  const SignOut = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("storage")); // Correct event name
    setIsOpen(false);
  };

  return (
    <div className="bg-emerald-800 h-screen flex justify-around items-center text-white">
      {IsOpen ? (
        <>
          <div>
            <button className="bg-amber-500 w-22 h-12" onClick={SignOut}>
              Sign Out
            </button>
          </div>
          <div>
            <Profile />
          </div>
        </>
      ) : (
        <div>
          <Link href="/Authntication/component/Login">
            <button className="bg-amber-500 w-22 h-12">Sign In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RootHome;
