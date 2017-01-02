
function sum(num1, num2){
  return num1 + num2;
}


function howManyLetters(string){
  return string.length;
}


function pushToDOM(input){
  // The following grabs every class on the page, i.e. you grab classes multiple times in contrast to ids
  // Because there can be multiple results, we get an object/array back instead of a single element 
  var container = document.getElementsByClassName("js-container");
  // make sure to clear the div for any subsequent calls with new/different input
  // container[0].innerHTML = "";
  container[0].innerHTML += '<h1>' + input + '</h1>';
}


var result = sum(3,2);

pushToDOM(result);
// document.body.innerHTML = sum(3,7);

var excercise2 = howManyLetters("this is a test string with many letters");

pushToDOM(excercise2);


var beatles = ["John", "Paul", "Ringo", "George"];
for (var i = beatles.length - 1; i >= 0; i--) {
  pushToDOM(beatles[i]);
}

beatles.forEach()



