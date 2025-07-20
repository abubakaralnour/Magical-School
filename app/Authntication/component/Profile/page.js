"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [firstChar, setFirstChar] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedIn"));

    if (storedUser) {
      setUser(storedUser);

      if (typeof storedUser.fullname === "string") {
        const char = storedUser.fullname.charAt(0).toUpperCase();
        setFirstChar(char);
      }
    }
  }, []);

  if (!user) return null;

  return (
    <div className="text-white flex flex-col items-center justify-center mt-2">
      <div className="relative group">
        {/* ✅ If image exists, show image. Else, show first character */}
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-black text-xl">
            {firstChar || "?"}
          </div>
        )}

        {/* Hidden Details on Hover */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black bg-opacity-90 text-white rounded-md p-4 shadow-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 z-50">
          <Link href="/component/EditProfile">
            <h2 className="text-lg font-semibold text-amber-400">Edit</h2>
          </Link>
          <h2 className="text-lg font-semibold">{user.fullname}</h2>
          <p className="text-sm text-gray-300">{user.email}</p>
          <p className="text-sm text-gray-400">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
