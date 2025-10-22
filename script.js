document.addEventListener('DOMContentLoaded', () => {
    
    // ============================
    // 1. Lógica do Menu Hambúrguer (Universal)
    // ============================
    const hamburguer = document.getElementById('hamburguer');
    const menuWindow = document.getElementById('menuWindow');
    const fundoTranslucido = document.getElementById('fundoTranslucido');

    function openMenu() {
        menuWindow.classList.add('active');
        hamburguer.classList.add('active');
        // A manta cinza (fundoTranslucido) só é ativada se estivermos em DESKTOP
        if (window.innerWidth >= 768) { 
            fundoTranslucido.classList.add('active');
            document.body.classList.add('menu-open'); // Previne scroll
        }
    }
    
    function closeMenu() {
        menuWindow.classList.remove('active');
        hamburguer.classList.remove('active');
        fundoTranslucido.classList.remove('active');
        document.body.classList.remove('menu-open'); // Permite scroll
    }

    function handleHamburguerClick(e) {
        e.stopPropagation();
        if (menuWindow.classList.contains('active')) closeMenu();
        else openMenu();
    }
    
    // ============================
    // Lógica Responsiva para o Hambúrguer
    // ============================
    function toggleHamburguerVisibility() {
        if (window.innerWidth >= 768) {
            // Desktop: Esconde o hambúrguer e fecha o menu
            hamburguer.style.display = 'none';
            closeMenu();
        } else {
            // Mobile: Mostra o hambúrguer
            hamburguer.style.display = 'flex';
        }
    }

    if (hamburguer && menuWindow && fundoTranslucido) {
        // Inicializa a visibilidade
        toggleHamburguerVisibility();
        window.addEventListener('resize', toggleHamburguerVisibility);

        // Event Listeners Principais
        hamburguer.addEventListener('click', handleHamburguerClick);
        
        // Fundo translúcido só fecha o menu se estiver ativo (Desktop)
        fundoTranslucido.addEventListener('click', closeMenu); 

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuWindow.classList.contains('active')) closeMenu();
        });

        // Fecha o dropdown se clicar fora (funciona em mobile e desktop)
        document.addEventListener('click', (e) => {
            // Verifica se o menu está aberto e se o clique foi fora do menu/hambúrguer
            if (menuWindow.classList.contains('active')) {
                if (!menuWindow.contains(e.target) && !hamburguer.contains(e.target)) {
                    closeMenu();
                }
            }
        });
    }


    // ============================
    // 2. SCRIPT DO CARROSSEL (Lógica robusta mantida)
    // ============================
    const track = document.querySelector('.carousel-track');
    const trackWrapper = document.querySelector('.carousel-track-wrapper');

    if (track && trackWrapper) {
        const slides = Array.from(track.querySelectorAll('.carousel-slide'));
        const nextButton = document.querySelector('.carousel-next-btn');
        const prevButton = document.querySelector('.carousel-prev-btn');

        let slideWidth = trackWrapper.getBoundingClientRect().width;

        function setSlidesSizesAndPositions() 
        {
            slideWidth = trackWrapper.getBoundingClientRect().width || window.innerWidth;
            slides.forEach((slide, i) => {
                slide.style.width = slideWidth + 'px';
                slide.style.left = (slideWidth * i) + 'px';
            });
            // Garante que a posição atual esteja visível após resize
            const current = track.querySelector('.current-slide') || slides[0];
            if (current) {
                track.style.transform = 'translateX(-' + current.style.left + ')';
            }
        }

        // init
        setSlidesSizesAndPositions();
        window.addEventListener('resize', setSlidesSizesAndPositions);

        // estado
        let currentIndex = 0;
        slides.forEach(s => s.classList.remove('current-slide'));
        if (slides.length) slides[0].classList.add('current-slide');

        function moveToIndex(index) 
        {
            if (!slides.length) return;
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            const target = slides[index];
            track.style.transform = 'translateX(-' + target.style.left + ')';
            track.querySelector('.current-slide')?.classList.remove('current-slide');
            target.classList.add('current-slide');
            currentIndex = index;
        }

        if (nextButton) nextButton.addEventListener('click', () => moveToIndex(currentIndex + 1));
        if (prevButton) prevButton.addEventListener('click', () => moveToIndex(currentIndex - 1));
    }


    // ============================
    // 3. JS BACK-TO-TOP
    // ============================
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 200) backToTopButton.style.display = 'block';
            else backToTopButton.style.display = 'none';
        });

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});