import controller from "./controller.js";
import model from "./model.js";

class PostsView {
  constructor({ root, createBtn }) {
    this.appNode = root;
    this.handlePostRemove = this.handlePostRemove.bind(this);
    this.handlePostCreate = this.handlePostCreate.bind(this);
    this.handleCommentCreate = this.handleCommentCreate.bind(this);
    this.handlePostRemove = this.handlePostRemove.bind(this);
    this.inputTitleNode = document.getElementById("titleInput");
    this.inputContentNode = document.getElementById("contentInput");
    createBtn.addEventListener("click", this.handlePostCreate);

    model.setRenderFromView({ renderCallback: this.render.bind(this) });
  }

  handlePostCreate() {
    const inputTitleNode = this.inputTitleNode;
    const inputContentNode = this.inputContentNode;

    controller.createPost({ inputTitleNode, inputContentNode });
  }

  handleCommentCreate(e) {
    const btnNode = e.target;
    const key = "postId_";
    controller.createComment({ btnNode, key });
  }

  handlePostRemove(e) {
    const btnNode = e.target;
    controller.removePost({ btnNode });
  }

  handleCommentRemove(e) {
    const btnNode = e.target;

    controller.removeComment({ btnNode });
  }

  handleListenersUpdate() {
    [...document.querySelectorAll(".removePost")].map((btn) =>
      btn.addEventListener("click", this.handlePostRemove)
    );

    [...document.querySelectorAll(".removeComment")].map((btn) =>
      btn.addEventListener("click", this.handleCommentRemove)
    );

    [...document.querySelectorAll(".addComment")].map((btn) =>
      btn.addEventListener("click", this.handleCommentCreate)
    );
  }

  render({ posts = [] }) {
    const commentsHtml = posts
      .map(
        (p, i) => `
        <div class="postContainer">
        <div class="post-content">
        <h3>${p.title}
        </h3>
        <p>${p.content}
        </p></div>
        <button class="removePost" data-value="${i}">x</button>
        </div>
        <div class="comments">
            ${p.comments
              .map(
                (c, idx) =>
                  `<div class="commentContainer"><p class="comment">${c}</p><button class="removeComment" data-commentid="${idx}" data-postid="${i}">x</button></div>`
              )
              .join("")}
        </div>
        <div>
        <div class="addCommentContainer">
        <p class="total">Total comments: ${p.commentsNumber}</p>
        <input id="postId_${i}">
        <button class="addComment" data-postid="${i}">Add new comment</button>
        </div>
        </div>
        `
      )
      .join(" ");
    this.appNode.innerHTML = commentsHtml;
    this.handleListenersUpdate();
  }
}

export default PostsView;
