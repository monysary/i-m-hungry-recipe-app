const { User, SavedRecipe } = require('../../../db/model');
const { signToken } = require('../../../auth/auth');

User.sync({ force: false });
SavedRecipe.sync({ force: false });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (!user) {
                res.status(400).json({ message: 'Incorrect login credentials' })
                return
            }

            const password = await user.checkPassword(req.body.password)

            if (!password) {
                res.status(400).json({ message: 'Incorrect login credentials' })
                return
            }

            const token = signToken(user)
            res.status(200).json({ token, user })

        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }

    } else {
        res.status(400).json({ message: 'Invalid request' })
    }
}