import React, { useState } from "react";
import constant from "./services/agent";
import PostCreatedForm from "./components/PostCreatedForm";
import PostUpdatedForm from "./components/PostUpdatedForm";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showCreatedForm, setShowCreatedForm] = useState(false);
  const [postCurrentlyUpdated, setPostCurrentlyUpdated] = useState(null);

  function getPosts() {
    const url = constant.apiGetAllPosts;

    fetch(url, {
      method: "Get",
    })
      .then((res) => res.json())
      .then((postFromServer) => {
        setPosts(postFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(postId) {
    const url = constant.apiDeletePost +'/?id=' +`${postId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((resFromServer) => {
        console.log(resFromServer)
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {!showCreatedForm && postCurrentlyUpdated === null && (
            <div>
              <h1>ASP.NET Core React Tutorial</h1>
              <div className="mt-5">
                <button onClick={getPosts} className="btn btn-dark btn-lg w-100">Get posts from server</button>
                <button onClick={() => setShowCreatedForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create new post</button>
              </div>
            </div>
          )};

          {(posts.length > 0) && !showCreatedForm && postCurrentlyUpdated === null && renderPostTable()}

          {showCreatedForm && <PostCreatedForm onPostCreated={onPostCreated} />}

          {postCurrentlyUpdated !== null && <PostUpdatedForm post={postCurrentlyUpdated} onPostUpdated={onPostUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderPostTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.postId}>
                  <th scope="row">{post.postId}</th>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <button onClick={() => setPostCurrentlyUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">
                      Update
                    </button>
                    <button onClick={() => { if (window.confirm('Are sure?')) deletePost(post.postId) }}
                      className="btn btn-secondary btn-lg">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark btn-lg w-100">
          Empty React posts array
        </button>
      </div>
    );
  }

  function onPostCreated(createPost) {
    setShowCreatedForm(false);

    if (createPost === null) {
      return;
    }

    alert("Post successfully created");

    getPosts();
  }

  function onPostUpdated(updatePost) {
    setPostCurrentlyUpdated(null);

    if (updatePost == null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === updatePost.postId) {
        return true
      }
    });

    if (index !== -1) {
      postsCopy[index] = updatePost;
    }

    setPosts(postsCopy);

    alert("Successfully updated");
  }

  function onPostDeleted(postId) {
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === postId) {
        return true
      }
    });

    if (index !== -1) {
      postsCopy.splice(index, 1);
    }

    setPosts(postsCopy);

    alert("Successfully deleted");
  }
}
