import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
   <div>
    <div className="w-full ">
        <Navbar />
      </div>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center mx-4 sm:mx-6 lg:mx-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Welcome to our Quiz Portal!</h1>
        <p className="text-base sm:text-lg mb-6">Take the assessment to discover the knowledge about Yourself.</p>
        <Link to="/assessment">
          <button className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 hover:shadow-lg transition duration-300">
            Take Assessment
          </button>
        </Link>
      </div>
    </div>
   </div>
  )
}

export default Home
