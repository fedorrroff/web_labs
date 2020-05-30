import React from "react";

export const Post = ({
  post,
  i,
  onRemovePost,
  onRemoveComment,
  onAddComment,
  //   onCommentInputChange,
}) => {
  const input = React.useRef();
  return (
    <div>
      <div className="postContainer">
        <div className="post-content">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
        <button className="removePost" onClick={() => onRemovePost({ id: i })}>
          x
        </button>
      </div>
      <div className="comments">
        {post.comments.map((c, idx) => (
          <div className="commentContainer">
            <p className="comment">{c}</p>
            <button
              className="removeComment"
              onClick={() => onRemoveComment({ id: idx, postId: i })}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div>
        <div className="addCommentContainer">
          <p className="total">Total comments: {post.comments.length}</p>
          <input
            // onChange={(e) =>
            //   onCommentInputChange({ postId: i, value: e.target.value })
            // }
            ref={input}
          />
          <button
            className="addComment"
            onClick={() => {
              onAddComment({ postId: i, content: input.current.value });
              input.current.value = "";
            }}
          >
            Add new comment
          </button>
        </div>
      </div>
    </div>
  );
};
