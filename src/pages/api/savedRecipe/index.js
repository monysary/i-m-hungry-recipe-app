const { SavedRecipe } = require("../../../db/model/index.js")
import sequelize from "@/db/config/connections.js"
import handleDecodeJWT from "@/utils/auth/handleDecodeJWT.js"

// Saved Recipes CRUD operation methods
export default async function handler(req, res) {
  /**
   * GET all saved recipes where user id matches
   */
  if (req.method === "GET") {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "Missing token" })
    }

    const { userId, user } = await handleDecodeJWT(token)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    try {
      const savedRecipes = await SavedRecipe.findAll({
        where: { userId: userId },
        // Use a connection from the pool and release it when finished
        ...sequelize.options,
      })
      res.status(200).json(savedRecipes)
    } catch (err) {
      res.status(500).json(err)
    }

    /**
     * POST new saved recipe where user id matches
     */
  } else if (req.method === "POST") {
    const {
      title,
      servings,
      ingredients,
      instructions,
      notes,
      nutritional_facts,
    } = req.body
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { user, username } = await handleDecodeJWT(token)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const newSavedRecipe = await user.createSavedRecipe({
        title,
        servings,
        ingredients,
        instructions,
        nutritional_facts,
        notes,
        username,
      },
      { // Use a connection from the pool and release it when finished
        ...sequelize.options,
      })
      res.status(200).json(newSavedRecipe)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to save recipe" })
    }

    /**
     * PUT update saved recipe where user id an saved recipe ID matches
     */
  } else if (req.method === "PUT") {
    const savedRecipeId = req.query.id
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { userId, user, username } = await handleDecodeJWT(token)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const updatedRecipe = await SavedRecipe.update(
        { ...req.body, username },
        {
          where: { id: savedRecipeId, userId: userId },
        
        },
        { // Use a connection from the pool and release it when finished
          ...sequelize.options,
        }
      )

      if (!updatedRecipe) {
        res.status(404).json({ message: "Recipe not found" })
        return
      }
      res
        .status(200)
        .json({ message: `${req.body.title} recipe successfully updated` })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to save recipe" })
    }
    /**
     * DELETE saved recipe where user id an saved recipe ID matches
     */
  } else if (req.method === "DELETE") {
    const { ids } = req.query
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { userId, user } = await handleDecodeJWT(token)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      if (!ids) {
        return res.status(400).json({ message: "IDs parameter is missing" })
      }

      const idArray = ids.split(",").map((id) => Number(id))

      const deletedRecipes = await SavedRecipe.destroy({
        where: { id: idArray, userId: userId },
      },
      { // Use a connection from the pool and release it when finished
        ...sequelize.options,
      })

      if (!deletedRecipes) {
        return res.status(404).json({ message: "Recipes not found" })
      }
      res
        .status(200)
        .json({ message: `ID: ${ids} recipe successfully deleted` })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to delete recipes" })
    }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
