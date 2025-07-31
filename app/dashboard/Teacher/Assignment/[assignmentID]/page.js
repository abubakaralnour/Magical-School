"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/dashboard/DashboardLayout/page";

const AssignmentDetails = () => {
  const { assignmentID } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const res = localStorage.getItem("Assignment");
    if (res) {
      try {
        const parsed = JSON.parse(res);
        const found = parsed.find(
          (a, index) =>
            a.assignmentID?.toString() === assignmentID ||
            index.toString() === assignmentID
        );
        setAssignment(found);
      } catch (e) {
        console.error("Failed to parse assignment:", e);
      }
    }
  }, [assignmentID]);

  if (!assignment)
    return (
      <DashboardLayout
        content={
          <div className="p-6 text-center text-gray-500 text-lg">
            Loading or assignment not found...
          </div>
        }
      />
    );

  const content = (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {assignment.title}
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {assignment.description || "No description provided."}
        </p>
        <p>
          <span className="font-semibold">Grade:</span> {assignment.grade}
        </p>
        <p>
          <span className="font-semibold">Subject:</span> {assignment.subject}
        </p>
        <p>
          <span className="font-semibold">Class:</span> {assignment.class}
        </p>
        <p>
          <span className="font-semibold">Due Date:</span>{" "}
          <span className="text-gray-600">{assignment.dueDate}</span>
        </p>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => history.back()}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Assignments
        </button>
      </div>
    </div>
  );

  return <DashboardLayout content={content} />;
};

export default AssignmentDetails;
