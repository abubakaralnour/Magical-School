"use client";
import DashboardLayout from "../../DashboardLayout/page";

const MyAssignments = () => {
  const userContent = (
    <>
      <h2 className="text-2xl font-bold text-blue-700">My Assignments</h2>
      <p className="mt-4">This is where MyAssignments account info will be displayed.</p>
    </>
  );

  return <DashboardLayout content={userContent} />;
};

export default MyAssignments;


