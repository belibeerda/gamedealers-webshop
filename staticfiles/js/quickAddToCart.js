document.addEventListener('DOMContentLoaded', function () {
    const quickAddToCartModal = document.getElementById('quickAddToCartModal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalPlatformsContainer = document.getElementById('modal-platforms');
    const modalAddToCartButton = document.getElementById('modalAddToCartButton');

    let currentProduct = {}; // To store data of the product currently in the modal

    // Open modal when any "add-to-cart-button" is clicked
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function () {
            const platformString = this.dataset.productPlatforms; // Получаем строку платформ
            let platforms = [];

            if (platformString) {
                platforms = platformString.split(';').map(item => {
                    const parts = item.split(':');
                    if (parts.length === 2) {
                        return { id: parts[0], name: parts[1] };
                    }
                    return null; // В случае некорректного формата
                }).filter(item => item !== null); // Удаляем некорректные
            }

            currentProduct = {
                id: this.dataset.productId,
                name: this.dataset.productName,
                price: parseFloat(this.dataset.productPrice),
                image: this.dataset.productImage,
                platforms: platforms
            };

            modalProductName.textContent = currentProduct.name;
            modalProductImage.src = `/static/images/${currentProduct.image}`;
            modalProductPrice.textContent = currentProduct.price.toFixed(2);

            displayPlatformsInModal(currentProduct.platforms);

            quickAddToCartModal.style.display = 'flex'; // Use flex to center the modal
        });
    });

    // Close modal when close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            quickAddToCartModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target == quickAddToCartModal) {
            quickAddToCartModal.style.display = 'none';
        }
    });

    // Add to cart from modal
    modalAddToCartButton.addEventListener('click', function () {
        // ВОТ ЗДЕСЬ ИСПРАВЛЕНИЕ: Используем #modal-platforms
        const selectedPlatformInput = document.querySelector('#modal-platforms input[name="platform"]:checked');
        const selectedPlatform = selectedPlatformInput ? selectedPlatformInput.value : 'Без платформы';

        addToCart(currentProduct.id, currentProduct.name, currentProduct.price, currentProduct.image, selectedPlatform);
        quickAddToCartModal.style.display = 'none';
    });

    function displayPlatformsInModal(platforms) {
        modalPlatformsContainer.innerHTML = ''; // Очищаем предыдущие платформы
        if (platforms && platforms.length > 0) {
            platforms.forEach(platform => {
                const label = document.createElement('label');
                label.classList.add('modal-platforms-radio'); // Добавляем класс к label

                const radioBtn = document.createElement('input');
                radioBtn.type = 'radio';
                radioBtn.name = 'platform';
                radioBtn.value = platform.name;
                radioBtn.id = `platform-${platform.id}`;

                const span = document.createElement('span');
                span.textContent = platform.name;

                label.appendChild(radioBtn);
                label.appendChild(span);

                modalPlatformsContainer.appendChild(label);
            });
            const firstRadioBtn = modalPlatformsContainer.querySelector('input[name="platform"]');
            if (firstRadioBtn) {
                firstRadioBtn.checked = true;
            }
        } else {
            modalPlatformsContainer.innerHTML = '<p>Для этого товара нет информации о платформах.</p>';
        }
    }

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
});