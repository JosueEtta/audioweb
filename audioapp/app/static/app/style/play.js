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
const duration = document.getElementById("duration");
let musicName = ""

// Toggle favourites
// heart.addEventListener("click", () => {
//     heart.style.color = (heart.style.color === "black" || heart.style.color === "") ? "#fa0a52" : "black";
// });



// Play and stop music
function playOrStopMusic() {
    if (music.paused) {
        pauseBtn.style.display = "flex";
        audioImg.classList.add("rotate");
        playBtn.style.display = "none";
        music.play();
        console.log(range)
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

range.addEventListener("change",()=>{
    music.currentTime = range.value/100 * music.duration
    currentTime.textContent = convertToMinutes(music.currentTime); 
})
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
        audioImg.style.backgroundImage = `url(${data.image})`
        console.log("audio updated!");
        // Update UI state to match playOrStopMusic logic
        pauseBtn.style.display = "flex";
        playBtn.style.display = "none";
        audioImg.classList.add("rotate");
        duration.textContent = convertToMinutes(data.duration)
        heart.style.color = (data.isFavourite == true) ? "#fa0a52" : "black";
        music.play();
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


// async function uploadFile() {
//     fileInput2.click();
//    file = fileInput2.files[0];
//     if (!file) {
//         console.error("No file selected for upload.");
//         return;
//     }
//     const csrftoken = getCookie('csrftoken');
//     console.log("Uploading file:", file.name);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("song_name", music.src); 
//     formData.append("csrfmiddlewaretoken", csrftoken);
//     try {
//         const response = await fetch("/uploadImage", {
//             method: "POST",
//             body: formData
//         });
//         const data = await response.json();
//         document.body.style.backgroundImage(`url(${data.imageUrl})`);
//         console.log("File uploaded successfully:", data);
//     } catch (error) {
//         console.error("Error uploading file:", error);
//     }
// }

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
        alert(data.message); // Show success message to the user
        // Update heart color based on new favourite status
        heart.style.color = (data.isFavourite == true) ? "#fa0a52" : "black";
    } catch (error) {
        console.error("Error updating favourite status:", error);
    }
}
