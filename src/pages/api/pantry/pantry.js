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
      const pantry = await Pantry.find()
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
}
