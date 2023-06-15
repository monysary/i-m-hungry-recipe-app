const { Comment } = require("../../../db/model/index.js")
import sequelize from "@/db/config/connections.js"
import handleDecodeJWT from "@/utils/auth/handleDecodeJWT.js"

// recipe post comments CRUD operation methods
export default async function handler(req, res) {
  /**
   * GET all recipe post comments
   */
  if (req.method === "GET") {
    try {
      const comments = await Comment.findAll()
      res.status(200).json(comments)
    } catch (err) {
      res.status(500).json(err)
    }

    /**
     * POST new recipe post comments where user id matches
     */
  } else if (req.method === "POST" && req.query.action === "comment") {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "Missing token" })
    }
    const { userId, user, username } = await handleDecodeJWT(token)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    try {
      const { recipeId, description } = req.body

      if (!recipeId || !description) {
        return res
          .status(400)
          .json({ message: "Recipe ID and description are required." })
      }

      // Add the comment to the recipe post
      const comment = await user.createComment({
        recipeId,
        description,
        username,
      }, 
      // Use a connection from the pool and release it when finished
     { ...sequelize.options})

      if (comment) {
        return res
          .status(200)
          .json({ message: "Comment added successfully.", comment })
      } else {
        return res.status(500).json({ message: "Failed to add the comment." })
      }
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: "An error occurred while adding the comment." })
    }

    /**
     * PUT update recipe post comments where user id an saved recipe ID matches
     */
  } else if (req.method === "PUT") {
    const commentId = req.query.id
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { userId, user } = await handleDecodeJWT(token)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const updatedComment = await Comment.update(req.body, {
        where: { id: commentId, userId: userId },
         
      },
      // Use a connection from the pool and release it when finished
      {...sequelize.options}, )

      if (!updatedComment) {
        res.status(404).json({ message: "Comment not found" })
        return
      }
      res.status(200).json({
        message: `${req.body.description} comment successfully updated`,
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to save recipe" })
    }
    /**
     * DELETE recipe post comments where user id and saved recipe ID matches
     */
  } else if (req.method === "DELETE") {
    const { commentId } = req.query
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { userId, user } = await handleDecodeJWT(token)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      if (!commentId) {
        return res.status(400).json({ message: "Comment ID is missing" })
      }

      const deletedComment = await Comment.destroy({
        where: { id: commentId, userId: userId },
        
      }, 
      { // Use a connection from the pool and release it when finished
        ...sequelize.options,
      })

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      res
        .status(200)
        .json({ message: `ID: ${commentId} comment successfully deleted` })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to delete comment" })
    }
  } else if (req.method === "POST" && req.query.action === "like") {
  /**
   * POST add like to a comment
   */
    const commentId = req.query.commentId

    try {
      if (!commentId) {
        return res.status(400).json({ message: "Comment ID is missing" })
      }

      const comment = await Comment.findByPk(commentId)

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
      }

      // Add a like to the comment
      comment.likes += 1
      await comment.save(sequelize.options)

      res.status(200).json({ message: "Comment liked successfully.", comment })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to like comment" })
    }
  } else if (req.method === "POST" && req.query.action === "unlike") {

  /**
   * POST remove like from a comment
   */
    const commentId = req.query.commentId

    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token" })
      }

      const { user } = await handleDecodeJWT(token)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      if (!commentId) {
        return res.status(400).json({ message: "Comment ID is missing" })
      }

      const comment = await Comment.findByPk(commentId)

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
      }

      // Remove a like from the comment
      if (comment.likes > 0) {
        comment.likes -= 1
        await comment.save(sequelize.options)
      }

      res
        .status(200)
        .json({ message: "Comment unliked successfully.", comment })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: "Failed to unlike comment" })
    }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
