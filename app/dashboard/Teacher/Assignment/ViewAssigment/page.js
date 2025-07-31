"use client";
import Link from "next/link";
import DashboardLayout from "@/app/dashboard/DashboardLayout/page";
import { useState, useEffect } from "react";

const ViewAssigment = () => {
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    const res = localStorage.getItem("Assignment");
    if (res) {
      try {
        const parsed = JSON.parse(res);
        setAssignment(parsed);
      } catch (e) {
        console.error("Failed to parse assignment:", e);
      }
    } else {
      console.log("Assignment not found in localStorage");
    }
  }, []);

  const content = (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Assignments</h1>

      {assignment.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignment.map((e, index) => (
            <Link
              key={index}
              href={`/dashboard/Teacher/Assignment/${e.assignmentID}`}
              className="block bg-white border border-gray-200 rounded-2xl p-4 shadow hover:shadow-md hover:bg-gray-50 transition duration-200"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{e.title}</h2>
              <p className="text-sm text-gray-500">ID: {e.assignmentID}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No assignments found.</p>
      )}
    </div>
  );

  return <DashboardLayout content={content} />;
};

export default ViewAssigment;
