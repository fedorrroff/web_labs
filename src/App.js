import React from "react";
import logo from "./logo.svg";
import { Post } from "./Post";
import "./App.css";

function App() {
  const [posts, setPosts] = React.useState([
    { content: "Content", title: "Title", comments: ["cmt1"] },
  ]);

  const titleInputRef = React.useRef();
  const contentInputRef = React.useRef();

  const addPost = () => {
    const title = titleInputRef.current.value;
    const content = contentInputRef.current.value;
    titleInputRef.current.value = "";
    contentInputRef.current.value = "";

    setPosts([...posts, { title, content, comments: [] }]);
  };

  const removePost = ({ id }) => {
    setPosts(posts.filter((_, i) => i !== id));
  };

  const addComment = ({ content, postId }) => {
    const newPosts = [...posts];
    newPosts[postId].comments.push(content);
    setPosts(newPosts);
  };

  const removeComment = ({ postId, id }) => {
    const newPosts = [...posts];
    newPosts[postId].comments = newPosts[postId].comments.filter(
      (_, i) => i !== id
    );
    setPosts(newPosts);
  };

  return (
    <main className="App">
      <div classname="inputContainer">
        <input ref={titleInputRef} placeholder="Title" />
        <input ref={contentInputRef} placeholder="Post" />
        <button onClick={addPost}>Add new post</button>
      </div>

      {posts.map((post, i) => (
        <Post
          post={post}
          i={i}
          onAddComment={addComment}
          onRemoveComment={removeComment}
          onRemovePost={removePost}
          key={i}
        />
      ))}
    </main>
  );
}

export default App;
