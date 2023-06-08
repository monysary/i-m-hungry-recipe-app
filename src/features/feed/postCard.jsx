import { useState } from "react";
import getTimeAgo from "@/utils/getTimeAgo";

export default function PostCard({ recipe }) {
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  return (
    <div className='w-full mb-12'>
      {visible ? (
        <div className='overflow-hidden bg-white shadow rounded-md'>
          {recipe && (
            <div key={recipe.id}>
              <div className='flex flex-row justify-between '>
                <div className='flex flex-col gap-2 px-2 md:px-4 py-6 sm:px-6 rounded-md'>
                  <p className='text-gray-500 text-sm italic'>
                    {getTimeAgo(recipe.updatedAt)}
                  </p>
                  <h3 className='font-semibold leading-7 text-gray-900 text-xl'>
                    {recipe.username}
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    Recipe information.
                  </p>
                </div>
                <div className='pr-4 mt-6 w-24 h-12'>
                  <button
                    onClick={() => setVisible(!visible)}
                    className='w-24 p-2 flex items-center bg-gray-200 h-8 text-sm text-black font-medium hover:bg-gray-100 transition ease-out rounded-md'>
                    See less
                  </button>
                </div>
              </div>
              <div className='border-t border-gray-100 rounded-md'>
                <dl className='divide-y divide-gray-100 rounded-md'>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Recipe Name
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {recipe.title}
                    </dd>
                  </div>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Servings
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {recipe.servings}
                    </dd>
                  </div>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className=' text-sm font-medium  text-gray-900'>
                      Ingredients
                    </dt>
                    <div className='flex flex-col gap-2 w-min'>
                      {recipe.ingredients &&
                        recipe.ingredients.map((ingredient, index) => (
                          <dd className='flex flex-row gap-2 w-min text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0'>
                            <div className='flex flex-row gap-2'>
                              <p>-</p>
                              <p> {ingredient.name}</p>
                            </div>
                            <p>
                              ({ingredient.amount} {ingredient.unit})
                            </p>
                          </dd>
                        ))}
                    </div>
                  </div>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Instructions
                    </dt>
                    <div className='flex flex-col gap-2 w-min'>
                      {recipe.instructions.map((instruction, index) => (
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                          <div className='flex flex-row gap-2'>
                            <p>{index + 1}. </p>
                            <p> {instruction}</p>
                          </div>
                        </dd>
                      ))}
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='overflow-hidden bg-white shadow rounded-md'>
          {recipe && (
            <div key={recipe.id}>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-2 px-2 md:px-4 py-6 sm:px-6 rounded-md'>
                  <p className='text-gray-500 text-sm italic'>
                    {getTimeAgo(recipe.updatedAt)}
                  </p>
                  <h3 className='font-semibold leading-7 text-gray-900 text-xl'>
                    {recipe.username}
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    Recipe information.
                  </p>
                </div>
                <div className='pr-4 mt-6 w-24 h-12'>
                  <button
                    onClick={() => setVisible(!visible)}
                    className='w-24 p-2 flex items-center bg-gray-200 h-8 text-sm text-black font-medium hover:bg-gray-100 transition ease-out rounded-md'>
                    See more
                  </button>
                </div>
              </div>
              <div className='border-t border-gray-100 rounded-md'>
                <dl className='divide-y divide-gray-100 rounded-md'>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Recipe Name
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {recipe.title}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      )}
      {!commentVisible ? (
        <button
          className='p-2 text-orange-600 hover:text-orange-500 underline font-medium'
          onClick={() => setCommentVisible(!commentVisible)}>
          Add comment
        </button>
      ) : (
        <form htmlFor='comment' className=' mt-4 '>
          <textarea
            htmlFor='comment'
            placeholder='Leave a comment'
            className='rounded-md w-full'
          />
          <div className='flex flex-row gap-2'>
            <button className='p-2 mt-2 w-36 bg-orange-600 hover:bg-orange-500 transition ease-out text-white rounded-md font-medium'>
              Submit
            </button>
            <button
              onClick={() => setCommentVisible(false)}
              className='p-2 mt-2 w-36 border border-orange-500 hover:opacity-60 transition ease-out text-orange-500  rounded-md font-medium'>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
