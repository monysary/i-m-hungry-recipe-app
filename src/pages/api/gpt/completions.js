import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prompt = 'Generate, and only respond with just the json object, a recipe in the form of a json object containing only: title, servings, ingredients (which should be an array of objects containing only name, amount, and unit key with the first letter capitalized), and instructions (which should be an array of string instructions) key, using the following ingredients: '
        const ingredients = req.body.join(', ')
        try {
            const apiResponse = await axios.post(process.env.API_ENDPOINT,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt + ingredients
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.API_KEY}`
                    }
                }
            )

            res.status(200).json(apiResponse.data.choices[0].message.content)

        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }
}