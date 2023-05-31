import Head from 'next/head'
import { useEffect, useState } from 'react'
import authService from '@/utils/authService'
import RecipeCard from '../components/recipeCard'
import { AiFillCloseCircle } from 'react-icons/ai'
import CircleSpinner from '@/components/spinners/circle'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

function Kitchen() {
  useEffect(() => {
    if (authService.loggedIn() && !authService.tokenExpired()) {
      return
    } else {
      window.location.assign('/login')
    }
  }, [])

  // Setting ingredient choices
  const [pantryItems, setPantryItems] = useState([]) // Data stored from GET request
  const [recipeForm, setRecipeForm] = useState({
    category: '',
    ingredient: '',
  })

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('/api/pantry', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authService.getToken()}`,
          },
        });

        const data = await response.json();
        setPantryItems(data);
      } catch (err) {
        console.log(err)
      }
    }

    getItems()
  }, [])

  const handleRecipeForm = ({ target: { name, value } }) => {
    setRecipeForm({
      ...recipeForm,
      [name]: value,
    })
  }

  // Selecting ingredients for recipe
  const [ingredientsArr, setIngredientsArr] = useState([])
  const addIngredient = (event) => {
    event.preventDefault()
    const alreadyAdded = ingredientsArr.find((item) => item.ingredient === recipeForm.ingredient)

    if (
      recipeForm.ingredient !== '' &&
      alreadyAdded?.ingredient !== recipeForm.ingredient
    ) {
      setIngredientsArr([...ingredientsArr, recipeForm])
    }

    return
  }

  // Removing a selected ingredient
  const removeIngredient = (event) => {
    setIngredientsArr((prev) =>
      prev.filter((item) => item.ingredient !== event.target.parentElement.id)
    )
  }

  // Generating recipe
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const generateRecipe = async () => {
    const justIngredients = []
    try {
      if (!ingredientsArr) return null
      setIsLoading(true)
      ingredientsArr.map((object) => justIngredients.push(object.ingredient))

      await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
          model: process.env.API_MODEL,
          messages: [{
            role: process.env.API_ROLE,
            content: process.env.API_PROMPT + justIngredients.join(', ')
          }]
        })
      })
        .then((res) => res.json())
        .then((data) => {
          const finalResponse = data.choices[0].message.content
          console.log(JSON.parse(finalResponse));
          localStorage.setItem('kitchen', JSON.stringify({
            recipe: finalResponse,
            expire: Date.now() + (1000 * 60 * 60)
          }))
          setRecipe(JSON.parse(finalResponse))
        })
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  }

  // Check local storage if a recipe was recently generated
  useEffect(() => {
    let prevRecipe;
    if (localStorage.getItem('kitchen')) {
      prevRecipe = JSON.parse(localStorage.getItem('kitchen'))
      if (Date.now() < prevRecipe.expire) {
        setRecipe(JSON.parse(prevRecipe.recipe))
      }
    }

  }, [])

  // Handle Next button
  const handleNextButton = () => {
    window.location.assign('/savedRecipes')
  }

  return (
    <>
      <Head>
        <title>Chefing it up!</title>
      </Head>
      <div className='min-h-full lg:px-[200px] px-6 py-12'>
        <div className='md:text-[30px] text-[16px] mb-[10px] text-black'>
          Select Ingredients
        </div>
        <form className='md:flex items-end mb-[20px]' onSubmit={addIngredient}>
          <div className='flex items-end'>
            <div>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Category
              </label>
              <div className='sm:mt-2'>
                <select
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6'
                  name='category'
                  onChange={handleRecipeForm}
                >
                  <option value=''>- select category -</option>
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className='sm:ml-[20px] mt-2 sm:mt-0'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Ingredient
              </label>
              <div className='sm:mt-2'>
                <select
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs sm:text-sm sm:leading-6'
                  name='ingredient'
                  onChange={handleRecipeForm}
                >
                  <option value=''>- select ingredient -</option>
                  {pantryItems
                    .filter((item) => item.category === recipeForm.category)
                    .map((item) => {
                      return (
                        <option key={item.ingredient} value={item.ingredient}>
                          {item.ingredient}
                        </option>
                      )
                    })}
                </select>
              </div>
            </div>
          </div>


          <div className='grow mt-4 md:mt-0 md:ml-[20px] flex justify-between'>
            <button
              type='submit'
              className='text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2'
            >
              Add
            </button>
            <button className='font-semibold inline-flex items-center gap-1'
              onClick={handleNextButton}
            >
              Next
              <ChevronRightIcon className='w-5' />
            </button>
          </div>
        </form >
        <div className="flex flex-wrap gap-[10px] mb-[20px] py-6 border-t border-b border-gray-200">
          {ingredientsArr.map((item) => {
            return (
              <div
                key={item.ingredient}
                id={item.ingredient}
                className={`relative text-gray-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5
                  ${item.category === categories[0]
                    ? 'bg-rose-100'
                    : item.category === categories[1]
                      ? 'bg-green-100'
                      : item.category === categories[2]
                        ? 'bg-orange-100'
                        : item.category === categories[3]
                          ? 'bg-slate-100'
                          : item.category === categories[4]
                            ? 'bg-yellow-100'
                            : item.category === categories[5]
                              ? 'bg-lime-100'
                              : item.category === categories[6]
                                ? 'bg-blue-100'
                                : item.category === categories[7]
                                  ? 'bg-gray-100'
                                  : 'bg-white'
                  }`}
              >
                {item.ingredient}
                <AiFillCloseCircle id={item.ingredient} className="absolute right-[-10px] top-[-10px] cursor-pointer text-[20px]"
                  onClick={removeIngredient}
                />
              </div>
            )
          })}
        </div>
        {
          isLoading
            ? <></>
            : <button
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-6"
              type="button"
              onClick={generateRecipe}
            >Generate Recipe</button>
        }
        <div className='flex justify-center'>
          {
            isLoading
              ? <CircleSpinner />
              : recipe !== null && <RecipeCard recipe={recipe} />
          }
        </div>
      </div >
    </>

  )
}

export default Kitchen

const categories = [
  'Protein',
  'Vegetables',
  'Fruits',
  'Grain',
  'Dairy',
  'Butter/Oil',
  'Spice',
  'Seasoning',
  'Other',
]