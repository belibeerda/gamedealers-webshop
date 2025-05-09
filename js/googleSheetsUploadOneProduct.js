document.addEventListener('DOMContentLoaded', function() {
    // Скрываем скелетон после загрузки
    const preloader = document.getElementById('preloader');

    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'index.html'; // Перенаправляем если нет ID
        return;
    }

    // Загружаем данные товара
    async function loadProductData() {
        try {
            // Запрос к Google Sheets API
            const url = `https://sheets.googleapis.com/v4/spreadsheets/1DqloAEOGkDMqudEEB3rSFgWVTvnIuyJtu9uJERqo4Wg/values/productsList?key=AIzaSyAdHF7Odd1Zn4aXpK9Z2bV6SUoFD3Iceh0`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Преобразуем данные в массив объектов
            const [headers, ...rows] = data.values;
            const products = rows.map(row => {
                const product = {};
                headers.forEach((header, index) => {
                    product[header.toLowerCase()] = row[index];
                });
                return product;
            });
            
            // Находим товар по ID
            const product = products.find(p => p.id === productId);
            
            if (!product) {
                throw new Error('Товар не найден');
            }
            
            // Заполняем данные на странице
            populateProductData(product);

            // Скрываем скелетон после успешной загрузки
            preloader.style.display = 'none';
            
        } catch (error) {
            console.error('Ошибка загрузки товара:', error);
            showErrorMessage();

            // Скрываем скелетон при ошибке
            preloader.style.display = 'none';
        }
    }

    // Заполнение данных товара
    function populateProductData(product) {
        // Основная информация
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        
        // Цена и скидка
        const priceElement = document.querySelector('.new-price');
        const oldPriceElement = document.querySelector('.old-price');
        const discountElement = document.querySelector('.discount');
        
        priceElement.textContent = `${product.price} ₽`;
        
        if (product.action && product.action.trim() !== '') {
            const discount = parseFloat(product.action);
            const oldPrice = parseFloat(product.price);
            const newPrice = Math.round(oldPrice * (1 - discount / 100));
            
            oldPriceElement.textContent = `${product.price} ₽`;
            discountElement.textContent = `-${discount}%`;
            priceElement.textContent = `${newPrice} ₽`;
        } else {
            document.querySelector('.old-price-container').style.display = 'none';
        }
        
        // Жанры
        if (product.genres && product.genres.trim() !== '') {
            const genresContainer = document.getElementById('product-genres');
            const genresTitle = document.getElementsByClassName('genresTitle')[0];
            genresTitle.textContent = "Жанры:";
            
            // Разделяем теги по запятой и убираем лишние пробелы
            const genres = product.genres.split(',')
                            .map(genre => genre.trim())
                            .filter(genre => genre.length > 0);
            
            // Создаем элементы для каждого тега
            genres.forEach(genre => {

                const genreWrapper = document.createElement('div');
                genreWrapper.className = 'genre'; // Добавляем класс для стилизации

                // Создаем ссылку
                const genreElement = document.createElement('a');
                genreElement.className = 'genre-link';
                genreElement.textContent = genre;
                genreElement.href = "#"; // Устанавливаем href

                // Добавляем ссылку внутрь div-обертки
                genreWrapper.appendChild(genreElement);

                // Добавляем div-обертку в контейнер жанров
                genresContainer.appendChild(genreWrapper);
            });
        }

        //Платформы
        if (product.platforms && product.platforms.trim() !== '') {
            const platformsContainer = document.getElementById('product-platforms');
            const platformsTitle = document.getElementsByClassName('platformsTitle')[0];
            platformsTitle.textContent = "Платформы:";
            
            // Разделяем теги по запятой и убираем лишние пробелы
            const platforms = product.platforms.split(',')
                            .map(platform => platform.trim())
                            .filter(platform => platform.length > 0);
            
            // Создаем элементы для каждого тега
            platforms.forEach(platform => {

                const platformWrapper = document.createElement('div');
                platformWrapper.className = 'platform'; // Добавляем класс для стилизации

                // Создаем ссылку
                const platformElement = document.createElement('a');
                platformElement.className = 'platform-link';
                platformElement.textContent = platform;
                platformElement.href = "#"; // Устанавливаем href

                // Добавляем ссылку внутрь div-обертки
                platformWrapper.appendChild(platformElement);

                // Добавляем div-обертку в контейнер жанров
                platformsContainer.appendChild(platformWrapper);
            });
        }


        if (product.screenshots && product.screenshots.trim() !== '') {
            const screenshots = product.screenshots
                                    .split(',')
                                    .map(url => url.trim())
                                    .filter(url => url.length > 0)
                                    .map(url => `../images/screenshots/${url}`);
            
            const thumbnailsContainer = document.getElementById('screenshots-thumbnails');
            const mainImage = document.getElementById('main-screenshot');
            
            // Загружаем первое изображение
            if (screenshots.length > 0) {
                mainImage.src = screenshots[0];
                mainImage.alt = `Скриншот 1 из ${screenshots.length}`;
            }
            
            // Создаём миниатюры
            screenshots.forEach((url, index) => {
                const thumb = document.createElement('img');
                thumb.src = url;
                thumb.alt = `Скриншот ${index + 1}`;
                thumb.classList.add('thumbnail');
                
                thumb.addEventListener('click', () => {
                    mainImage.src = url;
                    mainImage.alt = `Скриншот ${index + 1} из ${screenshots.length}`;
                    
                    // Обновляем активную миниатюру
                    document.querySelectorAll('.thumbnail').forEach(t => {
                        t.classList.remove('active');
                    });
                    thumb.classList.add('active');
                });
                
                if (index === 0) thumb.classList.add('active');
                thumbnailsContainer.appendChild(thumb);
            });
            
            // Навигация
            let currentIndex = 0;
            document.querySelector('.gallery-next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % screenshots.length;
                updateMainImage(screenshots[currentIndex], currentIndex);
            });
            
            document.querySelector('.gallery-prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
                updateMainImage(screenshots[currentIndex], currentIndex);
            });
            
            function updateMainImage(url, index) {
                mainImage.src = url;
                mainImage.alt = `Скриншот ${index + 1} из ${screenshots.length}`;
                
                document.querySelectorAll('.thumbnail').forEach((t, i) => {
                    t.classList.toggle('active', i === index);
                });
            }
        }

        // Кнопка "Купить" (можно добавить ссылку)
        document.querySelector('.buy-button').addEventListener('click', function() {
            // Здесь можно добавить логику покупки
            console.log('Покупка товара:', product.name);
        });
    }

    // Показ сообщения об ошибке
    function showErrorMessage() {
        document.querySelector('main').innerHTML = `
            <div class="error-message">
                <div class="error-message-text">
                    <h2>Товар не найден</h2>
                    <p>Извините, запрашиваемый товар не существует или был удален.</p>
                    <a href="search.html">Вернуться в каталог</a>
                </div>
            </div>
        `;
    }

    // Запускаем загрузку данных
    loadProductData();
});