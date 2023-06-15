import { Fragment, useState, useEffect } from "react"
import getTimeAgo from "@/utils/getTimeAgo"
import authService from "@/utils/auth/authService"
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"
import { Listbox, Transition } from "@headlessui/react"

export default function CommentsFeed({
  recipeId,
  comments,
  userId,
}) {
  const [selected, setSelected] = useState(moods[5])
  const [comment, setComment] = useState("")
  const [commentCount, setCommentCount] = useState(2)

  function viewAllComments() {
    if (commentCount === comments?.length) {
      setCommentCount(2)
    } else {
      setCommentCount(comments?.length)
    }
  }

  async function handleSubmitComment() {
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
          recipeId: recipeId,
        }),
      })
      if (response.ok) {
        setComment("")
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await fetch(`/api/comment?commentId=${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
        },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async function handleAddLike(commentId) {
    const response = await fetch(
      `/api/comment?action=like&commentId=${commentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
        },
      }
    )
    if (response.ok) {
      setComment("")
    }
    window.location.reload()
  }
  return (
    <div>
      <div className='flex flex-row items-center gap-2'>
        <p className='mt-2 p-2 rounded-md w-max text-sm'>
          {comments?.length} comments
        </p>
        {comments.length > 2 && (
          <button
            onClick={viewAllComments}
            className='text-sm mt-2 text-blue-600 underline hover:text-blue-500 transition ease-out'>
            {commentCount === comments?.length ? "view less" : "view all"}
          </button>
        )}
      </div>
      <ul role='list' className='space-y-6 '>
        {comments?.slice(0, commentCount).map((comment, commentIdx) => (
          <li key={comment.id} className='relative flex flex-col gap-x-4'>
            <div
              className={classNames(
                commentIdx === comments.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}>
              <div className='w-px bg-gray-200' />
            </div>

            <div className='flex flex-row w-full items-start pt-2'>
              {/* TODO: allow profile pictures to be uploaded */}
              {/* <img
                src='https://www.nwcopro.solutions/wp-content/uploads/2018/04/default-avatar.png'
                alt='avatar'
                className='relative mt-3 h-6 w-6 flex-none rounded-full bg-white'
              /> */}

              <div className='relative flex h-6 w-6 flex-none items-center justify-center '>
                <div className='h-1.5 w-1.5 rounded-full bg-orange-500 ring-1 ring-gray-300' />
              </div>
              <div className='flex flex-row w-full rounded-md'>
                <div className='flex flex-col w-full justify-between gap-x-4'>
                  <div className=' text-xs leading-5 text-gray-500'>
                    <span className='font-medium text-gray-900 mr-2'>
                      {comment.username}
                    </span>
                    commented
                    <time
                      dateTime={comment.dateTime}
                      className='flex-none py-0.5 ml-1 text-xs leading-5 text-gray-500'>
                      {getTimeAgo(comment.updatedAt)}
                    </time>
                  </div>
                  <div className='flex flex-row justify-between items-start'>
                    <p className='flex flex-wrap text-sm leading-6 text-black w-full break-words'>
                      {comment.description}
                    </p>
                  </div>
                </div>
                <div className='text-end'>
                  {userId === comment.userId && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className='mt-2 hover:bg-gray-200 bg-gray-300 transition ease-out rounded-full hover:scale-95 '>
                      <XMarkIcon className='w-4 ' />
                    </button>
                  )}
                  <div className=' mt-2 flex flex-row gap-1 text-xs items-center justify-end'>
                    <button onClick={() => handleAddLike(comment.id)}>
                      {comment.likes === 0 ? (
                        <HeartOutline className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' />
                      ) : (
                        <HeartIcon className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' />
                      )}
                    </button>
                    <p> {comment.likes}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* New comment form */}
      <div className='mt-4 flex gap-x-3'>
        <img
          src='https://www.nwcopro.solutions/wp-content/uploads/2018/04/default-avatar.png'
          alt='avatar'
          className='h-6 w-6 flex-none rounded-full bg-gray-50'
        />
        <form action='#' className='relative flex-auto '>
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
                onClick={handleSubmitComment}
                className='rounded-md bg-orange-600  px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm  hover:bg-orange-500 transition ease-out'>
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
