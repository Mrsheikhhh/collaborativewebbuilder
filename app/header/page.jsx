import React from 'react'

export default function Header() {
  return (
    <div className='bg-slate-100 h-[15rem] w-full flex flex-col gap-3 p-3'>
      <div className='flex justify-between w-full p-3'>

        <div className='flex justify-between w-[22rem] '>

          <div className='p-3 mx-3 font-bold'>LOGO</div>
          <div className='p-3 text-sm text-gray-600'>/admin/home</div>
        </div>
        <div className='gap-2 mx-4 '>
            <button className='p-3'>Button</button>
            <button className='p-3 '>Button</button>
            <button className='p-3 '>Button</button>
        </div>
      </div>
      <div className=' flex w-[35rem] justify-between p-3'>
        <div className=' mx-10'>
      <h2 className='font-bold  text-[50px]'>Image</h2>
<p>ADMIN </p>
      </div>
        <h2 className='font-bold text-2xl'>Welcome ADMIN</h2>

      </div>
    </div>
  )
}
