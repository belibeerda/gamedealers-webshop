let currentScreenshotIndex = 0;
const screenshots = Array.from(document.querySelectorAll('#screenshots-thumbnails img'));
const mainScreenshot = document.getElementById('main-screenshot');

function updateActiveThumbnail(index) {
    screenshots.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function setMainScreenshot(imgElement) {
    const newIndex = screenshots.indexOf(imgElement);
    if (newIndex !== -1) {
        currentScreenshotIndex = newIndex;
        mainScreenshot.src = imgElement.src;
        updateActiveThumbnail(currentScreenshotIndex);
        scrollThumbnailIntoView(imgElement);
    }
}

function nextScreenshot() {
    if (screenshots.length === 0) return;
    currentScreenshotIndex = (currentScreenshotIndex + 1) % screenshots.length;
    mainScreenshot.src = screenshots[currentScreenshotIndex].src;
    updateActiveThumbnail(currentScreenshotIndex);
    scrollThumbnailIntoView(screenshots[currentScreenshotIndex]);
}

function prevScreenshot() {
    if (screenshots.length === 0) return;
    currentScreenshotIndex = (currentScreenshotIndex - 1 + screenshots.length) % screenshots.length;
    mainScreenshot.src = screenshots[currentScreenshotIndex].src;
    updateActiveThumbnail(currentScreenshotIndex);
    scrollThumbnailIntoView(screenshots[currentScreenshotIndex]);
}

function scrollThumbnailIntoView(thumb) {
    thumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
    });
}

// Инициализация при загрузке страницы
if (screenshots.length > 0) {
    updateActiveThumbnail(0);
}

// Подключаем клик по миниатюрам
screenshots.forEach(img => {
    img.addEventListener('click', () => setMainScreenshot(img));
});