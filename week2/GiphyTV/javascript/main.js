// Not quite sure why yet, but the interval also delays the first call of the function
// which is why there is a single call to makeRequest() on line 5, otherwise we'd see a
// blank page to start with for the duration of the interval

var interval = 10000;

setInterval(makeRequest, interval);
makeRequest();

// 2. Do the data stuff with the API
function makeRequest(){
  var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC";

  // AJAX Request
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open( 'GET', url );
  GiphyAJAXCall.send();
  // Event Listener for loading: 
  GiphyAJAXCall.addEventListener('load', function(e) {
    // your callback events go here 
    var data = e.target.response;
    pushToDOM(data);
  });
};

// 3. Show me the moneys!

function pushToDOM(input){
  // Deal with API Data, i.e. convert to a JavaScript object
  var response = JSON.parse(input);
  var imageUrl = response.data.image_url;


  // The following grabs every class on the page, i.e. you grab classes multiple times in contrast to ids
  // Because there can be multiple results, we get an object/array back instead of a single element 
  var container = document.getElementsByClassName("js-container");
  // make sure to clear the div for any subsequent calls with new/different input
  // container[0].innerHTML = "";
  container[0].innerHTML = '<img src=' + imageUrl + ' id="bg"/>';
}


