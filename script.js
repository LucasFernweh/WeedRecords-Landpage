
// Efeito hamburguer
const hamburguer = document.getElementById("hamburguer");
const menuWindow = document.querySelector(".menuWindow");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    menuWindow.classList.toggle("active");
});

// SCRIPT DO CARROSSEL
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-next-btn');
const prevButton = document.querySelector('.carousel-prev-btn');

const slideWidth = slides[0].getBoundingClientRect().width;

let slideIndex = 0;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    moveToSlide(track, currentSlide, nextSlide);
});

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
    moveToSlide(track, currentSlide, prevSlide);
});

slides[0].classList.add('current-slide');
