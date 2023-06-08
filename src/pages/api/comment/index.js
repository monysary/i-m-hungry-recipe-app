const { Comment } = require("../../../db/model/index.js");
import handleDecodeJWT from "@/utils/auth/handleDecodeJWT.js";

// recipe post comments CRUD operation methods
export default async function handler(req, res) {	
	/**
   	* GET all recipe post comments where user id matches 
   	*/
	if (req.method === "GET") {
	    const token = req.headers.authorization 
        if (!token) {
          return res.status(401).json({ message: 'Missing token' })
        }
       
		const { userId, user } = await handleDecodeJWT(token)
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }

        try {
          const comments = await Comment.findAll({ where: { userId: userId } })
          res.status(200).json(comments)
        } catch (err) {
          res.status(500).json(err)
        }

	/**
   	* POST new recipe post comments where user id matches 
   	*/
	} else if (req.method === "POST") {
		const { description } = req.body;
		try {
			const token = req.headers.authorization;
			if (!token) {
			return res.status(401).json({ message: 'Missing token' });
			}

			const { user } = await handleDecodeJWT(token)
			if (!user) {
			return res.status(404).json({ message: 'User not found' });
			}

			const newComment = await user.createComment({ description }); 
			res.status(200).json(newComment);
		} catch (error) {
			console.error(error);
			res.status(400).json({ message: "Failed to save recipe" });
		}

	/**
   	* PUT update recipe post comments where user id an saved recipe ID matches 
   	*/
	} else if (req.method === "PUT") {
		const commentId = req.query.id;
		try {
			const token = req.headers.authorization;
			if (!token) {
			return res.status(401).json({ message: 'Missing token' });
			}

			const { userId, user } = await handleDecodeJWT(token)

			if (!user) {
			return res.status(404).json({ message: 'User not found' });
			}

			const updatedComment = await Comment.update(req.body, {
				where: { id: commentId, userId: userId },
			});

			if (!updatedComment) {
				res.status(404).json({ message: "Comment not found" });
				return
			}		
			res.status(200).json({ message: `${req.body.description} comment successfully updated`});		
		} catch (error) {
			console.error(error);
			res.status(400).json({ message: "Failed to save recipe" });
		}
	/**
   	* DELETE recipe post comments where user id and saved recipe ID matches 
   	*/
	} else if (req.method === "DELETE") {
		const { id } = req.query;
		try {
			const token = req.headers.authorization;
			if (!token) {
			return res.status(401).json({ message: 'Missing token' });
			}

			const { userId, user } = await handleDecodeJWT(token)

			if (!user) {
			return res.status(404).json({ message: 'User not found' });
			}

			if (!id) {
				return res.status(400).json({ message: "IDs parameter is missing" });
			}

		
			const deletedComment = await Comment.destroy({
				where: { id: id, userId: userId },
			});

			if (!deletedComment) {
				return res.status(404).json({ message: "Comment not found" });
			}
			res.status(200).json({ message:  `ID: ${ids} comment successfully deleted` });
		} catch (error) {
			console.error(error);
			res.status(400).json({ message: "Failed to delete comment" });
		}
		
	}
}

export const config = {
	api: {
		externalResolver: true,
	},
};