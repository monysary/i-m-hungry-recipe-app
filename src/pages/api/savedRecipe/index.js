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
			const { username, title, servings, ingredients, instructions, notes } =
				req.body;
			try {
				const newSavedRecipe = await SavedRecipe.create({
					username,
					title,
					servings,
					ingredients,
					instructions,
					notes,
				});
				res.status(200).json(newSavedRecipe);
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to save recipe" });
			}
		});
	} else if (req.method === "PUT") {
		isAuthenticated(req, res, async () => {
			try {
				const updatedRecipe = await SavedRecipe.update(req.body, {
					where: { id: req.body.id },
				});

				if (!updatedRecipe) {
					res.status(404).json({ message: "Recipe not found" });
					return;
				}

				res.status(200).json(updatedRecipe);

				// const { id, servings, ingredients, instructions, notes } = req.body;
				// // const recipeId = req.query.id;
				// try {
				// 	if (!id) {
				// 		return res.status(400).json({ message: "Recipe ID is required" });
				// 	}
				// 	const updatedRecipe = await SavedRecipe.update(
				// 		{
				// 			servings,
				// 			ingredients,
				// 			instructions,
				// 			notes,
				// 		},
				// 		{ where: { id } }
				// 	);
				// 	if (updatedRecipe[0]) {
				// 		const updatedRecipeData = await SavedRecipe.findByPk(id);
				// 		res.status(200).json(updatedRecipeData);
				// 	} else {
				// 		res.status(404).json({ message: "Recipe not found" });
				// 	}
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to edit recipe" });
			}
		});
	} else if (req.method === "DELETE") {
		isAuthenticated(req, res, async () => {
			const { ids } = req.query;
			if (!ids) {
				return res.status(400).json({ message: "IDs parameter is missing" });
			}
			const idArray = ids.split(",").map((id) => Number(id));
			try {
				const deletedRecipes = await SavedRecipe.destroy({
					where: { id: idArray },
				});
				if (!deletedRecipes) {
					return res.status(404).json({ message: "Recipes not found" });
				}
				res.status(200).json({ message: "Recipes deleted successfully" });
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: "Failed to delete recipes" });
			}
		});
	}
}
