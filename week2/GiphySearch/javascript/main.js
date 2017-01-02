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
    console.log(input);
    pushToDOM(input);
  }
});

// 2. Do the data stuff with the API


// 3. Show me the moneys!

function pushToDOM(input){
  // The following grabs every class on the page, i.e. you grab classes multiple times in contrast to ids
  // Because there can be multiple results, we get an object/array back instead of a single element 
  var container = document.getElementsByClassName("js-container");
  container[0].innerHTML = "<h1>" + input +"</h1>";
}


