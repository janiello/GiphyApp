// Create an empty array that will ultimately contain the games entered by the user.
var games = [];
// Set API lnk to a variable
var queryURL = "https://api.giphy.com/v1/gifs/randomid?q=" +  + "&api_key=MIyFpe8ISOwioUTTFZqNTRdH9z7TCluk"
// Create a function that will create the buttons based on user input
function AddGame () {
    // Delete items before adding them to avoid duplicate buttons
    $("#buttons").empty();
    // Loop through the empty array above...
    for (g = 0; g < games.length; g++) {
        // Dynamically create button elements by assigning them to a variable
        var newGame = $("<button>");
        // Give new button element a class (since there will be multiple buttons running the same general function)
        newGame.addClass("game-btn");
        // Give the button a data attribute (based on the user input which will be pushed to the array) to send requests through the API
        newGame.attr("data-name", games[g]);
        // Give each new button text based on what the user enters in the text field
        newGame.text(games[g]);
        // Add the new button to the end of the "buttons" div
        $("#buttons").append(newGame);
    }
}
// This will empty the user input field so I don't have to delete the last entry manually

// The AddGame function will not run unless the user does something to call it, which will be clicking on the submit button. So I will need a click event that will tell this function the run.

// Grab the element that should be clicked and create an onclick function
$("#add-game").on("click", function(event) {
    // Prevent the submit button from doing anything until the user clicks on it
    event.preventDefault();
    // Set user input field to a variable (buttons will not appear correctly if this variable is defined globally)
    var game = $("#game-input").val().trim();
    // Push the user input to the empty array
    games.push(game);
    // Call the AddGame function so when the user click's "submit", the new button will appear
    AddGame();
});