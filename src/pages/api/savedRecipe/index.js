const { User, SavedRecipe } = require("../../../db/model/index.js");
import { isAuthenticated } from "../../../utils/authMiddleware";

export const config = {
	api: {
		externalResolver: true,
	},
};

export default async function handler(req, res) {
	if (req.method === "GET") {
		isAuthenticated(req, res, async () => {
			try {
				const username = req.user.username;
				if (!username) {
					return res.status(401).json({ message: "Unauthorized" });
				}
				const savedRecipes = await SavedRecipe.findAll({ where: { username } });
				res.status(200).json(savedRecipes);
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to fetch saved recipes" });
			}
		});
	} else if (req.method === "POST") {
		isAuthenticated(req, res, async () => {
			const { username, title, servings, ingredients, instructions } = req.body;
			try {
				const newSavedRecipe = await SavedRecipe.create({
					username,
					title,
					servings,
					ingredients,
					instructions,
				});
				res.status(200).json(newSavedRecipe);
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to save recipe" });
			}
		});
	} else if (req.method === "PUT") {
		isAuthenticated(req, res, async () => {
			const { servings, ingredients, instructions } = req.body;
			const recipeId = req.query.id;
			try {
				if (!recipeId) {
					return res.status(400).json({ message: "Recipe ID is required" });
				}
				const updatedRecipe = await SavedRecipe.update(
					{
						servings,
						ingredients,
						instructions,
					},
					{ where: { id: recipeId } }
				);
				if (updatedRecipe[0]) {
					const updatedRecipeData = await SavedRecipe.findByPk(recipeId);
					res.status(200).json(updatedRecipeData);
				} else {
					res.status(404).json({ message: "Recipe not found" });
				}
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to edit recipe" });
			}
		});
	} else if (req.method === "DELETE") {
		isAuthenticated(req, res, async () => {
			const { id } = req.query;
			try {
				const deletedRecipe = await SavedRecipe.destroy({ where: { id: id } });
				if (!deletedRecipe) {
					return res.status(404).json({ message: "Recipe not found" });
				}
				res
					.status(200)
					.json({ message: `Recipe with id ${id} has been deleted` });
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to delete recipe" });
			}
		});
	}
}
