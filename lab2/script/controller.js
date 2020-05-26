import model from "./model.js";
class PostsController {
  createComment({ btnNode, key }) {
    const postId = btnNode.dataset.postid;
    const input = document.getElementById(`${key}${postId}`);

    const content = input.value;
    input.value = "";

    model.addComment({ postId, content });
  }

  removeComment({ btnNode }) {
    const postId = btnNode.dataset.postid;
    const id = btnNode.dataset.commentid;
    console.log(postId, id);
    model.removeComment({ postId, id });
  }

  createPost({ inputTitleNode, inputContentNode }) {
    const title = inputTitleNode.value;
    const content = inputContentNode.value;
    inputTitleNode.value = "";
    inputContentNode.value = "";

    model.addPost({ title, content });
  }

  removePost({ btnNode }) {
    const id = btnNode.dataset.value;
    model.removePost({ id });
  }
}

export default new PostsController();
