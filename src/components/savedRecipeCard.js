import { HiArrowRight } from 'react-icons/hi'

function SavedRecipeCard() {
  return (
    <article className='bg-green-100 rounded-lg m-2 p-6 shadow-md flex max-w-xl flex-col items-start justify-between'>
      <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900'>
        Garlic Chicken with Apple and Potato Mash
      </h3>
      <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
        Chicken, Apple, Garlic, Potatoes
      </p>
      <div className='font-semibold text-black my-8 flex items-center gap-x-4 text-sm leading-6'>
        Notes:
        <p className='font-normal text-gray-900'>
          Some notes regarding this recipe
        </p>
      </div>
      <button className='flex items-center cursor-pointer text-black'>
        View Recipe
        <HiArrowRight className='ml-[20px]' />
      </button>
    </article>
  )
}

export default SavedRecipeCard
