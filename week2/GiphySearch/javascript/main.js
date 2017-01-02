// 1. Grab the input value

document.querySelector(".js-go").addEventListener('click', function(){
  var input = document.querySelector("input").value;
  console.log(input);
  pushToDOM(input);
});

document.querySelector(".js-userinput").addEventListener('keyup', function(e){

  // check for 'Enter'
  if (e.which === 13) {
    var input = document.querySelector("input").value;
    pushToDOM(input);
  }
});

// 2. Do the data stuff with the API

var url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";

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


// 3. Show me the moneys!

function pushToDOM(input){
  // Deal with API Data, i.e. convert to a JavaScript object
  var response = JSON.parse(input);
  var imageUrl = response.data[1].images.fixed_height.url;
  console.log(imageUrl);

  // The following grabs every class on the page, i.e. you grab classes multiple times in contrast to ids
  // Because there can be multiple results, we get an object/array back instead of a single element 
  var container = document.getElementsByClassName("js-container");
  // I would alternate with single quotes instead of escaping here
  container[0].innerHTML = "<img src=\"" + imageUrl + "\" />";
  // container[0].innerHTML = imageUrl;


}


