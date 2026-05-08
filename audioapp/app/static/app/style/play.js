const music = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const audioImg = document.getElementById("audio-img");
const heart = document.getElementById("heart");
const list = document.getElementById("list");
const musicList = document.getElementById("music-list");
const addFile = document.getElementById("add-file");
const range = document.getElementById("volumeControl")
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("file");
const addFile2 = document.getElementById("add-file2");
const fileInput2 = document.getElementById("file2");
const currentTime = document.getElementById("currentTime");
const songs = document.getElementsByClassName("song-name");
const duration = document.getElementById("duration");
const fowardBtn = document.getElementById("forwardBtn");
const backwardBtn = document.getElementById("rewindBtn")
const rewindBtn = document.querySelectorAll(".control-btn");
let musicName = ""
let playMode = "fa-repeat"
const options = ["fa-repeat","fa-shuffle","repeat-1-btn"]
let optionNumber = 0
const songArray = Array.from(songs);
let currentSongFavourite = false;

// Tab switching functionality
const tabs = document.querySelectorAll('.tab');
const tabIndicator = document.querySelector('.tab-indicator');

// Initialize tabs
function initializeTabs() {
    tabs.forEach((tab, index) => {  
        tab.addEventListener('click', () => switchTab(index));
    });
}

function switchTab(tabIndex) {
    // Remove active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    tabs[tabIndex].classList.add('active');
    
    // Move indicator with smooth animation
    tabIndicator.style.transform = `translateX(${tabIndex * 100}%)`;
    
    // Handle tab content
    const tabType = tabs[tabIndex].getAttribute('data-tab');
    if (tabType === 'all') {
        getAllSongs();
    } else if (tabType === 'favorite') {
        getAllFavourite();
    }
}

// Initialize tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    // Load initial content for active tab
    getSong(localStorage.getItem("musicName"))
    playOrStopMusic(false);
    document.body.style.backgroundImage = `url(${localStorage.getItem("musicImageUrl")})`;
    audioImg.style.backgroundImage = `url(${localStorage.getItem("musicImageUrl")})`
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const tabType = activeTab.getAttribute('data-tab');
        if (tabType === 'all') {
            getAllSongs();
        } else if (tabType === 'favorite') {
            getAllFavourite();
        }
    }
});

// Toggle favourites
// heart.addEventListener("click", () => {
//     heart.style.color = (heart.style.color === "black" || heart.style.color === "") ? "#fa0a52" : "black";
// });

// music.src = getSong(localStorage.getItem("musicName"))
// document.body.style.backgroundImage = `url(${localStorage.getItem("musicImageUrl")})`;
// audioImg.style.backgroundImage = `url(${localStorage.getItem("musicImageUrl")})`
// music.paused = true; // Ensure music is paused on page load  
// playBtn.style.display = "none";  // Show play
// pauseBtn.style.display = "flex"; // Hide pause




// Play and stop music
function playOrStopMusic(choice=false) {
    if (choice) {
        console.log(choice)
        console.log("Playing music",music.paused);
        pauseBtn.style.display = "flex";
        audioImg.classList.add("rotate");
        playBtn.style.display = "none";
        music.play();
    } else {
        pauseBtn.style.display = "none";
        audioImg.classList.remove("rotate");
        playBtn.style.display = "flex";
        music.pause();
    }
}

function convertToMinutes(inputSecond){
   const minutes = Math.floor(inputSecond / 60 );
   const second = Math.floor(inputSecond % 60);

   return `${minutes.toString().padStart(2,'0')} : ${second.toString().padStart(2,'0')}`
}

async function getSong(song) {
  // Use URL parameters for GET requests
  let url = `get_song/?song_name=${encodeURIComponent(song)}`
  console.log(url)
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
         const data = await response.json(); 
        console.log("Server returned URL:", data.url);
        music.src = data.url;
        musicName = data.name;
        document.body.style.backgroundImage = `url(${data.image})`;
        localStorage.setItem("musicName", data.name); // Store the music name for future use
        audioImg.style.backgroundImage = `url(${data.image})`
        localStorage.setItem("musicImageUrl", data.image); // Store the image URL for future use 
        const currentIndex = songArray.findIndex(li => {
        return li.textContent.trim() === song.trim(); // 'song' is the name passed to the function
        });
        localStorage.setItem("id", currentIndex); // Store the current song index for future use
        console.log("Current song index stored:", currentIndex);
        console.log("audio updated!");
        // Remove playing class from all songs and add to current
        songArray.forEach(item => item.parentElement.classList.remove("playing"));
        songArray[currentIndex].parentElement.classList.add("playing");
        duration.textContent = convertToMinutes(data.duration)
        heart.style.color = (data.isFavourite == true) ? "#fa0a52" : "black";
        currentSongFavourite = data.isFavourite;
        playOrStopMusic(true);
    }
  } catch (error) {
    console.error("Error fetching song:", error);
  }
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim(); // Remove leading whitespace
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

async function getAllSongs() {
    const response = await fetch("get_all_songs/",{
        method:"GET",
        headers: { 'Accept': 'application/json' }
    })
    const data = await response.json();
    if(response.ok){
        console.log("All songs:", data.all_songs);
        const favouriteSong = data.all_songs.filter(sinle_song => sinle_song.isFavourite == true ) 
        updateSongList(data.all_songs);
    }
}

function updateSongList(songs) {
    const songList = document.querySelector('.song-list');
    songList.innerHTML = ''; // Clear existing list
    songs.forEach(song => {
        const li = document.createElement('li');
        li.className = 'song-item';
        li.onclick = () => getSong(song.name);
        li.innerHTML = `
            <span class="song-name">${song.name}</span>
            <span class="song-duration">${Math.floor(song.duration)}s</span>
        `;
        songList.appendChild(li);
    });
}

async function addfavaourite() {
    const csrftoken = getCookie('csrftoken');
    try {
        const response = await fetch("/add_favourite/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ "song_name": musicName })
        });
        const data = await response.json();
        console.log("Favourite status updated:", data);
        // Update heart color based on new favourite status
        heart.style.color = (data.isFavourite == true) ? "#fa0a52" : "black";
        currentSongFavourite = data.isFavourite;
        // If the current tab is favorite, refresh the list
        const activeTab = document.querySelector('.tab.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'favorite') {
            getAllFavourite();
        }
    } catch (error) {
        console.error("Error updating favourite status:", error);
    }
}
async function getAllFavourite() {
    const response = await fetch("get_all_favourite/",{
        method:"GET",
        headers: { 'Accept': 'application/json' }
    })
    const data = await response.json();
    if(response.ok){
        updateSongList(data.all_songs);
    }
}

function changeSequence() {
    // hide all sequence buttons first
    document.querySelectorAll(".fa-repeat, .fa-shuffle, .repeat-1-btn").forEach(item => item.classList.add("control-btn"));
    console.log("Current option number:", options[optionNumber]);
    document.querySelector(`.${options[optionNumber]}`).classList.remove("control-btn");
    playMode = options[optionNumber]
    console.log("Current play mode:", playMode);
    optionNumber++;
    if (optionNumber >= options.length) optionNumber = 0;

}


// Display music list
list.addEventListener("click", () => {
    // Fixed classList.toggle syntax (remove the "=")
    musicList.classList.toggle("slideLeft");
    musicList.classList.toggle("slideRight");
    if (musicList.style.display === "none" || musicList.style.display === "") {
        musicList.style.display = "block";
    } else {
        musicList.style.display = "none";
    }
});

// Add a file to the list
addFile.addEventListener("click", () => {
    fileInput.click();
});

addFile2.addEventListener("click", () => {
    fileInput2.click();
});

fileInput2.addEventListener("change", async () => {
    const file = fileInput2.files[0];
    if (!file) return;

    const csrftoken = getCookie('csrftoken');
    const formData = new FormData();
    formData.append("file", file);
    formData.append("song_name", musicName); 
    formData.append("csrfmiddlewaretoken", csrftoken);

    try {
        const response = await fetch("/uploadImage/", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        // Fix: Use correct CSS syntax
        document.body.style.backgroundImage = `url(${data.imageUrl})`;
        audioImg.style.backgroundImage = `url(${data.imageUrl})`;
        localStorage.setItem("musicImageUrl", data.imageUrl); // Store the new image URL for future use
        localStorage.setItem("musicName", musicName); // Store the music name for future use
        console.log("Background updated!");
    } catch (error) {
        console.error("Error uploading file:", error);
    }
});
fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        uploadForm.submit();
    }
});

music.addEventListener("timeupdate",()=>{
    range.value = music.currentTime/music.duration * 100;
    currentTime.textContent = convertToMinutes(music.currentTime);
})

music.addEventListener("ended",()=>{
    let currentNumber = localStorage.getItem("id");
    if (playMode === "fa-repeat") {
        let currentId = parseInt(localStorage.getItem("id"));
        let nextIndex = (currentId + 1 >= songs.length) ? 0 : currentId + 1;

        // Remove playing class from all songs and add to next
        songArray.forEach(item => item.parentElement.classList.remove("playing"));
        songArray[nextIndex].parentElement.classList.add("playing");
        
        // Update storage and play next
        localStorage.setItem("id", nextIndex);
        console.log("Playing next song with ID:", nextIndex);
        console.log("Next song name:", songs[nextIndex].textContent);
        localStorage.setItem("musicName", songs[nextIndex].textContent); // Store the next song name for future use
        let next = songs[nextIndex].textContent
        getSong(next);
    }
    else if (playMode === "fa-shuffle ") {
        let randomIndex = Math.floor(Math.random() * songs.length);
        // Remove playing class from all songs and add to random
        songArray.forEach(item => item.parentElement.classList.remove("playing"));
        songArray[randomIndex].parentElement.classList.add("playing");
        
        // Update storage and play random
        localStorage.setItem("id", randomIndex);
        console.log("Playing random song with ID:", randomIndex);
        console.log("Random song name:", songs[randomIndex].textContent);
        localStorage.setItem("musicName", songs[randomIndex].textContent); // Store the random song name for future use
        let random = songs[randomIndex].textContent
        getSong(random);
    }
    else if(playMode === "repeat-1-btn"){
        getSong(localStorage.getItem("musicName"));
        music.play();
    }
})

range.addEventListener("change",()=>{
    music.currentTime = range.value/100 * music.duration
    currentTime.textContent = convertToMinutes(music.currentTime); 
})

fowardBtn.addEventListener("click",()=>{
     let currentId = parseInt(localStorage.getItem("id"));
        let nextIndex = (currentId + 1 >= songs.length) ? 0 : currentId + 1;

        // Remove playing class from all songs and add to next
        songArray.forEach(item => item.parentElement.classList.remove("playing"));
        songArray[nextIndex].parentElement.classList.add("playing");
        
        // Update storage and play next
        localStorage.setItem("id", nextIndex);
        console.log("Playing next song with ID:", nextIndex);
        console.log("Next song name:", songs[nextIndex].textContent);
        localStorage.setItem("musicName", songs[nextIndex].textContent); // Store the next song name for future use
        let next = songs[nextIndex].textContent
        getSong(next);
})

backwardBtn.addEventListener("click",()=>{
    let currentId = parseInt(localStorage.getItem("id"));
    let prevIndex = (currentId - 1 < 0) ? songs.length - 1 : currentId - 1;

    // Remove playing class from all songs and add to previous
    songArray.forEach(item => item.parentElement.classList.remove("playing"));
    songArray[prevIndex].parentElement.classList.add("playing");
    
    // Update storage and play previous
    localStorage.setItem("id", prevIndex);
    console.log("Playing previous song with ID:", prevIndex);
    console.log("Previous song name:", songs[prevIndex].textContent);
    localStorage.setItem("musicName", songs[prevIndex].textContent); // Store the previous song name for future use
    let prev = songs[prevIndex].textContent
    getSong(prev);
})
    