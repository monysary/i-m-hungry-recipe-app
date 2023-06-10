import Link from "next/link";

export default function PageHeading() {
  return (
    <div className='flex justify-center h-full mb-2'>
      <div className='max-w-[1280px] w-full  py-2'>
        <div className='border-b border-gray-200 w-full pb-5 px-4 md:px-0 flex flex-col md:flex-row justify-between items-start'>
          <div className='flex flex-col gap-4 w-full md:pl-2'>
            <h3 className='text-3xl font-semibold leading-6 text-gray-900'>
              {headerText.title}
            </h3>
            <p className='mb-6 px-2 md:px-0  text-black'>{headerText.description}</p>
          </div>
          <div className='mt-3 sm:mt-0 w-full md:w-max'>
            <Link
              href='/savedRecipes'
              className='inline-flex justify-center w-full md:w-max items-center md:ml-3 px-3 py-2 rounded-md bg-orange-600 hover:bg-orange-500 transition ease-out text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
              Post a recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const headerText = {
  title: "See what others are eating",
  description:
    "Discover culinary inspiration: Explore the tantalizing creations of fellow food enthusiasts",
};
