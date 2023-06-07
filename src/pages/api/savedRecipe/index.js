const { User, SavedRecipe } = require("../../../db/model/index.js");
import { isAuthenticated } from "../../../utils/authMiddleware";
const jwt = require('jsonwebtoken')

export const config = {
	api: {
		externalResolver: true,
	},
};

// Saved Recipes CRUD operation methods
export default async function handler(req, res) {
	/**
   	* GET all saved recipes where user id matches 
   	*/
	if (req.method === "GET") {
	    const token = req.headers.authorization 
        if (!token) {
          return res.status(401).json({ message: 'Missing token' })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userId = decodedToken.id
        const user = await User.findByPk(userId) // Retrieve the user instance by their ID
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }

        try {
          const savedRecipes = await SavedRecipe.findAll({ where: { userId: userId } })
          res.status(200).json(savedRecipes)
        } catch (err) {
          res.status(500).json(err)
        }

	/**
   	* POST new saved recipe where user id matches 
   	*/
	} else if (req.method === "POST") {
		const { title, servings, ingredients, instructions, notes } = req.body;
		try {
			const token = req.headers.authorization;
			if (!token) {
			return res.status(401).json({ message: 'Missing token' });
			}

			const decodedToken = jwt.verify(token, process.env.SECRET);
			const userId = decodedToken.id;
			const user = await User.findByPk(userId);
			if (!user) {
			return res.status(404).json({ message: 'User not found' });
			}

			const newSavedRecipe = await user.createSavedRecipe({ title, servings, ingredients, instructions, notes, }); 
			res.status(200).json(newSavedRecipe);
		} catch (error) {
			console.error(error);
			res.status(400).json({ message: "Failed to save recipe" });
		}

	/**
   	* PUT update saved recipe where user id an saved recipe ID matches 
   	*/
	} else if (req.method === "PUT") {
		const savedRecipeId = req.query.id;
			try {
				const token = req.headers.authorization;
				if (!token) {
				return res.status(401).json({ message: 'Missing token' });
				}
	
				const decodedToken = jwt.verify(token, process.env.SECRET);
				const userId = decodedToken.id;
				const user = await User.findByPk(userId);

				if (!user) {
				return res.status(404).json({ message: 'User not found' });
				}

				const updatedRecipe = await SavedRecipe.update(req.body, {
					where: { id: savedRecipeId, userId: userId },
				});

				if (!updatedRecipe) {
					res.status(404).json({ message: "Recipe not found" });
					return
				}		
				res.status(200).json({ message: `${req.body.title} recipe successfully updated`});		
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to save recipe" });
			}
	/**
   	* DELETE saved recipe where user id an saved recipe ID matches 
   	*/
	} else if (req.method === "DELETE") {
		
			const { ids } = req.query;
			try {
				const token = req.headers.authorization;
				if (!token) {
				return res.status(401).json({ message: 'Missing token' });
				}
	
				const decodedToken = jwt.verify(token, process.env.SECRET);
				const userId = decodedToken.id;
				const user = await User.findByPk(userId);

				if (!user) {
				return res.status(404).json({ message: 'User not found' });
				}

				if (!ids) {
					return res.status(400).json({ message: "IDs parameter is missing" });
				}

				const idArray = ids.split(",").map((id) => Number(id));
			
				const deletedRecipes = await SavedRecipe.destroy({
					where: { id: idArray, userId: userId },
				});

				if (!deletedRecipes) {
					return res.status(404).json({ message: "Recipes not found" });
				}
				res.status(200).json({ message:  `ID: ${ids} recipe successfully deleted` });
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to delete recipes" });
			}
		
	}
}
