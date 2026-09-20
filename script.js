const categories = [
  { id: "all", label: "All Animals" },
  { id: "mammals", label: "Mammals" },
  { id: "birds", label: "Birds" },
  { id: "insects", label: "Insects" },
];

const animals = [
  {
    id: "white-tailed-deer",
    name: "White-tailed Deer",
    category: "mammals",
    emoji: "🦌",
    scientificName: "Odocoileus virginianus",
    habitat: "Woodlands and meadows",
    fact: "A quiet grazer that listens for danger before moving through Michigan forests.",
    color: "#d2d9b3",
    tag: "Forest edge",
    soundType: "mammal",
  },
  {
    id: "red-fox",
    name: "Red Fox",
    category: "mammals",
    emoji: "🦊",
    scientificName: "Vulpes vulpes",
    habitat: "Open fields and wetlands",
    fact: "Known for alert ears and a quick, adaptable step along Michigan trails.",
    color: "#f7c38d",
    tag: "Crepuscular",
    soundType: "mammal",
  },
  {
    id: "eastern-chipmunk",
    name: "Eastern Chipmunk",
    category: "mammals",
    emoji: "🐿️",
    scientificName: "Tamias striatus",
    habitat: "Brushy woodland edges",
    fact: "Busy and curious, it collects seeds and keeps a watchful eye on the ground.",
    color: "#d8c99d",
    tag: "Burrower",
    soundType: "mammal",
  },
  {
    id: "american-robin",
    name: "American Robin",
    category: "birds",
    emoji: "🐦",
    scientificName: "Turdus migratorius",
    habitat: "Backyards and open lawns",
    fact: "A familiar singer in spring, often spotted hopping for earthworms and berries.",
    color: "#d5e7c9",
    tag: "Songbird",
    soundType: "bird",
  },
  {
    id: "blue-jay",
    name: "Blue Jay",
    category: "birds",
    emoji: "🪶",
    scientificName: "Cyanocitta cristata",
    habitat: "Woodlots and neighborhood trees",
    fact: "Loud and intelligent, it can copy calls and signal danger to nearby flockmates.",
    color: "#cfe8ff",
    tag: "Noisy flier",
    soundType: "bird",
  },
  {
    id: "great-blue-heron",
    name: "Great Blue Heron",
    category: "birds",
    emoji: "🦩",
    scientificName: "Ardea herodias",
    habitat: "Wetlands and shorelines",
    fact: "A patient hunter that stands still before striking with a quick, precise motion.",
    color: "#d7e8ea",
    tag: "Wetland",
    soundType: "bird",
  },
  {
    id: "monarch-butterfly",
    name: "Monarch Butterfly",
    category: "insects",
    emoji: "🦋",
    scientificName: "Danaus plexippus",
    habitat: "Prairies and milkweed patches",
    fact: "This iconic migrator depends on native plants and sunny open spaces.",
    color: "#f4c98b",
    tag: "Pollinator",
    soundType: "insect",
  },
  {
    id: "cicada",
    name: "Cicada",
    category: "insects",
    emoji: "🪲",
    scientificName: "Magicicada septendecim",
    habitat: "Tree canopies and warm, sunny forests",
    fact: "Its summer chorus is a signature sound of warm Michigan afternoons.",
    color: "#dfe7bf",
    tag: "Summer chorus",
    soundType: "insect",
  },
  {
    id: "firefly",
    name: "Firefly",
    category: "insects",
    emoji: "✨",
    scientificName: "Photinus pyralis",
    habitat: "Tall grass and meadow edges",
    fact: "A nighttime signaler that glows to find mates in summer air.",
    color: "#f6dba7",
    tag: "Night glow",
    soundType: "insect",
  },
];

let currentCategory = "all";
let selectedAnimalId = animals[0].id;

const categoryList = document.getElementById("categoryList");
const animalGrid = document.getElementById("animalGrid");
const detailsPanel = document.getElementById("detailsPanel");

function renderCategories() {
  categoryList.innerHTML = categories
    .map(
      (category) => `
        <button
          type="button"
          class="category-button ${currentCategory === category.id ? "active" : ""}"
          data-category="${category.id}"
          aria-pressed="${currentCategory === category.id}"
        >
          ${category.label}
        </button>
      `
    )
    .join("");

  categoryList.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      const filteredAnimals = getVisibleAnimals();
      selectedAnimalId = filteredAnimals[0]?.id || animals[0].id;
      render();
    });
  });
}

function getVisibleAnimals() {
  if (currentCategory === "all") {
    return animals;
  }

  return animals.filter((animal) => animal.category === currentCategory);
}

function renderAnimals() {
  const visibleAnimals = getVisibleAnimals();

  animalGrid.innerHTML = visibleAnimals
    .map(
      (animal) => `
        <button
          type="button"
          class="animal-card ${selectedAnimalId === animal.id ? "active" : ""}"
          data-animal-id="${animal.id}"
          aria-label="View details for ${animal.name}"
        >
          <div class="card-art" style="background: linear-gradient(135deg, ${animal.color}, rgba(255,255,255,0.74));">
            ${animal.emoji}
          </div>
          <h3>${animal.name}</h3>
          <div class="card-meta">${animal.tag}</div>
        </button>
      `
    )
    .join("");

  animalGrid.querySelectorAll(".animal-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedAnimalId = card.dataset.animalId;
      render();
    });
  });
}

function renderDetails() {
  const animal = animals.find((entry) => entry.id === selectedAnimalId);

  if (!animal) {
    detailsPanel.innerHTML = "<div class='placeholder'><p class='placeholder-title'>No results</p><p>Try another wildlife group.</p></div>";
    return;
  }

  detailsPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <h2>${animal.name}</h2>
      </div>
      <div class="animal-emoji" aria-hidden="true">${animal.emoji}</div>
    </div>

    <div class="detail-tags">
      <span class="tag">${animal.category}</span>
      <span class="tag">${animal.tag}</span>
    </div>

    <p class="detail-copy">
      <strong>Scientific name:</strong> ${animal.scientificName}<br />
      <strong>Habitat:</strong> ${animal.habitat}
    </p>

    <p class="detail-copy">${animal.fact}</p>

    <ul class="detail-list">
      <li>Best observed in natural areas around Michigan.</li>
      <li>Listen for a short pattern inspired by the animal's movements and habitat.</li>
      <li>Great for educational museum-style discovery stations.</li>
    </ul>

    <button class="sound-button" type="button" data-sound-id="${animal.id}">
      ▶ Play sound
    </button>
  `;

  const soundButton = detailsPanel.querySelector(".sound-button");
  soundButton.addEventListener("click", () => {
    playAnimalSound(animal.soundType);
  });
}

function render() {
  renderCategories();
  renderAnimals();
  renderDetails();
}

function playAnimalSound(type) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return;
  }

  const audioContext = new AudioCtx();
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.08;
  masterGain.connect(audioContext.destination);

  let startTime = audioContext.currentTime;

  if (type === "bird") {
    const notes = [880, 990, 1170, 1320, 990];
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, startTime + index * 0.12);
      gain.gain.setValueAtTime(0.0001, startTime + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.09, startTime + index * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + index * 0.12 + 0.14);
      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start(startTime + index * 0.12);
      oscillator.stop(startTime + index * 0.12 + 0.15);
    });
  } else if (type === "mammal") {
    const frequencies = [180, 210, 160, 200];
    frequencies.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(frequency, startTime + index * 0.2);
      gain.gain.setValueAtTime(0.0001, startTime + index * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.07, startTime + index * 0.2 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + index * 0.2 + 0.28);
      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start(startTime + index * 0.2);
      oscillator.stop(startTime + index * 0.2 + 0.3);
    });
  } else {
    for (let i = 0; i < 10; i += 1) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(2200 + i * 160, startTime + i * 0.05);
      gain.gain.setValueAtTime(0.0001, startTime + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.04, startTime + i * 0.05 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + i * 0.05 + 0.02);
      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start(startTime + i * 0.05);
      oscillator.stop(startTime + i * 0.05 + 0.03);
    }
  }

  setTimeout(() => audioContext.close(), 1200);
}

render();
