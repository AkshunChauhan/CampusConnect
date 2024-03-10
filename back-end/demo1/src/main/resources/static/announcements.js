// Get existing posts from localStorage
var posts = JSON.parse(localStorage.getItem("posts")) || [];

// Get the div where announcements will be displayed
var announcementsDiv = document.getElementById("announcements");

// Loop through the posts and display them
posts.forEach(function(post) {
    // Create elements for title and content
    var titleElement = document.createElement("h2");
    titleElement.textContent = post.title;

    var contentElement = document.createElement("p");
    contentElement.textContent = post.content;

    // Append title and content to the announcements div
    announcementsDiv.appendChild(titleElement);
    announcementsDiv.appendChild(contentElement);
});

// Function to clear localStorage data when the checkmark is ticked
function clearLocalStorage() {
    var checkBox = document.getElementById("clearCheckbox");

    // Check if the checkmark is ticked
    if (checkBox.checked) {
        // Clear localStorage data
        localStorage.removeItem("posts");

        // Display a message or perform any other action if needed
        alert("LocalStorage data cleared.");
    } else {
        alert("Please tick the checkbox to clear localStorage data.");
    }
}

// Function to display announcements
function displayAnnouncements() {
    // Get the div where announcements will be displayed
    var announcementsDiv = document.getElementById("announcements");

    // Check if there are any posts in localStorage
    var posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Clear existing announcements
    announcementsDiv.innerHTML = "";

    // Loop through the posts and display them
    posts.forEach(function(post) {
        // Create elements for title and content
        var titleElement = document.createElement("h2");
        titleElement.textContent = post.title;

        var contentElement = document.createElement("p");
        contentElement.textContent = post.content;

        // Append title and content to the announcements div
        announcementsDiv.appendChild(titleElement);
        announcementsDiv.appendChild(contentElement);
    });
}
