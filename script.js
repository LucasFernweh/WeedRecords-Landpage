document.addEventListener('DOMContentLoaded', () => {

    // 1. Efeito Hamburguer
    const hamburguer = document.getElementById("hamburguer");
    const menuWindow = document.querySelector(".menuWindow");

    hamburguer.addEventListener("click", () => {
        hamburguer.classList.toggle("active");
        menuWindow.classList.toggle("active");
    });

    // 2. SCRIPT DO CARROSSEL
    // AGORA ESTÁ SEGURO, POIS O DOM JÁ CARREGOU
    const track = document.querySelector('.carousel-track');
    // Verifique se o track existe antes de continuar
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-next-btn');
        const prevButton = document.querySelector('.carousel-prev-btn');
        
        // Acesso seguro, pois slides está definido
        if (slides.length > 0) {
            const slideWidth = slides[0].getBoundingClientRect().width;

            let slideIndex = 0;

            const setSlidePosition = (slide, index) => {
                slide.style.left = slideWidth * index + 'px';
            };

            slides.forEach(setSlidePosition);

            const moveToSlide = (track, currentSlide, targetSlide) => {
                track.style.transform = 'translateX(-' + (targetSlide.style.left || '0px') + ')';
                currentSlide.classList.remove('current-slide');
                targetSlide.classList.add('current-slide');
            };

            nextButton.addEventListener('click', e => {
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const nextSlide = currentSlide.nextElementSibling ? currentSlide.nextElementSibling : slides[0];
                moveToSlide(track, currentSlide, nextSlide);
            });

            prevButton.addEventListener('click', e => {
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const prevSlide = currentSlide.previousElementSibling ? currentSlide.previousElementSibling : slides[slides.length - 1];
                moveToSlide(track, currentSlide, prevSlide);
            });

            slides[0].classList.add('current-slide');
        }
    }


    // 3. JS BACK-TO-TOP
    // AGORA ESTÁ SEGURO PARA SER EXECUTADO
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {

        window.onscroll = function() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        };

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

}); // Fim do DOMContentLoaded