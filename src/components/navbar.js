import Link from "next/link";
import { useState } from "react";

function Navbar() {
    const [hideMenu, setHideMenu] = useState(true)

    const handleHideMenu = () => {
        setHideMenu((prev) => !prev)
    }

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="inset-y-0 left-0 flex items-center md:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={handleHideMenu}
                        >
                            {/* <!--Icon when menu is closed. Menu open: "hidden", Menu closed: "block"--> */}
                            <svg className={hideMenu ? "block h-6 w-6" : 'hidden h-6 w-6'} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/* <!--Icon when menu is open. Menu open: "block", Menu closed: "hidden"--> */}
                            <svg className={hideMenu ? "hidden h-6 w-6" : 'block h-6 w-6'} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="md:flex flex-1 items-center justify-center md:items-stretch md:justify-start hidden">
                        <Link href='/' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Homes</Link>
                        <Link href='/pantry' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Pantry</Link>
                        <Link href='/kitchen' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Kitchen</Link>
                        <Link href='/savedRecipes' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Saved Recipes</Link>
                    </div>
                    <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Link href='/login' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</Link>
                        <Link href='/signup' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Sign Up</Link>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div className={hideMenu ? 'hidden' : 'md:hidden'}>
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Home</Link>
                    <Link href="/pantry" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Pantry</Link>
                    <Link href="/kitchen" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Kitchen</Link>
                    <Link href="/savedRecipes" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Saved Recipes</Link>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;