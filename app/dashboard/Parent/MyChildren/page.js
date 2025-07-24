"use client"

import DashboardLayout from '../../DashboardLayout/page'
import { useState, useEffect } from 'react';

const MyChildren = () => {
  const [getId, setGetId] = useState(null);
  const [students, setStudents] = useState(null);
  const [matchedStudent, setMatchedStudent] = useState(null); // optional

  useEffect(() => {
    const IDFromParent = JSON.parse(localStorage.getItem("loggedIn"));
    const storedStudent = JSON.parse(localStorage.getItem("students"));

    if (IDFromParent && storedStudent) {
      setGetId(IDFromParent);
      setStudents(storedStudent);
    }
  }, []);

  useEffect(() => {
    if (getId && students) {
      const check = students.find((std) => 
  std.studentID?.toString().trim().toLowerCase() === getId.StudentID?.toString().trim().toLowerCase());
setMatchedStudent(check); // optional — store it in state if needed
    }
  }, [getId, students]);

  const content = (
    <div>
      <h1>MyChildren</h1>
      {matchedStudent ? (
        <div>
         
            <ul className="mt-4 space-y-2 text-gray-700">
          <li><strong>Full Name:</strong> {matchedStudent.fullname}</li>
          <li><strong>Email:</strong> {matchedStudent.email}</li>
          <li><strong>Password:</strong> {matchedStudent.password}</li>
          <li><strong>Phone:</strong> {matchedStudent.phone}</li>
          <li><strong>Date of Birth:</strong> {matchedStudent.dateOfBirth}</li>
          <li><strong>Student ID:</strong> {matchedStudent.studentID}</li>
          <li><strong>Grade:</strong> {matchedStudent.grade}</li>
          <li><strong>Class:</strong> {matchedStudent.class}</li>
          <li><strong>Gender:</strong> {matchedStudent.gender}</li>
          <li><strong>Parent Contact:</strong> {matchedStudent.parentContact}</li>
          <li><strong>Address:</strong> {matchedStudent.address}</li>
          </ul>
          {/* Show more info as needed */}
        </div>
      ) : (
        <p>Loading or no student matched.</p>
      )}
    </div>
  );

  return <DashboardLayout content={content} />;
};

export default MyChildren;
