// JSON array of objects: every song in my playlist
// (this file is loaded on every page, so all 3 pages can use the songs and the functions below)
const songs = [
  {
    "id": 1,
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "genre": "Pop",
    "length": "3:20",
    "year": 2019,
    "rating": 5,
    "favourite": true
  },
  {
    "id": 2,
    "title": "Lose Yourself",
    "artist": "Eminem",
    "genre": "Hip Hop",
    "length": "5:26",
    "year": 2002,
    "rating": 3,
    "favourite": false
  },
  {
    "id": 3,
    "title": "Mr. Brightside",
    "artist": "The Killers",
    "genre": "Rock",
    "length": "3:42",
    "year": 2004,
    "rating": 4,
    "favourite": true
  },
  {
    "id": 4,
    "title": "Levels",
    "artist": "Avicii",
    "genre": "Dance",
    "length": "3:19",
    "year": 2011,
    "rating": 3,
    "favourite": false
  },
  {
    "id": 5,
    "title": "Sicko Mode",
    "artist": "Travis Scott",
    "genre": "Hip Hop",
    "length": "5:12",
    "year": 2018,
    "rating": 4,
    "favourite": true
  },
  {
    "id": 6,
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "genre": "Rock",
    "length": "5:55",
    "year": 1975,
    "rating": 5,
    "favourite": true
  },
  {
    "id": 7,
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "genre": "Pop",
    "length": "3:53",
    "year": 2017,
    "rating": 2,
    "favourite": false
  },
  {
    "id": 8,
    "title": "Heard 'Em Say",
    "artist": "Kanye West",
    "genre": "Hip Hop",
    "length": "3:23",
    "year": 2005,
    "rating": 5,
    "favourite": true
  }
];

// Footer year on every page
document.querySelector("#footerYear").textContent = new Date().getFullYear();

// Helper functions that the pages share

// turn a length like "3:45" into seconds (225)
const toSeconds = (length) => {
  let parts = length.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// turn seconds (225) back into a length like "3:45"
const formatTime = (seconds) => {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return secs < 10 ? `${mins}:0${secs}` : `${mins}:${secs}`;
}

// make every word start with a capital letter
const capitalise = (str) => {
  let formattedName = "";
  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    formattedName +=
      words[i].charAt(0).toUpperCase() +
      words[i].substring(1).toLowerCase() + " ";
  }

  return formattedName.substring(0, formattedName.length - 1);
}
