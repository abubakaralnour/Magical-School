"use client";

import Link from "next/link";

const roles = [
  { name: "Student", href: "/Authntication/component/Registration/Student", color: "bg-blue-500", text: "text-white" },
  { name: "Teacher", href: "/Authntication/component/Registration/Teacher", color: "bg-green-500", text: "text-white" },
  { name: "Parent", href: "/Authntication/component/Registration/Parent", color: "bg-yellow-400", text: "text-black" },
  // { name: "Admin", href: "/Authntication/component/Registration/Admin", color: "bg-red-500", text: "text-white" },
];

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-900 via-green-900 to-cyan-950 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Register as</h1>
        <div className="grid gap-4">
          {roles.map((role) => (
            <Link key={role.name} href={role.href}>
              <button
                className={`${role.color} ${role.text} w-full py-3 rounded-xl text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105 hover:opacity-90`}
              >
                {role.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
