// Greeting that changes with the time of day
const today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let hour = today.getHours();
let greeting = "";

if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

document.querySelector("#greeting").textContent =
  `${greeting}! Today is ${days[today.getDay()]} ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}.`;

// Live clock
const showClock = () => {
  let now = new Date();
  document.querySelector("#clock").textContent = `The time is ${now.toLocaleTimeString()}`;
}

showClock();
setInterval(showClock, 1000);

// Short summary of the playlist
let totalSeconds = 0;

songs.forEach((song) => {
  totalSeconds += toSeconds(song.length);
});

document.querySelector("#summary").textContent =
  `Right now my playlist has ${songs.length} songs and lasts ${formatTime(totalSeconds)} minutes.`;

// Song of the day button
const randomBtn = document.querySelector("#randomBtn");

randomBtn.addEventListener("click", () => {
  let index = Math.floor(Math.random() * songs.length);
  let song = songs[index];

  document.querySelector("#songOfDay").innerHTML =
    `<b>${song.title.toUpperCase()}</b> by ${song.artist} (${song.length}, ${song.year})`;
});

// Say hello form
const nameForm = document.querySelector("#nameForm");

nameForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let name = capitalise(nameForm.elements.username.value);

  document.querySelector("#welcomeMsg").textContent =
    `Hi ${name}, enjoy the music! Your name has ${name.length} characters.`;

  nameForm.reset();
});

// Rollover image
const image = document.querySelector("#rollover");
const original = image.getAttribute("src");

image.addEventListener("mouseenter", (evt) =>
  evt.target.setAttribute("src", "images/concert.jpg"));

image.addEventListener("mouseleave", (evt) =>
  evt.target.setAttribute("src", original));
