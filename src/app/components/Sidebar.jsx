"use client"
import React from 'react'
import Link from 'next/link';
function Sidebar() {
    
  return (
    <div className="h-screen bg-stone-950 w-56 overflow-y-auto fixed">
        <div className="m-2 p-2 text-2xl font-bold text-white">
          Gurus
        </div>
        <ul className="text-slate-500">
            <Link href={`/preparequestion`}><div className='p-2 m-2'>Prepare new test</div></Link>
            <Link href={`/`}><div className='p-2 m-2'>Home </div></Link>
          {Array.from({ length: 20 }, (_, index) => (
            <li key={index} className="p-2 m-2">
              Sidebar Item {index + 1}
            </li>
          ))}
        </ul>
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

export default Sidebar