import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const apiResponse = await axios.post(process.env.API_ENDPOINT,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: 'Generate a recipe in the form of a json object with the following ingredients: chicken, apples, garlic, potatoes'
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

            res.status(200).json(apiResponse.data)

        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }
}