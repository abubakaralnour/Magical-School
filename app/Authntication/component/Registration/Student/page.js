"use client";

import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StudentRegister = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const [studentData, setStudentData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    studentID: "", // Will be auto-generated
    grade: "",
    class: "",
    gender:"",
    parentContact: "",
    address: "",
    profileImage: "", // base64 image
    userType :"student"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (message) setMessage(null); // Clear message on input
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setStudentData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!studentData.fullname || !studentData.email || !studentData.password) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("students")) || [];
    const usersArray = Array.isArray(existingUsers) ? existingUsers : [existingUsers];
    const emailExists = usersArray.some((user) => user.email === studentData.email);

    if (emailExists) {
      setMessage({ type: "error", text: "User with this email already exists." });
    } else {
      // Generate unique ID
      let generatedID;
      do {
        generatedID = "STU" + Math.floor(100000 + Math.random() * 900000);
      } while (usersArray.some((user) => user.studentID === generatedID));

      const studentWithID = { ...studentData, studentID: generatedID };

      usersArray.push(studentWithID);
      localStorage.setItem("students", JSON.stringify(usersArray));
      localStorage.setItem("loggedIn", JSON.stringify(studentWithID));

      // Reset form
      setStudentData({
        fullname: "",
        email: "",
        password: "",
        gender:"",
        phone: "",
        dateOfBirth: "",
      
        grade: "",
        class: "",
        parentContact: "",
        address: "",
        profileImage: "",
      });

      setMessage({ type: "success", text: "Registered successfully!" });

      setTimeout(() => {
        setMessage(null);
        router.push("/dashboard/SideDash");
      }, 2000);
    }
  };
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000); // hide message after 3 seconds

    return () => clearTimeout(timer); // clean up if component unmounts
  }
}, [message]);

  return (
    <>
      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
<div className="bg-gray-900">
   <h2 className="text-amber-700 text-2xl "><Link href="/">Home</Link>  </h2>

      <div className="min-h-screen  text-white flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl  p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Student Registration</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              name="fullname"
              value={studentData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />
                  <select
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
         
            </select>

            <input
              name="email"
              value={studentData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="password"
              value={studentData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="phone"
              value={studentData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="dateOfBirth"
              value={studentData.dateOfBirth}
              onChange={handleChange}
              type="date"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <select
              name="grade"
              value={studentData.grade}
              onChange={handleChange}
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            >
              <option value="">Select Grade</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
            </select>

            <input
              name="class"
              value={studentData.class}
              onChange={handleChange}
              placeholder="Class (e.g. A)"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="parentContact"
              value={studentData.parentContact}
              onChange={handleChange}
              placeholder="Parent Contact"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="address"
              value={studentData.address}
              onChange={handleChange}
              placeholder="Address"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />
          </div>

          {/* Image Upload */}
         {/* Profile Image Upload Section */}
<div className="mt-6">
  <label className="block text-sm font-medium mb-2">Profile Image</label>

  <div className="flex items-center space-x-4">
    {/* Image Preview */}
    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-400 bg-gray-200">
      {studentData.profileImage ? (
        <img
          src={studentData.profileImage}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-black text-xl">
          ?
        </div>
      )}
    </div>

    {/* Custom Upload Button */}
    <label className="cursor-pointer inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500">
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>
  </div>
</div>


          <button
            type="submit"
            className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-semibold"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/Authntication/component/Login" className="text-indigo-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div></div>
    </>
  );
};

export default StudentRegister;
