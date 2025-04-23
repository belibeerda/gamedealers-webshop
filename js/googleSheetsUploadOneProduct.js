document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID товара из URL (например: product.html?id=5)
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
            
        } catch (error) {
            console.error('Ошибка загрузки товара:', error);
            showErrorMessage();
        }
    }

    // Заполнение данных товара
    function populateProductData(product) {
        // Основная информация
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-gallery-image').src = "../images/" + product.image;
        document.getElementById('product-gallery-image').alt = product.name;
        document.getElementById('product-description').textContent = product.description;
        
        // Цена и скидка
        const priceElement = document.querySelector('.price');
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
        
        // Теги
        const tagsContainer = document.getElementById('product-tags');
        tagsContainer.innerHTML = ''; // Очищаем контейнер
        
        if (product.tags && product.tags.trim() !== '') {
            const tags = product.tags.split(',');
            tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag.trim();
                tagsContainer.appendChild(tagElement);
            });
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
                <h2>Товар не найден</h2>
                <p>Извините, запрашиваемый товар не существует или был удален.</p>
                <a href="index.html">Вернуться в каталог</a>
            </div>
        `;
    }

    // Запускаем загрузку данных
    loadProductData();
});