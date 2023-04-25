import Link from "next/link";

function Navbar() {
    return (
        <div className="flex justify-center p-5">
            <div className="flex justify-center items-center">
                <Link href='/' className="ml-5" >Home</Link>
                <Link href='/pantry' className="ml-5" >Pantry</Link>
                <Link href='/kitchen' className="ml-5" >Kitchen</Link>
                <Link href='/savedRecipes' className="ml-5" >Saved Recipes</Link>
            </div>
        </div>
    )
}

export default Navbar;