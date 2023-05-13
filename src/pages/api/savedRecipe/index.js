const { SavedRecipe } = require("../../../db/model/index.js");
import { isAuthenticated } from "../../../utils/authMiddleware";

export default async function handler(req, res) {
	if (req.method === "GET") {
		isAuthenticated(req, res, async () => {
			try {
				const savedRecipes = await SavedRecipe.findAll();
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
