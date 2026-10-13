/**
 * Nexus Unblocked - Pure JavaScript Core Application
 * Runs directly in any browser (GitHub Pages, local static server, or Vite)
 * No build tools required!
 */

// Default Games Catalog
const DEFAULT_GAMES = [
  {
    id: "snake",
    title: "Retro Snake",
    category: "Arcade",
    description: "The timeless arcade classic remastered in neon green. Slither around the grid, consume glowing power apples, and grow your tail while evading perimeter boundaries and self-collision.",
    iframeUrl: "./games/snake.html",
    embedHtml: '<iframe src="./games/snake.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    thumbnailEmoji: "🐍",
    accentColor: "emerald",
    controls: [
      "Arrow Keys / WASD - Slither & Change Direction",
      "Space - Pause / Resume Game"
    ],
    tags: ["Arcade", "Retro", "Classic", "Highscore"],
    featured: true,
    rating: 4.9,
    plays: 24800
  },
  {
    id: "2048",
    title: "2048 Neon Edition",
    category: "Puzzle",
    description: "Slide matching numbers together to synthesize larger blocks. Plan tactical shifts and merge tiles systematically until you reach the elusive 2048 crown block.",
    iframeUrl: "./games/2048.html",
    embedHtml: '<iframe src="./games/2048.html" width="100%" height="600" frameborder="0" allow="fullscreen" allowfullscreen></iframe>',
    thumbnailEmoji: "🔢",
    accentColor: "amber",
    controls: [
      "Arrow Keys / WASD - Slide Grid Tiles",
      "Touch Screen - Swipe to Shift Numbers",
      "Undo Button - Revert Previous Shift"
    ],
    tags: ["Puzzle", "Math", "Brain", "Strategy"],
    featured: true,
    rating: 4.8,
    plays: 19450
  },
  {
    id: "tetris",
    title: "Block Drop (Tetris)",
    category: "Retro",
    description: "Drop, rotate, and pack seven geometric tetromino formations into complete rows. Clear multiple lines simultaneously for score multipliers and level up your drop speed.",
    iframeUrl: "./games/tetris.html",
    embedHtml: '<iframe src="./games/tetris.html" width="100%" height="600" frameborder="0" allow="fullscreen" allowfullscreen></iframe>',
    thumbnailEmoji: "🧱",
    accentColor: "indigo",
    controls: [
      "Left / Right Arrow - Move Block",
      "Up Arrow / W - Rotate Orientation",
      "Down Arrow - Soft Drop",
      "Spacebar - Instant Hard Drop",
      "P - Toggle Pause"
    ],
    tags: ["Retro", "Arcade", "Blocks", "Classic"],
    featured: true,
    rating: 4.9,
    plays: 31200
  },
  {
    id: "flappy",
    title: "Neon Flappy Bird",
    category: "Arcade",
    description: "Tap your wings against gravity and weave through dense electrical conduits. Precision timing and micro-adjustments are critical to set world-class high scores.",
    iframeUrl: "./games/flappy.html",
    embedHtml: '<iframe src="./games/flappy.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    thumbnailEmoji: "🐥",
    accentColor: "sky",
    controls: [
      "Spacebar / Click / Screen Tap - Flap Wings"
    ],
    tags: ["Arcade", "Endless", "Reflex", "Physics"],
    featured: true,
    rating: 4.7,
    plays: 17890
  },
  {
    id: "pong",
    title: "Cyber Neon Pong",
    category: "Sports",
    description: "High-octane neon cyber table tennis. Compete against an adaptive computer opponent or grab a friend on the same keyboard for intense 2-player split rallies.",
    iframeUrl: "./games/pong.html",
    embedHtml: '<iframe src="./games/pong.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    thumbnailEmoji: "🏓",
    accentColor: "violet",
    controls: [
      "Player 1: W (Up) / S (Down)",
      "Player 2: Up Arrow / Down Arrow",
      "First player to 7 points secures victory"
    ],
    tags: ["Sports", "2-Player", "Arcade", "Retro"],
    featured: false,
    rating: 4.8,
    plays: 14200
  },
  {
    "id": "breakout",
    "title": "Neon Brick Breaker",
    "category": "Arcade",
    "description": "Pilot your energy paddle to rebound ballistic plasma spheres against multilayered brick walls. Angle each deflection carefully to shatter the entire perimeter.",
    "iframeUrl": "./games/breakout.html",
    "embedHtml": '<iframe src="./games/breakout.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    "thumbnailEmoji": "⚡",
    "accentColor": "cyan",
    "controls": [
      "Mouse Cursor / Touch Drag - Steer Paddle",
      "Left & Right Arrow Keys - Keyboard Paddle Controls"
    ],
    "tags": ["Arcade", "Breakout", "Action", "Classic"],
    "featured": false,
    "rating": 4.8,
    "plays": 16400
  },
  {
    id: "space-invaders",
    title: "Space Defender 1982",
    category: "Action",
    description: "Defend humanity's frontier against relentless alien mothership squadrons. Dodge incoming plasma shells, time your laser bursts, and intercept mystery flagships.",
    iframeUrl: "./games/space-invaders.html",
    embedHtml: '<iframe src="./games/space-invaders.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    thumbnailEmoji: "👾",
    accentColor: "purple",
    controls: [
      "Left & Right Arrow / A & D - Steer Starship",
      "Spacebar - Fire Plasma Cannons"
    ],
    tags: ["Action", "Shooter", "Retro", "Space"],
    featured: true,
    rating: 4.9,
    plays: 22100
  },
  {
    id: "dino",
    title: "T-Rex Desert Runner",
    category: "Action",
    description: "The beloved offline desert survival sprint upgraded with smooth neon night modes. Leap over prickly saguaro cacti and duck underneath swooping pterodactyls.",
    iframeUrl: "./games/dino.html",
    embedHtml: '<iframe src="./games/dino.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    thumbnailEmoji: "🦖",
    accentColor: "orange",
    controls: [
      "Spacebar / Up Arrow / Screen Tap - Jump",
      "Down Arrow - Crouch & Fast Dive"
    ],
    tags: ["Action", "Endless", "Runner", "Offline"],
    featured: false,
    rating: 4.7,
    plays: 28900
  },
  {
    id: "racing",
    title: "Turbo Highway Racer",
    category: "Action",
    description: "High-speed lane-switching racing simulator. Weave through heavy commuter rush hour traffic, test your reflexes, and monitor your speedometer at 140+ MPH.",
    iframeUrl: "./games/retro-racing.html",
    embedHtml: '<iframe src="./games/retro-racing.html" width="100%" height="600" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>',
    thumbnailEmoji: "🏎️",
    accentColor: "rose",
    controls: [
      "Left & Right Arrow / A & D - Switch Lanes",
      "Up Arrow / W - Accelerate Throttle",
      "Down Arrow / S - Apply Brakes"
    ],
    tags: ["Action", "Racing", "Cars", "Speed"],
    featured: false,
    rating: 4.8,
    plays: 18300
  },
  {
    id: "minesweeper",
    title: "Retro Minesweeper",
    category: "Puzzle",
    description: "Strategic grid reconnaissance. Use numerical adjacency clues to deduce where explosive landmines are buried while flagging hazardous sectors.",
    iframeUrl: "./games/minesweeper.html",
    embedHtml: '<iframe src="./games/minesweeper.html" width="100%" height="600" frameborder="0" allow="fullscreen" allowfullscreen></iframe>',
    thumbnailEmoji: "💣",
    accentColor: "slate",
    controls: [
      "Left Click - Reveal Sector / Dig",
      "Right Click - Plant Caution Flag",
      "Smiley Icon - Reset Field"
    ],
    tags: ["Puzzle", "Logic", "Strategy", "Classic"],
    featured: false,
    rating: 4.7,
    plays: 12700
  },
  {
    id: "connect4",
    title: "Connect Four Tactical",
    category: "Puzzle",
    description: "Drop colored counters into a vertical seven-column grid. Outsmart the heuristic computer algorithm or a friend by lining up four matching discs before your opponent.",
    iframeUrl: "./games/connect4.html",
    embedHtml: '<iframe src="./games/connect4.html" width="100%" height="600" frameborder="0" allow="fullscreen" allowfullscreen></iframe>',
    thumbnailEmoji: "🔴",
    accentColor: "blue",
    controls: [
      "Click Column - Drop Player Disc",
      "Toggle Mode - Switch between vs Computer or 2-Player Local"
    ],
    tags: ["Puzzle", "Board Game", "2-Player", "Strategy"],
    featured: false,
    rating: 4.8,
    plays: 15100
  }
];

// Cloak Disguise Profiles
const CLOAK_PROFILES = [
  { id: 'classroom', name: 'Google Classroom', title: 'Classes', favicon: 'https://ssl.gstatic.com/classroom/favicon.png' },
  { id: 'drive', name: 'Google Drive', title: 'My Drive - Google Drive', favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
  { id: 'docs', name: 'Google Docs', title: 'Untitled document - Google Docs', favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
  { id: 'canvas', name: 'Canvas LMS', title: 'Dashboard | Canvas', favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico' },
  { id: 'wikipedia', name: 'Wikipedia', title: 'Wikipedia, the free encyclopedia', favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico' },
];

const CATEGORIES = ['All', 'Arcade', 'Puzzle', 'Action', 'Retro', 'Sports', 'Favorites'];

// State
let games = [];
let favorites = [];
let activeCategory = 'All';
let searchQuery = '';
let sortBy = 'popular';
let activeGame = null;
let panicKey = ']';
let panicUrl = 'https://classroom.google.com';
let activeCloakId = '';
let isCinemaMode = false;

// Initialize State from Storage
function init() {
  try {
    const savedGames = localStorage.getItem('nexus_unblocked_games_v1');
    games = savedGames ? JSON.parse(savedGames) : DEFAULT_GAMES;
  } catch (e) {
    games = DEFAULT_GAMES;
  }

  try {
    const savedFavs = localStorage.getItem('nexus_unblocked_favs_v1');
    favorites = savedFavs ? JSON.parse(savedFavs) : ['snake', 'tetris'];
  } catch (e) {
    favorites = ['snake', 'tetris'];
  }

  panicKey = localStorage.getItem('nexus_unblocked_panic_key_v1') || ']';
  panicUrl = localStorage.getItem('nexus_unblocked_panic_url_v1') || 'https://classroom.google.com';
  activeCloakId = localStorage.getItem('nexus_unblocked_cloak_v1') || '';

  applyCloak(activeCloakId);
  setupEventListeners();
  render();
}

// URL Helper (ensure relative path for GitHub Pages)
function normalizeUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/games/')) return '.' + url;
  return url;
}

// Cloak Application
function applyCloak(profileId) {
  activeCloakId = profileId;
  const profile = CLOAK_PROFILES.find(p => p.id === profileId);
  let faviconEl = document.querySelector("link[rel*='icon']");
  if (!faviconEl) {
    faviconEl = document.createElement('link');
    faviconEl.rel = 'icon';
    document.head.appendChild(faviconEl);
  }

  if (profile) {
    document.title = profile.title;
    faviconEl.href = profile.favicon;
    localStorage.setItem('nexus_unblocked_cloak_v1', profile.id);
  } else {
    document.title = 'Nexus Unblocked - HTML5 Games Hub';
    faviconEl.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M6 11h4V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H6a1 1 0 0 1 0-2z'/></svg>";
    localStorage.removeItem('nexus_unblocked_cloak_v1');
  }
}

// Render Core UI
function render() {
  renderHeader();
  renderHero();
  renderCategoryTabs();
  renderGamesGrid();
}

function renderHeader() {
  const panicBtn = document.getElementById('panicBtnText');
  if (panicBtn) panicBtn.textContent = `Panic [${panicKey}]`;

  const favBtn = document.getElementById('favCountText');
  if (favBtn) favBtn.textContent = `Saved (${favorites.length})`;
}

function renderHero() {
  const heroEl = document.getElementById('heroBanner');
  if (!heroEl) return;

  // Show hero banner only on 'All' tab with empty search
  if (activeCategory !== 'All' || searchQuery.trim() !== '') {
    heroEl.style.display = 'none';
    return;
  }

  const featured = games.find(g => g.featured) || games[0];
  if (!featured) {
    heroEl.style.display = 'none';
    return;
  }

  heroEl.style.display = 'flex';
  heroEl.innerHTML = `
    <div>
      <div class="hero-meta">
        <span class="hero-tag">🔥 FEATURED UNBLOCKED</span>
        <span>·</span>
        <span>${featured.category}</span>
        <span>·</span>
        <span>⭐ ${Number(featured.rating).toFixed(1)}</span>
        <span>·</span>
        <span>${Number(featured.plays).toLocaleString()} plays</span>
      </div>
      <h2 class="hero-title">${featured.title}</h2>
      <p class="hero-desc">${featured.description}</p>
      <div class="hero-controls">
        ${(featured.controls || []).slice(0, 2).map(c => `<span class="control-badge">${c}</span>`).join('')}
      </div>
    </div>
    <div class="hero-side">
      <div class="hero-thumb">${featured.thumbnailEmoji}</div>
      <button class="btn-play-hero" onclick="playGame('${featured.id}')">
        <span>▶</span> PLAY NOW
      </button>
    </div>
  `;
}

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;

  // Compute counts
  const counts = { All: games.length, Favorites: favorites.length };
  games.forEach(g => {
    counts[g.category] = (counts[g.category] || 0) + 1;
  });

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = activeCategory === cat;
    const count = counts[cat] || 0;
    const starIcon = cat === 'Favorites' ? '★ ' : '';
    return `
      <button class="cat-btn ${isActive ? 'active' : ''}" onclick="setCategory('${cat}')">
        <span>${starIcon}${cat}</span>
        <span class="cat-count">${count}</span>
      </button>
    `;
  }).join('');
}

function renderGamesGrid() {
  const grid = document.getElementById('gamesGrid');
  const countMsg = document.getElementById('searchCountMsg');
  if (!grid) return;

  // Filter
  let filtered = games.filter(g => {
    if (activeCategory === 'Favorites') {
      if (!favorites.includes(g.id)) return false;
    } else if (activeCategory !== 'All' && g.category !== activeCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = (g.description || '').toLowerCase().includes(q);
      const matchCat = (g.category || '').toLowerCase().includes(q);
      const matchTags = (g.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'popular') return b.plays - a.plays;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  if (countMsg) {
    if (searchQuery.trim()) {
      countMsg.style.display = 'block';
      countMsg.innerHTML = `Showing results for "<strong>${searchQuery}</strong>" (${filtered.length} games found)`;
    } else {
      countMsg.style.display = 'none';
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(15,23,42,0.4); border-radius: 16px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 40px; margin-bottom: 12px;">🎮</div>
        <h3 style="font-size: 18px; color: #fff; margin-bottom: 6px;">No games found</h3>
        <p style="font-size: 13px; color: var(--text-dim); max-width: 360px; margin: 0 auto 16px auto;">
          ${activeCategory === 'Favorites' ? "You haven't bookmarked any games yet. Click the star on any card to save it!" : "No games match your search. Try adjusting the query or add a custom game."}
        </p>
        <button class="btn-action btn-primary" onclick="${activeCategory === 'Favorites' ? "setCategory('All')" : "openModal('addGameModal')"}">
          ${activeCategory === 'Favorites' ? 'Browse All Games' : '+ Add Custom Game'}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(game => {
    const isFav = favorites.includes(game.id);
    const playsFormatted = game.plays > 1000 ? (game.plays / 1000).toFixed(1) + 'k' : game.plays;

    return `
      <div class="game-card" onclick="playGame('${game.id}')">
        <div class="card-thumb">
          <span>${game.thumbnailEmoji}</span>
          <button class="btn-card-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${game.id}')" title="Save Favorite">
            ${isFav ? '★' : '☆'}
          </button>
          ${game.isCustom ? `<span style="position: absolute; top: 10px; left: 10px; background: rgba(13,148,136,0.8); color: #fff; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Custom</span>` : ''}
        </div>
        <div class="card-body">
          <div>
            <div class="card-meta">
              <span class="card-cat">${game.category}</span>
              <span>·</span>
              <span class="card-rating">★ ${Number(game.rating).toFixed(1)}</span>
              <span>·</span>
              <span>${playsFormatted} plays</span>
            </div>
            <h4 class="card-title">${game.title}</h4>
            <p class="card-desc">${game.description}</p>
          </div>
          <div class="card-footer">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px;">
              ${game.controls?.[0] || 'Interactive Controls'}
            </span>
            <span class="card-play-txt">PLAY →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Play Game in Theater Modal
window.playGame = function(gameId) {
  const game = games.find(g => g.id === gameId);
  if (!game) return;

  activeGame = game;
  game.plays = (game.plays || 0) + 1;
  saveGames(games, false);

  const modal = document.getElementById('theaterModal');
  const container = document.getElementById('theaterContainer');
  const title = document.getElementById('theaterTitle');
  const cat = document.getElementById('theaterCat');
  const rating = document.getElementById('theaterRating');
  const plays = document.getElementById('theaterPlays');
  const emoji = document.getElementById('theaterEmoji');
  const iframe = document.getElementById('gameIframe');
  const desc = document.getElementById('theaterDesc');
  const controlsList = document.getElementById('theaterControls');
  const tagsList = document.getElementById('theaterTags');
  const favBtn = document.getElementById('theaterFavBtn');
  const directLink = document.getElementById('theaterDirectLink');

  const resolved = normalizeUrl(game.iframeUrl);

  if (title) title.textContent = game.title;
  if (cat) cat.textContent = game.category;
  if (rating) rating.textContent = `★ ${Number(game.rating).toFixed(1)}`;
  if (plays) plays.textContent = `${Number(game.plays).toLocaleString()} plays`;
  if (emoji) emoji.textContent = game.thumbnailEmoji;
  if (desc) desc.textContent = game.description;
  if (directLink) directLink.href = resolved;

  if (favBtn) {
    favBtn.textContent = favorites.includes(game.id) ? '★ Favorited' : '☆ Favorite';
  }

  if (controlsList) {
    controlsList.innerHTML = (game.controls || []).map(c => `<li>▸ ${c}</li>`).join('');
  }

  if (tagsList) {
    tagsList.innerHTML = (game.tags || []).map(t => `<span class="control-badge">#${t}</span>`).join(' ');
  }

  // Load iframe
  if (iframe) {
    iframe.src = resolved;
  }

  // Render related games
  const relatedEl = document.getElementById('theaterRelated');
  if (relatedEl) {
    const related = games.filter(g => g.id !== game.id && (g.category === game.category || g.featured)).slice(0, 4);
    relatedEl.innerHTML = related.map(rel => `
      <div onclick="playGame('${rel.id}')" style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #020617; border: 1px solid var(--border-subtle); border-radius: 8px; cursor: pointer;">
        <span style="font-size: 20px;">${rel.thumbnailEmoji}</span>
        <div style="overflow: hidden;">
          <div style="font-size: 12px; font-weight: 700; color: #fff; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${rel.title}</div>
          <div style="font-size: 10px; color: var(--text-dim);">${rel.category}</div>
        </div>
      </div>
    `).join('');
  }

  if (modal) modal.classList.add('open');
};

window.closeTheater = function() {
  const modal = document.getElementById('theaterModal');
  const iframe = document.getElementById('gameIframe');
  if (modal) modal.classList.remove('open');
  if (iframe) iframe.src = 'about:blank'; // stop audio/game loop
  activeGame = null;
};

window.reloadGame = function() {
  const iframe = document.getElementById('gameIframe');
  if (iframe && activeGame) {
    iframe.src = normalizeUrl(activeGame.iframeUrl);
  }
};

window.toggleCinemaMode = function() {
  const container = document.getElementById('theaterContainer');
  if (!container) return;
  isCinemaMode = !isCinemaMode;
  container.classList.toggle('cinema', isCinemaMode);
};

window.toggleFullscreen = function() {
  const box = document.getElementById('theaterIframeBox');
  if (!box) return;
  if (!document.fullscreenElement) {
    box.requestFullscreen().catch(console.error);
  } else {
    document.exitFullscreen().catch(console.error);
  }
};

window.toggleTheaterFav = function() {
  if (!activeGame) return;
  toggleFavorite(null, activeGame.id);
  const favBtn = document.getElementById('theaterFavBtn');
  if (favBtn) {
    favBtn.textContent = favorites.includes(activeGame.id) ? '★ Favorited' : '☆ Favorite';
  }
};

// Filter & Sort Setters
window.setCategory = function(cat) {
  activeCategory = cat;
  render();
};

window.toggleFavorite = function(e, gameId) {
  if (e) e.stopPropagation();
  if (favorites.includes(gameId)) {
    favorites = favorites.filter(id => id !== gameId);
  } else {
    favorites.push(gameId);
  }
  try {
    localStorage.setItem('nexus_unblocked_favs_v1', JSON.stringify(favorites));
  } catch (err) {}
  render();
};

function saveGames(newGames, reRender = true) {
  games = newGames;
  try {
    localStorage.setItem('nexus_unblocked_games_v1', JSON.stringify(games));
  } catch (err) {}
  if (reRender) render();
}

// Modal open/close helpers
window.openModal = function(id) {
  const el = document.getElementById(id);
  if (!el) return;

  if (id === 'jsonModal') {
    const editor = document.getElementById('jsonEditor');
    if (editor) editor.value = JSON.stringify(games, null, 2);
  } else if (id === 'panicModal') {
    const keyInput = document.getElementById('panicKeyInput');
    const urlInput = document.getElementById('panicUrlInput');
    if (keyInput) keyInput.value = panicKey;
    if (urlInput) urlInput.value = panicUrl;
  } else if (id === 'cloakModal') {
    renderCloakList();
  }

  el.classList.add('open');
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
};

// Cloak Modal
function renderCloakList() {
  const list = document.getElementById('cloakList');
  if (!list) return;

  list.innerHTML = CLOAK_PROFILES.map(prof => {
    const isCur = activeCloakId === prof.id;
    return `
      <div onclick="selectCloak('${prof.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #020617; border: 1px solid ${isCur ? 'var(--primary)' : 'var(--border-subtle)'}; border-radius: 10px; cursor: pointer; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${prof.favicon}" alt="${prof.name}" style="width: 20px; height: 20px; object-fit: contain;" onerror="this.style.display='none'">
          <div>
            <div style="font-size: 13px; font-weight: 700; color: #fff;">${prof.name}</div>
            <div style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">${prof.title}</div>
          </div>
        </div>
        ${isCur ? '<span style="color: var(--primary); font-weight: bold;">✓ Active</span>' : ''}
      </div>
    `;
  }).join('');
}

window.selectCloak = function(id) {
  applyCloak(id);
  closeModal('cloakModal');
};

window.resetCloak = function() {
  applyCloak('');
  closeModal('cloakModal');
};

// Panic Key
window.savePanicConfig = function() {
  const keyInput = document.getElementById('panicKeyInput');
  const urlInput = document.getElementById('panicUrlInput');

  if (keyInput) {
    panicKey = keyInput.value.trim() || ']';
    localStorage.setItem('nexus_unblocked_panic_key_v1', panicKey);
  }
  if (urlInput) {
    panicUrl = urlInput.value.trim() || 'https://classroom.google.com';
    localStorage.setItem('nexus_unblocked_panic_url_v1', panicUrl);
  }
  renderHeader();
  closeModal('panicModal');
};

window.testPanicRedirect = function() {
  window.location.href = panicUrl;
};

// JSON Manager
window.formatJson = function() {
  const editor = document.getElementById('jsonEditor');
  if (!editor) return;
  try {
    const parsed = JSON.parse(editor.value);
    editor.value = JSON.stringify(parsed, null, 2);
  } catch (e) {
    alert('Invalid JSON syntax: ' + e.message);
  }
};

window.saveJsonChanges = function() {
  const editor = document.getElementById('jsonEditor');
  if (!editor) return;
  try {
    const parsed = JSON.parse(editor.value);
    if (!Array.isArray(parsed)) throw new Error('Root element must be an array of games [ ... ]');
    saveGames(parsed);
    closeModal('jsonModal');
    alert('games.json saved successfully!');
  } catch (e) {
    alert('Error saving JSON: ' + e.message);
  }
};

window.downloadJsonFile = function() {
  const data = JSON.stringify(games, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'games.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.resetCatalog = function() {
  if (confirm('Reset entire games catalog back to factory defaults?')) {
    saveGames(DEFAULT_GAMES);
    closeModal('jsonModal');
  }
};

// Add Game Form
window.submitAddGame = function(e) {
  e.preventDefault();
  const title = document.getElementById('addTitle').value.trim();
  let iframe = document.getElementById('addIframe').value.trim();
  const cat = document.getElementById('addCategory').value;
  const desc = document.getElementById('addDesc').value.trim();
  const emoji = document.getElementById('addEmoji').value.trim() || '🎮';
  const controls = document.getElementById('addControls').value.trim();

  if (!title || !iframe) {
    alert('Please provide title and iframe URL.');
    return;
  }

  // extract src if user pasted <iframe ...>
  if (iframe.includes('<iframe') && iframe.includes('src=')) {
    const match = iframe.match(/src=["']([^"']+)["']/);
    if (match && match[1]) iframe = match[1];
  }

  const newGame = {
    id: 'custom-' + Date.now().toString(36),
    title,
    category: cat,
    description: desc || 'Custom game loaded via iframe JSON.',
    iframeUrl: iframe,
    embedHtml: `<iframe src="${iframe}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`,
    thumbnailEmoji: emoji,
    controls: controls ? controls.split(',').map(s => s.trim()) : ['Interactive Controls'],
    tags: ['Custom', 'Unblocked'],
    rating: 5.0,
    plays: 1,
    isCustom: true,
    featured: false
  };

  saveGames([newGame, ...games]);
  closeModal('addGameModal');
  e.target.reset();
  alert(`"${title}" added to games.json!`);
};

// Global Event Listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      render();
    });
  }

  // Global Keys (Panic Boss Key & Search Focus)
  window.addEventListener('keydown', (e) => {
    const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

    if (e.key === panicKey && !isInput) {
      e.preventDefault();
      window.location.href = panicUrl;
      return;
    }

    if (e.key === '/' && !isInput && !activeGame) {
      e.preventDefault();
      searchInput?.focus();
      return;
    }

    if (e.key === 'Escape') {
      if (activeGame) closeTheater();
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });

  // Modal backdrop click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        if (modal.id === 'theaterModal') closeTheater();
      }
    });
  });
}

// Start
document.addEventListener('DOMContentLoaded', init);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
}
