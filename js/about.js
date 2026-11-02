// Information about me held in a JSON object
const me = {
  "name": "Ugnius Liutinskis",
  "course": "Creative Computing",
  "college": "South East Technological University",
  "year": 2,
  "dateOfBirth": "2008-05-22",
  "email": "20117244@setu.ie",
  "favouriteGenre": "Hip Hop",
  "hobbies": ["Gym", "Music", "Gaming"]
};

// Works out my age from my date of birth
const calcAge = (dob) => {
  let parts = dob.split("-");
  let birthYear = parseInt(parts[0]);
  let birthMonth = parseInt(parts[1]);
  let birthDay = parseInt(parts[2]);

  let today = new Date();
  let month = today.getMonth() + 1;
  let age = today.getFullYear() - birthYear;

  // Takes 1 off if my birthday hasn't happened yet this year
  if (month < birthMonth) {
    age--;
  } else if (month === birthMonth && today.getDate() < birthDay) {
    age--;
  }

  return age;
}

const studentNumber = me.email.substring(0, me.email.indexOf("@"));

document.querySelector("#aboutMe").insertAdjacentHTML(
  "beforeend",
  `<h3>${capitalise(me.name)}</h3>
   <p>I am ${calcAge(me.dateOfBirth)} years old and I'm in year ${me.year} of ${me.course} at ${me.college}.</p>
   <p>Student number: ${studentNumber}</p>
   <p>My favourite genre is <b>${me.favouriteGenre}</b> and my hobbies are ${me.hobbies.join(", ")}.</p>`
);

// Facts about the playlist
let oldest = songs[0];
let newest = songs[0];

songs.forEach((song) => {
  if (song.year < oldest.year) {
    oldest = song;
  }
  if (song.year > newest.year) {
    newest = song;
  }
});

let longestSong = songs[0];

songs.forEach((song) => {
  if (toSeconds(song.length) > toSeconds(longestSong.length)) {
    longestSong = song;
  }
});

let thisYear = new Date().getFullYear();

const facts = document.querySelector("#facts");

facts.insertAdjacentHTML("beforeend", `<li>There are ${songs.length} songs in the playlist.</li>`);
facts.insertAdjacentHTML("beforeend",
  `<li>The oldest song is ${oldest.title} by ${oldest.artist} from ${oldest.year}, which was ${thisYear - oldest.year} years ago.</li>`);
facts.insertAdjacentHTML("beforeend",
  `<li>The newest song is ${newest.title} by ${newest.artist} from ${newest.year}.</li>`);
facts.insertAdjacentHTML("beforeend",
  `<li>The longest song is ${longestSong.title} at ${longestSong.length}.</li>`);

// Read more button
const readBtn = document.querySelector("#readBtn");

readBtn.addEventListener("click", () => {
  document.querySelector("#readmore").classList.toggle("hideshow");
});

// Show my favourite songs
const favBtn = document.querySelector("#favBtn");
const favList = document.querySelector("#favList");

favBtn.addEventListener("click", () => {
  favList.textContent = "";

  const favourites = songs.filter((song) => song.favourite === true);

  favourites.forEach((song) => {
    favList.insertAdjacentHTML("beforeend", `<li><b>${song.title}</b> by ${song.artist}</li>`);
  });
});
