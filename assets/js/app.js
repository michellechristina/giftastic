var gifs = ["Apple", "Pepper", "Pizza", "Milk"];

// displayImageContent function re-renders the HTML to display the appropriate content
function displayImageContent() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        var results = response.data;
        console.log(results);

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var gifDiv = $("<div>");
            gifDiv.addClass("gifCard");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(gifImage);
            gifDiv.append(p);
            

            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifContent").prepend(gifDiv);
        }
    });


    $(".gifCard").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

}

// Function for displaying button data
function renderButtons() {

    // Deleting the gifs prior to adding new gif
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of gif to our button
        a.addClass("gif");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons div
        $("#buttons").append(a);
    }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#search-input").val();

    // Adding gif from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "gif"
$(document).on("click", ".gif", displayImageContent);

// Calling the renderButtons function to display the intial buttons
renderButtons();