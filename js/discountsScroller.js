document.addEventListener('DOMContentLoaded', function() {
    // Данные баннеров (можно загружать из API)
    const banners = [
        {
            image: 'url(../images/promos/assasins-creed-characters.jpg)',
            title: 'Скидки до 70% на игры серии Assassin\'s Creed',
            text: 'Только до конца месяца специальные предложения'
        },
        {
            image: 'url(../images/promos/sony-games.jpg)',
            title: 'Распродажа игр для PlayStation',
            text: 'Лучшие игры по сниженным ценам'
        },
        {
            image: 'url(../images/promos/new-games.jpeg)',
            title: 'Новые игры со скидкой 30%',
            text: 'Покупайте новинки выгодно'
        }
    ];

    const sliderContainer = document.querySelector('.promo-slider-container');
    const pagination = document.querySelector('.promo-slider-pagination');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    
    let currentSlide = 0;
    let autoSlideInterval;

    // Создаем баннеры
    banners.forEach((banner, index) => {
        const slide = document.createElement('div');
        slide.className = 'promo-slider-banner';
        slide.style.backgroundImage = banner.image;
        slide.innerHTML = `
            <div class="banner-content">
                <h2>${banner.title}</h2>
                <p>${banner.text}</p>
            </div>
        `;
        sliderContainer.appendChild(slide);

        // Добавляем точку пагинации
        const dot = document.createElement('div');
        dot.className = 'pagination-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });

    // Функции управления слайдером
    function goToSlide(index) {
        currentSlide = (index + banners.length) % banners.length;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активную точку
        document.querySelectorAll('.pagination-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Обработчики событий
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        // startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        // startAutoSlide();
    });

    // При наведении останавливаем автопрокрутку
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    // Запускаем слайдер
    startAutoSlide();
});