document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Открытие модального окна
    openModalButton.addEventListener('click', function (event) {
        event.preventDefault(); // Отменяем действие ссылки
        modal.style.display = 'block'; // Показываем модальное окно
    });

    // Закрытие модального окна
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Скрываем модальное окно
    });

    // Закрытие модального окна при клике вне контента
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Скрываем модальное окно
        }
    });
});