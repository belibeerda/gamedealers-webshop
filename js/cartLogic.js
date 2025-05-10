document.addEventListener('DOMContentLoaded', function() {
    // Загружаем корзину из localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Элементы DOM
    const cartTable = document.querySelector('.cart-table tbody');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const totalItemsElement = document.querySelector('.number-products');
    const totalSumElement = document.querySelector('.cart-total');
    
    // Отображаем корзину
    renderCart(cart);
    
    // Функция отрисовки корзины
    function renderCart(cartItems) {
        cartTable.innerHTML = '';
        const cartContent = document.querySelector('.cart-content');
        
        if (cartItems.length === 0) {
            cartContent.style.display = 'none'
            emptyCartMessage.style.display = 'block';
            totalItemsElement.textContent = '0 шт';
            totalSumElement.textContent = '0 ₽';
            return;
        }
        else {
            cartContent.style.display = 'block';
        }
        
        emptyCartMessage.style.display = 'none';
        let totalItems = 0;
        let totalSum = 0;
        
        cartItems.forEach(item => {
            totalItems += item.quantity;
            totalSum += item.price * item.quantity;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="image">
                    <div class="image-box">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                </td>
                <td class="title">${item.name}</td>
                <td class="price">${item.price.toFixed(2)}&nbsp;&#8381;</td>
                <td class="counter">
                    <div class="counter-container">
                        <button class="minus" data-id="${item.id}"></button>
                        <div class="quantity">
                            <span class="meaning">${item.quantity}</span>
                            <span>шт</span>
                        </div>
                        <button class="plus" data-id="${item.id}"></button>
                    </div>
                </td>
                <td class="sum">${(item.price * item.quantity).toFixed(2)}&nbsp;&#8381;</td>
                <td>
                    <button class="delete-btn" data-id="${item.id}"></button>
                </td>
            `;
            cartTable.appendChild(row);
        });
        
        // Обновляем итоги
        totalItemsElement.textContent = `${totalItems} шт`;
        totalSumElement.textContent = `${totalSum.toFixed(2)} ₽`;
        
        // Добавляем обработчики событий
        addEventListeners();
    }
    
    // Обработчики для кнопок
    function addEventListeners() {
        // Увеличение количества
        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                updateCartItem(productId, 1);
            });
        });
        
        // Уменьшение количества
        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                updateCartItem(productId, -1);
            });
        });
        
        // Удаление товара
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                removeCartItem(productId);
            });
        });
    }
    
    // Обновление количества товара
    function updateCartItem(productId, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            
            // Удаляем если количество ≤ 0
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(cart);
        }
    }
    
    // Удаление товара
    function removeCartItem(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(cart);
    }
});