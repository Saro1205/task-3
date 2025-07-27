const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
let autoPlayInterval;

function updateCarousel() {
  const width = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function changeSlide(step) {
  currentIndex += step;
  if (currentIndex >= slides.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = slides.length - 1;
  updateCarousel();
}

function setSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Swipe support
let startX = 0;

document.getElementById("carousel").addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.getElementById("carousel").addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) changeSlide(1);
  else if (endX - startX > 50) changeSlide(-1);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") changeSlide(1);
  else if (e.key === "ArrowLeft") changeSlide(-1);
});

// Pause on hover
const carousel = document.getElementById("carousel");
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

// Init
updateCarousel();
startAutoPlay();
