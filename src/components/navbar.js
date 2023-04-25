import Link from "next/link";

function Navbar() {
    return (
        <div className="flex justify-between py-5 px-10">
            <div className="flex justify-center items-center">
                <Link href='/' className="ml-5" >Home</Link>
                <Link href='/pantry' className="ml-5" >Pantry</Link>
                <Link href='/kitchen' className="ml-5" >Kitchen</Link>
                <Link href='/savedRecipes' className="ml-5" >Saved Recipes</Link>
            </div>
            <div>
                <Link href='/login' className="mr-5" >Login</Link>
                <Link href='/signup' className="mr-5">Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar;