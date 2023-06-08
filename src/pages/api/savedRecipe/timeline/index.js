const { SavedRecipe } = require("../../../../db/model/index.js");

// Saved Timeline Feed CRUD operation methods
export default async function handler(req, res) {	
	/**
   	* GET all saved recipes where user id matches and postedToTimeline is true
   	*/
	if (req.method === "GET") {
        try {
          const savedRecipes = await SavedRecipe.findAll({ where: {  postedToTimeline: 1 } })
          res.status(200).json(savedRecipes)
        } catch (err) {
          res.status(500).json(err)
        }
	}
}

export const config = {
	api: {
		externalResolver: true,
	},
};