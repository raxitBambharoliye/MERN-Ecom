import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Aside from '../Aside/Aside'
import '../.../../../assets/css/media.css'
export default function Root() {
  return (
    <>

      <div className="d-md-flex px-lg-5 py-lg-3">
         <Aside></Aside>
        <div id='main' className="px-4 main" >
          <Header />
          <main className='flex-grow-md-1'>
          <Outlet></Outlet>
          </main>
        </div>
      </div>
    </>
  )
}
