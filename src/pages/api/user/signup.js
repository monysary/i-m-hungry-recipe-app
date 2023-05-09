const { User, SavedRecipe } = require("../../../db/model");
const { signToken } = require("../../../auth/auth");
User.sync({ force: false });
SavedRecipe.sync({ force: false });

export default async function handler(req, res) {
	if (req.method === "POST") {
    res.status(400).json({
      message: "Invalid request" });
      return;
		try {
			const user = await User.findOne({
				where: {
					email: req.body.email,
				},
			});

			if (user) {
				res.status(400).json({ message: "User already exists" });
				return;
			}

			const newUser = await User.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});

			// const newSavedRecipe = await SavedRecipe.create({
			// 	title: "My recipe",
			// 	servings: 4,
			// 	yield: "4 servings",
			// 	ingredients: ["ingredient 1", "ingredient 2"],
			// 	instructions: ["step 1", "step 2"],
			// 	user_id: newUser.id,
			// });

			const token = signToken(newUser);

			res.status(200).json({ token, newUser });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	} else {
		res.status(400).json({ message: "Invalid request" });
	}
}