import CommentsFeedComponent from "./OLD_commentsFeed"

export default function CommentsContainer({ comments, recipeId, userId, setFeedToggle }) {
  const filteredComments = comments?.filter(
    (comment) => comment.recipeId === recipeId
  )

  const reversedComments = filteredComments?.reverse()

  return (
    <div>
      {comments && (
        <article>
          <CommentsFeedComponent
            comments={reversedComments}
            recipeId={recipeId}
            userId={userId}
            setFeedToggle={setFeedToggle}
          />
        </article>
      )}
    </div>
  )
}
