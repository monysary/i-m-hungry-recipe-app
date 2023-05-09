function RecipeCard() {
    const ingredients = ['chicken', 'apple', 'garlic', 'potatoes']

    const instructions = [
        'Preheat the oven to 400°F.',
        'Place the diced potatoes in a pot with enough water to cover them. Bring to a boil and cook until tender, about 15 minutes.',
        'Drain the potatoes and mash them with butter, salt and pepper to taste. Fold in the diced apples and set aside.',
        'Season the chicken with salt and pepper on both sides.',
        'In a large oven-safe skillet, heat the olive oil over medium-high heat. Add the minced garlic and sauté until fragrant, about 30 seconds.',
        'Add the chicken to the skillet, and cook until golden brown, about 5 minutes per side.',
        'Move the skillet to the preheated oven and bake for 10-15 minutes or until the chicken is cooked through.',
        'Serve the chicken with the apple and potato mash.'
    ]

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Garlic Chicken with Apple and Potato Mash</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">4 servings</p>
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Ingredients</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ingredients.join(', ')}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Instructions</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {instructions.map((instruction) => {
                                return (
                                    <div key={instruction}>
                                        {instruction}
                                    </div>
                                )
                            })}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default RecipeCard;