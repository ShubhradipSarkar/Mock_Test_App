"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
function Page() {
  const router = useParams();
  const { teacher } = router;
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
          Hi, welcome to {teacher}'s Pathsala
        </div>

        <div className="gap-4 w-4/5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="my-8 bg-white rounded shadow-md">
              <div className="p-4 m-2 flex flex-row justify-between items-center">
                <div>
                  <div className="text-black font-bold rounded p-1">
                    Mathematics Mini Mock Tests
                  </div>
                  <div className="flex justify-center items-center m-2 bg-green-500 text-sm rounded p-2">
                    13 tests
                  </div>
                </div>
                <Link href={`${teacher}/Mathemtics`}>
                <button
                  className="ml-auto text-sm px-4 bg-cyan-500 shadow-md hover:bg-cyan-400 rounded"
                  style={{ height: "50px" }}
                  
                >
                  See Available Tests
                </button>
                </Link>
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
  );
}

export default Page;
