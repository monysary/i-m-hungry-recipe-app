const { RecipeLikes } = require("../../../../db/model/index.js")
import handleDecodeJWT from "@/utils/auth/handleDecodeJWT.js"

// Saved Recipes CRUD operation methods
export default async function handler(req, res) {
  /**
   * GET all saved recipes where user id matches
   */
  if (req.method === "GET") {
    try {
      const savedRecipes = await RecipeLikes.findAll()
      res.status(200).json(savedRecipes)
    } catch (err) {
      res.status(500).json(err)
    }
  } else if (req.method === "PUT") {

  /**
   * PUT add like to a post on feed
   */
    const recipeId = req.query.recipeId

    try {
      if (!recipeId) {
        return res.status(400).json({ message: "Recipe ID is missing" })
      }

      const recipeLikes = await RecipeLikes.findOrCreate({
        where: { recipeId },
        defaults: { likes: 0 },
      })

      const savedRecipe = recipeLikes[0]

      if (!savedRecipe) {
        return res.status(404).json({ message: "Recipe not found" })
      }

      // Add a like to the comment
      savedRecipe.likes += 1
      await savedRecipe.save()

      res
        .status(200)
        .json({ message: "Recipe liked successfully.", savedRecipe })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to like recipe" })
    }
  } else if (req.method === "PUT" && req.query.action === "unlike") {

  /**
   * PUT remove like from a post on feed
   */
    const recipeId = req.query.recipeId

    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { user } = await handleDecodeJWT(token)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      if (!recipeId) {
        return res.status(400).json({ message: "Recipe ID is missing" })
      }

      const savedRecipe = await RecipeLikes.findByPk(recipeId)

      if (!savedRecipe) {
        return res.status(404).json({ message: "savedRecipe not found" })
      }

      // Remove a like from the comment
      if (savedRecipe.likes > 0) {
        savedRecipe.likes -= 1
        await savedRecipe.save()
      }

      res
        .status(200)
        .json({ message: "Recipe unliked successfully.", savedRecipe })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to unlike recipe" })
    }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
