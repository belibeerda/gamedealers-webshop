document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const discountsContainer = document.getElementById('discounts-container');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form-input');
    
    // Массив для хранения всех товаров со скидкой
    let discountedProducts = [];

    // Загрузка данных
    async function loadProducts() {
        try {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/1DqloAEOGkDMqudEEB3rSFgWVTvnIuyJtu9uJERqo4Wg/values/productsList?key=AIzaSyAdHF7Odd1Zn4aXpK9Z2bV6SUoFD3Iceh0`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const [headers, ...rows] = data.values;
            
            // Преобразование данных в массив объектов
            const products = rows.map(row => {
                const product = {};
                headers.forEach((header, index) => {
                    product[header.toLowerCase()] = row[index];
                });
                return product;
            });
            
            // Фильтрация товаров со скидкой
            discountedProducts = products.filter(product => 
                product.action && product.action.trim() !== ''
            );
            
            displayProducts(discountedProducts);
        } catch (error) {
            console.error('Error loading products:', error);
            discountsContainer.innerHTML = `
                <p class="error-message">Произошла ошибка при загрузке товаров. Пожалуйста, попробуйте позже.</p>
            `;
        }
    }

    // Отображение товаров
    function displayProducts(products) {
        if (products.length === 0) {
            discountsContainer.innerHTML = `
                <p class="no-products">По вашему запросу ничего не найдено.</p>
            `;
            return;
        }
        
        discountsContainer.innerHTML = products.map(product => {
            const priceNum = parseInt(product.price) || 0;
            const discountNum = parseInt(product.action) || 0;
            const hasDiscount = discountNum > 0;
            const finalPrice = hasDiscount ? Math.round(priceNum * (1 - discountNum / 100)) : Math.round(priceNum);
            
            return `
            <div class="product-card">
                <div class="game-image">
                <a href="${product.link}">
                    ${product.image ? `<img src="../images/${product.image}" alt="${product.name}">` : '<div class="no-image">Нет изображения</div>'}
                </a>
                </div>
                <a href="#">
                <p class="game-name">${product.name || 'Без названия'}</p>
                </a>
                ${hasDiscount ? `
                <div class="old-price-container">
                    <span class="old-price">${priceNum.toFixed(2)}&nbsp;₽</span>
                    <span class="discount">-${discountNum}%</span>
                </div>
                ` : ''}
                <div class="price-cart">
                <span class="price">${finalPrice.toFixed(2)}&nbsp;₽</span>
                <div class="card-button"></div>
                </div>
            </div>
            `;
        }).join('');
    }

    // Фильтрация товаров по поисковому запросу
    function filterProducts(searchTerm) {
        if (!searchTerm) {
            displayProducts(discountedProducts);
            return;
        }
        
        const filtered = discountedProducts.filter(product => {
            const searchLower = searchTerm.toLowerCase();
            const nameMatch = product.name && product.name.toLowerCase().includes(searchLower);
            const tagsMatch = product.tags && product.tags.toLowerCase().includes(searchLower);
            return nameMatch || tagsMatch;
        });
        
        displayProducts(filtered);
    }

    // Обработчик формы поиска
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        filterProducts(searchTerm);
    });

    // Обработчик очистки поиска
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            displayProducts(discountedProducts);
        }
    });

    // Инициализация
    loadProducts();
});