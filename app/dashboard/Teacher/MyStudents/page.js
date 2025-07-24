"use client";
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout/page';

const MyStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("students"));
    if (Array.isArray(storedStudent)) {
      setStudents(storedStudent);
    } else if (storedStudent) {
      setStudents([storedStudent]);
    }
  }, []);

  const content = (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">My Students</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {students?.map((std, index) => (
          <div
            key={std.studentID || index}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Student #{index + 1}</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><strong>Full Name:</strong> {std.fullname}</li>
              <li><strong>Class:</strong> {std.class}</li>
              <li><strong>Student ID:</strong> {std.studentID}</li>
              
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return <DashboardLayout content={content} />;
};

export default MyStudents;
