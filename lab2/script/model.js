class PostsModel {
  constructor() {
    this.posts = [
      {
        content: "Content of the post",
        title: "Title",
        comments: ["comment 1", "comment 2", "comment 3", "comment 4"],
      },
    ];
    this.render = null;
    this.postCounter = new Worker("./script/postCounter.js");
    this.postCounter.onmessage = this.getCommentsNumberWithRender.bind(this);
  }

  getCommentsNumberWithRender({ data: { posts } }) {
    this.render({ posts });
  }

  setRenderFromView({ renderCallback }) {
    this.render = renderCallback;
    this.postCounter.postMessage({ posts: this.posts });
  }

  addPost({ title, content }) {
    this.posts.push({ title, content, comments: [] });
    this.postCounter.postMessage({ posts: this.posts });
  }
  addComment({ postId, content }) {
    this.posts[postId].comments.push(content);
    this.postCounter.postMessage({ posts: this.posts });
  }

  removePost({ id }) {
    this.posts = this.posts.filter((p, i) => +id !== i);
    this.postCounter.postMessage({ posts: this.posts });
  }

  removeComment({ postId, id }) {
    console.log(postId, id);
    const newComments = this.posts[postId].comments.filter((c, i) => i !== +id);
    this.posts[postId].comments = newComments;
    this.postCounter.postMessage({ posts: this.posts });
  }
}

export default new PostsModel();
