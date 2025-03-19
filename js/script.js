const menu = document.querySelector('.header-menu-body' )
const menuBtn = document.querySelector('.header-menu-icon')

const body = document.body;

if (menu && menuBtn) {
        menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active' )
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })

    menu.querySelectorAll('.menu-link' ).forEach(link => {
            link.addEventListener('click', () => {
            menu.classList.toggle('active')
            menuBtn.classList.toggle('active')
            body. classList. toggle('lock')
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".categories-grid-container");
    const items = document.querySelectorAll(".categories-grid-container-item");
    const itemWidth = items[0].offsetWidth + 60;
    // const maxIndex = items.length - Math.floor(slider.offsetWidth / itemWidth);
    const maxIndex = 9; // Костыльно
    let currentIndex = 0;

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function updateButtons() {
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
        if (currentIndex < maxIndex) {
            currentIndex++;
            items.forEach(item => {
                item.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            });
            updateButtons();
        }
    });

    updateButtons();
});