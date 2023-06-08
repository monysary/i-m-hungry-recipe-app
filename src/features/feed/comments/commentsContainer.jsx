import CommentsFeedComponent from "../commentsFeed";

export default function CommentsContainer({ comments, recipeId, userId }) {
    const filteredComments = comments?.filter(
        (comment) => comment.recipeId === recipeId
    )

    const reversedComments = filteredComments?.reverse();
    return (
        <>
            {comments && (
                <article className=''>
                    <CommentsFeedComponent
                        comments={reversedComments}
                        recipeId={recipeId}
                        userId={userId}
                    />
                </article>
            )}
        </>
    );
}
