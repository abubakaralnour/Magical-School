"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  
  {/* Top Half Image */}


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
   <div className="relative w-full h-1/2">
    <Image
      src="https://madrasa.org/assets/images/hero_madrasa_kids.png"
      alt="Top Image"
      layout="fill"
      objectFit="cover"
      className="opacity-90"
      unoptimized
    />
        <div className="absolute inset-0 bg-black/30" />

  </div>
  {/* Centered Content Over Both */}
  <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center px-4">
    <div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg ">
        My School
      </h1>
      <button className="bg-blue-600 px-6 py-3 rounded-full text-lg shadow-md hover:bg-blue-500 transition">
        Sign In
      </button>
    </div>
  </div>



   
    </div>
  );
};

export default RootHome;
