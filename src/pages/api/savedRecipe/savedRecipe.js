const { SavedRecipe } = require('../../../db/model/index.js')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const savedRecipes = await SavedRecipe.findAll();
      res.status(200).json(savedRecipes)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Failed to fetch saved recipes' })
    }
  } else if (req.method === 'POST') {
    const { name, ingredients, instructions } = req.body
    try {
      const newSavedRecipe = await SavedRecipe.create({ name, ingredients, instructions })
      res.status(200).json(newSavedRecipe)
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Failed to save recipe' })
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query
    const { name, ingredients, instructions } = req.body
    try {
      const updatedRecipe = await SavedRecipe.update(
        { name, ingredients, instructions },
        { where: { id: id } }
      );
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' })
      }
      res.status(200).json(`${id} has been updated`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to update recipe' })
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    try {
      const deletedRecipe = await SavedRecipe.destroy({ where: { id: id } });
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' })
      }
      res.status(200).json(`${id} has been deleted`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to delete recipe' })
    }
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
}