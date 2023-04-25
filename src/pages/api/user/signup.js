const { User } = require('../../../db/model');

User.sync({ force: false })

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                res.status(400).json({ message: 'User already exists' })
                return
            }

            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            res.status(200).json(newUser);

        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        };

    } else {
        res.status(400).json({ message: 'Invalid request' })
    }

};