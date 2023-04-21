const prompt = {
    "model": "gpt-3.5-turbo",
    "messages": [{
        "role": "user",
        "content": "Generate a recipe in the form of a JSON object with the following ingredients: chicken, potatoes, garlic, chives"
    }]
}

const response = '{\n  \"recipe\": {\n    \"name\": \"Garlic Chicken and Potatoes with Chives\",\n   \"ingredients\": [\n      {\n        \"name\": \"chicken\",\n        \"amount\": \"2 lbs\",\n        \"notes\": \"boneless, skinless\"\n      },\n      {\n        \"name\": \"potatoes\",\n        \"amount\": \"1 lb\",\n        \"notes\": \"peeled and diced\"\n      },\n      {\n        \"name\": \"garlic\",\n        \"amount\": \"4 cloves\",\n        \"notes\": \"minced\"\n      },\n      {\n        \"name\": \"chives\",\n        \"amount\": \"1/4 cup\",\n        \"notes\": \"chopped\"\n      }\n    ],\n    \"instructions\": [\n      \"Preheat oven to 375°F.\",\n      \"Arrange chicken and potatoes in a baking dish.\",\n      \"In a small bowl, mix together garlic and olive oil. Drizzle over chicken and potatoes.\",\n      \"Bake for 40-50 minutes or until chicken is cooked through and potatoes are tender.\",\n      \"Sprinkle chives over the top of the dish before serving.\"\n    ],\n    \"servings\": 4,\n    \"prep_time\": \"15 minutes\",\n    \"cook_time\": \"45 minutes\"\n  }\n}'

const JSONres = JSON.parse(response)

console.log(JSONres);
