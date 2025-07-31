"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    window.dispatchEvent(new Event("storage"));
    setIsOpen(false);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://madrasa.org/assets/images/landing/stories-back.jpg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Centered Content */}
      <div className="flex flex-col pt-32 items-center  h-full text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Welcome to School System
        </h1>

        {IsOpen ? (
          <button
            onClick={SignOut}
            className="bg-red-600 px-6 py-3 rounded-full text-lg shadow-md hover:bg-red-500 transition"
          >
            Sign Out
          </button>
        ) : (
          <Link href="/Authntication/component/Login">
            <button className="bg-blue-600 px-6 py-3 border-2 rounded-2xl text-lg shadow-md hover:bg-blue-500 transition">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RootHome;
