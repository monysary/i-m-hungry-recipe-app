// CRUD methods
// Create routes
// Pantry.create/delete/so on/
const { Pantry } = require('../../../db/model/index.js')

// Create add item
export default async function handler(req, res) {
  // find all items in pantry
  if (req.method === 'GET') {
    try {
      const pantry = await Pantry.findAll();
      res.status(200).json(pantry)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Failed to fetch pantry' })
    }
  } else if (req.method === 'POST') {
    const { ingredient, category } = req.body
    try {
      const newIngredient = await Pantry.create({ ingredient, category })
      res.status(200).json(newIngredient)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Failed to add ingredient to pantry' })
    }
  } else if (req.method === 'DELETE') {
    const { ingredient } = req.query
    try {
      const deletedIngredient = await Pantry.destroy({ where: { ingredient: ingredient } });
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
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
}
