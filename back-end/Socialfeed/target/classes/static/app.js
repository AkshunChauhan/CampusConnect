function createPost() {
    // Get the title and content of the post from the input and textarea
    var postTitle = document.getElementById("postTitle").value;
    var postContent = document.getElementById("postContent").value;

    // Check if both title and content are provided
    if (postTitle.trim() === "" || postContent.trim() === "") {
        alert("Please enter both title and content for your post.");
        return;
    }

    // Create a post object
    var post = {
        title: postTitle,
        content: postContent
    };

    // Get existing posts from localStorage or initialize an empty array
    var posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Add the new post to the array of posts
    posts.push(post);

    // Store the updated posts array in localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Redirect to the announcements page
    window.location.href = "announcements.html";
}
