const response = JSON.parse("{\n  \"recipe\": {\n    \"title\": \"Garlic Apple Chicken with Potatoes\",\n    \"servings\": 4,\n    \"ingredients\": [\n      {\n        \"name\": \"chicken\",\n        \"quantity\": \"4\",\n        \"unit\": \"pieces\"\n      },\n      {\n        \"name\": \"apples\",\n        \"quantity\": \"2\",\n        \"unit\": \"cups\",\n        \"preparation\": \"chopped\"\n      },\n      {\n        \"name\": \"potatoes\",\n        \"quantity\": \"4\",\n        \"unit\": \"pieces\",\n        \"preparation\": \"peeled and sliced\"\n      },\n      {\n        \"name\": \"garlic\",\n        \"quantity\": \"4\",\n        \"unit\": \"cloves\",\n        \"preparation\": \"minced\"\n      }\n    ],\n    \"instructions\": [\n      \"Preheat oven to 375°F.\",\n      \"In a large bowl, combine chopped apples, minced garlic, and sliced potatoes. Toss with olive oil and season with salt and pepper.\",\n      \"Arrange the potato mixture in the bottom of a large baking dish. Place chicken pieces on top.\",\n      \"Sprinkle with additional salt, pepper, and minced garlic.\",\n      \"Bake in preheated oven for 40-45 minutes, or until chicken is cooked through and potatoes are tender.\",\n      \"Serve hot and enjoy!\"\n    ]\n  }\n}")

console.log(response);