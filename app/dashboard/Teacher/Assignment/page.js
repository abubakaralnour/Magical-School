import React from 'react'
import DashboardLayout from '../../DashboardLayout/page'
import Link from 'next/link'

const Assignment = () => {
    const  content =<div className='flex gap-7'>
      <Link href="/dashboard/Teacher/Assignment/CreateAssignment">
       <h1 className="inline-block px-4 py-2 bg-emerald-600 text-white
        rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md
         hover:shadow-lg cursor-pointer">Create Assignment</h1>
      </Link>

      <Link href="/dashboard/Teacher/Assignment/ViewAssigment">
       <h1 className="inline-block px-4 py-2 bg-emerald-600 text-white
        rounded-lg hover:bg-blue-600 transition-colors duration-200 
        shadow-md hover:shadow-lg cursor-pointer">View Assignment</h1>
      </Link>
      </div>
  return  <DashboardLayout content={content}/>
  
}

export default Assignment