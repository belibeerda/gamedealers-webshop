document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('steam-replenishment-form');

    const closeButton = document.getElementById('error-modal-close');
    closeButton.addEventListener('click', closeErrorModal);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const loginInput = document.getElementById('login');
        const amountInput = document.getElementById('amount');

        const login = loginInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        if (!login || isNaN(amount) || amount < 100) {
            showErrorModal('Пожалуйста, введите корректный логин и сумму от 100 ₽');
            return;
        }

        const cartItem = {
            uid: generateUID(),
            id: 'steam-replenishment',
            name: 'Пополнение баланса Steam',
            price: amount,
            image: 'steam-logo.png',
            platform: `Логин – ${login}`,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        showCartNotification('Услуга добавлена в корзину!');
        form.reset();
    });

    function generateUID() {
        return 'uid-' + Date.now() + '-' + Math.floor(Math.random() * 100000);
    }

    function showCartNotification(message = 'Товар добавлен в корзину!') {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cart-count');
        if (!cartCountElement) return;

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = 'inline-block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    function showErrorModal(message) {
        const modal = document.getElementById('error-modal');
        const messageBox = document.getElementById('error-message');

        messageBox.textContent = message;
        modal.style.display = 'flex';
    }

    function closeErrorModal() {
        const modal = document.getElementById('error-modal');
        modal.style.display = 'none';
    }

});