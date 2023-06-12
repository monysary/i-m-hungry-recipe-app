import Link from "next/link"
import { useEffect, useState } from "react"

import authService from "@/utils/auth/authService"

function Navbar() {
  const [hideMenu, setHideMenu] = useState(true)
  const handleHideMenu = () => {
    setHideMenu((prev) => !prev)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (authService.loggedIn() && !authService.tokenExpired()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  })

  const userLogout = () => {
    authService.logout()
  }

  return (
    <nav className='bg-gray-800 md:px-4'>
      <div className='mx-auto max-w-7xl px-4 md:px-0'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='inset-y-0 left-0 flex items-center md:hidden'>
            {/* <!-- Mobile menu button--> */}
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white  transition ease-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              onClick={handleHideMenu}>
              {/* <!--Icon when menu is closed--> */}
              <svg
                className={hideMenu ? "block h-6 w-6" : "hidden h-6 w-6"}
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
              {/* <!--Icon when menu is open--> */}
              <svg
                className={hideMenu ? "hidden h-6 w-6" : "block h-6 w-6"}
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='md:flex flex-1 items-center justify-center md:items-stretch md:justify-start hidden'>
            <Link
              href='/'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium transition ease-out'>
              Home
            </Link>
            <Link
              href='/feed'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium transition ease-out'>
              Feed
            </Link>
            <Link
              href='/pantry'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium transition ease-out'>
              Pantry
            </Link>
            <Link
              href='/kitchen'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium transition ease-out'>
              Kitchen
            </Link>
            <Link
              href='/savedRecipes'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium transition ease-out'>
              Saved Recipes
            </Link>
            <Link
              href='/faq'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'>
              FAQ
            </Link>
          </div>
          <div className='inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <Link
              href='/login'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm md:text-[16px] font-medium transition ease-out'
              style={{
                display: isLoggedIn ? "none" : "block",
              }}>
              Login
            </Link>
            <Link
              href='/signup'
              className='text-gray-300 bg-orange-600 hover:bg-orange-500 hover:text-white rounded-md px-3 py-2 text-sm md:text-[16px] font-medium transition ease-out'
              style={{
                display: isLoggedIn ? "none" : "block",
              }}>
              Sign Up
            </Link>
            <button
              href='/'
              className='text-gray-300 bg-orange-600 hover:bg-orange-500 hover:text-white rounded-md px-3 py-2 text-sm md:text-[16px] font-medium transition ease-out'
              style={{
                display: isLoggedIn ? "block" : "none",
              }}
              onClick={userLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className={hideMenu ? "hidden" : "md:hidden"}>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link
            href='/'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition ease-out'>
            Home
          </Link>
          <Link
            href='/feed'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition ease-out'>
            Feed
          </Link>
          <Link
            href='/pantry'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition ease-out'>
            Pantry
          </Link>
          <Link
            href='/kitchen'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition ease-out'>
            Kitchen
          </Link>
          <Link
            href='/savedRecipes'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition ease-out'>
            Saved Recipes
          </Link>
          <Link
            href='/faq'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition ease-out'>
            Faq
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
