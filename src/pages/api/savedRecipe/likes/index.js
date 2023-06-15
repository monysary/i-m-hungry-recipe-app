const { RecipeLikes } = require("../../../../db/model/index.js")
import sequelize from "@/db/config/connections.js"
import handleDecodeJWT from "@/utils/auth/handleDecodeJWT.js"

// Saved Recipes CRUD operation methods
export default async function handler(req, res) {
  /**
   * GET all saved recipes where user id matches
   */
  if (req.method === "GET") {
    try {
      const savedRecipes = await RecipeLikes.findAll({  
        raw: true,
        nest: true,
      },
      { // Use a connection from the pool and release it when finished
        ...sequelize.options,
      })
      res.status(200).json(savedRecipes)
    } catch (err) {
      res.status(500).json(err)
    }
  } else if (req.method === "PUT") {

  /**
   * PUT add like to a post on feed or unlike if user already liked post
   */
   const recipeId = req.query.recipeId;

   try {
     if (!recipeId) {
       return res.status(400).json({ message: "Recipe ID is missing" });
     }

     const token = req.headers.authorization;
     if (!token) {
       return res.status(401).json({ message: "Missing token" });
     }

     const { user } = await handleDecodeJWT(token);

     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }

     const [savedRecipe, created] = await RecipeLikes.findOrCreate({
       where: { recipeId, username: user.username },
       defaults: { likes: 0 },
       ...sequelize.options,
     },
      
     );

     if (!savedRecipe) {
       return res.status(404).json({ message: "Recipe not found" });
     }

     if (!created) {
       const alreadyLiked = await RecipeLikes.findOne({
         where: {
           recipeId: recipeId,
           username: user.username,
         },
         // Use a connection from the pool and release it when finished
         ...sequelize.options,
       },
         
       );

       // Checks if User has already liked the recipe. If so, remove the like
       if (alreadyLiked) {
         savedRecipe.likes -= 1;
         await savedRecipe.save(sequelize.options,);
         await alreadyLiked.destroy(sequelize.options,); // Remove the existing like record
         return res
           .status(200)
           .json({ message: "Recipe unliked successfully.", savedRecipe });
       }
     }

     // Add a like to the recipe if user has not already liked it
     savedRecipe.likes += 1;
     await savedRecipe.save(sequelize.options,);
     res
       .status(200)
       .json({ message: "Recipe liked successfully.", savedRecipe });
   } catch (error) {
     console.error(error);
     res.status(400).json({ message: "Failed to like recipe" });
   }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
