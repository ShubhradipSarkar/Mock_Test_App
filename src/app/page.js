"use client"
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const teachers = [
    "Sayon",
    "Pritam",
    "Koumi",
    "Ayan",
    "Tanaya",
    "Suman",
    "Chandan sir",
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Fixed Sidebar */}
      <div className="h-screen bg-stone-950 w-56 overflow-y-auto fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-56 flex flex-col items-center justify-center overflow-y-auto">
        <div className="text-8xl text-blue-300 mt-4">Class 2</div>
        <div className="flex flex-row flex-wrap m-4 gap-4">
          {teachers.map((teacher) => (
            <Link key={teacher} href={`/teacher/${teacher}`}>
              <div className="h-48 w-42 rounded bg-white shadow-md text-black font-bold flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div className="p-2 text-center">
                  Learn with {teacher}
                </div>
              </div>
            </Link>
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
