"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
function page() {
    const uri = useParams();
    const router = useRouter();
    // console.log(router);
    const {teacher} = uri;
    const {subject} = uri;
    // const [hardness, setHardness] = useState(["hard", "easy", "Moderate"])
    // const [hardIndigator, setHardIndigator] = useState(["red","24e305","face05"]);
    const [tests, setTests] = useState(["LCM & HCF standard questions", "Average and Median", "Percentage mini test","Boat in stream test"])
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Fixed Sidebar */}
      <div className="h-screen bg-stone-950 w-56 overflow-y-auto fixed">
        <div className="m-2 p-2 text-2xl font-bold text-white">
          Gurus
        </div>
        <ul className="text-slate-500">
          {Array.from({ length: 20 }, (_, index) => (
            <li key={index} className="p-2 m-2">
              Sidebar Item {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-56 m-4 p-2 flex flex-col items-center justify-center overflow-y-auto">
        <div className="text-bold p-2 text-black text-6xl">
          {teacher}'s {subject} tests
        </div>

        <div className="gap-4 w-4/5">
          {Array.from({ length: 13 }, (_, index) => (
            <div key={index} className="my-8 bg-white rounded shadow-md">
              <div className="p-4 m-2 flex flex-row justify-between items-center">
                <div>
                  <div className="flex flex-row text-black font-bold rounded p-1">
                    {tests[index%4]} - {Math.floor(index/4)+1} 
                    
                        
                    
                  </div>
                  <div className="flex gap-4 justify-center items-center m-2 text-sm rounded p-2">
                    <div className='text-slate-400'>45 mins</div>
                    <div className='text-slate-400'>15 question</div>
                    <div className='text-slate-400'>60 marks</div>
                  </div>
                </div>
                
                <button
                  className="ml-auto text-sm px-4 bg-cyan-500 shadow-md hover:bg-cyan-400 rounded"
                  style={{ height: "50px" }}
                  onClick={()=>{router.push(`${subject}/${tests[index%4]}`)}}
                >
                  Start Test
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Style for thinner scrollbars */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px; /* Set width for vertical scrollbar */
          height: 8px; /* Set height for horizontal scrollbar */
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #6b7280; /* Tailwind color for bg-gray-600 */
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  )
}

export default page