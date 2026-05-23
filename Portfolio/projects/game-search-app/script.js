const games = [
  {
    title: "Elden Ring",
    genre: "Action RPG",
    platform: "PC, PlayStation, Xbox",
    rating: "9.5"
  },
  {
    title: "Diablo IV",
    genre: "Action RPG",
    platform: "PC, PlayStation, Xbox",
    rating: "8.8"
  },
  {
    title: "Path of Exile",
    genre: "Action RPG",
    platform: "PC, PlayStation, Xbox",
    rating: "9.0"
  },
  {
    title: "Halo Infinite",
    genre: "Shooter",
    platform: "PC, Xbox",
    rating: "8.0"
  },
  {
    title: "Forza Horizon 5",
    genre: "Racing",
    platform: "PC, Xbox",
    rating: "9.2"
  },
  {
    title: "Age of Empires IV",
    genre: "Strategy",
    platform: "PC",
    rating: "8.5"
  }
];

const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const gameGrid = document.getElementById("gameGrid");
const resultCount = document.getElementById("resultCount");

function displayGames(gameList) {
  gameGrid.innerHTML = "";

  if (gameList.length === 0) {
    gameGrid.innerHTML = `
      <div class="no-results">
        <h2>No games found</h2>
        <p>Try searching for another title or changing the genre filter.</p>
      </div>
    `;

    resultCount.textContent = "Showing 0 games";
    return;
  }

  gameList.forEach(function (game) {
    const gameCard = document.createElement("article");
    gameCard.className = "game-card";

    gameCard.innerHTML = `
      <div class="game-image">${game.genre}</div>
      <div class="game-content">
        <h2>${game.title}</h2>
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p><strong>Rating:</strong> ${game.rating}/10</p>
        <span class="badge">${game.genre}</span>
      </div>
    `;

    gameGrid.appendChild(gameCard);
  });

  resultCount.textContent = `Showing ${gameList.length} game(s)`;
}

function filterGames() {
  const searchText = searchInput.value.toLowerCase();
  const selectedGenre = genreFilter.value;

  const filteredGames = games.filter(function (game) {
    const matchesSearch = game.title.toLowerCase().includes(searchText);
    const matchesGenre = selectedGenre === "all" || game.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  displayGames(filteredGames);
}

searchInput.addEventListener("input", filterGames);
genreFilter.addEventListener("change", filterGames);

displayGames(games);