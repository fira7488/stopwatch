// Select elements
const min = document.querySelector(".minute");
const sec = document.querySelector(".second");
const ms = document.querySelector(".microsecond");

const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");

const timeDisplay = document.querySelectorAll(".time");

let msCount = 0;
let secCount = 0;
let minCount = 0;
let starter;

// ✅ Helper: Add glow loop
function startGlow() {
  anime({
    targets: ".time",
    boxShadow: ["0 0 0px #00f", "0 0 20px #00f"],
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 1000,
  });
}

// ✅ Helper: Remove glow
function removeGlow() {
  anime({
    targets: ".time",
    boxShadow: "0 0 0px #00f",
    duration: 500,
    easing: "easeInOutSine",
  });
}

// ✅ Start button
startBtn.addEventListener("click", () => {
  anime({
    targets: ".start",
    scale: [1, 1.3, 1],
    duration: 800,
    easing: "easeOutElastic(1, .5)",
  });

  if (starter) return;

  startGlow();

  starter = setInterval(() => {
    msCount++;
    if (msCount === 100) {
      msCount = 0;
      secCount++;
    }
    if (secCount === 60) {
      secCount = 0;
      minCount++;
    }

    ms.textContent = msCount < 10 ? "0" + msCount : msCount;
    sec.textContent = secCount < 10 ? "0" + secCount : secCount;
    min.textContent = minCount < 10 ? "0" + minCount : minCount;

    // Bounce scale on seconds change
    anime({
      targets: ".second",
      scale: [1, 1.2, 1],
      duration: 300,
      easing: "easeOutElastic(1, .5)",
    });

    // Microsecond flicker
    anime({
      targets: ".microsecond",
      opacity: [0.8, 1],
      duration: 80,
      direction: "alternate",
      easing: "easeInOutSine",
    });
  }, 10);
});

// ✅ Stop button
stopBtn.addEventListener("click", () => {
  anime({
    targets: ".stop",
    rotate: [0, 360],
    duration: 600,
    easing: "easeInOutQuad",
  });

  anime({
    targets: ".time",
    backgroundColor: "#e74c3c",
    color: "#fff",
    duration: 500,
    easing: "easeInOutQuad",
  });

  clearInterval(starter);
  starter = null;

  removeGlow();
});

// ✅ Reset button
resetBtn.addEventListener("click", () => {
  anime({
    targets: ".reset",
    scale: [1, 1.2, 1],
    duration: 500,
    easing: "easeOutElastic(1, .5)",
  });

  msCount = 0;
  secCount = 0;
  minCount = 0;

  ms.textContent = "00";
  sec.textContent = "00";
  min.textContent = "00";

  anime({
    targets: ".time",
    backgroundColor: "#fff",
    color: "#000",
    duration: 400,
    easing: "easeInOutQuad",
  });

  clearInterval(starter);
  starter = null;

  removeGlow();
});
