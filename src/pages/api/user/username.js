import { User } from '../../../db/model/index.js';
import handleDecodeJWT from '@/utils/handleDecodeJWT.js';

// Pantry CRUD operation methods
export default async function handler(req, res) {
    /**
     * GET user
     */
    if (req.method === 'GET') {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Missing token' });
        }

        try {
            const { userId, user, username } = await handleDecodeJWT(token);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // const existingUser = await user.findAll();

            res.status(200).json(username); // Assuming you want to return the first user's username
        } catch (err) {
            res.status(500).json(err);
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