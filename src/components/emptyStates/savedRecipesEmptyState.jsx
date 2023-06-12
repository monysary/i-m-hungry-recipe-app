import { FaceFrownIcon } from "@heroicons/react/24/outline"

export default function SavedRecipesEmptyState() {
  return (
    <button
      type='button'
      className='relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
      <a href='/kitchen'>
        <article className='min-h-full px-6 mb-12 md:text-3xl text-center align-center'>
          <FaceFrownIcon className='w-14 md:w-36 mx-auto text-black' />
          <p className='text-black'>You have no saved recipes</p>
        </article>
        <svg
          className='mx-auto h-12 w-12 text-gray-400'
          stroke='currentColor'
          fill='none'
          viewBox='0 0 48 48'
          aria-hidden='true'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6'
          />
        </svg>
        <span className='mt-2 block text-lg font-semibold text-gray-900'>
          Add a new recipe!
        </span>
      </a>
    </button>
  )
}
