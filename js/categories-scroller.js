document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".categories-grid-container");
    const items = document.querySelectorAll(".categories-grid-container-item");
    let itemWidth;

    function calculateItemWidth() {
        if (window.innerWidth <= 450) {
            itemWidth = items[0].offsetWidth + 30;
        } else {
            itemWidth = items[0].offsetWidth + 60;
        }
    }

    let currentIndex = 0;

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function calculateMaxIndex() {
        const containerWidth = slider.offsetWidth;
        calculateItemWidth();
        const visibleItems = Math.floor(containerWidth / itemWidth);
        return items.length - visibleItems;
    }

    function updateButtons() {
        const maxIndex = calculateMaxIndex();
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
    }

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            items.forEach(item => {
                item.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            });
            updateButtons();
        }
    });

    nextButton.addEventListener("click", () => {
        const maxIndex = calculateMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            items.forEach(item => {
                item.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            });
            updateButtons();
        }
    });

    window.addEventListener("resize", () => {
        calculateItemWidth();
        updateButtons();
    });

    calculateItemWidth();
    updateButtons();
});