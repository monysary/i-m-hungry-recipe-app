import React from "react";
import CommentsFeedComponent from "../feed";

export default function CommentsContainer({ comments, recipeId }) {
  const filteredComments = comments?.filter(
    (comment) => comment.recipeId === recipeId
  );
  return (
    <>
      {comments && (
        <article className=''>
          <CommentsFeedComponent
            comments={filteredComments}
            recipeId={recipeId}
          />
        </article>
      )}
    </>
  );
}
