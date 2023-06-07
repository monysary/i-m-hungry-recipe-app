import Link from "next/link";

export default function PageHeading() {
    return (
        <div className="flex justify-center h-full mb-0">
            <div className="max-w-[1280px] w-full px-2 md:px-4 py-6">
                <div className="border-b border-gray-200 w-full pb-5 flex flex-col md:flex-row justify-between items-start">
                    <div className='flex flex-col gap-4'>
                        <h3 className="text-3xl font-semibold leading-6 text-gray-900">
                            See what others are eating
                        </h3>
                        <p className="mb-6 text-black">See what other users are making</p>
                    </div>
                    <div className="mt-3 mb-6 md:mb-0 sm:mt-0">
                        <Link
                            href="/savedRecipes"
                            className="inline-flex items-center rounded-md  bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Share
                        </Link>
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}