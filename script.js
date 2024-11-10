console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volumeControl = document.getElementById('volumeControl');
let searchBar = document.getElementById('searchBar');
let toggleMode = document.getElementById('toggleMode');

let songs = [
    { songName: "Haath Kangan Leke Aana", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Heeriye", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "O-Maahi", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Perfect - Ed Sheeran", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Tu Hi Hain Aashiqui", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Ve Kamaleya Redux", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Tum Kya Mile", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Ya Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Ye Jism", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Heroes Tonight", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
];

// Populate song list
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update Seekbar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change current time based on seek bar value
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Make all songs play buttons appear as play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play a specific song when its play button is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next song button functionality
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song button functionality
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Volume control functionality
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});

// Search functionality
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    songItems.forEach((item) => {
        const songName = item.getElementsByClassName('songName')[0].innerText.toLowerCase();
        if (songName.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Handle dark/light mode toggle
toggleMode.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        toggleMode.innerText = 'Dark Mode';
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        toggleMode.innerText = 'Light Mode';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');

    // Open Login Modal
    loginBtn.onclick = () => {
        loginModal.style.display = "block";
    };

    // Open Signup Modal
    signupBtn.onclick = () => {
        signupModal.style.display = "block";
    };

    // Close Login Modal
    closeLogin.onclick = () => {
        loginModal.style.display = "none";
    };

    // Close Signup Modal
    closeSignup.onclick = () => {
        signupModal.style.display = "none";
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === loginModal || event.target === signupModal) {
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        }
    };

    // Handle login form submission
    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        // Add your login logic here
        console.log('Login:', email, password);
        loginModal.style.display = "none"; // Close modal on submit
    };

    // Handle signup form submission
    document.getElementById('signupForm').onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        // Add your signup logic here
        console.log('Sign Up:', name, email, password);
        signupModal.style.display = "none"; // Close modal on submit
    };
});
