   "use client";
import DashboardLayout from "@/app/dashboard/DashboardLayout/page";
import { useState ,useEffect} from "react";

const CreateAssignment = () => {
    const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    grade: "",
    class: "",
    dueDate: "",
    file: null,
    assignmentID:""    
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));};


  useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000); // hide message after 3 seconds

    return () => clearTimeout(timer); // clean up if component unmounts
  }
}, [message]);



 const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.title || !formData.subject || !formData.grade) {
    setMessage({ type: "error", text: "Please fill all required fields." });
    return;
  }

  // 1. Get existing assignments from localStorage
  const existingAssignments = JSON.parse(localStorage.getItem("Assignment"));
  const DataAssignment = Array.isArray(existingAssignments)
    ? existingAssignments
    : existingAssignments
    ? [existingAssignments]
    : [];

  // 2. Generate unique ID
  let generatedID;
  const usedIDs = DataAssignment.map((item) => item.assignmentID);
  do {
    generatedID = "ASS" + Math.floor(100000 + Math.random() * 900000);
  } while (usedIDs.includes(generatedID));

  // 3. Create new assignment with ID
  const assignmentWithID = {
    ...formData,
    assignmentID: generatedID,
  };

const updatedid=[... DataAssignment,assignmentWithID]
  localStorage.setItem("Assignment", JSON.stringify(updatedid));

    
    
    setMessage({ type: "success", text: "Assignment  successfully!" });

 


setFormData({
    title: "",
    description: "",
    subject: "",
    grade: "",
    class: "",
    dueDate: "",
    file: null,
    assignmentID:""
  });
    
  };
const content= <div>  {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-blue-700">📚 Create Assignment</h2>

      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 border rounded-md" required />

      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border rounded-md" rows="4" required />

      <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required>
        <option value="">Select Subject</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="English">English</option>
      </select>

      <input name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade (e.g. 6)" className="w-full px-3 py-2 border rounded-md" required />
      <input name="class" value={formData.class} onChange={handleChange} placeholder="Class (e.g. A)" className="w-full px-3 py-2 border rounded-md" required />

      <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />

      <input type="file" name="file" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />

      <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded-md">Create Assignment</button>
    </form></div>  
  return <DashboardLayout content={content}/>
};

export default CreateAssignment;
