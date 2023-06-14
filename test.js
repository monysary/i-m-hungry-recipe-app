const prompt1 = JSON.parse(
  '{\n  "recipe": {\n    "title": "Garlic Apple Chicken with Potatoes",\n    "servings": 4,\n    "ingredients": [\n      {\n        "name": "chicken",\n        "quantity": "4",\n        "unit": "pieces"\n      },\n      {\n        "name": "apples",\n        "quantity": "2",\n        "unit": "cups",\n        "preparation": "chopped"\n      },\n      {\n        "name": "potatoes",\n        "quantity": "4",\n        "unit": "pieces",\n        "preparation": "peeled and sliced"\n      },\n      {\n        "name": "garlic",\n        "quantity": "4",\n        "unit": "cloves",\n        "preparation": "minced"\n      }\n    ],\n    "instructions": [\n      "Preheat oven to 375°F.",\n      "In a large bowl, combine chopped apples, minced garlic, and sliced potatoes. Toss with olive oil and season with salt and pepper.",\n      "Arrange the potato mixture in the bottom of a large baking dish. Place chicken pieces on top.",\n      "Sprinkle with additional salt, pepper, and minced garlic.",\n      "Bake in preheated oven for 40-45 minutes, or until chicken is cooked through and potatoes are tender.",\n      "Serve hot and enjoy!"\n    ]\n  }\n}'
)

const prompt2 = JSON.parse(
  '{\n    "recipe": {\n        "title": "Garlic Chicken with Apple and Potato Mash",\n        "yield": "4 servings",\n        "ingredients": [\n            {\n                "name": "Chicken (breasts or thighs, boneless and skinless)",\n                "quantity": "4",\n                "unit": "pieces"\n            },\n            {\n                "name": "Apples (peeled, cored and diced)",\n                "quantity": "2",\n                "unit": "medium"\n            },\n            {\n                "name": "Garlic (minced)",\n                "quantity": "3",\n                "unit": "cloves"\n            },\n            {\n                "name": "Potatoes (peeled and diced)",\n                "quantity": "4",\n                "unit": "medium"\n            },\n            {\n                "name": "Olive oil",\n                "quantity": "2",\n                "unit": "tablespoons"\n            },\n            {\n                "name": "Butter",\n                "quantity": "2",\n                "unit": "tablespoons"\n            },\n            {\n                "name": "Salt",\n                "quantity": "to taste",\n                "unit": null\n            },\n            {\n                "name": "Pepper",\n                "quantity": "to taste",\n                "unit": null\n            }\n        ],\n        "instructions": [\n            "Preheat the oven to 400°F.",\n            "Place the diced potatoes in a pot with enough water to cover them. Bring to a boil and cook until tender, about 15 minutes.",\n            "Drain the potatoes and mash them with butter, salt and pepper to taste. Fold in the diced apples and set aside.",\n            "Season the chicken with salt and pepper on both sides.",\n            "In a large oven-safe skillet, heat the olive oil over medium-high heat. Add the minced garlic and sauté until fragrant, about 30 seconds.",\n            "Add the chicken to the skillet, and cook until golden brown, about 5 minutes per side.",\n            "Move the skillet to the preheated oven and bake for 10-15 minutes or until the chicken is cooked through.",\n            "Serve the chicken with the apple and potato mash."\n        ]\n    }\n}'
)

console.log(prompt1)
console.log(prompt2)

const res1 = {
  recipe: {
    title: "Garlic Apple Chicken with Potatoes",
    servings: 4,
    ingredients: ["chicken", "apple", "garlic", "potatoes"],
    instructions: [
      "Preheat oven to 375°F.",
      "In a large bowl, combine chopped apples, minced garlic, and sliced potatoes. Toss with olive oil and season with salt and pepper.",
      "Arrange the potato mixture in the bottom of a large baking dish. Place chicken pieces on top.",
      "Sprinkle with additional salt, pepper, and minced garlic.",
      "Bake in preheated oven for 40-45 minutes, or until chicken is cooked through and potatoes are tender.",
      "Serve hot and enjoy!",
    ],
  },
}

const res2 = {
  recipe: {
    title: "Garlic Chicken with Apple and Potato Mash",
    yield: "4 servings",
    ingredients: ["chicken", "apple", "garlic", "potatoes"],
    instructions: [
      "Preheat the oven to 400°F.",
      "Place the diced potatoes in a pot with enough water to cover them. Bring to a boil and cook until tender, about 15 minutes.",
      "Drain the potatoes and mash them with butter, salt and pepper to taste. Fold in the diced apples and set aside.",
      "Season the chicken with salt and pepper on both sides.",
      "In a large oven-safe skillet, heat the olive oil over medium-high heat. Add the minced garlic and sauté until fragrant, about 30 seconds.",
      "Add the chicken to the skillet, and cook until golden brown, about 5 minutes per side.",
      "Move the skillet to the preheated oven and bake for 10-15 minutes or until the chicken is cooked through.",
      "Serve the chicken with the apple and potato mash.",
    ],
  },
}
