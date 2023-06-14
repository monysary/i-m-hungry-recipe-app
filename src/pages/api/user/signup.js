const { User, SavedRecipe } = require("../../../db/model")
const { signToken } = require("../../../utils/auth/signToken")
const sequelize = require("../../../db/config/connections")

export default async function handler(req, res) {
  await sequelize.sync({ force: false })

  if (req.method === "POST") {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      })

      if (user) {
        res.status(400).json({ message: "User already exists" })
        return
      }

      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })

      const token = signToken(newUser)

      res.status(200).json({ token, newUser })
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  } else {
    res.status(400).json({ message: "Invalid request" })
  }
}
