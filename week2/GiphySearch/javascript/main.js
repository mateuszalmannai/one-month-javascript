// 1. Grab the input value

document.querySelector(".js-go").addEventListener('click', function(){
  var input = document.querySelector("input").value;
  console.log(input);
  makeRequest(input);
});

document.querySelector(".js-userinput").addEventListener('keyup', function(e){

  // check for 'Enter'
  if (e.which === 13) {
    var input = document.querySelector("input").value;
    makeRequest(input);
  }
});

// 2. Do the data stuff with the API
function makeRequest(searchTerm){
  var url = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC";

  // AJAX Request
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open( 'GET', url );
  GiphyAJAXCall.send();
  // Event Listener for loading: 
  GiphyAJAXCall.addEventListener('load', function( e ) {
    // your callback events go here 
    var data = e.target.response;
    pushToDOM(data);
  });
};




// 3. Show me yer gubbins!

function pushToDOM(input){
  // Deal with API Data, i.e. convert to a JavaScript object
  var response = JSON.parse(input);
  var imageUrls = response.data;


  // The following grabs every class on the page, i.e. you grab classes multiple times in contrast to ids
  // Because there can be multiple results, we get an object/array back instead of a single element 
  var container = document.getElementsByClassName("js-container");
  // make sure to clear the div for any subsequent calls with new/different input
  container[0].innerHTML = "";

  imageUrls.forEach(function(image){
    var src = image.images.fixed_height.url;

    // I would alternate with single quotes instead of escaping here
    // Make sure to add to what's already on the page
    container[0].innerHTML += "<img src=\"" + src + "\" class=\"container-image\" />";
  });


}


