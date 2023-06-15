import React, { useState, useEffect, Fragment } from "react"
import PageHeading from "@/features/feed/headings/pageHeading"
import CommentForm from "@/features/feed/comments/commentForm"
import FeedSkeleton from "@/components/skeletons/feedSkeleton"
import getTimeAgo from "@/utils/getTimeAgo"
import authService from "@/utils/auth/authService"
import { TbArrowsDiagonal, TbArrowsDiagonalMinimize2 } from "react-icons/tb"
import {
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"
import { motion as m, AnimatePresence } from "framer-motion"

export default function FeedPage() {
  const [toggle, setToggle] = useState(false)
  const [userId, setUserId] = useState("")
  const [recipes, setRecipes] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [recipeLikes, setRecipeLikes] = useState([])
  const [visible, setVisible] = useState([])
  const [commentCount, setCommentCount] = useState(2)

  useEffect(() => {
    if (authService.loggedIn()) {
      const user = authService.getProfile()
      const userId = user.id
      setUserId(userId)
    }
    fetchAllComments()
    fetchAllLikes()
  }, [toggle])

  useEffect(() => {
    fetchTimelineRecipes()
  }, [])

  // Fetch all timeline recipes
  const fetchTimelineRecipes = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/savedRecipe/timeline", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      const convertedData = data.map((object) => {
        const updatedObject = { ...object }
        if (typeof object.ingredients === "string") {
          updatedObject.ingredients = JSON.parse(object.ingredients)
        }
        if (typeof object.instructions === "string") {
          updatedObject.instructions = JSON.parse(object.instructions)
        }
        return updatedObject
      })
      setRecipes(convertedData.reverse())
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // fetch all comments
  async function fetchAllComments() {
    try {
      const response = await fetch("/api/comment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const comments = await response.json()
      if (response.ok) {
        setComments(comments)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // fetch all recipe likes
  async function fetchAllLikes() {
    try {
      const response = await fetch(`/api/savedRecipe/likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const likes = await response.json()
      if (response.ok) {
        setRecipeLikes(likes)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAddLikeRecipe(recipeId) {
    try {
      const response = await fetch(
        `/api/savedRecipe/likes?recipeId=${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authService.getToken(),
          },
        }
      )
      if (response.ok) {
        return response
      }
    } catch (err) {
      throw new Error(err)
    } finally {
      setToggle(!toggle)
    }
  }

  function viewAllComments(id) {
    if (commentCount === comments?.filter((comment) => comment.recipeId === id).length) {
      setCommentCount(2)
    } else {
      setCommentCount(comments?.filter((comment) => comment.recipeId === id).length)
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
    } finally {
      setToggle(!toggle)
    }
  }

  async function handleAddLikeComment(commentId) {
    try {
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
    } catch (err) {
      console.log(err);
    } finally {
      setToggle(!toggle)
    }
  }

  if (loading)
    return (
      <div className='flex w-full min-h-screen h-full pb-12 md:pb-0 md:min-h-[80vh] md:h-[80vh] justify-center md:mt-6 mt-4 md:mx-4'>
        <div className='flex flex-col w-full md:max-w-7xl gap-8 md:gap-16 md:my-0 '>
          <div className='flex flex-col w-full justify-between md:max-w-7xl gap-8 md:gap-16  md:my-0 md:px-0 px-2 mt-4  md:mt-6'>
            <PageHeading />
          </div>
          <div className='flex flex-col w-full md:max-w-7xl md:grid md:grid-cols-2 gap-8 md:gap-16 md:my-0 md:mx-0 px-4'>
            <FeedSkeleton />
            <FeedSkeleton />
            <FeedSkeleton />
            <FeedSkeleton />
          </div>
        </div>
      </div>
    )

  return (
    <div className='flex justify-center h-full min-h-[70vh] pb-24 bg-white md:mt-6 md:mx-4'>
      <div className='max-w-[1280px] w-full h-full px-2 md:px-0 py-6 '>
        <PageHeading />
        <section className='flex justify-center px-0 w-full pb-24 '>
          <div className='md:grid md:grid-cols-2 flex flex-col gap-8 pb-24 w-full '>
            <AnimatePresence>
              {recipes &&
                recipes.map((recipe) => (
                  <div key={recipe.id}>
                    <m.div
                      initial='hidden'
                      animate='visible'
                      viewport={{ once: true, amount: 0.8 }}>
                      <m.div variants={cardVariantsVertical}>
                        <div className='w-full'>
                          {/* Post section */}
                          <article className='overflow-hidden shadow rounded-md bg-zinc-50'>
                            {recipe && (
                              <div key={recipe.id}>
                                <div className='flex flex-row justify-between px-2'>
                                  <div className='flex flex-col gap-2 px-2 md:px-4 py-2 sm:px-6 rounded-md'>
                                    <h3 className='font-semibold leading-7 text-gray-900 text-md'>
                                      {recipe.username}
                                    </h3>
                                    <p className='text-gray-500 text-sm italic'>
                                      {getTimeAgo(recipe.updatedAt)}
                                    </p>
                                  </div>
                                  <div className='mt-4 mr-4 h-12'>
                                    <button
                                      onClick={() => setVisible((prev) => {
                                        if (!prev.find((item) => item === recipe.id)) {
                                          return [...prev, recipe.id]
                                        } else {
                                          return prev.filter((id) => id !== recipe.id)
                                        }
                                      })}
                                      className='w-8 flex items-center justify-center bg-stone-200 h-8 text-sm text-black font-medium hover:opacity-70 hover:border border-gray-300 transition ease-out rounded-md'>
                                      {recipe.id === visible.find((item) => item === recipe.id)
                                        ? <TbArrowsDiagonalMinimize2
                                          size={25}
                                          className='hover:scale-95 transition ease-out' />
                                        : <TbArrowsDiagonal
                                          size={25}
                                          className='hover:scale-105 transition ease-out' />
                                      }
                                    </button>
                                  </div>
                                </div>
                                <div className='border-t border-gray-100 rounded-md'>
                                  <dl className='divide-y divide-gray-100 rounded-md'>
                                    <div className='px-4 py-4 sm:gap-4 sm:px-6'>
                                      <div className='flex flex-row justify-between items-start w-full'>
                                        <dd className='mt-1 text-xl leading-6 text-black font-medium sm:col-span-2 sm:mt-0'>
                                          {recipe.title}
                                        </dd>
                                        <div className='ml-2 mt-2 flex flex-row gap-2 text-xs items-center justify-end'>
                                          <button onClick={() => handleAddLikeRecipe(recipe.id)}>
                                            {!recipeLikes?.find((like) => like.recipeId === recipe.id)
                                              ? (<HeartOutline className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' />) : (
                                                <HeartIcon className='w-6 text-red-500 hover:text-red-400 transition ease-out hover:scale-105' />)
                                            }
                                          </button>
                                          <p>
                                            {" "}
                                            {recipeLikes?.find((like) => like.recipeId === recipe.id)?.likes}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={visible.find((item) => item === recipe.id) ? 'block' : 'hidden'}>
                                      <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                                            Recipe information:
                                          </p>
                                        </dt>
                                      </div>
                                      <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                          Servings
                                        </dt>
                                        <dd className='mt-1 text-lg font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                                          {recipe.servings}
                                        </dd>
                                      </div>
                                      <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className=' text-sm font-medium mb-4 md:mb-0 text-gray-900'>
                                          Nutritional facts
                                        </dt>
                                        <div className='grid grid-cols-3 w-full col-span-2 gap-2 mb-4  bg-white/5 '>
                                          {recipe.nutritional_facts &&
                                            Object.entries(recipe?.nutritional_facts)?.map(([factName, factValue]) => {
                                              return (
                                                <div
                                                  key={factName}
                                                  className='flex flex-col items-center px-4 py-2 sm:px-6 w-full rounded-md bg-stone-200'>
                                                  <p className='text-sm font-medium leading-6 text-gray-500'>
                                                    {factName}
                                                  </p>
                                                  <p className='flex items-baseline gap-x-2'>
                                                    <span className='text-lg font-semibold tracking-tight text-black'>
                                                      {factValue}
                                                    </span>
                                                  </p>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                      </div>
                                      <div className='px-4 py-4 sm:grid sm:grid-cols-3  sm:px-6'>
                                        <dt className=' text-sm font-medium  text-gray-900'>
                                          Ingredients
                                        </dt>
                                        <div className='flex flex-col gap-2 '>
                                          {recipe.ingredients &&
                                            recipe.ingredients.map((ingredient, index) => (
                                              <dd
                                                key={index}
                                                className='flex flex-row text-start justify-start  gap-1 text-sm leading-6 text-gray-700  sm:mt-0'>
                                                <div className='flex flex-row'>
                                                  <p>-</p>
                                                  <p className='w-full font-medium'>
                                                    {" "}
                                                    {ingredient.name}
                                                  </p>
                                                </div>
                                                <div className='flex flex-row gap-1 italic'>
                                                  <p>{ingredient.amount}</p>
                                                  <p> {ingredient.unit}</p>
                                                </div>
                                              </dd>
                                            ))
                                          }
                                        </div>
                                      </div>
                                      <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-900'>
                                          Instructions
                                        </dt>
                                        <div className='col-span-2'>
                                          {recipe.instructions.map((instruction, index) => (
                                            <dd
                                              className='mt-1 text-sm leading-6 w-full text-gray-700 sm:mt-0'
                                              key={instruction}>
                                              <div className='flex flex-row w-full gap-2'>
                                                <p>{index + 1}. </p>
                                                <p> {instruction}</p>
                                              </div>
                                            </dd>
                                          ))}
                                        </div>
                                      </div>
                                      {recipe.notes && (
                                        <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                          <dt className='text-sm font-medium text-gray-900'>
                                            Notes
                                          </dt>
                                          <div className='col-span-2'>
                                            <dd className='mt-1 text-sm leading-6 w-full text-gray-700 sm:mt-0'>
                                              <div className='flex flex-row w-full gap-2'>
                                                <p>{recipe.notes} </p>
                                              </div>
                                            </dd>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            )}
                          </article>

                          {/* Comment section */}
                          <section className={`px-2 ${visible.find((item) => item === recipe.id) ? 'block' : 'hidden'}`}>
                            {comments?.filter((comment) => comment.recipeId === recipe.id) && (
                              <article>
                                <div>
                                  <div className='flex flex-row items-center gap-2'>
                                    <p className='mt-2 p-2 rounded-md w-max text-sm'>
                                      {comments?.filter((comment) => comment.recipeId === recipe.id).length} comments
                                    </p>
                                    {comments?.filter((comment) => comment.recipeId === recipe.id).length > 2 && (
                                      <button
                                        onClick={() => viewAllComments(recipe.id)}
                                        className='text-sm mt-2 text-blue-600 underline hover:text-blue-500 transition ease-out'>
                                        {commentCount === comments?.filter((comment) => comment.recipeId === recipe.id).length ? "view less" : "view all"}
                                      </button>
                                    )}
                                  </div>
                                  <ul role='list' className='space-y-6 '>
                                    {comments?.filter((comment) => comment.recipeId === recipe.id).slice(0, commentCount).reverse().map((comment, commentIdx) => (
                                      <li key={comment.id} className='relative flex flex-col gap-x-4'>
                                        <div
                                          className={classNames(
                                            commentIdx === comments?.filter((comment) => comment.recipeId === recipe.id).length - 1 ? "h-6" : "-bottom-6",
                                            "absolute left-0 top-0 flex w-6 justify-center"
                                          )}>
                                          <div className='w-px bg-gray-200' />
                                        </div>

                                        <div className='flex flex-row w-full items-start pt-2'>
                                          {/* TODO: allow profile pictures to be uploaded */}
                                          {/* <img src='https://www.nwcopro.solutions/wp-content/uploads/2018/04/default-avatar.png' alt='avatar' className='relative mt-3 h-6 w-6 flex-none rounded-full bg-white'/> */}
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
                                                <button onClick={() => handleAddLikeComment(comment.id)}>
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
                                    <CommentForm recipeId={recipe.id} setToggle={setToggle} />
                                  </div>
                                </div>
                              </article>
                            )}
                          </section>
                        </div>
                      </m.div>
                    </m.div>
                  </div>
                ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  )
}

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
