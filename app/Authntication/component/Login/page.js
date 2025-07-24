"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [User, setUser] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const storedParents = JSON.parse(localStorage.getItem("parents")) || [];

    const usersArray = [
      ...storedTeachers,
      ...storedStudents,
      ...storedParents,
    ];

    const foundUser = usersArray.find(
      (user) =>
        user.email === User.email && user.password === User.password
    );

    if (foundUser) {
      localStorage.setItem("loggedIn", JSON.stringify(foundUser));
      window.dispatchEvent(new Event("storage"));
      setMessage({ type: "success", text: `Welcome ${foundUser.fullname}!` });

      setTimeout(() => {
        router.push("/dashboard/SideDash");
      }, 1000);
    } else {
      setMessage({ type: "error", text: "Email or password incorrect" });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <Image
        src="https://i.imgur.com/57n5aen.png"
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-30"
        priority
        unoptimized
      />

      {/* Notification */}
      {message && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg transition-all duration-300 ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Logo */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <h1 className="text-2xl font-bold text-red-600 hover:underline">Home</h1>
        </Link>
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-lg bg-black bg-opacity-80 backdrop-blur-md rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="email"
            placeholder="Email or mobile number"
            value={User.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={User.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-300">OR</div>

          <Link href="/Authntication/component/Registration">
            <p className="text-center underline text-blue-400 hover:text-blue-200 cursor-pointer">
              New to Netmovies? Sign up now.
            </p>
          </Link>

          <div className="flex items-center gap-3 mt-4 text-sm">
            <input
              type="checkbox"
              name="remember"
              checked={User.remember}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-600"
            />
            <span>Remember me</span>
          </div>

          <p className="underline text-sm hover:text-gray-300 cursor-pointer">
            Forgot Password?
          </p>

          <div className="text-xs text-center text-gray-400 mt-4">
            This page is protected by Google reCAPTCHA to ensure you’re not a bot.
            {!isOpen && (
              <span
                onClick={() => setIsOpen(true)}
                className="underline text-blue-400 ml-1 cursor-pointer"
              >
                Learn more
              </span>
            )}
            {isOpen && (
              <div className="mt-2 text-left bg-gray-100 text-black p-3 rounded">
                The information you submit will be processed by Google for security and spam
                prevention.
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
