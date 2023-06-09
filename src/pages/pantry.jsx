import { useEffect, useState } from "react"
import Head from "next/head"
import authService from "@/utils/auth/authService"
import { motion as m, AnimatePresence } from "framer-motion"
import { AiFillCloseCircle } from "react-icons/ai"
import {
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"

function Pantry() {
  useEffect(() => {
    if (authService.loggedIn() && !authService.tokenExpired()) {
      return
    } else {
      window.location.assign("/login")
    }
  })

  const [toggle, setToggle] = useState(true)
  const [updateState, setUpdateState] = useState(false)
  const [pantryItems, setPantryItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("/api/pantry", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authService.getToken()}`,
          },
        })

        const data = await response.json()
        setPantryItems(data)
      } catch (err) {
        console.log(err)
      }
    }

    getItems()
  }, [toggle])

  // Add items to pantry
  const addToPantry = async (event) => {
    event.preventDefault()
    const ingredient = event.target[0].value
    const category = event.target[1].value
    try {
      await fetch("/api/pantry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authService.getToken()}`,
        },
        body: JSON.stringify({
          ingredient: ingredient,
          category: category,
        }),
      })
      setToggle((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }

  // Delete items from pantry
  const handleDeleteItem = async (event) => {
    const ingredient = event.target.parentElement.id.split(" ")
    try {
      await fetch(
        `/api/pantry?ingredient=${ingredient[0]}&category=${ingredient[1]}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authService.getToken()}`,
          },
        }
      )

      setToggle((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }

  // Handle Next button
  const handleNextButton = () => {
    window.location.assign("/kitchen")
  }

  // Handle instructions dialog
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen)
  }

  const handleUpdateButton = () => {
    setUpdateState((prev) => !prev)
  }

  return (
    <>
      <Head>
        <title>Checking out the pantry...</title>
      </Head>
      <div className='flex justify-center h-full min-h-[70vh] pb-24 md:mx-4'>
        <div className='max-w-[1280px] w-full px-2 md:px-0 py-4'>
          <div className='min-h-full px-4 md:px-2  py-8'>
            <AnimatePresence>
              <m.div
                key='container'
                initial='hidden'
                animate='visible'
                viewport={{ once: true, amount: 0.8 }}>
                <m.div
                  variants={cardVariantsVertical}
                  className='relative flex items-start gap-1'>
                  <div className='md:text-3xl text-2xl  md:mb-4 text-black font-medium'>
                    Add To Pantry
                  </div>
                  <button onClick={handleDialogOpen}>
                    <QuestionMarkCircleIcon className='w-4 md:w-6 text-gray-900 hover:text-gray-600' />
                  </button>
                  <div
                    onClick={handleDialogOpen}
                    className={`fixed z-10 top-0 left-0 w-screen h-screen ${
                      dialogOpen === false && "hidden"
                    }`}></div>
                  <dialog
                    open={dialogOpen}
                    className='absolute z-10 drop-shadow-xl rounded-lg border-2 border-gray-300'>
                    <p className='text-gray-900 font-semibold'>Instructions:</p>
                    <ol className='font-normal'>
                      <li className='mt-4 md:mt-2'>
                        1. Enter an Ingredient and select a Category
                      </li>
                      <li className='mt-4 md:mt-2'>
                        2. Click Add to add the ingredient into the pantry{" "}
                      </li>
                      <li className='mt-4 md:mt-2'>
                        3. Click Update to remove an ingredients
                      </li>
                      <li className='mt-4 md:mt-2'>
                        4. Select Next to proceed to the Kitchen
                      </li>
                    </ol>
                  </dialog>
                </m.div>
              </m.div>
              <div className='md:flex items-end' key='form'>
                <form
                  className='sm:flex items-end'
                  id='pantry-form'
                  onSubmit={addToPantry}>
                  <div>
                    <label className='block text-sm font-medium leading-6 text-gray-900 mt-2 sm:mt-0'>
                      Ingredient
                    </label>
                    <div className='sm:mt-2'>
                      <input
                        name='ingredient'
                        placeholder='Ingredient...'
                        required
                        className='block w-full px-[10px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-teal-500 focus:border-teal-500 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:ml-[20px]'>
                    <label className='block text-sm font-medium leading-6 text-gray-900 mt-2 sm:mt-0'>
                      Category
                    </label>
                    <div className='sm:mt-2'>
                      <select
                        name='category'
                        placeholder='Select category'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6'>
                        {categories.map((category) => {
                          return <option key={category}>{category}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </form>

                <div className='grow mt-4 md:mt-0 md:ml-[20px] flex justify-between'>
                  <div>
                    <button
                      className='text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 transition ease-out'
                      type='submit'
                      form='pantry-form'>
                      Add
                    </button>
                    <button
                      className='ml-[10px] text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 transition ease-out'
                      onClick={handleUpdateButton}>
                      Update
                    </button>
                  </div>
                  <button
                    className='font-semibold inline-flex items-center gap-1 text-gray-900 hover:text-gray-500 transition ease-out'
                    onClick={handleNextButton}>
                    Next
                    <ChevronRightIcon className='w-5' />
                  </button>
                </div>
              </div>
              <div key='ingredients'>
                <div className='mt-6 border-t border-gray-200'>
                  <dl className='divide-y divide-gray-200'>
                    {categories.map((category, index) => {
                      return (
                        <div
                          key={index}
                          className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium leading-6 text-gray-900'>
                            {category}
                          </dt>
                          <div className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                            <div className='flex flex-wrap gap-[10px]'>
                              {pantryItems &&
                                pantryItems
                                  .filter((item) => item.category === category)
                                  .map((item, index) => {
                                    return (
                                      <div
                                        className={`relative text-gray-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ${
                                          category === categories[0]
                                            ? "bg-rose-100"
                                            : category === categories[1]
                                            ? "bg-green-100"
                                            : category === categories[2]
                                            ? "bg-orange-100"
                                            : category === categories[3]
                                            ? "bg-slate-100"
                                            : category === categories[4]
                                            ? "bg-yellow-100"
                                            : category === categories[5]
                                            ? "bg-lime-100"
                                            : category === categories[6]
                                            ? "bg-blue-100"
                                            : category === categories[7]
                                            ? "bg-gray-100"
                                            : "bg-white"
                                        }`}
                                        key={index}
                                        id={`${item.ingredient} ${
                                          category === categories[0]
                                            ? categories[0]
                                            : category === categories[1]
                                            ? categories[1]
                                            : category === categories[2]
                                            ? categories[2]
                                            : category === categories[3]
                                            ? categories[3]
                                            : category === categories[4]
                                            ? categories[4]
                                            : category === categories[5]
                                            ? categories[5]
                                            : category === categories[6]
                                            ? categories[6]
                                            : category === categories[7]
                                            ? categories[7]
                                            : undefined
                                        }`}>
                                        {item.ingredient}
                                        <AiFillCloseCircle
                                          id={`${item.ingredient} ${
                                            category === categories[0]
                                              ? categories[0]
                                              : category === categories[1]
                                              ? categories[1]
                                              : category === categories[2]
                                              ? categories[2]
                                              : category === categories[3]
                                              ? categories[3]
                                              : category === categories[4]
                                              ? categories[4]
                                              : category === categories[5]
                                              ? categories[5]
                                              : category === categories[6]
                                              ? categories[6]
                                              : category === categories[7]
                                              ? categories[7]
                                              : undefined
                                          }`}
                                          className={`absolute right-[-10px] top-[-10px] cursor-pointer text-[20px]
                                    ${
                                      !updateState &&
                                      "hidden absolute right-[-10px] top-[-10px] cursor-pointer text-[20px]"
                                    }
                                    `}
                                          onClick={handleDeleteItem}
                                        />
                                      </div>
                                    )
                                  })}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </dl>
                </div>
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pantry

const categories = [
  "Protein",
  "Vegetables",
  "Fruits",
  "Grain",
  "Dairy",
  "Butter/Oil",
  "Spice",
  "Seasoning",
  "Other",
]

const cardVariantsVertical = {
  hidden: {
    y: 150,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}
