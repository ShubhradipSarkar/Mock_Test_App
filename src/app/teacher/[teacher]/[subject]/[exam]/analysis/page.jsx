"use client"
import React from 'react'
import { useParams } from 'next/navigation'
function page() {
    // const [, set] = useState();
    const uri = useParams();
    console.log(uri);
  return (
    <div className='bg-slate-900 min-h-screen'>
        <div className='flex flex-col flex-wrap gap-4 justify-center items-center'>
            <div className='flex flex-row flex-wrap gap-3 m-16'>
            <div className='flex flex-col justify-center items-center text-bold text-xl'>
  <div className='text-white m-4 h-36 w-36 bg-blue-500 rounded-lg shadow-md flex justify-center items-center'>
    <div className='text-white h-32 w-32 bg-slate-900 rounded-lg shadow-md'></div>
  </div>
  Score
</div>

                <div className='flex flex-col justify-center items-center text-bold text-xl'><div className='text-white m-4 h-36 w-36 border-8 border-green-500   shadow-md' style={{borderRadius:"50%"}}></div>Correct</div>
                <div className='flex flex-col justify-center items-center text-bold text-xl'><div className='text-white m-4 h-36 w-36  rounded-lg shadow-md' style={{backgroundColor:"#fa0478"}}></div>Wrong</div>
                <div className='flex flex-col justify-center items-center text-bold text-xl'><div className='text-white m-4 h-36 w-36  rounded-lg shadow-md' style={{backgroundColor:"#9204fa"}}></div>Skipped</div>
                {/* <div className='text-white m-4 h-36 w-36 bg-blue-500 rounded-lg shadow-md'>Attempted</div>
                <div className='text-white m-4 h-36 w-36 bg-blue-500 rounded-lg shadow-md'>Skipped</div>
                <div className='text-white m-4 h-36 w-36 bg-blue-500 rounded-lg shadow-md'>Marked</div> */}
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default page