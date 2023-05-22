// Pantry CRUD methods
// Create routes

const { Pantry } = require('../../../db/model/index.js')
import { isAuthenticated } from '../../../utils/authMiddleware'

export const config = {
	api: {
		externalResolver: true,
	},
};

// Create add item
export default async function handler(req, res) {
  //   find all items in pantry
  if (req.method === 'GET') {
    isAuthenticated(req, res, async () => {
      try {
        const pantry = await Pantry.findAll()
        res.status(200).json(pantry)
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Failed to fetch pantry' })
      }
    })
    // post a new item to pantry
  } else if (req.method === 'POST') {
    isAuthenticated(req, res, async () => {
      const { ingredient, category } = req.body
      try {
        const newIngredient = await Pantry.create({ ingredient, category })
        res.status(200).json(newIngredient)
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Failed to add ingredient to pantry' })
      }
    })
  } else if (req.method === 'DELETE') {
    // delete a single item from pantry
    isAuthenticated(req, res, async () => {
      const { ingredient } = req.query
      try {
        const deletedIngredient = await Pantry.destroy({
          where: req.query,
        })
        if (!deletedIngredient) {
          return res.status(404).json({ message: 'Ingredient not found' })
        }
        res.status(200).json(`${ingredient} has been deleted`)
      } catch (error) {
        console.error(error)
        res
          .status(500)
          .json({ message: 'Failed to delete ingredient from pantry' })
      }
    })
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
}
