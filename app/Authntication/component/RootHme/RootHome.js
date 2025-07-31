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
  {/* Top Half Image */}
  <div className="relative w-full h-1/2">
    <Image
      src="https://madrasa.org/assets/images/hero_madrasa_kids.png"
      alt="Top Image"
      layout="fill"
      objectFit="cover"
      className="opacity-90"
      unoptimized
    />
  </div>

  {/* Bottom Half Image with dark overlay */}
  <div className="relative w-full h-1/2">
    <Image
      src="https://madrasa.org/assets/images/landing/stories-back.jpg"
      alt="Bottom Image"
      layout="fill"
      objectFit="cover"
      className="opacity-80"
      unoptimized
    />
    <div className="absolute inset-0 bg-black/30" />
  </div>

  {/* Centered Content Over Both */}
  <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center px-4">
    <div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
        Welcome to <span className="text-yellow-300">School System</span>
      </h1>
      <button className="bg-blue-600 px-6 py-3 rounded-full text-lg shadow-md hover:bg-blue-500 transition">
        Sign In
      </button>
    </div>
  </div>



      {/* Centered Content */}
      <div className="flex flex-col pt-32 items-center  h-full text-white px-4">
        <h1 className="text-3xl md:text-6xl font-bold mb-6 drop-shadow-lg text-center">
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
