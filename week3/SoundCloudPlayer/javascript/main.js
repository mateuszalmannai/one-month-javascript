/* 1. Search */

var UI = {};

UI.enterPress = function(){
  document.querySelector(".js-search").addEventListener('keyup', function(e){
    if (e.which === 13) {
      var input = document.querySelector("input").value;
      UI.clearDiv("js-search-results");
      SoundCloudAPI.getTrack(input);
    }
  });
}

UI.submitClick = function(){
  document.querySelector(".js-submit").addEventListener('click', function(){
    var input = document.querySelector("input").value;
    UI.clearDiv("js-search-results");
    SoundCloudAPI.getTrack(input);
  });
}

UI.clearDiv = function(divClass){
  document.getElementsByClassName(divClass)[0].innerHTML="";
  if (divClass === "js-search-results") {
    document.getElementsByClassName(divClass)[0].style.backgroundImage = "url(http://lorempixel.com/200/200/abstract/)";
  }
}

UI.clearStorage = function(){
  document.querySelector(".js-go").addEventListener('click', function(){
    UI.clearDiv("js-playlist");
    localStorage.clear();
  });
}
// skin it differently 



/* 2. Query Soundcloud API */

// Sometimes when people make objects that wrap large pieces of code and use them like Classes
// they tend to make the first letter of the name uppercase
var SoundCloudAPI = {};

// Initialize our object
SoundCloudAPI.init = function() {
  SC.initialize({
    // used Castig's ID here as soundcloud said they might need two weeks
    client_id: '195d273fb18f4a9a75ebda65c1aa2631'
  });
}

SoundCloudAPI.getTrack = function(inputValue) {
  SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    // Only render tracks if we have tracks
    SoundCloudAPI.renderTracks(tracks);
  });
}


/* 3. Display the cards */
SoundCloudAPI.renderTracks = function(tracks) {

  // pass in an event 
  tracks.forEach(function(track) {

    // create div
    var card = document.createElement('div');
    card.classList.add('card');

    // image
    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

    imageDiv.appendChild(image_img);

    // content
    var content = document.createElement('div');
    content.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

    var button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    var icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    var buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    // appendChild
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);
    button.addEventListener('click', function() {
      SoundCloudAPI.getEmbed(track.permalink_url);
    });

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    var searchResults = document.querySelector('.js-search-results');
    searchResults.appendChild(card);
  });

}

/* 4. Add to playlist and play */
SoundCloudAPI.getEmbed = function(trackUrl) {
  // console.log('Clicked; I\'m in getEmbed');
  SC.oEmbed(trackUrl, {
    auto_play: true
  }).then(function(embed) {

    var sideBar = document.querySelector('.js-playlist');
    var box = document.createElement('div');
    box.innerHTML = embed.html;

    // save songs in localStorage to survive page refreshes
    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
  });
}

// Initialize API with key
SoundCloudAPI.init();
// Register Listeners
UI.enterPress();
UI.submitClick();
UI.clearStorage();

// put things back in the sidebar, i.e. populate on load
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");
