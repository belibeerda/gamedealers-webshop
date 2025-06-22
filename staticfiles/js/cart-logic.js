document.addEventListener('DOMContentLoaded', function () {
    // Находим все строки с товарами
    document.querySelectorAll('.counter-container').forEach(counter => {
        const minusBtn = counter.querySelector('.minus');
        const plusBtn = counter.querySelector('.plus');
        const quantityEl = counter.querySelector('.meaning');
        const priceEl = counter.closest('tr').querySelector('.price');
        const sumEl = counter.closest('tr').querySelector('.sum');

        // Получаем цену товара из ячейки .price
        const price = parseFloat(priceEl.textContent.replace('₽', '').trim());

        let quantity = parseInt(quantityEl.textContent); // Текущее количество

        // Функция для обновления суммы
        function updateSum() {
            const total = price * quantity;
            sumEl.innerHTML = `${total.toFixed(0)}&#8381;`; // Обновляем сумму
            quantityEl.textContent = quantity; // Обновляем отображение количества
        }

        // Уменьшение количества
        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateSum();
            }
        });

        // Увеличение количества
        plusBtn.addEventListener('click', () => {
            quantity++;
            updateSum();
        });
    });
});