import { Fragment, useState } from "react"
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { Listbox, Transition } from "@headlessui/react"
import authService from "@/utils/auth/authService"

export default function CommentForm({ recipeId, setToggle }) {
  const [selected, setSelected] = useState(moods[5])
  const [comment, setComment] = useState("")

  async function handleSubmitComment(event, id) {
    event.preventDefault()

    if (!authService.loggedIn()) {
      alert("Please log in to comment")
      return
    }

    if (!comment) {
      alert("Please enter a comment")
      return
    }
    try {
      const response = await fetch("/api/comment?action=comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
        },
        body: JSON.stringify({
          description: comment,
          recipeId: id,
        }),
      })
      if (response.ok) {
        setComment("")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setToggle((prev) => !prev)
    }
  }

  return (
    <form action='#' className='relative flex-auto' onSubmit={() => handleSubmitComment(event, recipeId)}>
      <div className='overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-blue-600'>
        <label htmlFor='comment' className='sr-only'>
          Add your comment
        </label>
        <textarea
          rows={2}
          name='comment'
          id='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='block w-full resize-none h-14 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
          placeholder='Add your comment...'
          maxLength={255}
        />
      </div>

      <div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
        <div className='flex items-center space-x-5'>
          <div className='flex items-center'>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className='sr-only'>
                    Your mood
                  </Listbox.Label>
                  <div className='relative'>
                    <Listbox.Button className='relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                      <span className='flex items-center justify-center'>
                        {selected.value === null ? (
                          <span>
                            <FaceSmileIcon
                              className='h-5 w-5 flex-shrink-0'
                              aria-hidden='true'
                            />
                            <span className='sr-only'>Add your mood</span>
                          </span>
                        ) : (
                          <span>
                            <span
                              className={classNames(
                                selected.bgColor,
                                "flex h-8 w-8 items-center justify-center rounded-full"
                              )}>
                              <selected.icon
                                className='h-5 w-5 flex-shrink-0 text-white'
                                aria-hidden='true'
                              />
                            </span>
                            <span className='sr-only'>{selected.name}</span>
                          </span>
                        )}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'>
                      <Listbox.Options className='absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm'>
                        {moods.map((mood) => (
                          <Listbox.Option
                            key={mood.value}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-gray-100 text-black"
                                  : "bg-white text-black",
                                "relative cursor-default select-none px-3 py-2"
                              )
                            }
                            value={mood}>
                            <div className='flex items-center'>
                              <div
                                className={classNames(
                                  mood.bgColor,
                                  "flex h-8 w-8 items-center justify-center rounded-full"
                                )}>
                                <mood.icon
                                  className={classNames(
                                    mood.iconColor,
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden='true'
                                />
                              </div>
                              <span className='ml-3 block truncate font-medium'>
                                {mood.name}
                              </span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <div className='text-xs text-gray-500'>
            {255 - comment.length} characters left
          </div>
          <button
            type='submit'
            // onClick={() => handleSubmitComment(recipe.id)}
            className='rounded-md bg-orange-600  px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm  hover:bg-orange-500 transition ease-out'>
            Comment
          </button>
        </div>
      </div>
    </form>
  )
}

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-black",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-black",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-black",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-black",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-black",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
