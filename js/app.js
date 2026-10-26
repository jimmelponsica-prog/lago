/* Inkwell Shelf: app.js
   Features:
   1. Light / dark theme (remembered)
   2. Search, genre filter, and sorting on the home page
   3. Surprise me: opens a random story
   4. Details dialog for each story
   5. Likes (remembered)
   6. Story reader: synopsis toggle, text size control, reading progress
   7. Previous and next story navigation
*/

(function () {
  "use strict";

  // [title, author, genre, synopsis, chapter, paragraph 1, paragraph 2]
  const BOOKS = [
    ["The Glass Orchard", "Elena Marsh", "Fantasy", "In a valley where fruit grows on glass branches, a gardener learns that every harvest takes a memory.", "Chapter One: First Frost", "Mira tended the orchard every morning, polishing the glass pears until they caught the sunrise.", "The day she picked a pear and forgot her mother's voice, she understood the price, and she set out to buy the memories back."],
    ["Crown of Brine", "Tobias Quaye", "Fantasy", "A sea princess trades her voice for legs, but the ocean has already sent a bill for the deal.", "Chapter One: The Silent Shore", "Ysolde walked onto the sand with bare feet and no words, watched by a crowd of gulls and one very suspicious crab.", "When the tide began to rise over the village, she realized the sea wanted her voice back, and it would take the town too."],
    ["The Wind Cartographer", "Dana Okafor", "Fantasy", "A mapmaker charts winds that blow only once a year, and this year one of them is missing.", "Chapter One: Northerly Ink", "Sela inked the wind routes onto parchment each spring, following the threads that the old maps had forgotten.", "This autumn the northern wind never came, and the village's sails hung limp, so Sela packed her compass and went looking for it."],
    ["Nine Keys, No Door", "Sol Vantrell", "Mystery", "A locksmith is hired to open a wooden box that was never locked in the first place.", "Chapter One: The Unlocked Box", "Hollis Grey had opened safes, lockets, and one very stubborn piano, so the request to open a plain box seemed too easy.", "Inside the box were nine brass keys, each tagged with a name from the town, and a single note: the door is one of them."],
    ["The Photograph at Harbor Inn", "Lena Brisco", "Mystery", "A tourist finds a photo of herself checking into an inn, dated ten years before she was born.", "Chapter One: The Guest Book", "Nadia found the photograph tucked inside a library book about lighthouses, face up and very recent.", "In the photo she stood at the inn's front desk, holding a suitcase with her name on the tag, and the clerk was smiling at her like an old friend."],
    ["The Night the Lanterns Went Out", "Marco Diaz", "Mystery", "Every lantern in the village vanishes on the night of the harvest festival, and the mayor insists nothing happened.", "Chapter One: Lights Out", "Pilar counted forty-two lanterns on the way to the square, and by the time the bells rang there were none left.", "The only clue was a trail of wax drops leading to the old clock tower, where someone had been writing names on the stones."],
    ["Rain Check", "Jamie Lou Park", "Romance", "Two strangers share an umbrella on a rainy bus route and agree to meet again at the same stop next week.", "Chapter One: Shared Umbrella", "Eli had forgotten his umbrella, and the girl beside him at the bus stop offered half of hers without a word.", "They talked about bad coffee and worse weather for twenty minutes, then made a promise to return to the same stop, rain or shine."],
    ["Cherry Blossom Deadline", "Hana Ito", "Romance", "A wedding planner and a grumpy photographer must work together on the most important wedding of the spring.", "Chapter One: Bad First Impressions", "Aiko had three weeks to plan the wedding of the year, and the photographer she was assigned had already insulted her camera bag.", "By the time the blossoms began to fall, they had quarreled, reconciled, and discovered that they wanted the same thing for the couple."],
    ["Letters in Winter", "Anika Rao", "Romance", "Pen pals who have only ever written to each other finally agree to meet at a train station in the snow.", "Chapter One: The Platform", "Priya had written to Sam for six years and never once seen his handwriting change, which made her certain he was the one.", "On the platform she recognized his green scarf from the photo he had described, and for the first time the letters felt like a beginning."],
    ["Colony Seven Is Singing", "Priya Nair", "Science Fiction", "A colony ship's communication officer hears a song coming from the sealed cargo hold.", "Chapter One: Frequencies", "Tara was checking the ship's signal logs when she noticed a faint melody moving through the hull, too steady to be static.", "She traced it to the cargo hold, where a hundred sealed containers were humming in harmony, and the song was getting louder."],
    ["The Last Starship Librarian", "Kofi Mensah", "Science Fiction", "On a generation ship with no books left, one librarian decides to recreate the library from memory.", "Chapter One: Shelf Zero", "Ama had been appointed librarian of the Arcadia by accident, when the last of the paper books crumbled to dust in a leaky vault.", "She began writing the titles back down, one page at a time, and every crew member who visited brought a book they remembered."],
    ["Orbit of Small Things", "Ren Takeda", "Science Fiction", "A repair technician on a space station discovers that a tiny robot has been fixing things nobody asked it to fix.", "Chapter One: Unassigned Task", "Kenji expected the maintenance log to show ordinary faults, but at the bottom of the list a small robot had logged a repair of a crooked plant.", "He followed the robot through the station for a day and found that it had been mending chipped mugs, loose cables, and one broken heart."],
    ["The Doll Under the Stairs", "Ellis Vance", "Horror", "A family finds a porcelain doll beneath the staircase of their new home, and it is always facing the door.", "Chapter One: Turned Around", "The Morales family moved in on a Friday, and by Sunday their youngest daughter insisted the doll had turned to face the door.", "Every night the doll was a little closer to the stairs, and every morning the family pretended not to notice the scratches on the floor."],
    ["Do Not Answer the Pager", "Olive Moreno", "Horror", "A night-shift nurse keeps receiving pages from a hospital ward that was closed decades ago.", "Chapter One: Code Blue", "Rosa clipped the pager to her scrubs on her first night shift, expecting the usual calls from the emergency room.", "At 3:14 a.m. the pager buzzed with a ward number that no longer existed, followed by a message that read: room four needs you now."],
    ["The Lighthouse Has Nine Floors", "Caspian Hale", "Horror", "A lighthouse keeper counts eight floors every night, but the ninth keeps appearing at the top of the stairs.", "Chapter One: The Ninth Floor", "Walt had kept the light for thirty years and knew every step of the iron staircase, so the extra landing made no sense to him.", "When he climbed to it, he found a door with his name carved into the wood and the sound of his own footsteps coming from behind it."],
    ["Map of Broken Stars", "Zoe Ferreira", "Adventure", "A young cartographer finds a map that shows the sky as it was a thousand years ago and sets out to match it on land.", "Chapter One: The Torn Chart", "Inez found the chart folded inside an old atlas, its constellations drawn in silver ink that still shimmered in the light.", "Following the map took her across salt flats, through a canyon of singing stone, and up to a cliff where the stars were painted on the rock."],
    ["Jungle Clock", "Amir Haddad", "Adventure", "A watchmaker's pocket clock starts ticking backward every time its owner steps into the rainforest.", "Chapter One: Reverse Time", "Samir bought the clock from a stall in the market, and it ran perfectly until he crossed the river into the jungle.", "Each step deeper into the trees turned the hands back an hour, and the guide who had led him there insisted that was the point."],
    ["The Mountain Trains", "Bea Lacson", "Adventure", "Three siblings ride a forgotten mountain railway that only runs during a full moon.", "Chapter One: Last Train Up", "The Dizon siblings found the ticket booth at the foot of the hill closed, but the bell above the platform was still ringing.", "When the train arrived with no conductor and every seat empty, they climbed aboard, and the mountain began to lean toward them."],
    ["Sunday Dinner for Two", "Ruth Ng", "Drama", "A grandmother who has not spoken to her son in years invites him to the family table, and only one plate is set.", "Chapter One: The Empty Plate", "Lola Estela set the table for two every Sunday, even though her son had not visited since his wedding.", "When he finally knocked at the door with a box of pastries, she only said that the soup was getting cold."],
    ["The Empty Chair at Table Nine", "Ivan Petrov", "Drama", "A restaurant owner keeps one chair empty for a regular customer who disappeared without a trace.", "Chapter One: Reserved", "Mateo kept table nine reserved every evening, though the man who used to sit there had not come in for six months.", "When a young waiter asked why, Mateo finally told the story of the friend who had promised to return, and what he had left behind."],
    ["Hometown Radio", "Carmen Dela Cruz", "Drama", "A small-town radio host gets one last shift before the station closes, and the listeners call in with their goodbyes.", "Chapter One: Final Broadcast", "Ben had hosted the morning show for twenty-two years, and today the phones were already ringing before the first song.", "Each caller had a story about the station, from weddings announced on air to lost dogs found, and Ben realized the town was saying goodbye to itself."],
    ["The Goat Who Ran for Mayor", "Oscar Villanueva", "Comedy", "A goat wins the village election by accident after the candidates withdraw for a very silly reason.", "Chapter One: The Campaign", "The election was supposed to be a formality, but after the mayor was caught sleeping during a council meeting, the goat was nominated as a joke.", "The goat, named Pancho, won by a landslide, and promptly started solving the town's problems by eating the paperwork."],
    ["Grandma's Smartphone Problem", "Helen Tan", "Comedy", "A grandmother accidentally joins a gaming group, a cooking channel, and a local news chat all at once.", "Chapter One: The Group Chat", "Lola Rosa wanted to send one photo of her cat to her grandson, but her thumb pressed the wrong button and sent it to forty strangers.", "By the end of the week she was a celebrity in the cooking channel, the head of a neighborhood watch, and the moderator of a chess group."],
    ["The Accidental Wedding Planner", "Rico Bautista", "Comedy", "A tech intern is asked to organize his cousin's wedding in one weekend and quickly makes every mistake possible.", "Chapter One: Seven Days", "Rico had built apps for three years and believed a wedding was just another project with a deadline and a budget.", "Within two days he had double-booked the chapel, lost the rings, and invited a brass band to play at the wrong venue."],
    ["Forty-Second Witness", "Maya Hollis", "Thriller", "A night-shift cab driver is the only witness to a crime, and she has exactly forty-two seconds to decide whether to speak.", "Chapter One: Red Light", "Dina noticed the man in the back seat because he kept checking his watch and whispering into his phone in the rain.", "At the red light a gunshot echoed from the alley, and the man looked straight at her through the mirror before the light turned green."],
    ["Blackout on Ferry Route 9", "Gabe Lorenzo", "Thriller", "During a storm blackout, a ferry passenger realizes someone on board is carrying a stolen package.", "Chapter One: Lights Out at Sea", "Marco was halfway across the bay when the engines stalled and every light on the ferry went dark at once.", "In the flicker of an emergency lamp he saw a man in a yellow raincoat open a metal case, then close it quickly when he noticed Marco watching."],
    ["The Negotiator's Last Call", "Ines Calder", "Thriller", "A crisis negotiator takes one more call before retiring, and the voice on the line knows her real name.", "Chapter One: Unknown Number", "Elena had talked down hostage takers for fifteen years, and she had promised herself this would be her final shift.", "When the unknown caller said her name in a calm, familiar voice, she realized the case she had buried years ago was finally calling her back."],
    ["The Girl Who Spun Moonlight", "Clara Wren", "Fairy Tale", "A poor spinner is asked by the queen to turn moonlight into thread, or lose her village's well.", "Chapter One: The Impossible Task", "Wrenna spun wool on a wheel that creaked in the cold, and she had never once seen the moon fall into her basket.", "That night a silver-eyed owl perched on the windowsill and offered her a bargain: a single true word in exchange for three nights of moonlight."],
    ["Seven Bells for the Frog Prince", "Tomas Ilagan", "Fairy Tale", "A frog who was once a prince rings seven bells to call for the princess who promised to free him.", "Chapter One: The Pond at Dusk", "Prince Bani had been a frog for nine years, and he was tired of waiting by the same lily pad for someone to remember him.", "When he rang the seventh bell, the wind carried the sound to the castle, where a princess who had forgotten her promise suddenly stopped in her tracks."],
    ["The Bear Who Kept the Stars", "Nadia Sol", "Fairy Tale", "A gentle bear keeps the stars safe in a lake each winter, until a curious fox steals the reflections.", "Chapter One: Lantern Lake", "Osso the bear swept the frozen lake every evening, gathering each star that fell into the water and tucking it into a wooden box.", "One night he found a fox sitting on the ice with a tail full of sparkling light, and the fox said the stars looked lonely on the shore."]
  ];

  const STORIES = BOOKS.map(function (row, index) {
    return {
      id: index + 1,
      title: row[0],
      author: row[1],
      genre: row[2],
      synopsis: row[3],
      chapter: row[4],
      text: [row[5], row[6]]
    };
  });

  const TOTAL = STORIES.length;

  /* ---------- Helpers ---------- */

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* Storage blocked: the feature still works for this visit. */
    }
  }

  function coverSrc(id) {
    return "images/covers/cover-" + pad(id) + ".jpg";
  }

  function sceneSrc(id) {
    return "images/scenes/scene-" + pad(id) + ".jpg";
  }

  /* ---------- 1. Theme ---------- */

  function setupTheme() {
    const root = document.documentElement;
    const saved = load("inkwell-theme", null);
    if (saved === "light" || saved === "dark") {
      root.dataset.theme = saved;
    }

    const buttons = $all(".theme-toggle");

    function refresh() {
      const isDark = root.dataset.theme !== "light";
      buttons.forEach(function (button) {
        button.textContent = isDark ? "Light mode" : "Dark mode";
        button.setAttribute("aria-pressed", String(isDark));
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const next = root.dataset.theme === "light" ? "dark" : "light";
        root.dataset.theme = next;
        save("inkwell-theme", next);
        refresh();
      });
    });

    refresh();
  }

  /* ---------- 5. Likes ---------- */

  function getLikes() {
    return load("inkwell-likes", []);
  }

  function toggleLike(id) {
    const likes = getLikes();
    const index = likes.indexOf(id);
    if (index === -1) {
      likes.push(id);
    } else {
      likes.splice(index, 1);
    }
    save("inkwell-likes", likes);
    return likes.indexOf(id) !== -1;
  }

  function likeLabel(liked) {
    return liked ? "Liked" : "Like";
  }

  /* ---------- 4. Details dialog ---------- */

  function setupDialog() {
    const dialog = document.getElementById("details");
    if (!dialog) return null;

    dialog.querySelector(".dialog-close").addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    return dialog;
  }

  function openDetails(dialog, story) {
    if (!dialog || !story) return;

    const cover = dialog.querySelector("img");
    cover.src = coverSrc(story.id);
    cover.alt = "Cover of " + story.title;
    dialog.querySelector(".dialog-genre").textContent = story.genre;
    dialog.querySelector(".dialog-title").textContent = story.title;
    dialog.querySelector(".dialog-author").textContent = "by " + story.author;
    dialog.querySelector(".dialog-chapter").textContent = story.chapter;
    dialog.querySelector(".dialog-synopsis").textContent = story.synopsis;
    dialog.querySelector(".dialog-read").href = "story.html?id=" + story.id;

    dialog.showModal();
  }

  /* ---------- Home page ---------- */

  function setupHome() {
    const grid = document.getElementById("grid");
    if (!grid) return;

    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    const chipBox = document.getElementById("chips");
    const surpriseBtn = document.getElementById("surprise");
    const countLabel = document.getElementById("count");
    const emptyNote = document.getElementById("empty");
    const dialog = setupDialog();

    const state = { query: "", genre: "All", sort: "title" };

    const genres = ["All"].concat(
      Array.from(new Set(STORIES.map(function (s) { return s.genre; }))).sort()
    );

    chipBox.innerHTML = genres.map(function (genre) {
      return '<button type="button" class="chip" data-genre="' + escapeHTML(genre) +
        '" aria-pressed="' + (genre === "All") + '">' + escapeHTML(genre) + "</button>";
    }).join("");

    function visibleStories() {
      const q = state.query.trim().toLowerCase();
      let list = STORIES.filter(function (s) {
        const matchesGenre = state.genre === "All" || s.genre === state.genre;
        const matchesText = !q ||
          s.title.toLowerCase().indexOf(q) !== -1 ||
          s.author.toLowerCase().indexOf(q) !== -1;
        return matchesGenre && matchesText;
      });

      if (state.sort === "title") {
        list = list.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
      } else if (state.sort === "genre") {
        list = list.slice().sort(function (a, b) {
          return a.genre.localeCompare(b.genre) || a.title.localeCompare(b.title);
        });
      } else {
        list = list.slice().sort(function (a, b) { return a.id - b.id; });
      }
      return list;
    }

    function render() {
      const likes = getLikes();
      const list = visibleStories();

      grid.innerHTML = list.map(function (s) {
        const liked = likes.indexOf(s.id) !== -1;
        return '' +
          '<article class="card">' +
            '<a class="card-cover" href="story.html?id=' + s.id + '">' +
              '<img src="' + coverSrc(s.id) + '" alt="Cover of ' + escapeHTML(s.title) +
              '" width="600" height="900" loading="lazy">' +
            '</a>' +
            '<div class="card-body">' +
              '<p class="card-genre">' + escapeHTML(s.genre) + '</p>' +
              '<h3>' + escapeHTML(s.title) + '</h3>' +
              '<p class="card-author">by ' + escapeHTML(s.author) + '</p>' +
              '<div class="card-actions">' +
                '<a class="btn" href="story.html?id=' + s.id + '">Read</a>' +
                '<button type="button" class="btn ghost" data-details="' + s.id + '">Details</button>' +
                '<button type="button" class="btn ghost like" data-like="' + s.id + '" aria-pressed="' +
                  liked + '">' + likeLabel(liked) + '</button>' +
              '</div>' +
            '</div>' +
          '</article>';
      }).join("");

      countLabel.textContent = list.length + " of " + TOTAL + " stories";
      emptyNote.hidden = list.length !== 0;
    }

    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      render();
    });

    sortSelect.addEventListener("change", function () {
      state.sort = sortSelect.value;
      render();
    });

    chipBox.addEventListener("click", function (event) {
      const chip = event.target.closest(".chip");
      if (!chip) return;
      state.genre = chip.dataset.genre;
      $all(".chip", chipBox).forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === chip));
      });
      render();
    });

    surpriseBtn.addEventListener("click", function () {
      const pick = STORIES[Math.floor(Math.random() * STORIES.length)];
      window.location.href = "story.html?id=" + pick.id;
    });

    grid.addEventListener("click", function (event) {
      const likeBtn = event.target.closest("[data-like]");
      if (likeBtn) {
        const id = Number(likeBtn.dataset.like);
        const liked = toggleLike(id);
        $all('[data-like="' + id + '"]').forEach(function (btn) {
          btn.setAttribute("aria-pressed", String(liked));
          btn.textContent = likeLabel(liked);
        });
        return;
      }

      const detailsBtn = event.target.closest("[data-details]");
      if (detailsBtn) {
        openDetails(dialog, STORIES[Number(detailsBtn.dataset.details) - 1]);
      }
    });

    render();
  }

  /* ---------- Story page ---------- */

  function setupStory() {
    const root = document.getElementById("story");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const story = STORIES[id - 1];

    if (!story) {
      root.innerHTML =
        '<div class="notice">' +
          '<h1>Story not found</h1>' +
          '<p>That story does not exist. Pick one from the shelf.</p>' +
          '<a class="btn" href="index.html#stories">Back to stories</a>' +
        '</div>';
      document.title = "Story not found | Inkwell Shelf";
      return;
    }

    document.title = story.title + " | Inkwell Shelf";

    const prev = id > 1 ? STORIES[id - 2] : null;
    const next = id < TOTAL ? STORIES[id] : null;
    const liked = getLikes().indexOf(id) !== -1;

    root.innerHTML = '' +
      '<header class="story-head">' +
        '<p class="kicker">' + escapeHTML(story.genre) + ' · Story ' + pad(id) + ' of ' + TOTAL + '</p>' +
        '<h1>' + escapeHTML(story.title) + '</h1>' +
        '<p class="byline">by ' + escapeHTML(story.author) + '</p>' +
      '</header>' +

      '<figure class="story-figure">' +
        '<img src="' + sceneSrc(id) + '" alt="Scene from ' + escapeHTML(story.title) +
        '" width="1200" height="750" onerror="this.parentNode.hidden=true">' +
        '<figcaption>Scene illustration</figcaption>' +
      '</figure>' +

      '<div class="tools">' +
        '<button type="button" class="btn ghost" id="synToggle" aria-expanded="false" aria-controls="synopsis">Show synopsis</button>' +
        '<button type="button" class="btn ghost" id="sizeDown" aria-label="Smaller text">A−</button>' +
        '<button type="button" class="btn ghost" id="sizeUp" aria-label="Larger text">A+</button>' +
        '<button type="button" class="btn ghost like" id="storyLike" aria-pressed="' + liked + '">' +
          likeLabel(liked) + '</button>' +
      '</div>' +

      '<p class="synopsis" id="synopsis" hidden>' + escapeHTML(story.synopsis) + '</p>' +

      '<section class="chapter" id="reader">' +
        '<h2>' + escapeHTML(story.chapter) + '</h2>' +
        '<p>' + escapeHTML(story.text[0]) + '</p>' +
        '<p>' + escapeHTML(story.text[1]) + '</p>' +
      '</section>' +

      '<nav class="pager" aria-label="Story navigation">' +
        (prev ? '<a class="btn ghost" href="story.html?id=' + prev.id + '">← ' + escapeHTML(prev.title) + '</a>' : '<span></span>') +
        (next ? '<a class="btn" href="story.html?id=' + next.id + '">' + escapeHTML(next.title) + ' →</a>' : '<span></span>') +
      '</nav>';

    // Synopsis toggle
    const synToggle = document.getElementById("synToggle");
    const synopsis = document.getElementById("synopsis");
    synToggle.addEventListener("click", function () {
      const open = synToggle.getAttribute("aria-expanded") === "true";
      synToggle.setAttribute("aria-expanded", String(!open));
      synopsis.hidden = open;
      synToggle.textContent = open ? "Show synopsis" : "Hide synopsis";
    });

    // Text size
    let size = 18;
    const reader = document.getElementById("reader");
    function applySize() {
      reader.style.setProperty("--reader-size", size + "px");
    }
    document.getElementById("sizeUp").addEventListener("click", function () {
      size = Math.min(26, size + 2);
      applySize();
    });
    document.getElementById("sizeDown").addEventListener("click", function () {
      size = Math.max(14, size - 2);
      applySize();
    });
    applySize();

    // Like
    const likeBtn = document.getElementById("storyLike");
    likeBtn.addEventListener("click", function () {
      const isLiked = toggleLike(id);
      likeBtn.setAttribute("aria-pressed", String(isLiked));
      likeBtn.textContent = likeLabel(isLiked);
    });

    // Reading progress
    const fill = document.getElementById("progressFill");
    function updateProgress() {
      const docEl = document.documentElement;
      const scrollable = docEl.scrollHeight - docEl.clientHeight;
      const percent = scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 100;
      fill.style.width = percent + "%";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Start ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    setupTheme();
    setupHome();
    setupStory();
  });
})();
