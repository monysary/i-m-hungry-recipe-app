const { Pantry } = require('../../../db/model/index.js')
import handleDecodeJWT from "@/utils/auth/handleDecodeJWT.js";

// Pantry CRUD operation methods
export default async function handler(req, res) {
  /**
   * GET all pantry items where user id matches 
   */
  if (req.method === 'GET') {
        const token = req.headers.authorization 
        if (!token) {
          return res.status(401).json({ message: 'Missing token' })
        }

        const { userId, user } = await handleDecodeJWT(token)
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        try {
          const pantryItems = await Pantry.findAll({ where: { userId: userId } })
          res.status(200).json(pantryItems)
        } catch (err) {
          res.status(500).json(err)
        }

  /**
   * POST new pantry item where user id matches 
   */
  } else if (req.method === 'POST') {
 
      const { ingredient, category } = req.body
      try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: 'Missing token' });
        }

        const { user } = await handleDecodeJWT(token)
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const newPantryItem = await user.createPantry({ ingredient, category }); // Use the association method to create a new pantry item
        res.status(200).json(newPantryItem);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to add ingredient to pantry' });
      }
    
  /**
   * DELETE pantry item where user id, ingredient, and category match 
   */
  } else if (req.method === 'DELETE') {
    
      const { ingredient, category } = req.query;
      try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: 'Missing token' });
        }

        const { userId, user } = await handleDecodeJWT(token)
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
 
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
}

export const config = {
	api: {
		externalResolver: true,
	},
};