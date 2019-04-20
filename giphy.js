// Create an array containing the default games for the user to click
var games = ["Halo 2", "Assassin's Creed", "Call of Duty", "Rocket League", "Fortnite", "Borderlands", "Battlefield V", "Far Cry 5", "Apex Legends", "Portal 2"];
// Create a function that will create the buttons based on user input
function AddGame () {
    // Delete items before adding them to avoid duplicate buttons
    $("#buttons").empty();
    // Loop through the empty array above...
    for (g = 0; g < games.length; g++) {
        // Dynamically create button elements by assigning them to a variable
        var newButton = $("<button type='button'>");
        // Give new button element a class (since there will be multiple buttons running the same general function)
        newButton.addClass("btn btn-primary");
        // Give the button a data attribute (based on the user input) to get API data
        newButton.attr("data-game", games[g]);
        // Give each new button text based on what the user enters in the text field
        newButton.text(games[g]);
        // Add the new button to the end of the "buttons" div
        $("#buttons").append(newButton);
    }
}
// Create a click event that will tell this function to run
// Grab the element that should be clicked and create an onclick function
$("#add-game").on("click", function(event) {
    // Prevent the submit button from doing anything until the user clicks on it
    event.preventDefault();
    // Set user input field to a variable (buttons will not appear correctly if this variable is defined globally)
    var newGame = $("#game-input").val().trim();
    // Push the user input to the empty array
    games.push(newGame);
    // Call the AddGame function so when the user clicks "submit", the new button will appear
    AddGame();
});
// Call the AddGame function outside of the click event to render the default game buttons on page load
AddGame();
// Now I need a function that will display the gifs when the game buttons are clicked
function getGiphyWithIt() {
    var game = $(this).attr("data-game");
    // Set API lnk to a variable
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&limit=10&api_key=MIyFpe8ISOwioUTTFZqNTRdH9z7TCluk"
    // Make the ajax call to retrieve gifs when user clicks any game button
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(retrieve) {
        // Store the ajax data in a variable to call on later
        var gifs = retrieve.data;
        // I need to loop through each button in my array in order to create each element needed below
        for (g = 0; g < games.length; g++) {
            // Without console logging, I want the data from the ajax call to go somewhere on the actual page
            var gameDiv = $("<div class='game'>")
            // Pull the rating of each gif to display in each gameDiv
            var rating = gifs[0].rating;
            // Create an element to put the rating into
            var r = $("<p>").text("Rating: " + rating);
            // Add the rating element to the gameDiv
            gameDiv.append(r);
            // Create an image tag element for the gifs to appear
            var gameGif = $("<img class='img-thumbnail'>");
            // Set the src attribute of the image element to the appropriate property to pull the gif's still image
            gameGif.attr("src", gifs[g].images.fixed_height_still.url);
            // Play/Pause functionality
            // Give the image tag a "data-still" attribute for the still image...
            gameGif.attr("data-still", gifs[g].images.fixed_height_still.url);
            // Set a "data-animate" attribute and set it to the gif...
            gameGif.attr("data-animate", gifs[g].images.fixed_height.url);
            // Set the gifs to the still images upon clicking the game buttons with a "data-state" attribute
            gameGif.attr("data-state", "still");
            // Add the gif element I just created to the overarching gameDiv
            gameDiv.append(gameGif);
            // Prepend each dynamically created gameDiv to the global gif container ("game-portal")
            $("#game-portal").prepend(gameDiv);
            // Click function that will change the data-state attribute of each image
            gameGif.on("click", function() {
                // Set the data-state attribute to a variable
                var state = $(this).attr("data-state");
                // Each gif is appended to the page as a still image
                if (state === "still") {
                    // I want to change the still image to the "data-animate" image upon clicking on it
                    $(this).attr("src", $(this).attr("data-animate"));
                    // I also want the "state" of the image to change from "still" to "animate"
                    $(this).attr("data-state", "animate");
                } else {
                    // Otherwise, if the gif is clicked again, the animation goes back to the still image
                    $(this).attr("src", $(this).attr("data-still"));
                    // And the "state" gets changed back from "animate" to "still"
                    $(this).attr("data-state", "still");
                }
            })
        };
    });
};
// Click event that runs the above function when any button with the "game-btn" class is clicked
$(document).on("click", ".btn", getGiphyWithIt);