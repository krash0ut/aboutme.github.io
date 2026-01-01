// TAB NAVIGATION
function openTab(tabId) {
  const tabs = document.querySelectorAll("#main-ui .tab");
  tabs.forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// BOOT SEQUENCE
const bootInput = document.getElementById("boot-input");
const bootMessages = document.getElementById("boot-messages");
const bootSequence = document.getElementById("boot-sequence");
const mainUI = document.getElementById("main-ui");

function addMessage(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  bootMessages.appendChild(p);
  bootMessages.scrollTop = bootMessages.scrollHeight;
}

function handleBootInput(e) {
  if (e.key === "Enter") {
    const val = bootInput.value.trim().toLowerCase();
    if (val === "boot") {
      bootSequence.classList.remove("active");
      mainUI.classList.add("active");
    } else if (val === "69") {
      addMessage("funny");
    } else {
      addMessage("Error: command not recognized");
    }
    bootInput.value = "";
  }
}

// Attach listener
bootInput.addEventListener("keydown", handleBootInput);

// Ensure input keeps focus
bootInput.focus();
bootInput.addEventListener("blur", () => bootInput.focus());


// MATRIX EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let fontSize = 16;
let columns;
let drops = [];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%^&*()-_=+<>?/|";
const lettersArray = letters.split("");

// Initialize Matrix
function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
  }
}

// Draw Matrix animation
function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
    ctx.fillText(text, i * fontSize, drops[i]);
    drops[i] += fontSize;
    if (drops[i] > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }

  requestAnimationFrame(drawMatrix);
}

// Initialize everything
initMatrix();
drawMatrix();

// Reinitialize matrix on window resize and keep boot input focused
window.addEventListener("resize", () => {
  initMatrix();
  bootInput.focus();
});

