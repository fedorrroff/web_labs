onmessage = function ({ data: { posts } }) {
  const newPosts = posts.map((p) => ({
    ...p,
    commentsNumber: p.comments.length,
  }));
  postMessage({ posts: newPosts });
};
