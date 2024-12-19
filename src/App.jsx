import { useState } from 'react'
import Navbar from './component/NavBar'
import Sidebar from './component/SideBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <div className="flex h-screen">
         <Sidebar />
         <div className="flex-1 ">
           <Navbar />
           <div className="container mx-auto">
             <h2 className="bg-red-400  text-white text-3xl font-bold">
              Hello
             </h2>
             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full p-4">
               <div className="text-6xl font-bold mb-4">
                 <span className="mr-2">minutes</span>
                 <span className="ml-2">:</span>
                 <span>seconds</span>
               </div>
             </div>
           </div>
         </div>
       </div>

    </>
  )
}

export default App
