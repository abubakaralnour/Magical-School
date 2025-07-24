
"use client";
import DashboardLayout from "../../DashboardLayout/page";

const Progress = () => {
  const userContent = (
    <>
      <h2 className="text-2xl font-bold text-blue-700">My Progress</h2>
      <p className="mt-4">This is where Progress account info will be displayed.</p>
    </>
  );

  return <DashboardLayout content={userContent} />;
};

export default Progress;


