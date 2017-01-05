/* 1. Search */

var UI = {};

// UI.EnterPress

// UI.SubmitClick

// add clear button to reset playlist: Storage.clear()

// skin it differently 



/* 2. Query Soundcloud API */

// Sometimes when people make objects that wrap large pieces of code and use the like Classes
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
    console.log(tracks);
    // Only render tracks if we have tracks
    SoundCloudAPI.renderTracks(tracks);
  });
}

SoundCloudAPI.renderTracks = function(tracks) {
  /* 3. Display the cards */

  // pass in an event 
  tracks.forEach(function(track) {

    // console.log(track);

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


SoundCloudAPI.init();
SoundCloudAPI.getTrack("Stivs");

/* 4. Add to playlist and play */

SoundCloudAPI.getEmbed = function(trackUrl) {
  // console.log('Clicked; I\'m in getEmbed');
  SC.oEmbed(trackUrl, {
    auto_play: true
  }).then(function(embed) {
    // console.log('oEmbed response: ', embed);

    var sideBar = document.querySelector('.js-playlist');

    var box = document.createElement('div');
    box.innerHTML = embed.html;

    // save songs in localStorage to survive page refreshes
    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
    // console.log(sideBar.innerHTML);
  });
}

// put things back in the sidebar, i.e. populate on load
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");

