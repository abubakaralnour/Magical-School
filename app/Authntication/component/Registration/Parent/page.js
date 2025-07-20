"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ParentRegister = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const [parentData, setParentData] = useState({
    fullname: "",
    email: "",
    username:"",
    password: "",
    phone: "",
    Relation:"",
    parentID: "", // Will be auto-generated
     profileImage: ""
  });


 const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setParentData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    if (message) setMessage(null); // Clear message on input
    setParentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!parentData.fullname || !parentData.email || !parentData.password) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("parents")) || [];
    const usersArray = Array.isArray(existingUsers) ? existingUsers : [existingUsers];
    const emailExists = usersArray.some((user) => user.email === parentData.email);

    if (emailExists) {
      setMessage({ type: "error", text: "User with this email already exists." });
    } else {
      // Generate unique ID
      let generatedID;
      do {
        generatedID = "STU" + Math.floor(100000 + Math.random() * 900000);
      } while (usersArray.some((user) => user.parentID === generatedID));

      const parentWithID = { ...parentData, parentID: generatedID };

      usersArray.push(parentWithID);
      localStorage.setItem("parents", JSON.stringify(usersArray));
      localStorage.setItem("loggedIn", JSON.stringify(parentWithID));

      // Reset form
      setParentData({
           fullname: "",                                                     // fullname: "",
           email: "",                                  
             username:"",                   // email: "",
           password: "",                                                     // password: "",
           phone: "",
           Relation:"",
            profileImage: ""

  
      });

      setMessage({ type: "success", text: "Registered successfully!" });

      setTimeout(() => {
        setMessage(null);
        router.push("/");
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
       <h2 className="text-amber-700 text-2xl "><Link href="/">Home</Link>  </h2>

      <div className="min-h-screen bg-gray-800 text-white px-6 py-10 flex items-center justify-center">
       
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-neutral-900 p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Parent Registration</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              name="fullname"
              value={parentData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />
              <select
              name="Relation"
              value={parentData.Relation}
              onChange={handleChange}
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            >
                            

              <option value="">Select Relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
                            <option value="Brother">Brother</option>
                                          <option value="Sister">Sister</option>
                                                        <option value="Other">Other</option>



         
            </select>
             <input
              name="username"
              value={parentData.username}
              onChange={handleChange}
              type="text"
              placeholder="User name"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="email"
              value={parentData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="password"
              value={parentData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

            <input
              name="phone"
              value={parentData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone"
              className="px-4 py-2 bg-black border border-gray-600 rounded-md"
            />

      

       
          </div>
{/* Profile Image Upload Section */}
<div className="mt-6">
  <label className="block text-sm font-medium mb-2">Profile Image</label>

  <div className="flex items-center space-x-4">
    {/* Image Preview */}
    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-400 bg-gray-200">
      {parentData.profileImage ? (
        <img
          src={parentData.profileImage}
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
      </div>
    </>
  );
};

export default ParentRegister;



