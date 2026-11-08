// Shows the songs in the table
const table = document.querySelector("table");
const message = document.querySelector("#message");

// Turn a rating number into stars
const makeStars = (rating) => {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "★";
  }
  return stars;
}

// Shows a list of songs in the table
const displaySongs = (list) => {
  table.textContent = "";
  message.textContent = `Showing ${list.length} of ${songs.length} songs`;

  if (list.length > 0) {
    table.insertAdjacentHTML(
      "beforeend",
      `<tr><th>#</th><th>Title</th><th>Artist</th><th>Genre</th><th>Length</th>
       <th>Year</th><th>Rating</th><th>Favourite</th><th></th></tr>`
    );
    list.forEach((song, index) => {
      table.insertAdjacentHTML(
        "beforeend",
        `<tr><td>${index + 1}</td><td>${song.title}</td><td>${song.artist}</td><td>${song.genre}</td>
         <td>${song.length}</td><td>${song.year}</td><td>${makeStars(song.rating)}</td>
         <td>${song.favourite ? "Yes" : "No"}</td>
         <td><button data-id="${song.id}">Delete</button></td></tr>`
      );
    });
  }
};

displaySongs(songs);

// Works out the numbers under the table
const updateStats = () => {
  let totalSeconds = 0;
  let totalRating = 0;
  let favourites = 0;

  songs.forEach((song) => {
    totalSeconds += toSeconds(song.length);
    totalRating += song.rating;
    if (song.favourite === true) {
      favourites++;
    }
  });

  document.querySelector("#totalSongs").textContent = songs.length;
  document.querySelector("#totalTime").textContent = formatTime(totalSeconds);
  document.querySelector("#totalFavs").textContent = favourites;

  if (songs.length > 0) {
    document.querySelector("#avgRating").textContent =
      `${(totalRating / songs.length).toFixed(1)} / 5`;
  } else {
    document.querySelector("#avgRating").textContent = "0 / 5";
  }
};

updateStats();

// Delete a song
table.addEventListener("click", (evt) => {
  if (evt.target.matches("button")) {
    let deleteRec = songs.findIndex((song) => song.id === parseInt(evt.target.dataset.id));

    if (confirm(`Delete ${songs[deleteRec].title}?`)) {
      songs.splice(deleteRec, 1);
      saveSongs();
      displaySongs(songs);
      updateStats();
    }
  }
});

// Open and close the Add a Song dialog
const dialog = document.querySelector("dialog");
const songForm = document.querySelector("#songForm");

// The next id is 1 more than the biggest id so far
let nextId = 1;
songs.forEach((song) => {
  if (song.id >= nextId) {
    nextId = song.id + 1;
  }
});

document.querySelector("#toggle").addEventListener("click", () => {
  dialog.showModal();
});

document.querySelector("#close").addEventListener("click", () => {
  dialog.close();
});

// Add a song
const addSong = () => {
  let length = songForm.elements.songLength.value;
  let year = parseInt(songForm.elements.year.value);

  if (!length.includes(":")) {
    alert("Please enter the length like 3:45");
  } else if (year > new Date().getFullYear()) {
    alert("The year can't be in the future");
  } else {
    const newSong = {
      id: nextId,
      title: capitalise(songForm.elements.songTitle.value),
      artist: capitalise(songForm.elements.artist.value),
      genre: songForm.elements.genre.value,
      length: length,
      year: year,
      rating: parseInt(songForm.elements.rating.value),
      favourite: songForm.elements.favourite.checked,
    };

    nextId++;
    songs.push(newSong);
    saveSongs();

    displaySongs(songs);
    updateStats();

    songForm.reset();
    dialog.close();
  }
};

songForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addSong();
});

// Search by title or artist
const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let term = searchForm.elements.search.value.toLowerCase();

  const results = songs.filter((song) =>
    song.title.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term));

  displaySongs(results);
});

// Show every song again
document.querySelector("#showAll").addEventListener("click", () => {
  searchForm.reset();
  displaySongs(songs);
});

// Filter by genre
const genreFilter = document.querySelector("#genreFilter");

genreFilter.addEventListener("change", () => {
  let genre = genreFilter.value;

  if (genre === "All") {
    displaySongs(songs);
  } else {
    const matches = songs.filter((song) => song.genre === genre);
    displaySongs(matches);
  }
});
