// Pantry CRUD methods
// Create routes
const { User, Pantry } = require('../../../db/model/index.js')
import { isAuthenticated } from '../../../utils/authMiddleware'
const jwt = require('jsonwebtoken')

export const config = {
	api: {
		externalResolver: true,
	},
};

// Create add item
export default async function handler(req, res) {
  // find all items in pantry
  if (req.method === 'GET') {
    isAuthenticated(req, res, async () => {
      try {
        const token = req.headers.authorization // Assuming the token is provided in the Authorization header
        if (!token) {
          return res.status(401).json({ message: 'Missing token' })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userId = decodedToken.id
        const user = await User.findByPk(userId) // Retrieve the user instance by their ID
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }

        try {
          const pantryItems = await Pantry.findAll({ where: { userId: userId } })
          res.status(200).json(pantryItems)
        } catch (err) {
          res.status(500).json(err)
        }
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
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: 'Missing token' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken.id;
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const newPantryItem = await user.createPantry({ ingredient, category }); // Use the association method to create a new pantry item
        res.status(200).json(newPantryItem);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to add ingredient to pantry' });
      }
    })
  } else if (req.method === 'DELETE') {
    // delete a single item from pantry
    isAuthenticated(req, res, async () => {
      const { ingredient, category } = req.query;
      try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: 'Missing token' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken.id;
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const deletedIngredient = await Pantry.destroy({
          where: { userId, ingredient, category },
        });
        if (!deletedIngredient) {
          return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(200).json(`{[ingredient: ${ingredient}], [category: ${category}]} has successfully been deleted`);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: 'Failed to delete ingredient from pantry' });
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
}
