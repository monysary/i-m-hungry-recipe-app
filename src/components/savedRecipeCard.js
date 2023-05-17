import { useEffect, useLayoutEffect, useRef, useState, Fragment } from 'react'
import { TrashIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'

import RecipeCard from './recipeCard'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ myRecipes }) {
  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedRecipe.length > 0 && selectedRecipe.length < myRecipes?.length
    setChecked(selectedRecipe.length === myRecipes?.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedRecipe])

  function toggleAll() {
    setSelectedRecipe(checked || indeterminate ? [] : myRecipes)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  // Handle delete button
  const handleDeleteButton = () => {
    console.log(selectedRecipe);
  }

  // Open recipe modal
  const [open, setOpen] = useState(false)
  const [recipeModal, setRecipeModal] = useState(undefined)
  const handleOpenModal = (recipe) => {
    console.log(recipe);
    setRecipeModal(recipe)
    setOpen(true)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedRecipe.length > 0 && (
                <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                  <button
                    type="button"
                    onClick={handleDeleteButton}
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <TrashIcon className='h-6 w-6' />
                  </button>
                </div>
              )}
              <table className="w-full table-fixed divide-y divide-gray-300">
                <thead className='w-full'>
                  <tr>
                    <th scope="col" className="relative px-7 w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope="col" className={`w-auto py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 
                      ${selectedRecipe.length > 0 && 'invisible'}
                    `}>
                      Name
                    </th>
                    <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:w-[10%]">
                      Servings
                    </th>
                    <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:w-[25%]">
                      Ingredients
                    </th>
                    <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:w-[25%]">
                      Instructions
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3 md:w-[10%]">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {myRecipes?.map((recipe) => (
                    <tr
                      key={recipe.title}
                      className={classNames('',
                        selectedRecipe.includes(recipe) ? 'bg-gray-50' : undefined
                      )}
                    >
                      <td className="relative px-7 w-12 sm:px-6">
                        {selectedRecipe.includes(recipe) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          value={recipe.title}
                          checked={selectedRecipe.includes(recipe)}
                          onChange={(e) =>
                            setSelectedRecipe(
                              e.target.checked
                                ? [...selectedRecipe, recipe]
                                : selectedRecipe.filter((p) => p !== recipe)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'w-auto py-4 pr-3 text-sm font-medium truncate',
                          selectedRecipe.includes(recipe) ? 'text-indigo-600' : 'text-gray-900'
                        )}
                      >
                        {recipe.title}
                      </td>
                      <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500">
                        {recipe.servings}
                      </td>
                      <td className="hidden md:table-cell px-3 py-4 text-sm text-gray-500 truncate">
                        {JSON.parse(recipe.ingredients).map((ingredient) => ingredient.name).join(', ')}
                      </td>
                      <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 truncate">
                        {JSON.parse(recipe.instructions).map((instruction) => instruction).join(', ')}
                      </td>
                      <td className="py-4 sm:pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <button
                          type='button'
                          onClick={() => handleOpenModal(recipe)}
                          className="ml-[10px] rounded-md sm:ml-0 text-gray-900 bg-white shadow-sm hover:bg-gray-50 ring-1 ring-inset ring-gray-300 font-semibold rounded-lg text-sm px-2.5 py-1.5"
                        >
                          View<span className="sr-only">{recipe.title}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md sm:p-6">
                  <div>
                    <div className="px-4 sm:px-0">
                      <h3 className="text-[25px] font-semibold leading-7 text-gray-900">{recipeModal?.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Servings: {recipeModal?.servings}</p>
                    </div>
                    <div className="mt-6 border-t border-gray-200">
                      <dl className="divide-y divide-gray-200">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">Ingredients</dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {recipeModal &&
                              JSON.parse(recipeModal?.ingredients).map((item) => {
                                return <div key={item.name}>- {`${item.name} (${item.amount} ${item.unit})`}<br /></div>
                              })
                            }
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">Instructions</dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {recipeModal &&
                              JSON.parse(recipeModal?.instructions).map((item) => {
                                return <div key={item}>{JSON.parse(recipeModal?.instructions).indexOf(item) + 1}. {item}<br /></div>
                              })
                            }
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">Notes</dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Click Edit to add Notes
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        type="button"
                        className="font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        onClick={() => console.log('Edit button')}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        onClick={() => console.log('Delete button')}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
