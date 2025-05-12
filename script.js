window.addEventListener("load", function () {
  const postListDiv = document.getElementById("postList");
  const errorDiv = document.getElementById("error");
  const postForm = document.getElementById("postForm");
  const formSuccessDiv = document.getElementById("formSuccess");
  const formErrorDiv = document.getElementById("formError");

  // Fetch and display posts
  function fetchPosts() {
    postListDiv.innerHTML = "Loading...";
    errorDiv.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        postListDiv.innerHTML = `
                    <ul>
                        <li>Title: ${json[0].title}</li>
                        <li>Body: ${json[0].body}</li>
                        <li>Title: ${json[1].title}</li>
                        <li>Body: ${json[1].body}</li>
                        <li>Title: ${json[2].title}</li>
                        <li>Body: ${json[2].body}</li>
                        <li>Title: ${json[3].title}</li>
                        <li>Body: ${json[3].body}</li>
                        <li>Title: ${json[4].title}</li>
                        <li>Body: ${json[4].body}</li>
                    </ul>
                `;
      })
      .catch(function (error) {
        errorDiv.innerHTML = "Error loading posts: " + error.message;
      });
  }

  // Submit post
  postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("titleInput").value;
    const bodyInput = document.getElementById("bodyInput").value;

    formSuccessDiv.innerHTML = "Submitting...";
    formErrorDiv.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleInput,
        body: bodyInput,
        userId: 1,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        formSuccessDiv.innerHTML = `
                    <p>Post created! ID: ${json.id}</p>
                    <p>Title: ${json.title}</p>
                    <p>Body: ${json.body}</p>
                `;
      })
      .catch(function (error) {
        formErrorDiv.innerHTML = "Error submitting post: " + error.message;
      });
  });

  // Call the function on page load
  fetchPosts();
});
