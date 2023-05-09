// CRUD methods
// Create routes
// Pantry.create/delete/so on/
const Sequelize = require('sequelize')
const { Pantry } = require('../../../db/model/index.js')

// Create add item
export default async function handler(req, res) {
  // find all items in pantry
  if (req.method === 'GET') {
    try {
      const pantry = await Pantry.find().select('category')
      res.status(200).json(pantry)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Failed to fetch pantry' })
    }
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }

  if (req.method === 'POST') {
    const { ingredient, category } = req.body
    try {
      const newIngredient = await Pantry.create({ ingredient, category })
      res.status(200).json(newIngredient)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Failed to add ingredient to pantry' })
    }
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    try {
      const deletedIngredient = await Pantry.findByIdAndDelete(id)
      if (!deletedIngredient) {
        return res.status(404).json({ message: 'Ingredient not found' })
      }
      res.status(200).json(deletedIngredient)
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
