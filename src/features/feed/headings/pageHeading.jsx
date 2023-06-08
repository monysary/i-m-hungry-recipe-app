import Link from "next/link";

export default function PageHeading() {
  return (
    <div className='flex justify-center h-full mb-0'>
      <div className='max-w-[1280px] w-full px-2 py-6'>
        <div className='border-b border-gray-200 w-full pb-5 flex flex-col md:flex-row justify-between items-start'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-3xl font-semibold leading-6 text-gray-900'>
              {headerText.title}
            </h3>
            <p className='mb-6 text-black'>{headerText.description}</p>
          </div>
          <div className='mt-3 mb-6 md:mb-0 sm:mt-0'>
            <Link
              href='/savedRecipes'
              className='ml-3 inline-flex items-center rounded-md bg-orange-600 hover:bg-orange-500 transition ease-out px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
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
