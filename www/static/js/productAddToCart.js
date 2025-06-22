document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    const buyButton = document.querySelector('.buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', function () {
            const productId = buyButton.dataset.productId;
            const productName = buyButton.dataset.productName;
            const price = parseFloat(buyButton.dataset.productPrice) || 0;
            const image = buyButton.dataset.productImage;
            const imagePath = (image || 'No-img.png');

            const selectedPlatformInput = document.querySelector('input[name="platform"]:checked');
            const selectedPlatform = selectedPlatformInput ? selectedPlatformInput.value : 'Без платформы';

            addToCart(productId, productName, price, imagePath, selectedPlatform);
        });
    }
});

function addToCart(productId, name, price, image, platform) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === productId && item.platform === platform);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            uid: generateUID(),
            id: productId,
            name: name,
            price: price,
            image: image,
            platform: platform,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showCartNotification();
    updateCartCount();
}

function generateUID() {
    return 'uid-' + Date.now() + '-' + Math.floor(Math.random() * 100000);
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Товар добавлен в корзину!';
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