let btnArray = ['arnold','cat'];
function showBtns(){
    $("#btnContainer").empty();
    for (let i = 0; i<btnArray.length ; i++)
    {
        $("#btnContainer").prepend(`<button type='button' class='btn btn-info m-1 addedBtn' data-animal='${btnArray[i]}'>${btnArray[i]}</button>`);
    }
}
showBtns();
$("#addBtn").on("click", function() {
    btnArray.push($("#newBtnVal").val());
    showBtns();
});
// Adding click event listen listener to all buttons
$("#btnContainer").on("click", "button.addedBtn", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=3&state=still";
    
    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing an image tag
          var animalImage = $('<img class="m-1 myGif">');
          // Setting the src attribute of the image to a property pulled off the result item
          //let gifSrc = results[i].images.fixed_height.url;
          let gifSrc = results[i].images.fixed_height.url;
          gifSrc = gifSrc.split("?");
          gifSrc = gifSrc[0];
          console.log(gifSrc);
          let myGifSrcStill = gifSrc.split(".gif");
          myGifSrcStill = myGifSrcStill[0] + "_s.gif";
          animalImage.attr("src", myGifSrcStill);
          animalImage.attr("data-still", myGifSrcStill);
          animalImage.attr("data-animate", gifSrc);
          animalImage.attr("data-state", "still");
                     
          // Appending the paragraph and image tag to the animalDiv
          $("#gifHolder").prepend(animalImage);
        }
      });

  });
  $("#gifHolder").on("click", "img.myGif", function() {
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